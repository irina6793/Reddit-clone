const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require('../../src/db/models').Post;
const Flair = require("../../src/db/models").Flair;

describe("routes : flair", () => {

  this.topic;
  this.post;
  this.flair;

  beforeEach((done) => {
        sequelize.sync({force: true}).then((res) => {

//#1
     Topic.create({
      title: "Winter Games",
      description: "Post your Winter Games stories.",
      posts: [{
            title: 'Snowball Fights',
            body: 'So much snow to play with!'
          }]
     }),{
        include: {
          model: Post,
          as: 'posts'
      }
    }
     .then((topic) => {
      this.topic = topic;
      this.post = topic.posts[0];
    })
      Flair.create({
          name: "Snow pictures",
          color: "Blue"
        })
        .then((flair) => {
          this.flair = flair;
          done();
        });
      });
    })
         .catch((err) => {
          console.log(err);
          done();
        });
      });


describe("GET /topics/:topicId/flairs/new", () => {
    it("should render a new post form", (done) => {
      request.get(`${base}/topics/${this.topic.id}/flairs/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Topics Flair");
        done();
      });
    });
  });

  describe('GET /topics/:topicId/posts/:postId/flairs/new', () => {
    it('should render a new post form', (done) => {
        request.get(`${base}/topics/${this.topic.id}/posts/${this.post.id}/flairs/new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain('New Posts Flair');
          done();
        });
    });
  });

  describe("POST /topics/:topicId/flairs/create", () => {
     it("should create a new topics flair and redirect", (done) => {
      const options = {
       url: `${base}/topics${this.topic.id}/flairs/create`,
       form: {
         name: "Ocean",
         color: "Blue"
     }
   };
     request.post(options,
       (err, res, body) => {

      Flair.findOne({where: {name: "Ocean"}})
        .then((flair) => {
          expect(flair).not.toBeNull();
          expect(flair.name).toBe("Ocean");
          expect(flair.color).toBe("Blue");
          expect(flairs.length).toBe(1);
          expect(flairs[0].id).toBe(flair.id);
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

   describe("GET /topics/:topicId/flairs/:id", () => {
       it("should render a view with the selected flair", (done) => {
         request.get(`${base}/flairs/${this.flair.id}`, (err, res, body) => {
           expect(err).toBeNull();
           expect(body).toContain("Snow Pictures");
           expect(body).toContain("Blue")
           done();
         });
       });
     });

  describe("POST /topics/:topicId/flairs/:id/destroy", () => {
       it("should delete the flair with the associated ID", (done) => {
         expect(this.flair.id).toBe(1);
         request.post(`${base}/${this.topic.id}/flairs/${this.flair.id}/destroy`, (err, res, body) => {

             Flair.findAll()
              .then((flairs) => {
                {
        const flairCountBeforeDelete = flairs.length;
        expect(flairCountBeforeDelete).toBe(1);
        request.post(`${base}/flairs/${this.flair.id}/destroy`, (err, res, body) =>
        {
          Flair.findAll()
          .then((flairs) =>
          {
               expect(err).toBeNull();
               expect(flair).toBeNull();
               done();
             })
           });
         };
       });
});
});
})
 describe("GET /topics/:topicId/flairs/:id/edit", () => {
      it("should render a view with an edit flair form", (done) => {
          request.get(`${base}/${this.topic.id}/flairs/${this.flair.id}/edit`, (err, res, body) => {
             expect(err).toBeNull();
             expect(flair.body).toContain("Edit Flair");
             expect(flair.body).toContain("Watching the snow melt");
             done();
          });
         });
       });

  describe("POST /topics/:topicId/flairs/:id/update", () => {
    it("should return a status code 302", (done) => {
       request.post({
        url: `${base}/${this.topic.id}/flairs/${this.flair.id}/update`,
        form: {
          title: "Snowman Building Competition",
          description: "I love watching them melt slowly."
      }
    }, (err, res, body) => {
      expect(res.statusCode).toBe(302);
      done();
     });
  });
     it("should update the flair with the given values", (done) => {
       const options = {
        url: `${base}/${this.topic.id}/flairs/${this.flair.id}/update`,
         form: {
          title: "Snowman Building Competition"
      }
    };
    request.post(options,
      (err, res, body) => {
        expect(err).toBeNull();
        Flair.findOne({
          where: {id: this.flair.id}
       })
       .then((flair) => {
         expect(flair.title).toBe("Snowman Building Competition");
         done();
      });
     });
    });
  );
