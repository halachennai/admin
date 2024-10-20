import React, { useState, useEffect } from "react";
import "./ListOrders.css";

const ListOrders = () => {
  const [allOrders, setAllOrders] = useState([]);

  const fetchOrders = async () => {
    await fetch("http://localhost:4000/allorders")
      .then((res) => res.json())
      .then((data) => {
        setAllOrders(data);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="list-orders">
      <h1>All Orders List</h1>
      <div className="listorders-format-main">
        <p>Order ID</p>
        <p>Name</p>
        <p>Address</p>
        <p>Phone Number</p>
        <p>Amount</p>
        <p>Payment Status</p>
        <p>Cart Items</p>
      </div>
      <div className="listorders-allorders">
        <hr />
        {allOrders.map((order, index) => {
          return (
            <div key={index}>
              <div className="listorders-format-main listorders-format">
                <p>{order.razorpay_order_id}</p>
                <p>{order.name}</p>
                <p>{order.address}</p>
                <p>{order.phoneNumber}</p>
                <p>Rs.{order.amount}</p>
                <p>{order.status}</p>
                <div className="cart-items">
                  {order.cartValues.map((item, idx) => (
                    <div key={idx} className="cart-item">
                      <p>
                        <strong>Product:</strong> {item.productName}
                      </p>
                      <p>
                        <strong>Price:</strong> Rs.{item.price}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <p>
                        <strong>Size:</strong> {item.size}
                      </p>
                      <p>
                        <strong>Customization:</strong> {item.customization}
                      </p>
                      <p>
                        <strong>Total Price:</strong> Rs.{item.totalPrice}
                      </p>
                      <hr />
                    </div>
                  ))}
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListOrders;
