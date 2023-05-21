const router = require("express").Router();
const Order = require("../models/Order");
const { verifyTokenAndAdmin, verifyTokenAndAuth } = require("./verifyToken");

router.post("/", verifyTokenAndAuth, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    s;
    res.status(500).json(error);
  }
});

router.delete("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const Order = await Order.findByIdAndDelete(req.params.id);

    res.status(200).json("Order has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});
router.delete("/deleteAll", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.deleteMany();

    res.status(200).json("All orders have been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/find/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const orders = await Order.find({ orderId: req.params.id });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(ersror);
  }
});

module.exports = router;
