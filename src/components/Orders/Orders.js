import React from "react";
import "./Orders.css";
import Order from "../Order/Order";

const Orders = (props) => {
  const orderElements = props.orders.map((order) => (
    <Order
      name={order.name}
      ingredients={order.ingredients}
      id={order.id}
      key={order.id}
    />
  ));

  return (
    <div className="order-container">
    {orderElements}
    </div>
  )
};

export default Orders;
