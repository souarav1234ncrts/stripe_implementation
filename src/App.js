import logo from "./logo.svg";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";

function App() {
  const [product, setProduct] = useState({
    name: "React",
    price: 10,
    productBy: "facebook",
  });
  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const header = {
      "Content-Type": "application/json",
    };
    return fetch(`http://localhost:8000/payment`, {
      method: "POST",
      header,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log(status);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      <StripeCheckout
        stripeKey="pk_test_51IYoBoSCI4Ihx8dDZfnPwk50jXvwaH7kFY8wG5ciWijRC9OnaG2HtzHdPF2Ds5SM1JLJfPJb1ltuKPw8D9byPqPu00ygf9KgQc"
        token={makePayment}
        name="Buy React"
        amount={product.price * 100}
      >
        <button className="btn-large pink">Buy react {product.price}</button>
      </StripeCheckout>
    </div>
  );
}

export default App;
