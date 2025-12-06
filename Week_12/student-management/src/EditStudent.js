// ===== BÀI 3: COMPONENT CHỈNH SỬA HỌC SINH =====
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

function EditStudent() {
  // Lấy ID học sinh từ URL params
  const { id } = useParams();
  const navigate = useNavigate();

  // State quản lý dữ liệu form
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [stuClass, setStuClass] = useState('');

  // Bước 2 (Bài 3): Lấy thông tin học sinh hiện tại khi component load
  useEffect(() => {
    axios.get(`http://localhost:5000/api/students/${id}`)
      .then(res => {
        setName(res.data.name);
        setAge(res.data.age);
        setStuClass(res.data.class);
      })
      .catch(err => console.error("Lỗi khi lấy thông tin học sinh:", err));
  }, [id]);

  // Bước 3 (Bài 3): Hàm xử lý cập nhật thông tin học sinh
  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/students/${id}`, {
      name,
      age: Number(age),
      class: stuClass
    })
      .then(res => {
        console.log("Đã cập nhật:", res.data);
        alert("Cập nhật học sinh thành công!");
        // Quay về trang chủ sau khi cập nhật
        navigate("/");
      })
      .catch(err => console.error("Lỗi khi cập nhật:", err));
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Chỉnh sửa thông tin học sinh</h1>
        
        <form onSubmit={handleUpdate} className="student-form">
          <div className="form-group">
            <label htmlFor="name">Họ tên:</label>
            <input 
              type="text" 
              id="name"
              placeholder="Họ tên" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Tuổi:</label>
            <input 
              type="number" 
              id="age"
              placeholder="Tuổi" 
              value={age} 
              onChange={e => setAge(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="class">Lớp:</label>
            <input 
              type="text" 
              id="class"
              placeholder="Lớp" 
              value={stuClass} 
              onChange={e => setStuClass(e.target.value)} 
              required 
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-save">Cập nhật</button>
            <button 
              type="button" 
              className="btn-cancel" 
              onClick={() => navigate("/")}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;
