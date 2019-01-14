//#1
const topicQueries = require("../db/queries.topics.js");
const Authorizer = require("../policies/topic");

module.exports = {
  index(req, res, next){

//#2
  topicQueries.getAllTopics((err, topics) => {

//#3
  if(err){
    console.log(err)
    res.redirect(500, "static/index");
  } else {
    res.render("topics/index", {topics});
   }
  })
 },
 new(req, res, next){
// #2
const authorized = new Authorizer(req.user).new();
if(authorized) {
   res.render("topics/new");
 } else {
   req.flash("notice", "You are not authorized to do that.");
   res.redirect("/topics");
 }
},
  create(req, res, next){
      console.log("Creating topic...");
// #1
  const authorized = new Authorizer(req.user).create();
// #2
  if(authorized) {
    let newTopic = {
      title: req.body.title,
      description: req.body.description
  };
   topicQueries.addTopic(newTopic, (err, topic) => {
    if(err){
            console.log("Error creating topic, redirecting to new topic page...");
      res.redirect(500, "/topics/new");
    } else {
      console.log("Created topic, redirecting to that topic's page...");
       res.redirect(303, `/topics/${topic.id}`);
    }
  });
} else {
  console.log("Error creating topic, user not authorized. Redirecting to /topics...");
  // #3
  req.flash("notice", "You are not authorized to do that.");
  res.redirect(303, "/topics");
 }
},

 show(req, res, next){
   topicQueries.getTopic(req.params.id, (err, topic) => {
   if(err || topic == null){
      console.log(err);
      res.redirect(404, "/");
  } else {
      console.log("OK");
      res.render("topics/show", {topic});
   }
  });
},
edit(req, res, next){
// #1
  topicQueries.getTopic(req.params.id, (err, topic) => {
    if(err || topic == null){
      res.redirect(404, "/");
    } else {
// #2
   const authorized = new Authorizer(req.user, topic).edit();
// #3
   if(authorized){
      res.render("topics/edit", {topic});
    } else {
      req.flash("You are not authorized to do that.")
      res.redirect(`/topics/${req.params.id}`)
    }
   }
 });
},
update(req, res, next){
// #1
   topicQueries.updateTopic(req, req.body, (err, topic) => {
   if(err || topic == null){
      res.redirect(404, `/topics/${req.params.id}/edit`);
    } else {
      res.redirect(`/topics/${req.params.id}`);
    }
  });
},
destroy(req, res, next){
// #1
  topicQueries.deleteTopic(req, (err, topic) => {
    if(err){
      res.redirect(500, `/topics/${req.params.id}`)
    } else {
      res.redirect(303, "/topics")
    }
  });
 }
}
