import { User, Dangky, SuKien } from "../models/userModel.js";

// đăng nhập dành cho admin
// đăng nhập sử dụng MSSV và password
export const LoginForAdmin = async (req, res) => {
  try {
    const user = await User.findOne({
      MSSV: req.body.MSSV,
    });
    if (!user) {
      res.status(400).json("Mã số sinh viên sai!");
    }
    if (req.body.password === user.password) {
      res.status(200).json("Đăng nhập thành công!");
    }
  } catch (error) {
    res.status(500).json("Đăng nhập không thành công!");
  }
};

// đăng ký làm quản lý
export const RegisterForAdmin = async (req, res) => {
  try {
    const data = new User({
      HoTen: req.body.HoTen,
      Lop: req.body.Lop,
      Khoa: req.body.Khoa,
      Email: req.body.Email,
      MSSV: req.body.MSSV,
      password: req.body.password,
    });
    const save = await data.save();
    res.status(200).json(save);
  } catch (error) {
    res.status(500).json("Đăng ký không thành công!");
  }
};

//  lấy danh sách các admin hiện có
export const GetAdmin = async (req, res) => {
  try {
    const admin = await User.find();
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json("Lấy danh sách không thành công!");
  }
};

// đăng ký sự kiện dành cho sinh viên
// sự kiện sẽ được check theo số lượng . nếu số lượng đăng ký còn không sự kiện sẽ không được đăng ký thêm nữa.
export const RegisterEvent = async (req, res) => {
  try {
    const event = await SuKien.findById({ _id: req.params.id });
    if (event.SoLuong === 0) {
      res.status(500).json("Sự kiện đã dủ người tham gia");
    } else {
      const update = await SuKien.findByIdAndUpdate(
        { _id: req.params.id },
        { $inc: { SoLuong: -1 } },
        {
          new: true,
        }
      );
      const input = req.body;
      const newRegister = new Dangky({
        HoTen: input.HoTen,
        Lop: input.Lop,
        Email: input.Email,
        Khoa: input.Khoa,
        MSSV: input.MSSV,
        TenSukienDangKy: input.TenSukienDangKy,
      });
      const save = await newRegister.save();
      res.status(200).json(save);
    }
  } catch (error) {
    res.status(500).json("Đăng ký không thành công");
  }
};

// tạo thêm sự hiện của admin

export const CreateEvent = async (req, res) => {
  const input = req.body;

  try {
    const newEvent = new SuKien({
      TenSuKien: input.TenSuKien,
      SoLuongBanDau: input.SoLuong,
      SoLuong: input.SoLuong,
      NgayDienRa: input.NgayDienRa,
      Mota: input.Mota,
      Diadiem: input.Diadiem,
      HinhAnh: input.HinhAnh,
    });
    const save = await newEvent.save();
    res.status(200).json(save);
  } catch (error) {
    res.status(500).json("Tạo sự kiện không thành công");
  }
};

// xóa sự kiện đang có trong danh sách
export const DeleteEvent = async (req, res) => {
  const TenSukienDangKy = req.body.TenSukienDangKy;
  try {
    try {
      await Dangky.deleteMany(TenSukienDangKy);
    } catch (error) {
      res.status(500).json("Xóa danh sachssự kiện không thành công");
    }
    await SuKien.findByIdAndDelete(req.params.id);
    res.status(200).json("Xóa sự kiện thành công");
  } catch (error) {
    res.status(500).json("Xóa sự kiện không thành công");
  }
};

// hiển thị danh sách sự kiện đã được tạo
export const GetEvent = async (req, res) => {
  try {
    const event = await SuKien.find().sort({ createdAt: -1 });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json("Hiển thị sự kiện không thành công");
  }
};

// hiển thị sự kiện theo tên sự kiện
export const GetEventById = async (req, res) => {
  try {
    const event = await SuKien.findById(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json("Hiển thị sự kiện không thành công");
  }
};

//lấy 1 sự kiện bất kì trong danh sách sự kiện
export const GetRandomEvent = async (req, res) => {
  try {
    const event = await SuKien.find().limit(1);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json("Hiển thị sự kiện không thành công");
  }
};

// hiển thị danh sách sinh viên theo từng sự kiện
export const GetUserForEvent = async (req, res) => {
  try {
    const user = await Dangky.find({
      TenSukienDangKy: req.body.TenSukienDangKy,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Hiển thị danh sách sinh viên không thành công");
  }
};
