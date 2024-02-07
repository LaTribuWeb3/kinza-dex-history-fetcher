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
    return value1.multipliedBy(value2).dividedBy(new BigNumber('1e18'));
  }
  /**
   * reproduce wdiv function from safeMath
   */
  _wdivEquivalent(value1, value2) {
    return value1.multipliedBy(new BigNumber('1e18')).dividedBy(value2);
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
    A = new BigNumber(A);
    if (Lx.isZero() || Ly.isZero()) {
      // in case div of 0
      throw new Error('CORE_UNDERFLOW');
    }

    // compute D
    const D = this._invariantFunc(Lx, Ax, Ly, Ay, A);
    const rx_ = this._wdivEquivalent(Ax.plus(Dx), Lx);
    const b = this._coefficientFunc(Lx, Ly, rx_, D, A);
    const ry_ = this._solveQuad(b, A);
    const Dy = this._wmulEquivalent(Ly, ry_).minus(Ay);
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

    // Assuming an appropriate initial guess for the Babylonian method;
    // This might need adjustment based on your specific requirements or context.
    const initialGuess = b;

    // Calculate the argument for the sqrt function
    const sqrtArgument = b.pow(2).plus(c.multipliedBy(4).multipliedBy(this.WAD_I));

    // Apply the Babylonian square root calculation
    const sqrtValue = this._babylonianSqrt(sqrtArgument, initialGuess);

    // Perform the rest of the quadratic formula calculation
    const x = sqrtValue.minus(b).dividedBy(2);

    return x;
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
    // Convert all inputs to BigNumbers to ensure divine precision
    Lx = new BigNumber(Lx);
    rx = new BigNumber(rx);
    Ly = new BigNumber(Ly);
    ry = new BigNumber(ry);
    A = new BigNumber(A);

    // Define weighted multiplication and division functions
    const wmul = (x, y) => x.multipliedBy(y).dividedBy(new BigNumber('1e18'));
    const wdiv = (x, y) => x.multipliedBy(new BigNumber('1e18')).dividedBy(y);

    // Perform calculations using BigNumber methods
    const a = wmul(Lx, rx).plus(wmul(Ly, ry));
    const b = wmul(A, wdiv(Lx, rx).plus(wdiv(Ly, ry)));

    // Calculate the invariant constant "D" without imposing non-negativity
    const D = a.minus(b);

    return D; // Return D directly, mirroring the Solidity function's behavior
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
    // Convert all inputs to BigNumbers to ensure divine precision
    Lx = new BigNumber(Lx);
    Ly = new BigNumber(Ly);
    rx_ = new BigNumber(rx_);
    D = new BigNumber(D);
    A = new BigNumber(A);

    // Define weighted multiplication and division functions
    const wmul = (x, y) => x.multipliedBy(y).dividedBy(new BigNumber('1e18'));
    const wdiv = (x, y) => x.multipliedBy(new BigNumber('1e18')).dividedBy(y);

    // Perform the specific calculation as defined in the Solidity function
    const b = wmul(Lx, wdiv(rx_.minus(A), rx_)).minus(wdiv(D, Ly));

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
