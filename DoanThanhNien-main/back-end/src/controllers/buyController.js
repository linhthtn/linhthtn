import { HoaDon, SanPham } from "../models/userModel.js";

//thêm sản phẩm
export const ThemSanPham = async (req, res) => {
  const input = req.body;
  try {
    const newProduct = new SanPham({
      Ten: input.Ten,
      Gia: input.Gia,
      SoluongBanDau: input.SoluongBanDau,
      Soluong: input.Soluong,
      HinhAnh: input.HinhAnh,
    });
    const save = await newProduct.save();
    req.status(200).json(save);
  } catch (error) {
    res.status(404).json("Không thể thêm sản phẩm");
  }
};

// cập nhật sản phẩm
export const CapNhatSanPham = async (req, res) => {
  try {
    const update = await SanPham.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(update);
  } catch (error) {
    res.status(404).json("Không thể cập nhật sản phẩm");
  }
};

// xóa sản phẩm
export const XoaSanPham = async (req, res) => {
  try {
    const del = await SanPham.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(del);
  } catch (error) {
    res.status(404).json("Không thể xóa sản phẩm");
  }
};

// lấy danh sách 1 sản phẩm
export const Lay1SanPham = async (req, res) => {
  try {
    const product = await SanPham.findById({ _id: req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json("Hiển thị sản phẩm không thành công");
  }
};

// lấy danh sách tất cả sản phẩm
export const LayTatCaSanPham = async (req, res) => {
  try {
    const product = await SanPham.find().sort({ createdAt: -1 });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json("Hiển thị sản phẩm không thành công");
  }
};

// đăng kí mua sản phẩm
export const MuaSanPham = async (req, res) => {
  try {
    const product = await SanPham.findById({ _id: req.params.id });
    if (product.Soluong === 0) {
      res.status(500).json("Sản phẩm đã bán hết");
    } else {
      const update = await SanPham.findByIdAndUpdate(
        { _id: req.params.id },
        { $inc: { Soluong: -1 } },
        {
          new: true,
        }
      );
      const input = req.body;
      const newHoaDon = new HoaDon({
        HoTen: input.HoTen,
        Lop: input.Lop,
        Email: input.Email,
        Khoa: input.Khoa,
        MSSV: input.MSSV,
        TenSanPham: input.TenSanPham,
        Soluong: input.Soluong,
      });
      const save = await newHoaDon.save();
      res.status(200).json(save);
    }
  } catch (error) {
    res.status(500).json("Mua sản phẩm không thành công");
  }
};
