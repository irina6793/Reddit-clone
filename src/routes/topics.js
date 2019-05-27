const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topicController");
const validation = require("./validation");

router.get("/topics", topicController.index);
router.get("/topics/new", topicController.new);
router.post("/topics/create", validation.validateTopic, topicController.create);
router.get("/topics/:id", topicController.show);
router.get("/topics/:id/edit", topicController.edit);
router.post(
  "/topics/:id/update",
  validation.validateTopic,
  topicController.update
);
router.post("/topics/:id/destroy", topicController.destroy);

module.exports = router;
