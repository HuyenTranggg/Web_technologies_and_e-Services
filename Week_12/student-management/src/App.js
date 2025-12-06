// ===== TRANG CHỦ - QUẢN LÝ HỌC SINH =====
// Bài 1: Hiển thị danh sách học sinh
// Bài 2: Thêm học sinh mới
// Bài 3: Chỉnh sửa thông tin học sinh (routing đến trang Edit)
// Bài 4: Xóa học sinh
// Bài 5: Tìm kiếm học sinh theo tên
// Bài 6: Sắp xếp danh sách học sinh theo tên

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  // ===== BÀI 1: State lưu danh sách học sinh =====
  const [students, setStudents] = useState([]);

  // ===== BÀI 2: State quản lý form thêm học sinh =====
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");

  // ===== BÀI 5: State quản lý tìm kiếm =====
  const [searchTerm, setSearchTerm] = useState("");

  // ===== BÀI 6: State quản lý sắp xếp =====
  const [sortAsc, setSortAsc] = useState(true);

  // Hook điều hướng cho Bài 3
  const navigate = useNavigate();

  // ===== BÀI 1: Lấy danh sách học sinh khi component load =====
  useEffect(() => {
    fetchStudents();
  }, []);

  // Hàm fetch danh sách học sinh
  const fetchStudents = () => {
    axios.get('http://localhost:5000/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error("Lỗi khi fetch danh sách:", error));
  };

  // ===== BÀI 2: Hàm xử lý thêm học sinh mới =====
  const handleAddStudent = (e) => {
    e.preventDefault();
    const newStu = { name, age: Number(age), class: stuClass };
    
    axios.post('http://localhost:5000/api/students', newStu)
      .then(res => {
        console.log("Đã thêm:", res.data);
        // Cập nhật state students để hiển thị luôn học sinh mới
        setStudents(prev => [...prev, res.data]);
        // Xóa nội dung form sau khi thêm thành công
        setName("");
        setAge("");
        setStuClass("");
        alert("Thêm học sinh thành công!");
      })
      .catch(err => console.error("Lỗi khi thêm:", err));
  };

  // ===== BÀI 4: Hàm xử lý xóa học sinh =====
  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa học sinh này?")) return;
    
    axios.delete(`http://localhost:5000/api/students/${id}`)
      .then(res => {
        console.log(res.data.message);
        // Cập nhật danh sách bằng cách loại bỏ học sinh vừa xóa
        setStudents(prevList => prevList.filter(s => s._id !== id));
        alert("Đã xóa học sinh thành công!");
      })
      .catch(err => console.error("Lỗi khi xóa:", err));
  };

  // ===== BÀI 5: Lọc danh sách học sinh theo tên (tìm kiếm) =====
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===== BÀI 6: Sắp xếp danh sách học sinh theo tên =====
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (a.name < b.name) return sortAsc ? -1 : 1;
    if (a.name > b.name) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <div className="App">
      <div className="container">
        <h1>Quản lý Học sinh</h1>

        {/* ===== BÀI 2: FORM THÊM HỌC SINH MỚI ===== */}
        <div className="add-student-section">
          <h2>Thêm học sinh mới</h2>
          <form onSubmit={handleAddStudent} className="student-form">
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Họ tên" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="number" 
                placeholder="Tuổi" 
                value={age} 
                onChange={e => setAge(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Lớp" 
                value={stuClass} 
                onChange={e => setStuClass(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn-add">Thêm học sinh</button>
          </form>
        </div>

        {/* ===== BÀI 5: Ô TÌM KIẾM ===== */}
        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm theo tên..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* ===== BÀI 6: NÚT SẮP XẾP ===== */}
        <div className="sort-section">
          <button 
            className="btn-sort" 
            onClick={() => setSortAsc(prev => !prev)}
          >
            Sắp xếp theo tên: {sortAsc ? 'A → Z' : 'Z → A'}
          </button>
        </div>

        {/* ===== BÀI 1: HIỂN THỊ DANH SÁCH HỌC SINH ===== */}
        <h2>Danh sách học sinh</h2>
        {sortedStudents.length === 0 ? (
          <p className="no-data">
            {searchTerm ? "Không tìm thấy học sinh nào" : "Chưa có học sinh nào"}
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>Tuổi</th>
                <th>Lớp</th>
                {/* ===== BÀI 3 & 4: CỘT HÀNH ĐỘNG (Sửa/Xóa) ===== */}
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.class}</td>
                  <td>
                    {/* ===== BÀI 3: NÚT SỬA - Chuyển đến trang chỉnh sửa ===== */}
                    <button 
                      className="btn-edit" 
                      onClick={() => navigate(`/edit/${student._id}`)}
                    >
                      Sửa
                    </button>
                    {/* ===== BÀI 4: NÚT XÓA ===== */}
                    <button 
                      className="btn-delete" 
                      onClick={() => handleDelete(student._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
