const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/marco";

describe("routes : marco", () => {

//#1
  describe("GET /", () => {

//#2
      it("should return status code 200", (done) => {

  //#3
        request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);

  //#4
          done();
    });
});

//#2
      it("polo", (done) => {

//#3
      request.get(base, (err, res, body) => {
      expect(body).toBe("polo");

//#4
      done();
    });
  });
  });
});
