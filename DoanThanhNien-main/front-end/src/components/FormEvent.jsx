import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormEvents({ open, onClose }) {
  const [files, setFiles] = useState("");
  // khai báo biến input
  const [inputField, setInputField] = useState({
    TenSuKien: "",
    SoLuong: "",
    NgayDienRa: "",
    Mota: "",
    Diadiem: "",
  });
  // khai báo biến check lỗi
  const [errField, setErrField] = useState({
    TenSuKienErr: "",
    SoLuongErr: "",
    NgayDienRaErr: "",
    MotaErr: "",
    DiadiemErr: "",
    HinhanhErr: "",
  });

  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  // xóa lỗi sau khi hiển thị
  const clearInput = () => {
    setTimeout(() => {
      setErrField({
        TenSuKienErr: "",
        SoLuongErr: "",
        NgayDienRaErr: "",
        MotaErr: "",
        DiadiemErr: "",
        HinhanhErr: "",
      });
      setInputField({
        TenSuKien: "",
        SoLuong: "",
        NgayDienRa: "",
        Mota: "",
        Diadiem: "",
      });
    }, 3000);
  };
  //  check lỗi trước khi submit

  const validForm = () => {
    let formValid = true;
    setInputField({
      TenSuKien: "",
      SoLuong: "",
      NgayDienRa: "",
      Mota: "",
      Diadiem: "",
    });
    if (inputField.TenSuKien === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        TenSuKienErr: "Bạn chưa nhập tên sự kiện!!",
      }));
    }
    if (inputField.SoLuong === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        SoLuongErr: "Bạn chưa nhập sô lượng!!",
      }));
    }
    if (inputField.NgayDienRa === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        NgayDienRaErr: "Bạn chưa nhập ngày diễn ra !!",
      }));
    }
    if (inputField.Mota === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        MotaErr: "Bạn chưa nhập mô tả sự kiện !!",
      }));
    }

    if (inputField.Diadiem === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        DiadiemErr: "Bạn chưa nhập địa điểm diễn ra!!",
      }));
    }
    if (files === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        HinhanhErr: "Bạn chưa chọn hình ảnh cho sự kiện!!",
      }));
    }

    clearInput();
    return formValid;
  };

  // hàm submit
  const handleSubmit = async () => {
    const list = await Promise.all(
      Object.values(files).map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "social0722");
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/johnle/image/upload",
          data
        );
        const { url } = uploadRes.data;
        return url;
      })
    );

    if (validForm()) {
      const data = {
        TenSuKien: inputField.TenSuKien,
        SoLuongBanDau: inputField.SoLuong,
        SoLuong: inputField.SoLuong,
        NgayDienRa: inputField.NgayDienRa,
        Mota: inputField.Mota,
        Diadiem: inputField.Diadiem,
        HinhAnh: list,
      };
      try {
        const response = await axios.post(
          "http://localhost:8800/api/user/CreateEvent",
          data
        );
        if (response.status === 200) {
          toast.success("Bạn đã thêm sự kiện thành công ");
          setTimeout(() => {
            onClose();
          }, 4000);
        }
      } catch (error) {
        toast.error("Thêm sự kiện thất bại");
      }
    }
  };
  return (
    open && (
      <div className="overlay">
        <ToastContainer />
        <div className="modalContainer">
          <p className="closeBtn" onClick={onClose}>
            <IoIosCloseCircleOutline />
          </p>
          <div className="modalInformation">
            <h3 className="title-value"> THÊM SỰ KIỆN</h3>

            <div className="items-value">
              <span className="icon-value">Tên sự kiện:</span>
              <input
                type="text"
                className="text-value"
                placeholder="Tên sự kiện"
                onChange={InputHandler}
                value={inputField.TenSuKien}
                name="TenSuKien"
              />
            </div>
            {errField.TenSuKienErr.length > 0 && (
              <span className="error">{errField.TenSuKienErr} </span>
            )}
            <div className="items-value">
              <span className="icon-value">Số lượng:</span>
              <input
                type="number"
                className="text-value"
                placeholder="Số lượng"
                onChange={InputHandler}
                value={inputField.SoLuong}
                name="SoLuong"
              />
            </div>
            {errField.SoLuongErr.length > 0 && (
              <span className="error">{errField.SoLuongErr} </span>
            )}
            <div className="items-value">
              <span className="icon-value">Ngày diễn ra :</span>
              <input
                type="date"
                className="text-value"
                placeholder="Ngày diễn ra"
                onChange={InputHandler}
                value={inputField.NgayDienRa}
                name="NgayDienRa"
              />
            </div>
            {errField.NgayDienRaErr.length > 0 && (
              <span className="error">{errField.NgayDienRaErr} </span>
            )}
            <div className="items-value">
              <span className="icon-value">Mô tả:</span>
              <textarea
                type="text"
                className="text-value"
                placeholder="Mô tả"
                onChange={InputHandler}
                value={inputField.Mota}
                name="Mota"
              />
            </div>
            {errField.MotaErr.length > 0 && (
              <span className="error">{errField.MotaErr} </span>
            )}
            <div className="items-value">
              <span className="icon-value">Địa điểm:</span>
              <input
                type="text"
                className="text-value"
                placeholder="Địa điểm"
                onChange={InputHandler}
                value={inputField.Diadiem}
                name="Diadiem"
              />
            </div>
            {errField.DiadiemErr.length > 0 && (
              <span className="error">{errField.DiadiemErr} </span>
            )}
          </div>
          <div className="modal-image">
            <div className="image-banner">
              <div className="btn-service">
                <label htmlFor="file" className="button-dangki margin">
                  Chọn hình
                  <input
                    type="file"
                    id="file"
                    multiple
                    style={{ display: "none" }}
                    onChange={(e) => setFiles(e.target.files)}
                  ></input>
                </label>
                <label
                  className="button-dangki delete-but"
                  onClick={() => setFiles(null)}
                >
                  Xóa
                </label>
              </div>
              {files ? (
                <img
                  src={URL.createObjectURL(files[0])}
                  alt=""
                  className="banner-image"
                />
              ) : (
                <div className="no-image-banner">
                  <span className="header-service">Hình ảnh sự kiện</span>
                  {errField.HinhanhErr.length > 0 && (
                    <span className="error">{errField.HinhanhErr} </span>
                  )}
                </div>
              )}
            </div>
            <button className="button-dangki" onClick={handleSubmit}>
              THÊM SỰ KIỆN
            </button>
          </div>
        </div>
      </div>
    )
  );
}
