import React from "react";

const Card = () => {
  return (
    <>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src="https://i0.wp.com/www.sinamontales.com/dotcord/uploads/2017/08/Cottage-Cheese-Skewers.jpg?fit=1200%2C1600&ssl=1"
          className="card-img-top"
          style={{ maxHeight: "220px" }}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">This is some important text</p>
          <div className="container w-100">
            <select className="m-2 h-100 bg-success rounded">
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 bg-success rounded">
              <option value="half">Half</option>
              <option value="full">Full</option>
            </select>
            <div className="d-inline">Total Price</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
