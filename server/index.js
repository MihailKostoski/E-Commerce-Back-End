const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userR = require("./routes/user.js");
const authR = require("./routes/auth.js");
const porducts = require("./routes/product.js");

const order = require("./routes/order.js");
const stripe = require("./routes/stripe.js");
const cors = require("cors");
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("dB connection sucessfull"))
  .catch((err) => console.log(err));
app.use(cors());
app.use(express.json());
app.use("/fine/users", userR);
app.use("/fine/orders", order);

app.use("/fine/auth", authR);
app.use("/fine/products", porducts);
app.use("/fine/checkout", stripe);
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is runing");
});
