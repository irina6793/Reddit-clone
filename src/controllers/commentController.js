const commentQueries = require("../db/queries.comments.js");
const Authorizer = require("../policies/comment.js");

module.exports = {
  create(req, res, next){
    console.log("Creating comment with user:");
        console.log(req.user);
    const authorized = new Authorizer(req.user).create();
    if(authorized) {
      console.log("User is authorized");
      let newComment = {
        body: req.body.body,
        userId: req.user.id,
        postId: req.params.postId
      };

      commentQueries.createComment(newComment, (err, comment) => {

        if(err){
                    console.log("There was an error while creating the comment:");
                              console.log(err);
          req.flash("error", err);
        }
                console.log("Redirecting to referrer");
        res.redirect(req.headers.referrer);
      });
    } else {
            console.log("User is not authorized");
      req.flash("notice", "You must be signed in to do that.")
      req.redirect("/users/sign_in");
    }
  },

  destroy(req, res, next){
    commentQueries.deleteComment(req, (err, comment) => {
      if(err){
        res.redirect(err, req.headers.referrer);
      } else {
        res.redirect(req.headers.referrer);
      }
    });
  }
}
