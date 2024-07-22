import mongoose from "mongoose";

const Schema = mongoose.Schema;

// csdl admin
const userSchema = new Schema(
  {
    HoTen: {
      type: String,
    },
    Lop: {
      type: String,
    },
    Khoa: {
      type: String,
    },
    Email: {
      type: String,
    },
    MSSV: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

// csdl sinh viên đăng kí
const DangKySchema = new Schema(
  {
    HoTen: {
      type: String,
    },
    Lop: {
      type: String,
    },
    Khoa: { type: String },

    Email: {
      type: String,
    },
    MSSV: {
      type: String,
    },
    TenSukienDangKy: {
      type: String,
    },
  },
  { timestamps: true }
);

// csdl sự kiện
const SuKienSchema = new Schema(
  {
    TenSuKien: {
      type: String,
    },
    SoLuongBanDau: {
      type: Number,
    },
    SoLuong: {
      type: Number,
    },
    Mota: {
      type: String,
    },
    HinhAnh: {
      type: [String],
    },
    Diadiem: {
      type: String,
    },
    NgayDienRa: {
      type: String,
    },
  },
  { timestamps: true }
);

// csdl sản phẩm
const SanPhamSchema = new Schema(
  {
    Ten: {
      type: String,
    },
    Gia: {
      type: Number,
    },
    SoluongBanDau: {
      type: Number,
    },
    Soluong: {
      type: Number,
    },
    HinhAnh: {
      type: Number,
    },
  },
  { timestamps: true }
);

// csdl đăng kí mua
const MuaSchema = new Schema(
  {
    HoTen: {
      type: String,
    },
    Lop: {
      type: String,
    },
    Khoa: { type: String },

    Email: {
      type: String,
    },
    MSSV: {
      type: String,
    },
    TenSanPham: {
      type: String,
    },
    Soluong: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Dangky = mongoose.model("DangKy", DangKySchema);
const SuKien = mongoose.model("Sukien", SuKienSchema);
const SanPham = mongoose.model("San Pham", SanPhamSchema);
const HoaDon = mongoose.model("Hoa Don", MuaSchema);
export { User, Dangky, SuKien, SanPham, HoaDon };
