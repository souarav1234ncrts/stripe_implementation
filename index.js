const cors = require("cors");
const express = require("express");
const stripe = require("stripe")(
  "sk_test_51IYoBoSCI4Ihx8dDSHTElfeM1ZEo92VvvC6fTsWjMj61b5EEq5QVm2p4sBCDyQXVL6RVjTLBKu16q9vDDtVMIi7L00q3a0H7tT"
);
const uuid = require("uuid");

const app = express();

///middleware

app.use(express.json());
app.use(cors());


app.post("/payment", (req, res) => {
    const { product, token } = req.body;
    console.log("product", product);
    console.log("price", product.price);
    const idempotencyKey = uuid()
    return stripe.customers.create({
        email: token.email,
        source:token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: product.name,
            shipping: {
                name: token.card.name,
                address: {
                    country:token.card.address_country
                }
            }
        },{idempotencyKey})
    })
        .then(result => {
        res.status(200).json(result)
    })
    
})
app.listen(8000, () => {
  console.log("app is listning on 8000");
});
