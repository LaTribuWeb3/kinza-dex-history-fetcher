const { BigNumber } = require('bignumber.js');

/**
 * @title CoreV2
 * @notice Handles math operations of Wombat protocol. Assume all params are signed integer with 18 decimals
 */
class CoreV2 {
  constructor() {
    this.WAD_I = new BigNumber(10).pow(18);
    this.WAD = new BigNumber(10).pow(18);
  }

  CORE_UNDERFLOW() {
    throw new Error('CORE_UNDERFLOW');
  }

  /**
   * @notice Core Wombat stableswap equation
   * @dev This function always returns >= 0
   * @param Ax asset of token x
   * @param Ay asset of token y
   * @param Lx liability of token x
   * @param Ly liability of token y
   * @param Dx delta x, i.e. token x amount inputted
   * @param A amplification factor
   * @return quote The quote for amount of token y swapped for token x amount inputted
   */
  _swapQuoteFunc(Ax, Ay, Lx, Ly, Dx, A) {
    if (Lx.isZero() || Ly.isZero()) {
      // in case div of 0
      throw new Error('CORE_UNDERFLOW');
    }
    const D = Ax.plus(Ay).minus(A.times(Lx.times(Lx).div(Ax).plus(Ly.times(Ly).div(Ay)))); // flattened _invariantFunc
    const rx_ = Ax.plus(Dx).div(Lx);
    const b = Lx.times(rx_.minus(A.div(rx_)))
      .div(Ly)
      .minus(D.div(Ly)); // flattened _coefficientFunc
    const ry_ = this._solveQuad(b, A);
    const Dy = Ly.times(ry_).minus(Ay);
    return Dy.isNegative() ? Dy.abs() : Dy;
  }

  /**
   * @notice Solve quadratic equation
   * @dev This function always returns >= 0
   * @param b quadratic equation b coefficient
   * @param c quadratic equation c coefficient
   * @return x
   */
  _solveQuad(b, c) {
    return b.times(b).plus(c.times(4).times(this.WAD_I)).sqrt().minus(b).div(2);
  }

  /**
   * @notice Equation to get invariant constant between token x and token y
   * @dev This function always returns >= 0
   * @param Lx liability of token x
   * @param rx cov ratio of token x
   * @param Ly liability of token x
   * @param ry cov ratio of token y
   * @param A amplification factor
   * @return The invariant constant between token x and token y ("D")
   */
  _invariantFunc(Lx, rx, Ly, ry, A) {
    const a = Lx.times(rx).plus(Ly.times(ry));
    const b = A.times(Lx.div(rx).plus(Ly.div(ry)));
    return a.minus(b);
  }

  /**
   * @notice Equation to get quadratic equation b coefficient
   * @dev This function can return >= 0 or <= 0
   * @param Lx liability of token x
   * @param Ly liability of token y
   * @param rx_ new asset coverage ratio of token x
   * @param D invariant constant
   * @param A amplification factor
   * @return The quadratic equation b coefficient ("b")
   */
  _coefficientFunc(Lx, Ly, rx_, D, A) {
    return Lx.times(rx_.minus(A.div(rx_)))
      .div(Ly)
      .minus(D.div(Ly));
  }

  /**
   * @return v positive value indicates a reward and negative value indicates a fee
   */
  depositRewardImpl(D, SL, delta_i, A_i, L_i, A) {
    if (L_i.isZero()) {
      // early return in case of div of 0
      return new BigNumber(0);
    }
    if (delta_i.plus(SL).isZero()) {
      return L_i.minus(A_i);
    }

    const r_i_ = this._targetedCovRatio(SL, delta_i, A_i, L_i, D, A);
    return A_i.plus(delta_i).minus(L_i.plus(delta_i).times(r_i_));
  }

  /**
   * @dev should be used only when r* = 1
   */
  withdrawalAmountInEquilImpl(delta_i, A_i, L_i, A) {
    const L_i_ = L_i.plus(delta_i);
    const r_i = A_i.div(L_i);
    const rho = L_i.times(r_i.minus(A.div(r_i)));
    const beta = rho.plus(delta_i.times(this.WAD_I.minus(A))).div(2);
    const A_i_ = beta
      .plus(
        beta
          .times(beta)
          .plus(A.times(L_i_.times(L_i_)))
          .sqrt()
      )
      .div(beta);
    return A_i.minus(A_i_);
  }

  /**
   * @notice return the deposit reward in token amount when target liquidity (LP amount) is known
   */
  exactDepositLiquidityInEquilImpl(D_i, A_i, L_i, A) {
    if (L_i.isZero()) {
      // if this is a deposit, there is no reward/fee
      // if this is a withdrawal, it should have been reverted
      return D_i;
    }
    if (A_i.plus(D_i).isNegative()) {
      // impossible
      throw new Error('CORE_UNDERFLOW');
    }

    const r_i = A_i.div(L_i);
    const k = D_i.plus(A_i);
    const b = k.times(this.WAD_I.minus(A)).plus(A.times(L_i).times(2));
    const c = k
      .times(A_i.minus(A.times(L_i).div(r_i)))
      .minus(k.times(k))
      .plus(A.times(L_i).times(L_i));
    const l = b.times(b).minus(A.times(c).times(4));
    return b.negated().plus(l.sqrt()).div(A).div(2);
  }

  _targetedCovRatio(SL, delta_i, A_i, L_i, D, A) {
    const r_i = A_i.div(L_i);
    const er = this._equilCovRatio(D, SL, A);
    const er_ = this._newEquilCovRatio(er, SL, delta_i);
    const D_ = this._newInvariantFunc(er_, A, SL, delta_i);

    const b_ = D.minus(A_i).plus(L_i.times(A).div(r_i)).minus(D_).div(L_i.plus(delta_i));
    return this._solveQuad(b_, A);
  }

  _equilCovRatio(D, SL, A) {
    const b = D.div(SL).negated();
    return this._solveQuad(b, A);
  }

  _newEquilCovRatio(er, SL, delta_i) {
    return er.times(delta_i).plus(SL).div(delta_i.plus(SL));
  }

  _newInvariantFunc(er_, A, SL, delta_i) {
    return SL.plus(delta_i).times(er_.minus(A.div(er_)));
  }

  /**
   * @notice TODO (if any) from Yellow Paper (Haircut).
   * @dev Applies haircut rate to amount
   * @param amount The amount that will receive the discount
   * @param rate The rate to be applied
   * @return The result of operation.
   */
  _haircut(amount, rate) {
    return amount.times(rate);
  }
}

module.exports = CoreV2;
