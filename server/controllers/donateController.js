const stripe = require("stripe")("sk_test_ADXSG8jzyjP9QjSMl1JaeU0s00TdVIFC2D");

module.exports = {
  getToken: (req, res, next) => {
    const { stripeToken, amount } = req.body;
    let newAmount = amount * 100;
    stripe.charges.create(
      {
        amount: newAmount,
        currency: "usd",
        description: "Example Charge",
        source: stripeToken
      },
      function(err, charge) {
        if (err) {
          res.send({
            success: false,
            message: "Error"
          });
        } else {
          res.send({
            success: true,
            message: "Success"
          });
        }
      }
    );
  }
};
