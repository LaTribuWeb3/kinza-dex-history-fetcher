function computePriceAndSlippageMapForReserveValue(fromSymbol, toSymbol, poolTokens, ampFactor, reserves) {
  if (poolTokens.length != reserves.length) {
    throw new Error('Tokens array must be same length as reserves array');
  }

  const tokenConfs = [];
  for (const poolToken of poolTokens) {
    tokenConfs.push(getConfTokenBySymbol(poolToken));
  }

  const reservesNorm18Dec = getReservesNormalizedTo18Decimals(tokenConfs, reserves);

  const indexFrom = poolTokens.indexOf(fromSymbol);
  const indexTo = poolTokens.indexOf(toSymbol);

  /// GET_RETURN = QUOTE SWAP
  const returnVal = get_return(indexFrom, indexTo, BIGINT_1e18, reservesNorm18Dec, ampFactor);
  const price = normalize(returnVal.toString(), 18);
  const slippageMap = {};
  let lastAmount = BIGINT_1e18;
  for (let slippageBps = 50; slippageBps <= 2000; slippageBps += 50) {
    const targetPrice = price - (price * slippageBps) / 10000;
    const liquidityObj = v2_computeLiquidityForSlippageCurvePool(
      lastAmount,
      targetPrice,
      reservesNorm18Dec,
      indexFrom,
      indexTo,
      ampFactor
    );
    const liquidityAtSlippage = normalize(liquidityObj.base.toString(), 18);
    const quoteObtainedAtSlippage = normalize(liquidityObj.quote.toString(), 18);
    lastAmount = liquidityObj.base;
    slippageMap[slippageBps] = { base: liquidityAtSlippage, quote: quoteObtainedAtSlippage };
  }

  return { price, slippageMap };
}
