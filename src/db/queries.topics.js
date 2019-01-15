const Topic = require("./models").Topic;
const Post = require("./models").Post;
const Flair = require("./models").Flair;
const Authorizer = require("../policies/topic");

module.exports = {

//#1
  getAllTopics(callback){
    return Topic.all()

//#2
    .then((topics) => {
      callback(null, topics);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getTopic(id, callback){
    return Topic.findById(id, {
      include: [{
       model: Post,
       as: "posts"
    }]
  })
    .then((topic) => {
      callback(null, topic);
    })
      .catch((err) => {
       callback(err);
    })
  },


//#3
  addTopic(newTopic, callback){
    return Topic.create({
      title: newTopic.title,
      description: newTopic.description
     })
    .then((topic) => {
      callback(null, topic);
    })
   .catch((err) => {
      callback(err);
    })
  },


 updateTopic(req, updatedTopic, callback){
    return Topic.findById(req.params.id)
    .then((topic) => {
      if(!topic){
        return callback("Topic not found");
      }
      const authorized = new Authorizer(req.user, topic).update();
      if(authorized) {
        topic.update(updatedTopic, {
          fields: Object.keys(updatedTopic)
      })
      .then(() => {
        callback(null, topic);
      })
      .catch((err) => {
        callback(err);
      });
    } else {
      req.flash("notice", "You are not authorized to do that.");
      callback("Forbidden");
    }
   });
  },

  deleteTopic(req, callback){
// #1
  return Topic.findById(req.params.id)
  .then((topic) => {

// #2
   const authorized = new Authorizer(req.user, topic).destroy();
   if(authorized) {
// #3
   topic.destroy()
   .then((res) => {
     callback(null, topic);
   });
 } else {

// #4
req.flash("notice", "You are not authorized to do that.")
callback(401);
}
})
.catch((err) => {
  callback(err);
});
},
validateTopic(req, res, next) {

//#1
if(req.method === "POST") {

//#2
req.checkParams("topicId", "must be valid").notEmpty().isInt();
req.checkDescription("title", "must be at least 5 characters in length").isLength({min: 5});
req.checkDescription("description", "must be at least 10 characters in length").isLength({min: 10});
}

//#3
const errors = req.validationErrors();

if (errors) {

//#4
req.flash("error", errors);
return res.redirect(303, req.headers.referer)
} else {
return next();
}
}
}
