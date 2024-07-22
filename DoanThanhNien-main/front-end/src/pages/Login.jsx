import React, { useState } from "react";
import "../styles/login.css";
import { BsFillPersonDashFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [inputField, setInputField] = useState({
    MSSV: "",
    password: "",
  });

  const [errField, setErrField] = useState({
    MSSVErr: "",
    PasswordErr: "",
  });

  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  // hiển thị mật khẩu hay ẩn đi
  const [pass, setPass] = useState(false);

  const toggleBtn = (e) => {
    e.preventDefault();
    setPass((prevState) => !prevState);
  };

  const clearInput = () => {
    setTimeout(() => {
      setErrField({
        MSSVErr: "",
        PasswordErr: "",
      });
      setInputField({
        MSSV: "",
        password: "",
      });
    }, 3000);
  };

  const validForm = () => {
    let formValid = true;
    setInputField({
      MSSV: "",
      password: "",
    });
    if (inputField.MSSV === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        MSSVErr: "Bạn chưa nhập mã số đăng nhập!!",
      }));
    }
    if (inputField.password === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        PasswordErr: "Bạn chưa nhập mật khẩu!!",
      }));
    }
    clearInput();
    return formValid;
  };

  const history = useNavigate();
  // phần hàm đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validForm()) {
      const data = {
        MSSV: inputField.MSSV,
        password: inputField.password,
      };
      try {
        const response = await axios.post(
          "http://localhost:8800/api/user/login",
          data
        );
        if (response.status === 200) {
          toast.success("Bạn đã đăng nhập thành công ");
          setTimeout(() => {
            history("/quanly");
          }, 3000);
        }
      } catch {
        toast.error("Đăng nhập thất bại");
      }
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="container-login">
        <div className="main-login">
          <h3> Đăng nhập</h3>
          <div className="item-login">
            <span className="icon">
              <BsFillPersonDashFill />
            </span>
            <input
              type="text"
              placeholder="Mã số đăng nhập"
              onChange={InputHandler}
              value={inputField.MSSV}
              name="MSSV"
            />
          </div>
          {errField.MSSVErr.length > 0 && (
            <span className="error">{errField.MSSVErr} </span>
          )}
          <div className="item-login">
            <span className="icon">
              <RiLockPasswordFill />
            </span>
            <input
              type={pass ? "text" : "password"}
              placeholder="Mật khẩu"
              onChange={InputHandler}
              value={inputField.password}
              name="password"
            />
            <button className="eye-button" onClick={toggleBtn}>
              {pass ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
          {errField.PasswordErr.length > 0 && (
            <span className="error">{errField.PasswordErr} </span>
          )}
          <div className="item-button">
            <button onClick={handleSubmit}> Đăng nhập</button>
            <Link to={"/"}> Trở về trang chủ </Link>
          </div>
          <div className="item-button">
            <Link to={"/register"}> Đăng kí làm admin</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
