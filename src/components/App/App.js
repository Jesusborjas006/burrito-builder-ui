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

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm />
      </header>

      <Orders orders={orders} />
    </main>
  );
};

//   componentDidMount() {
//     getOrders()
//       .catch(err => console.error('Error fetching:', err));
//   }

export default App;
