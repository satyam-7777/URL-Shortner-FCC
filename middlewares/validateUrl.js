const dns = require("dns").promises;

const validateUrl = async (req, res, next) => {
  const url = req.body?.url?.trim();
  const errMsg = "Invalid URL";

  if (!url) {
    return res.json({ error: errMsg });
  }

  try {
    const parsedUrl = new URL(url);

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error(errMsg);
    }

    await dns.lookup(parsedUrl.hostname);

    req.body.url = url;

    return next();
  } catch (err) {
    return res.json({
      error: errMsg,
    });
  }
};

module.exports = { validateUrl };
