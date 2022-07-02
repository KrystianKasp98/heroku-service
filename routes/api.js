const express = require("express");
const router = express.Router();
const News = require("../models/news");
const defaultSort = -1;

/* GET home page. */
router.get("/", (req, res, next) => {
  console.log(req.query);
  const search = req.query.search || "";
  let sort = req.query.sort || defaultSort;

  if (sort !== defaultSort || sort !== 1) {
    sort = defaultSort;
  }

  let findNews = "";
  findNews = News
    .find({ title: new RegExp(search.trim(), "i") }) //in that way we search statements that fit to regexp 
    .sort({ created: sort }) //desc sort -1, sort asc 1, sort default 0
    .select('_id title description');

  findNews.exec((err, data) => {
    res.json(data); //static path to pug template
  });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  const findNews = News.findById(id)
    .select("_id title description");

  findNews.exec((err, data) => {
    res.json(data);
  })

});

module.exports = router;
