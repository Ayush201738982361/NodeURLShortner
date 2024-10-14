const express = require("express");
const router = express.Router();
const { generateNewShortURL } = require("../controller/url");
const { postShortURLS } = require("../controller/url");

router.post("/", generateNewShortURL);
router.get("/:shortID", postShortURLS);

module.exports = router;