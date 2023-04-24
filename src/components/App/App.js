import React, { useEffect, useState } from "react";
import "./App.css";
import { getOrders } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

const App = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders()
      .then((data) => {
        return setOrders(data.orders);
      })
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  const postOrder = (newOrder) => {
    fetch("http://localhost:3001/api/v1/orders", {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        return setOrders([...orders, data]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm newOrderFunc={postOrder} />
      </header>

      {!orders.length ? <p className="no-orders-text">No orders yet!</p> : <Orders orders={orders} />}
    </main>
  );
};

export default App;
