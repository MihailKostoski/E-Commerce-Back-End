const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51N6wrtBpKW3TjKXnGpajHHRoWuI44BmQX6PiGC0sKNwKuCW8tSMgWbVKoqm8tkavVj5Wf6UNCWa7dd4EFT5MXrUS00ZRcuTeJ2"
);
// const KEY = process.env.STRIPE_KEY;

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
