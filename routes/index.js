const express = require('express');
const router = express.Router();
const login = 'admin';
const password = '123';

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Express' });
});

/*GET login page*/
router.get("/login", (req, res, next) => {
  res.render("login", { title: "Logowanie" });
});

/*POST login page*/
router.post('/login', (req, res, next) => {
  const { body } = req;

  if (body.password === password && body.login === login) {
    req.session.admin = 1;//set session admin variable  

    res.redirect('/admin');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
