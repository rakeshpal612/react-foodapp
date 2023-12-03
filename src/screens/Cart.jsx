import React from "react";
// import Delete from "@mui/icons-material/Delete";
import { useCart, useDispatchCart } from "../components/Context";
import trash from "../trash.jpg";

const Cart = () => {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div className="w-100 m-5 text-center text-white fs-3">
        The Cart Is Empty
      </div>
    );
  }
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:5000/api/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    console.log("JSON RESPONSE:::::", response.status);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };
  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div className="container  m-auto mt-5 table-responsive table-responsive-md">
      <table className="table">
        <thead className="text-success fs-4">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Option</th>
            <th scope="col">Amount</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody className="text-white">
          {data.map((foodItem, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{foodItem.name}</td>
                <td>{foodItem.qty}</td>
                <td>{foodItem.size}</td>
                <td>{foodItem.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <img
                      style={{ width: "30px", height: "30px" }}
                      src={trash}
                      alt="delete"
                      onClick={() => dispatch({ type: "REMOVE", index: index })}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <h1 className="fs-2 text-white">Total Price: {totalPrice}/-</h1>
      </div>
      <div>
        <div
          className="btn bg-success text-white mt-5"
          onClick={handleCheckOut}
        >
          Check Out
        </div>
      </div>
    </div>
  );
};

export default Cart;
