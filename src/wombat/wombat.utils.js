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
   * reproduce wmul function from safeMath
   */
  _wmulEquivalent(value1, value2) {
    return value1.multipliedBy(value2).plus(this.WAD.dividedBy(2)).dividedToIntegerBy(this.WAD);
  }
  /**
   * reproduce wdiv function from safeMath
   */
  _wdivEquivalent(value1, value2) {
    if (value2.isZero()) {
      throw new Error('Division by zero');
    }

    // Perform the operation: ((x * WAD) + (y / 2)) / y
    // Note: Since Solidity truncates results towards zero, we emulate this by using the integer part of the division result
    return value1.multipliedBy(this.WAD).plus(value2.dividedBy(2)).dividedToIntegerBy(value2);
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
    Ax = new BigNumber(Ax);
    Ay = new BigNumber(Ay);
    Lx = new BigNumber(Lx);
    Ly = new BigNumber(Ly);
    Dx = new BigNumber(Dx);
    A = new BigNumber(A);
    if (Lx.isZero() || Ly.isZero()) {
      // in case div of 0
      throw new Error('CORE_UNDERFLOW');
    }

    // compute D
    const D = this._calculateD(Ax, Ay, Lx, Ly, A);
    console.log('D:', D.toString(10));
    const rx_ = this._wdivEquivalent(Ax.plus(Dx), Lx);
    console.log('rx_:', rx_.toString(10));
    const b = this._calculateB(Lx, Ly, rx_, A, D);
    console.log('b:', b.toString(10));
    const ry_ = this._solveQuad(b, A);
    console.log('ry_:', ry_.toString(10));
    const Dy = this._wmulEquivalent(Ly, ry_).minus(Ay);
    console.log('Dy:', Dy.toString(10));
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
    b = new BigNumber(b);
    c = new BigNumber(c);
    // Define the initial guess for the Babylonian square root calculation
    const initialGuess = b;

    // Calculate the argument for the sqrt function
    const sqrtArgument = b.pow(2).plus(c.multipliedBy(4).multipliedBy(this.WAD_I));

    // Apply the Babylonian square root calculation
    const sqrtValue = this._babylonianSqrt(sqrtArgument, initialGuess);

    // Perform the rest of the quadratic formula calculation
    const x = sqrtValue.minus(b).dividedBy(2);

    return x;
  }

  _calculateD(Ax, Ay, Lx, Ly, A) {
    // Convert all inputs to BigNumber instances for high precision arithmetic
    Ax = new BigNumber(Ax);
    Ay = new BigNumber(Ay);
    Lx = new BigNumber(Lx);
    Ly = new BigNumber(Ly);
    A = new BigNumber(A);

    const D = Ax.plus(Ay).minus(
      this._wmulEquivalent(A, Lx.multipliedBy(Lx).dividedBy(Ax).plus(Ly.multipliedBy(Ly).dividedBy(Ay)))
    );

    return D;
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
  _calculateB(Lx, Ly, rx_, A, D) {
    Lx = new BigNumber(Lx);
    Ly = new BigNumber(Ly);
    rx_ = new BigNumber(rx_);
    A = new BigNumber(A);
    D = new BigNumber(D);

    // Calculate b as per the given expression
    const b = Lx.multipliedBy(this._wdivEquivalent(rx_.minus(A), rx_))
      .dividedBy(Ly)
      .minus(this._wdivEquivalent(D, Ly));

    return b;
  }
  // Custom square root function using the Babylonian method
  _babylonianSqrt(y, guess) {
    let z;
    if (y.gt(3)) {
      if (guess.gt(0) && guess.lte(y)) {
        z = guess;
      } else if (guess.lt(0) && guess.negated().lte(y)) {
        z = guess.negated();
      } else {
        z = y;
      }
      let x = y.div(z).plus(z).div(2);
      while (!x.eq(z)) {
        z = x;
        x = y.div(x).plus(x).div(2);
      }
    } else if (!y.eq(0)) {
      z = new BigNumber(1);
    } else {
      z = new BigNumber(0);
    }
    return z;
  }
}

module.exports = CoreV2;
