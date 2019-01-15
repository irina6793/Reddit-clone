const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;
const Comment = require("../../src/db/models").Comment;

describe("Comment", () => {

// #2: Before each test, we scope a user, topic, post, and comment to the test context.
    beforeEach((done) => {
      this.user;
      this.topic;
      this.post;
      this.comment;

      sequelize.sync({force: true}).then((res) => {

// #3: We create test data we can use during test execution
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user;

      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system.",
        posts: [{
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",
          userId: this.user.id
        }]
      }, {
        include: {
          model: Post,
          as: "posts"
        }
      })
      .then((topic) => {
        this.topic = topic;
        this.post = this.topic.posts[0];

      Comment.create({
        body: "ay caramba!!!!!",
        userId: this.user.id,
        postId: this.post.id
      })
      .then((comment) => {
        this.comment = comment;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    })
    .catch((err) => {
      console.log(err);
      done();
    });
   });
  });
 });
});
