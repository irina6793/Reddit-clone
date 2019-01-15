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
