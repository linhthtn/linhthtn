import express from "express";
import {
  CapNhatSanPham,
  Lay1SanPham,
  LayTatCaSanPham,
  MuaSanPham,
  ThemSanPham,
  XoaSanPham,
} from "../controllers/buyController.js";

const router = express.Router();

// Thêm sản phẩm
router.post("/", ThemSanPham);

// Cập nhật sản phẩm
router.put("/:id", CapNhatSanPham);

// Xóa sản phẩm
router.delete(":/id", XoaSanPham);

// lấy 1 sản phẩm
router.get("/:id", Lay1SanPham);

// lấy tất cả sản phẩm
router.get("/", LayTatCaSanPham);

// Đăng kí sản phẩm
router.post("/buy", MuaSanPham);

export default router;
