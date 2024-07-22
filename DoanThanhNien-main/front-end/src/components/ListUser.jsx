import React, { useState, useMemo, useEffect } from "react";
import Table from "../components/Table";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "../styles/quanly.css";

export default function List({ openList, onCloseList, ten }) {
  const [rowId, setRowId] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        TenSukienDangKy: ten,
      };
      const res = await axios.post(
        "http://localhost:8800/api/user/DanhSach",
        data
      );
      setData(res.data);
    };

    fetchData();
  }, []);
  // state columns of table
  const columns = useMemo(
    () => [
      {
        field: "HoTen",
        headerName: "Họ và tên",
        width: 200,
        editable: true,
      },
      {
        field: "MSSV",
        headerName: "MSSV",
        width: 120,
        editable: true,
      },
      {
        field: "Lop",
        headerName: "Lớp",
        width: 150,
        editable: true,
      },
      {
        field: "Khoa",
        headerName: "Khoa",
        width: 150,
        editable: true,
      },
      {
        field: "Email",
        headerName: "Email",
        width: 200,
        editable: true,
      },
    ],
    [rowId]
  );

  return (
    openList && (
      <div className="overlay">
        <div className="modalContainer">
          <p className="closeBtn" onClick={onCloseList}>
            <IoIosCloseCircleOutline />
          </p>
          <div className="form-list">
            <span> Danh sách sinh viên đã đăng kí tham gia sự kiện</span>
            <h4> {ten} </h4>
            <Table
              title={"Manager Category"}
              column={columns}
              row={data}
              rowId={rowId}
              setRowId={setRowId}
            />
          </div>

          {/* phần này hiển thị bản danh sách các sự kiện  */}
        </div>
      </div>
    )
  );
}
