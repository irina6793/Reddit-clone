const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

  beforeEach((done) => {
       this.topic = this.topic;
       this.post = this.post;

      sequelize.sync({force: true}).then((res) => {
        Topic.create({
          title: "Expeditions to Mount Everest",
          description: "The adventures in the tallest mountain in the world",
          posts: [{
            title: "My first visit to the mountain",
            body: "I saw plenty of rocks and ice."
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

    describe("#create()", () => {
        it("should create a topic object with a title, body, and assigned post", (done) => {
        Topic.create({
          title: "Pros of Cryosleep during the long journey",
          posts: "1. Not having to answer the 'are we there yet?' question.",
          topicId: this.topic.id
     }).then((topic) => {
      expect(topic.title).toBe("Pros of Cryosleep during the long journey");
      expect(topic.posts).toBe("1. Not having to answer the 'are we there yet?' question.");
      expect(topic.topicId).toBe(this.topic.id);
      done();
    }).catch((err) => {
       console.log(err);
       done();
     });
    });

    it("should not create a topic with missing title, body, or assigned post", (done) => {
      Topic.create({
        title: "Pros of Cryosleep during the long journey"
      }).then((topic) => {
        // the code in this block will not be evaluated since the validation error
        // will skip it. Instead, we'll catch the error in the catch block below
        // and set the expectations there
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Topic.description cannot be null");
        done();
    });
    });
  });
    describe("#getPosts()", () => {
      it("should return the associated post", (done) => {
        this.topic.getPosts()
        .then((associatedPost) => {
          expect(associatedPost.title).toBe("My first visit to the mountain");
          done();
        });
      });
     });
    });
