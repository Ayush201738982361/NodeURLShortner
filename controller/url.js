const shortid = require("shortid");
const URLModel = require("../model/url");

async function generateNewShortURL(req, res) {
  const body = req.body;
  const shortID = shortid.generate();

  if (!body.url) {
    return res.status(400).json({ error: "Enter a URL" });
  }

  try {
    await URLModel.create({
      shortID: shortID,
      redirectURL: body.url,
      visitedHistory: [],
      createdBy: req.user._id,
    });
    return res.render("home", { id: shortID });
  } catch (error) {
    console.error("Error creating URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function postShortURLS(req, res) {
  try {
    const shortID = req.params.shortID;
    const entry = await URLModel.findOneAndUpdate(
      { shortID },
      { $push: { visitedHistory: { date: Date.now() } } },
      { new: true }
    );
    if (entry) {
      res.redirect(entry.redirectURL);
      console.log(entry);
      console.log(entry.redirectURL);
    } else {
      res.status(404).send("URL Not Found");
    }
  } catch (error) {
    res.send("Error", error);
  }
}

module.exports = {
  generateNewShortURL,
  postShortURLS,
};
