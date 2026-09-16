const express = require("express");
const { shortenUrl, sendOriginalUrl } = require("../controllers/urlShortenerController");
const { validateUrl } = require("../middlewares/validateUrl");

const router = express.Router();

router.post("/", validateUrl, shortenUrl);
router.get("/:id", sendOriginalUrl);

module.exports = router;
