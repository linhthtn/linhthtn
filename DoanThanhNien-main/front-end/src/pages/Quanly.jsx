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

export default function Quanly() {
  const [rowId, setRowId] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/api/user/event");
      setData(res.data);
    };

    fetchData();
  }, []);

  // xóa sự kiện
  const Delete = ({ params }) => {
    const handleDelete = async () => {
      const data = params.row._id;
      const TenSuKien = params.row.TenSuKien;
      const response = await axios.delete(
        "http://localhost:8800/api/user/" + data,
        TenSuKien
      );

      const res = await axios.get("http://localhost:8800/api/user/event");
      setData(res.data);

      const record = response.status;
      if (record === 200) {
        toast.success("Xóa sự kiện thành công!!");
      } else {
        toast.error("Xóa sự kiện thất bại!!");
      }
    };
    return (
      <div className="delete">
        <button
          className="button-delete"
          onClick={() => {
            if (window.confirm("Bạn có chắc chắn xóa sự kiện này không?"))
              handleDelete();
          }}
        >
          <MdDeleteOutline className="icon-delete" />
        </button>
      </div>
    );
  };

  const ViewUser = ({ params }) => {
    return (
      <div className="save">
        <button
          className="button-save"
          onClick={() => {
            setOpenList(true);
            setName(params.row.TenSuKien);
          }}
        >
          <MdViewHeadline className="icon-save" />
        </button>
      </div>
    );
  };

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

      {
        field: "delete",
        width: 80,
        headerName: "Xóa",
        type: "actions",
        renderCell: (params) => <Delete {...{ params, rowId, setRowId }} />,
        editable: true,
      },
      {
        field: "view",
        width: 80,
        headerName: "Danh sách",
        type: "actions",
        renderCell: (params) => <ViewUser {...{ params, rowId, setRowId }} />,
        editable: true,
      },
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
          <span>Quản lý sự kiện </span>
          <button
            onClick={() => {
              setOpen(true);
            }}
          >
            Thêm sự kiện
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
}
