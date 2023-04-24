import React, { useEffect, useState } from "react";
import "./App.css";
import { getOrders } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

const App = () => {
  const [orders, setOrders] = useState([]);
  console.log(orders);

  useEffect(() => {
    getOrders()
      .then((data) => {
        console.log(data);
        return setOrders(data.orders);
      })
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  const addNewOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm newOrderFunc={addNewOrder} />
      </header>

      {!orders.length ? <p>No orders yet!</p> : <Orders orders={orders} />}
    </main>
  );
};

export default App;
