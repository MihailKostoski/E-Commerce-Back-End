const { timeStamp } = require("console");
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    img: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Array },
    size: { type: String },
    sizeAvilable: { type: Array },
    color: { type: String },
    colorsAvilable: { type: Array },
    price: { type: Number, required: true },

    quantity: { type: Number, required: true },

    ratings: { type: Number },
    // totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
