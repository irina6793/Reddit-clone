const express = require("express");
const router = express.Router();

const advertisementController = require("../controllers/advertisementController")

router.get("/advertisement", advertisementController.index);
router.post('/advertisement/create', advertisementController.create)
router.put('/advertisement/:id/update', advertisementController.update)

module.exports = router;
