const formatShortUrlResponse = (req, dbResponse) => {
  const { original_url, short_url, createdAt } = dbResponse;

  const host = `${req.protocol}://${req.get("host")}`;
  const shortUrl = `${host}${req.baseUrl}/${short_url}`;

  const createdDate = new Date(createdAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return {
    original_url,
    short_url,
    shortUrlLink: shortUrl,
    createdDate,
  };
};

module.exports = { formatShortUrlResponse };
