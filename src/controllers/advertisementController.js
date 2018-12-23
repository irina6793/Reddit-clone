const advertisementQueries = require("../db/queries.advertisement.js");

module.exports = {
  index(req, res, next){

    //#2
      advertisementQueries.getAllAdvertisement((err, topics) => {

    //#3
      if(err){
        res.redirect(500, "static/index");
      } else {
        res.render("advertisement/index", {topics});
       }
      })
     },

     new(req, res, next){
       res.render("advertisement/new");
     },
     create(req, res, next){
       let newAdvertisement = {
         title: req.body.title,
         description: req.body.description
       };
       advertisementQueries.addAdvertisement(newAdvertisement, (err, topic) => {
         if(err){
           res.redirect(500, "/advertisement/new");
         } else {
           res.redirect(303, `/advertisement/${advertisement.id}`);
         }
       });
     },
     
