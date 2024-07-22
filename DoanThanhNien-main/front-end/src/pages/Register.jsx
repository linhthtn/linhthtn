import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillPersonDashFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [inputField, setInputField] = useState({
    HoTen: "",
    Lop: "",
    Khoa: "",
    Email: "",
    MSSV: "",
    password: "",
  });

  const [errField, setErrField] = useState({
    HoTenErr: "",
    LopErr: "",
    KhoaErr: "",
    EmailErr: "",
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

  // xóa lỗi sau khi hiển thị

  const clearInput = () => {
    setTimeout(() => {
      setErrField({
        HoTenErr: "",
        LopErr: "",
        KhoaErr: "",
        EmailErr: "",
        MSSVErr: "",
        PasswordErr: "",
      });
      setInputField({
        HoTen: "",
        Lop: "",
        Khoa: "",
        Email: "",
        MSSV: "",
        password: "",
      });
    }, 3000);
  };

  // check lỗi trước khi submit
  const validForm = () => {
    let formValid = true;
    setInputField({
      HoTen: "",
      Lop: "",
      Khoa: "",
      Email: "",
      MSSV: "",
      password: "",
    });
    if (inputField.HoTen === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        HoTenErr: "Bạn chưa nhập họ và tên!!",
      }));
    }
    if (inputField.Lop === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        LopErr: "Bạn chưa nhập lớp!!",
      }));
    }
    if (inputField.Khoa === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        KhoaErr: "Bạn chưa nhập khóa !!",
      }));
    }
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputField.Email === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        EmailErr: "Bạn chưa nhập Email!!",
      }));
    } else {
      if (!inputField.Email.match(validEmail)) {
        formValid = false;
        setErrField((prevState) => ({
          ...prevState,
          EmailErr: "Hãy nhập đúng định dạng của email! ",
        }));
      }
    }

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
  const handleSubmit = async () => {
    try {
      if (validForm()) {
        const data = {
          HoTen: inputField.HoTen,
          Lop: inputField.Lop,
          Khoa: inputField.Khoa,
          Email: inputField.Email,
          MSSV: inputField.MSSV,
          password: inputField.password,
        };
        try {
          const response = await axios.post(
            "http://localhost:8800/api/user/register",
            data
          );
          if (response.status === 200) {
            toast.success(
              "Cảm ơn bạn đã đăng kí. Chúng tôi sẽ phản hồi sớm nhất có thể!! "
            );
            setTimeout(() => {
              history("/");
            }, 3000);
          }
        } catch (error) {
          toast.error("Đăng kí thất bại ");
        }
      }
    } catch {}
  };
  return (
    <div className="container">
      <ToastContainer />
      <div className="container-login">
        <div className="main-login">
          <h3> Đăng Ký Tham Gia Công tác Đoàn</h3>
          <div className="item-login">
            <span className="icon">
              <BsFillPersonDashFill />
            </span>
            <input
              type="text"
              placeholder="Họ và tên"
              onChange={InputHandler}
              value={inputField.HoTen}
              name="HoTen"
            />
          </div>
          {errField.HoTenErr.length > 0 && (
            <span className="error">{errField.HoTenErr} </span>
          )}
          <div className="item-login">
            <span className="icon">
              <BsFillPersonDashFill />
            </span>
            <input
              type="text"
              placeholder="MSSV"
              onChange={InputHandler}
              value={inputField.MSSV}
              name="MSSV"
            />
          </div>
          {errField.LopErr.length > 0 && (
            <span className="error">{errField.LopErr} </span>
          )}
          <div className="item-login">
            <span className="icon">
              <BsFillPersonDashFill />
            </span>
            <input
              type="text"
              placeholder="Lớp"
              onChange={InputHandler}
              value={inputField.Lop}
              name="Lop"
            />
          </div>
          {errField.LopErr.length > 0 && (
            <span className="error">{errField.LopErr} </span>
          )}
          <div className="item-login">
            <span className="icon">
              <BsFillPersonDashFill />
            </span>
            <input
              type="text"
              placeholder="Khóa"
              onChange={InputHandler}
              value={inputField.Khoa}
              name="Khoa"
            />
          </div>

          {errField.KhoaErr.length > 0 && (
            <span className="error">{errField.KhoaErr} </span>
          )}
          <div className="item-login">
            <span className="icon">
              <BsFillPersonDashFill />
            </span>
            <input
              type="text"
              placeholder="Email"
              onChange={InputHandler}
              value={inputField.Email}
              name="Email"
            />
          </div>
          {errField.EmailErr.length > 0 && (
            <span className="error">{errField.EmailErr} </span>
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
            <button onClick={handleSubmit}> Đăng ký</button>
            <Link to={"/"}> Trở về trang chủ </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
