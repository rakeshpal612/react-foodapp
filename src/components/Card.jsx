import React, { useState, useRef, useEffect } from "react";
import { useDispatchCart } from "./Context";
import { useCart } from "./Context";

const Card = (props) => {
  let dispatch = useDispatchCart();
  let data = useCart();
  // const { name, img, options } = filterItem;
  let option = props.foodOption;
  let optionKey = Object.keys(option);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  // calling handleCart function
  const handleCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          price: finalPrice,
          id: props.foodItem._id,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.foodItem.img,
        });
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.foodItem.img,
    });
    console.log(data);
  };

  let finalPrice = qty * parseInt(option[size]);
  return (
    <>
      <div className="card mt-3" style={{ width: "17rem", maxHeight: "360px" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          style={{ height: "180px" }}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          {/* <p className="card-text">This is some important text</p> */}
          <div className="w-100">
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {optionKey.map((keyData) => {
                return (
                  <option key={keyData} value={keyData}>
                    {keyData}
                  </option>
                );
              })}
            </select>
            <div className="d-inline">&#8377;{finalPrice}/-</div>
          </div>
          <hr />
          <button
            className="btn btn-success justify-center ms-2"
            onClick={handleCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
