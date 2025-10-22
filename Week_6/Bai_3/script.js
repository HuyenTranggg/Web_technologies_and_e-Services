// Đảm bảo mã JavaScript chỉ chạy sau khi toàn bộ tài liệu HTML đã được tải xong
document.addEventListener('DOMContentLoaded', function () {

    // Lấy các phần tử HTML cần thiết
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn'); // Lấy nút "Tìm"
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductForm = document.getElementById('addProductForm');
    const productList = document.getElementById('product-list');

    // Xử lý sự kiện tìm kiếm sản phẩm

    // Hàm lọc sản phẩm
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
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

    // Gắn sự kiện 'click' cho NÚT "TÌM"
    searchBtn.addEventListener('click', filterProducts);

    // Thêm tính năng nhấn Enter để tìm kiếm cho tiện lợi
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            filterProducts();
        }
    });


    // Xử lý sự kiện ẩn/hiện form "Thêm sản phẩm"
    addProductBtn.addEventListener('click', function() {
        addProductForm.classList.toggle('hidden');

        if (addProductForm.classList.contains('hidden')) {
            addProductBtn.textContent = 'Thêm sản phẩm';
        } else {
            addProductBtn.textContent = 'Đóng Form';
        }
    });

});
