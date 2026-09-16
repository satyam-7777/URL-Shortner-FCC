const { v4: uuid } = require("uuid");
const shortUrlModel = require("../models/shortUrlModel");
const { formatShortUrlResponse } = require("../utils/utils");

const shortenUrl = async (req, res, next) => {
  const { url } = req.body;

  try {
    let urlData = await shortUrlModel.findOne({
      original_url: url,
    });

    let statusCode = 200;

    if (!urlData) {
      const shortUrlKey = uuid().replace(/-/g, "").slice(0, process.env.SHORT_URL_LENGTH);

      urlData = await shortUrlModel.create({
        original_url: url,
        short_url: shortUrlKey,
      });

      statusCode = 201;
    }

    return res.status(statusCode).json(formatShortUrlResponse(req, urlData));
  } catch (err) {
    return next(err);
  }
};

const sendOriginalUrl = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id || id.length !== Number(process.env.SHORT_URL_LENGTH)) {
      return next(new Error("Invalid Short URL"));
    }

    const existingUrlData = await shortUrlModel.findOne({ short_url: id });

    if (!existingUrlData) {
      const error = new Error("Invalid Short URL");
      error.statusCode = 404;
      return next(error);
    }

    return res.redirect(existingUrlData.original_url);
  } catch (err) {
    return next(err);
  }
};

module.exports = { shortenUrl, sendOriginalUrl };
