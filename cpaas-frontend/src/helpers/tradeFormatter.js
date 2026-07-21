export const formatTrade = (trade) => {
  if (!trade) return "";

  const t = trade.toLowerCase();

  if (t === "ofc" || t === "ofcs") {
    return "OFC";
  }

  const singular = t.endsWith("s") ? t.slice(0, -1) : t;

  return singular.charAt(0).toUpperCase() + singular.slice(1);
};

export const getTradeRouteKey = (trade) => {
  const t = trade.toLowerCase();

  if (t === "ofc" || t === "ofcs") return "ofc";

  return t.endsWith("s") ? t.slice(0, -1) : t;
};

export const getTradePluralRouteKey = (trade) => {
  const singular = getTradeRouteKey(trade);
  return `${singular}s`;
};
