module.exports = {
  index(req, res, next){
      res.render("static/index", {title: "Welcome to Bloccit"});
      res.render('user', {name: "About Us"});
  }
}
