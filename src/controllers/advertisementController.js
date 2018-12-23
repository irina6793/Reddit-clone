const advertisementQueries = require("../db/queries.advertisement.js");

module.exports = {
  index(req, res, next){

    //#2
      advertisementQueries.getAllAdvertisement((err, advertisements) => {

    //#3
      if(err){
        res.redirect(500, "static/index");
      } else {
        res.render("advertisement/index", {advertisements});
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
       advertisementQueries.addAdvertisement(newAdvertisement, (err, advertisement) => {
         if(err){
           res.redirect(500, "/advertisement/new");
         } else {
           res.redirect(303, `/advertisement/${advertisement.id}`);
         }
       });
     },

    show(req, res, next){
      advertisementQueries.getAdvertisement(req.params.id, (err, advertisement) => {
      if(err || topic == null){
         res.redirect(404, "/");
     } else {
         res.render("advertisements/show", {advertisement});
      }
     });
   },
   edit(req, res, next){
     advertisementQueries.getAdvertisement(req.params.id, (err, advertisement) => {
       if(err || topic == null){
         res.redirect(404, "/");
       } else {
         res.render("advertisements/edit", {advertisement});
      }
    });
   },
   update(req, res, next){
     advertisementQueries.updateAdvertisement(req.params.id, req.body, (err, advertisement) => {
       if(err || topic == null){
         res.redirect(404, `/advertisements/${req.params.id}/edit`);
       } else {
         res.redirect(`/advertisements/${advertisement.id}`);
       }
     });
   },
   destroy(req, res, next){
     advertisementQueries.deleteAdvertisement(req.params.id, (err, advertisement) => {
       if(err){
         res.redirect(500, `/advertisements/${advertisement.id}`)
       } else {
         res.redirect(303, "/advertisements")
       }
     });
    }
   }
