import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormDangKi({ open, onClose, name, id }) {
  // khai báo biến input
  const [inputField, setInputField] = useState({
    HoTen: "",
    Lop: "",
    Khoa: "",
    Email: "",
    MSSV: "",
    TenSukienDangKy: "",
  });
  // khai báo biến check lỗi
  const [errField, setErrField] = useState({
    HoTenErr: "",
    LopErr: "",
    KhoaErr: "",
    EmailErr: "",
    MSSVErr: "",
  });

  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
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
      });
      setInputField({
        HoTen: "",
        Lop: "",
        Khoa: "",
        Email: "",
        MSSV: "",
      });
    }, 3000);
  };
  //  check lỗi trước khi submit

  const validForm = () => {
    let formValid = true;
    setInputField({
      HoTen: "",
      Lop: "",
      Khoa: "",
      Email: "",
      MSSV: "",
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

    clearInput();
    return formValid;
  };

  // hàm submit
  const handleSubmit = async () => {
    if (validForm()) {
      const data = {
        HoTen: inputField.HoTen,
        Lop: inputField.Lop,
        Khoa: inputField.Khoa,
        Email: inputField.Email,
        MSSV: inputField.MSSV,
        TenSukienDangKy: name,
      };
      try {
        const response = await axios.post(
          "http://localhost:8800/api/user/registerEvent/" + id,
          data
        );
        if (response.status === 200) {
          toast.success(
            "Cảm ơn bạn đã đăng kí tham gia sự kiện. Chúng tôi sẽ phản hồi sớm nhất có thể!! "
          );
          setTimeout(() => {
            onClose();
          }, 4000);
        }
      } catch (error) {
        toast.error("Đăng kí thất bại ");
      }
    }
  };
  return (
    open && (
      <div className="overlay">
        <ToastContainer />
        <div className="modalContainer form-dangki">
          <p className="closeBtn" onClick={onClose}>
            <IoIosCloseCircleOutline />
          </p>
          <div className="modalInformation dangki-info">
            <h3 className="title-value"> ĐĂNG KÝ SỰ KIỆN</h3>
            <h4 className="ten-sukien"> {name}</h4>
            <div className="items-value">
              <span className="icon-value">Họ và tên:</span>
              <input
                type="text"
                className="text-value"
                placeholder="Họ và tên"
                onChange={InputHandler}
                value={inputField.HoTen}
                name="HoTen"
              />
            </div>
            {errField.HoTenErr.length > 0 && (
              <span className="error">{errField.HoTenErr} </span>
            )}
            <div className="items-value">
              <span className="icon-value">MSSV:</span>
              <input
                type="text"
                className="text-value"
                placeholder="MSSV"
                onChange={InputHandler}
                value={inputField.MSSV}
                name="MSSV"
              />
            </div>
            {errField.MSSVErr.length > 0 && (
              <span className="error">{errField.MSSVErr} </span>
            )}
            <div className="items-value">
              <span className="icon-value">Lớp:</span>
              <input
                type="text"
                className="text-value"
                placeholder="Lớp"
                onChange={InputHandler}
                value={inputField.Lop}
                name="Lop"
              />
            </div>
            {errField.LopErr.length > 0 && (
              <span className="error">{errField.LopErr} </span>
            )}
            <div className="items-value">
              <span className="icon-value">Khóa:</span>
              <input
                type="text"
                className="text-value"
                placeholder="Khóa"
                onChange={InputHandler}
                value={inputField.Khoa}
                name="Khoa"
              />
            </div>
            {errField.KhoaErr.length > 0 && (
              <span className="error">{errField.KhoaErr} </span>
            )}
            <div className="items-value">
              <span className="icon-value">Email:</span>
              <input
                type="text"
                className="text-value"
                placeholder="Email"
                onChange={InputHandler}
                value={inputField.Email}
                name="Email"
              />
            </div>
            {errField.EmailErr.length > 0 && (
              <span className="error">{errField.EmailErr} </span>
            )}
            <button className="button-dangki" onClick={handleSubmit}>
              {" "}
              ĐĂNG KÝ
            </button>
          </div>
        </div>
      </div>
    )
  );
}
