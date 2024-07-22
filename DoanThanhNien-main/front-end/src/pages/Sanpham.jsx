import React, { useState, useMemo, useEffect } from "react";
import "../styles/quanly.css";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";
import FormEvents from "../components/FormEvent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDeleteOutline, MdViewHeadline } from "react-icons/md";
import { Avatar } from "@mui/material";
import ListUser from "../components/ListUser";

const Sanpham = () => {
  const [rowId, setRowId] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [name, setName] = useState("");

  // state columns of table
  const columns = useMemo(
    () => [
      {
        field: "HinhAnh",
        headerName: "Hình ảnh",
        width: 80,
        renderCell: (params) => <Avatar src={params.row.HinhAnh[0]} />,
        sortable: false,
        filterable: false,
      },
      {
        field: "TenSuKien",
        headerName: "Tên Sự Kiện",
        width: 350,
        editable: true,
      },
      {
        field: "SoLuongBanDau",
        headerName: "Số Lượng ban đầu",
        width: 100,
        editable: true,
      },
      {
        field: "SoLuong",
        headerName: "Số Lượng còn lại",
        width: 100,
        editable: true,
      },
      {
        field: "Mota",
        headerName: "Mô Tả",
        width: 80,
        editable: true,
      },
      {
        field: "Diadiem",
        headerName: "Địa điểm",
        width: 120,
        editable: true,
      },
      {
        field: "NgayDienRa",
        headerName: "Ngày diễn ra",
        width: 100,
        editable: true,
      },

      //   {
      //     field: "delete",
      //     width: 80,
      //     headerName: "Xóa",
      //     type: "actions",
      //     renderCell: (params) => <Delete {...{ params, rowId, setRowId }} />,
      //     editable: true,
      //   },
      //   {
      //     field: "view",
      //     headerName: "Danh sách",
      //     type: "actions",
      //     renderCell: (params) => <ViewUser {...{ params, rowId, setRowId }} />,
      //     editable: true,
      //   },
    ],
    [rowId]
  );
  return (
    <div className="container">
      <ToastContainer />
      <FormEvents open={open} onClose={() => setOpen(false)} />
      <Navbar />
      <ListUser
        openList={openList}
        onCloseList={() => setOpenList(false)}
        ten={name}
      />
      <div className="container-quanly">
        <div className="header-quanly">
          <span>quản lý sản phẩm</span>
          <button
            onClick={() => {
              setOpen(true);
            }}
          >
            Thêm sản phẩm
          </button>
        </div>
        <div className="main-quanly">
          <Table
            title={"Manager Category"}
            column={columns}
            row={data}
            rowId={rowId}
            setRowId={setRowId}
          />
          {/* phần này hiển thị bản danh sách các sự kiện  */}
        </div>
      </div>
    </div>
  );
};

export default Sanpham;
