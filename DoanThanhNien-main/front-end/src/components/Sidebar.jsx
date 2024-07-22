import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
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
          {" "}
          ĐOÀN THANH NIÊN
        </Link>
      </div>
      <div className="right-header">
        <Link to={"/login"} style={{ textDecoration: "none" }}>
          <button className="login"> Đăng nhập </button>
        </Link>
      </div>
    </div>
  );
}
