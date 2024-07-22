import express from "express";
import {
  CreateEvent,
  DeleteEvent,
  GetAdmin,
  GetEvent,
  GetEventById,
  GetRandomEvent,
  GetUserForEvent,
  LoginForAdmin,
  RegisterEvent,
  RegisterForAdmin,
} from "../controllers/userController.js";

const router = express.Router();

// đăng nhập cho admin
router.post("/login", LoginForAdmin);

router.post("/register", RegisterForAdmin);

// lấy danh sách admin
router.get("/admin", GetAdmin);

// đăng ký sự kiện cho sinh viên
router.post("/registerEvent/:id", RegisterEvent);

// phần router cho sự kiện

// thêm sự kiện
router.post("/CreateEvent", CreateEvent);
// xóa sự kiện
router.delete("/:id", DeleteEvent);

// Hiển thị danh sách sự kiện
router.get("/event", GetEvent);

// hiển thi random 1 sự kiện bất kì
router.get("/random", GetRandomEvent);

// hiển thị từng sự kiện theo tên
router.get("/:id", GetEventById);

// hiển thị danh sách đăng ký theo từng sự kiện
router.post("/DanhSach", GetUserForEvent);

export default router;
