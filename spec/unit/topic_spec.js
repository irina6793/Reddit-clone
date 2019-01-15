const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {

  beforeEach((done) => {
       this.topic = this.topic;
       this.post = this.post;
       

      sequelize.sync({force: true}).then((res) => {
        User.create({

          email: "dasha@gmail.com",
          password: "new"
        }).then((user) => {
          Topic.create({
            title: "Expeditions to Mount Everest",
            description: "The adventures in the tallest mountain in the world",
            posts: [{
              title: "My first visit to the mountain",
              body: "I saw plenty of rocks and ice.",
              userId: user.id
            }]
          }, {
            include: {
              model: Post,
              as: "posts"
            }
          }).then((topic) => {
              this.topic = topic;
              this.post = topic.post;
              done();
          })
        })
      });
  });
    describe("#create()", () => {
        it("should create a topic object with a title, body, and assigned post", (done) => {
        Topic.create({
          title: "Best parts of the adventure",
          description: "Awesomens",
          posts : []
          //topicId: this.topic.id

     }).then((topic) => {
      expect(topic.title).toBe("Best parts of the adventure");

      //expect(topic.topicId).toBe(this.topic.id);
      done();
    }).catch((err) => {
       console.log(err);
       done();
     });
    });
  });

    describe("#getPosts()", () => {
      it("should return the associated post", (done) => {
        this.topic.getPosts()
        .then((associatedPost) => {
          expect(associatedPost[0].title).toBe("My first visit to the mountain");
          done();

        })
      });
     });
    });
