import React from "react";
import "./Orders.css";
import Order from "../Order/Order";

const Orders = (props) => {
  console.log(props)
  const orderElements = props.orders.map((order) => (
    <Order
      name={order.name}
      ingredients={order.ingredients}
      id={order.id}
      key={order.id}
    />
  ));

  return (
    <>
    {orderElements}
    </>
  )
};

export default Orders;
