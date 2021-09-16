const express = require("express");

const router = express.Router();

const controllerOrders = require("../controller/Orders");
const upload = require("../config/upload");

router.post(
  "/project/create/publication",
  upload.single("uploads"),
  controllerOrders.create
);
router.get("/orders", controllerOrders.getAll);
router.get("/order/:id", controllerOrders.getById);
router.get("/myOrders", controllerOrders.getMyAll);
router.delete("/orders/:id", controllerOrders.remove);

module.exports = router;
