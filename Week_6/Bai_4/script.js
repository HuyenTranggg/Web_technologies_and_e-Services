// Đảm bảo mã JavaScript chỉ chạy sau khi toàn bộ tài liệu HTML đã được tải xong
document.addEventListener('DOMContentLoaded', function () {

    // Lấy các phần tử HTML cần thiết
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductSection = document.getElementById('addProductForm'); // Đây là thẻ <section>
    const productForm = document.getElementById('productForm'); // Đây là thẻ <form> bên trong
    const cancelBtn = document.getElementById('cancelBtn');
    const productList = document.getElementById('product-list');
    const errorMsg = document.getElementById('errorMsg');

    // Xử lý sự kiện tìm kiếm sản phẩm
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        // Luôn gọi querySelectorAll ở đây để lấy danh sách sản phẩm MỚI NHẤT
        const allProducts = productList.querySelectorAll('.product-item');

        allProducts.forEach(function(product) {
            const productName = product.querySelector('.product-name').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });
    }

    searchBtn.addEventListener('click', filterProducts);
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            filterProducts();
        }
    });

    // Xử lý ẩn/hiện form và reset
    // Hàm đóng và reset form
    function hideAndResetForm() {
        addProductSection.classList.add('hidden'); // Ẩn section chứa form
        productForm.reset(); // Xóa nội dung các ô input
        errorMsg.textContent = ''; // Xóa thông báo lỗi
        addProductBtn.textContent = 'Thêm sản phẩm'; // Đặt lại tên nút chính
    }

    // Sự kiện click nút "Thêm sản phẩm"
    addProductBtn.addEventListener('click', function() {
        addProductSection.classList.toggle('hidden');
        if (addProductSection.classList.contains('hidden')) {
            addProductBtn.textContent = 'Thêm sản phẩm';
        } else {
            addProductBtn.textContent = 'Đóng Form';
        }
    });
    
    // Sự kiện click nút "Hủy"
    cancelBtn.addEventListener('click', hideAndResetForm);


    // Xử lý sự kiện SUBMIT form để thêm sản phẩm mới
    productForm.addEventListener('submit', function(event) {
        // Ngăn chặn hành vi mặc định của form (tải lại trang)
        event.preventDefault();

        // Lấy giá trị từ các ô input và loại bỏ khoảng trắng thừa
        const name = document.getElementById('newProductName').value.trim();
        const description = document.getElementById('newProductDescription').value.trim();
        const price = document.getElementById('newProductPrice').value.trim();
        let imageUrl = document.getElementById('newProductImage').value.trim();

        // VALIDATION DỮ LIỆU
        if (!name) {
            errorMsg.textContent = 'Tên sản phẩm không được để trống.';
            return; // Dừng hàm
        }

        if (!price || isNaN(price) || Number(price) <= 0) {
            errorMsg.textContent = 'Vui lòng nhập một mức giá hợp lệ (số lớn hơn 0).';
            return; // Dừng hàm
        }

        // Nếu tất cả hợp lệ, xóa thông báo lỗi
        errorMsg.textContent = '';

        // TẠO PHẦN TỬ HTML MỚI
        
        // Nếu không có URL hình ảnh, dùng một ảnh placeholder
        if (!imageUrl) {
            imageUrl = 'https://via.placeholder.com/150?text=No+Image';
        }

        // Tạo phần tử article chứa sản phẩm
        const newProductElement = document.createElement('article');
        newProductElement.className = 'product-item';

        // Dùng template string để tạo nội dung HTML bên trong
        newProductElement.innerHTML = `
            <h3 class="product-name">${name}</h3>
            <p class="product-description">${description}</p>
            <p class="product-price">Giá: ${Number(price).toLocaleString('vi-VN')}₫</p>
            <img src="${imageUrl}" alt="${name}">
        `;

        // THÊM SẢN PHẨM MỚI VÀO DANH SÁCH
        productList.prepend(newProductElement); // Thêm vào đầu danh sách

        // ĐÓNG VÀ RESET FORM SAU KHI THÊM THÀNH CÔNG
        hideAndResetForm();
    });

});
