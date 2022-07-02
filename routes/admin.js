const express = require("express");
const { route } = require(".");
const News = require('../models/news');
const router = express.Router();

//protekcja wszystkich sciezek /admin, jezeli nie mamy klucza sesji to sie nie dostaniemy xDDDD o kurde, protect all admin's paths from non admin users
router.all('*', (req, res,next) => {
  //if user doesn't have admin session, user will be redirected to /login
  if (!req.session.admin) {
    return res.redirect("login");
  }
  next();//allow info that other request can run 
});

/* GET home page. */
router.get("/", (req, res) => {
  News.find({}, (err, data) => {
    console.log(data)
    res.render('admin/index',{title:'Admin', data})
  })
});

router.get('/news/add', (req, res) => {
  res.render("admin/news-form", { title: "Add news",body:{} });
});
router.post("/news/add", (req, res) => {
  const body = req.body;
  const newsData = new News(body);
  const errors = newsData.validateSync();
  newsData.save().then(() => res.redirect("/admin")).catch(err=>res.render("admin/news-form", { title: "Add news",errors,body }))
});

router.get('/news/delete/:id', (req, res) => {
  News.findByIdAndDelete(req.params.id, err => {
    res.redirect('/admin');
  });
});

module.exports = router;
