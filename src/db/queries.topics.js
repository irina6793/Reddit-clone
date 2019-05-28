const Topic = require("./models").Topic;
const Post = require("./models").Post;
const Flair = require("./models").Flair;
const Authorizer = require("../policies/topic");

module.exports = {
  getAllTopics(callback) {
    return Topic.all()
      .then(topics => {
        callback(null, topics);
      })
      .catch(err => {
        callback(err);
      });
  },
  getTopic(id, callback) {
    return Topic.findById(id, {
      include: [
        {
          model: Post,
          as: "posts"
        }
      ]
    })
      .then(topic => {
        callback(null, topic);
      })
      .catch(err => {
        callback(err);
      });
  },
  addTopic(newTopic, callback) {
    return Topic.create({
      title: newTopic.title,
      description: newTopic.description
    })
      .then(topic => {
        callback(null, topic);
      })
      .catch(err => {
        callback(err);
      });
  },
  updateTopic(req, updatedTopic, callback) {
    return Topic.findById(req.params.id).then(topic => {
      if (!topic) {
        return callback("Topic not found");
      }
      const authorized = new Authorizer(req.user, topic).update();
      if (authorized) {
        topic
          .update(updatedTopic, {
            fields: Object.keys(updatedTopic)
          })
          .then(() => {
            callback(null, topic);
          })
          .catch(err => {
            callback(err);
          });
      } else {
        req.flash("notice", "You are not authorized to do that.");
        callback("Forbidden");
      }
    });
  },
  deleteTopic(req, callback) {
    return Topic.findById(req.params.id)
      .then(topic => {
        const authorized = new Authorizer(req.user, topic).destroy();
        if (authorized) {
          topic.destroy().then(res => {
            callback(null, topic);
          });
        } else {
          req.flash("notice", "You are not authorized to do that.");
          callback(401);
        }
      })
      .catch(err => {
        callback(err);
      });
  },
  validateTopic(req, res, next) {
    if (req.method === "POST") {
      req
        .checkParams("topicId", "must be valid")
        .notEmpty()
        .isInt();
      req
        .checkDescription("title", "must be at least 5 characters in length")
        .isLength({ min: 5 });
      req
        .checkDescription(
          "description",
          "must be at least 10 characters in length"
        )
        .isLength({ min: 10 });
    }

    const errors = req.validationErrors();
    if (errors) {
      req.flash("error", errors);
      return res.redirect(303, req.headers.referer);
    } else {
      return next();
    }
  }
};
