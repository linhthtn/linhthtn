import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="header">
      <div className="left-header">
        <img
          src="https://rubee.com.vn/wp-content/uploads/2021/05/Logo-doan.jpg"
          alt=""
          className="logo"
        />
      </div>
      <div className="center-header">
        <Link to={"/"} style={{ textDecoration: "none", color: "blue" }}>
          ĐOÀN THANH NIÊN
        </Link>
      </div>
      <div className="right-header">
        <div className="div-button">
          <Link
            to={"/quanly"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <button className="button-navbar">Sự kiện</button>
          </Link>
          <Link
            to={"/sanpham"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <button className="button-navbar">Sản phẩm</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
