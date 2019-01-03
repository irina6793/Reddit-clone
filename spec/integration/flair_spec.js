const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require("../../src/db/models").Flair;

describe("routes : flairs", () => {

  beforeEach((done) => {
    this.topic;
    this.flair;

    sequelize.sync({force: true}).then((res) => {

//#1
      Topic.create({
        name: "Winter Games Finals",
        description: "Tag your Winter Games experiences."
      })
      .then((topic) => {
        this.topic = topic;

        Flair.create({
          name: "Enjoying the snow",
          color: "Blue",
          topicId: this.topic.id
        })
        .then((flair) => {
          this.flair = flair;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  });

//  describe("GET /topics/:topicId/flairs/new", () => {
//    it("should render a new tag form", (done) => {
//      request.get(`${base}/${this.topic.id}/flairs/new`, (err, res, body) => {
//        expect(err).toBeNull();
//        expect(body).toContain("New Tag");
//        done();
//      });
//    });
//  });

  //describe("POST /topics/:topicId/flairs/create", () => {
  //   it("should create a new tag and redirect", (done) => {
  //    const options = {
  //     url: `${base}/${this.topic.id}/flairs/create`,
  //     form: {
  //       title: "The ocean view of snow",
  //       body: "The ocean seems to be covered in snow and it looks icy!"
  //   }
//   };
//     request.flair(options,
//     (err, res, body) => {

//       Flair.findOne({where: {title: "The ocean view of snow"}})
//         .then((flair) => {
//          expect(flair).not.toBeNull();
//          expect(flair.title).toBe("Watching snow melt");
//          expect(flair.body).toBe("Without a doubt its sad to see the snow melt");
//          expect(flair.topicId).not.toBeNull();
//          done();
//        })
//        .catch((err) => {
//          console.log(err);
//          done();
//         });
//        }
//      );
//    });
//   });

//   describe("GET /topics/:topicId/flairs/:id", () => {
  //     it("should render a view with the selected flair", (done) => {
  //       request.get(`${base}/${this.topic.id}/flairs/${this.flair.id}`, (err, res, body) => {
  //         expect(err).toBeNull();
  //         expect(body).toContain("Watching the snow melt");
  //         done();
  //       });
  //     });
  //   });

  // describe("GET /topics/:topicId/flairs/:id/edit", () => {
  //    it("should render a view with an edit flair form", (done) => {
  //         request.get(`${base}/${this.topic.id}/flairs/${this.flair.id}/edit`, (err, res, body) => {
  //           expect(err).toBeNull();
  //           expect(body).toContain("Edit Flair");
  //           expect(body).toContain("Watching the snow melt");
  //           done();
  //         });
  //       });
  //     });

  //describe("POST /topics/:topicId/flairs/:id/update", () => {
  //  it("should return a status code 302", (done) => {
  //    request.post({
  //      url: `${base}/${this.topic.id}/flairs/${this.flair.id}/update`,
  //      form: {
  //        title: "Snowman Building Competition",
  //        body: "I love watching them melt slowly."
  //    }
  //  }, (err, res, body) => {
  //    expect(res.statusCode).toBe(302);
  //    done();
  //   });
  //});
  //   it("should update the flair with the given values", (done) => {
  //     const options = {
  //       url: `${base}/${this.topic.id}/flairs/${this.flair.id}/update`,
  //       form: {
  //         title: "Snowman Building Competition"
  //    }
  //  };
  //  request.post(options,
  //    (err, res, body) => {
  //      expect(err).toBeNull();
  //      Post.findOne({
  //        where: {id: this.post.id}
  //     })
  //     .then((post) => {
  //       expect(post.title).toBe("Snowman Building Competition");
  //       done();
  //    });
  //   });
  //  });
  //});
  //describe("POST /topics/:topicId/flairs/:id/destroy", () => {
  //  it("should delete the post with the associated ID", (done) => {
  //    expect(this.post.id).toBe(1);
  //    request.post(`${base}/${this.topic.id}/posts/${this.post.id}/destroy`, (err, res, body) => {

//        Post.findById(1)
  //      .then((post) => {
//          expect(err).toBeNull();
//          expect(post).toBeNull();
//          done();
//        })
//      });
//    });
//  });
})
