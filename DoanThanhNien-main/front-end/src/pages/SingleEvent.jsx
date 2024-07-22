import React, { useState, useEffect } from "react";
import "../styles/home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import FormDangKi from "../components/FormDangKi";
import Sidebar from "../components/Sidebar";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom";

export default function SingleEvent() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState([]);
  const [nameEvent, setNameEvent] = useState();
  const [idEvent, setIdEvent] = useState();
  const { id } = useParams();

  // hiển thị sự kiện tại trang chính
  useEffect(() => {
    const loadEvent = async () => {
      const res = await axios.get("http://localhost:8800/api/user/" + id);
      setEvent(res.data);
    };
    loadEvent();
  }, []);

  // hiển thị danh sách sự kiện đang có
  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get("http://localhost:8800/api/user/event");
      setData(res.data);
    };
    loadData();
  }, []);

  // hàm để tìm kiếm sự kiện theo từ khóa
  const handleFilter = async (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.TenSuKien.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <div className="container">
      <FormDangKi
        open={open}
        onClose={() => setOpen(false)}
        name={nameEvent}
        id={idEvent}
      />
      <Sidebar />
      <div className="main">
        <div className="left-main">
          <>
            <div className="content-left">
              <h1 className="ten-label">{event.TenSuKien} </h1>
              <div className="mota-label">{event.Mota}</div>
              <div className="time-div">
                Thời gian thực hiện : {event.NgayDienRa}
              </div>
              <div className="time-div">Địa điểm : {event.Diadiem}</div>
              <div className="time-div">Số lượng còn lại:{event.SoLuong}</div>
              <button
                className="button-dangki"
                onClick={() => {
                  setOpen(true);
                  setNameEvent(event.TenSuKien);
                  setIdEvent(id);
                }}
              >
                Đăng kí tham gia
              </button>
            </div>
            <div className="content-right">
              <img src={event.HinhAnh} alt="" />
            </div>
          </>
        </div>

        <div className="right-main">
          <div className="top-right-main">
            {/* thanh tìm kiếm */}
            <div className="header-find">
              <input
                type="text"
                placeholder="Tìm kiếm sự kiện.."
                value={wordEntered}
                onChange={handleFilter}
              />
              <span
                onClick={() => {
                  setFilteredData([]);
                  setWordEntered("");
                }}
              >
                <IoIosCloseCircleOutline />
              </span>
            </div>
            <hr
              style={{
                borderBottom: "2px solid orange",
                color: "orange",
                display: "flex",
                margin: "none",
                marginBlockStart: 0,
                marginBlockEnd: 0,
              }}
            />

            {filteredData.length !== 0 && (
              <div className="dataResult">
                {filteredData.map((value, index) => {
                  return (
                    <div className="info-customer" key={index}>
                      <Link
                        to={`/${value._id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <p className="data">{value.TenSuKien} </p>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bottom-right-main">
            {/* thông báo các sự kiện */}
            <div className="div-header">
              <span>Thông báo sự kiện</span>
            </div>
            <div className="div-sukien">
              {data.map((value, i) => {
                return (
                  <>
                    <li key={i}> {value.TenSuKien}</li>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
