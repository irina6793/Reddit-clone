module.exports = {
  index(req, res, next){
      res.render("static/index", {title: "Welcome to Bloccit"});
  },
  user(req, res, next){
    res.render("static/user", {name: "About Us"});
 }
}
