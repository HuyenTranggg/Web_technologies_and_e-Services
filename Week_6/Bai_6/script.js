document.addEventListener('DOMContentLoaded', function () {

    // Lấy các phần tử DOM cần thiết
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductSection = document.getElementById('addProductForm');
    const productForm = document.getElementById('productForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const productList = document.getElementById('product-list');
    const errorMsg = document.getElementById('errorMsg');

    // Quản lý dữ liệu sản phẩm
    let products = [];

    function saveProductsToLocalStorage() {
        localStorage.setItem('products', JSON.stringify(products));
    }

    function renderProducts() {
        productList.innerHTML = '';
        products.forEach(product => {
            let imageUrl = product.imageUrl || 'https://via.placeholder.com/150?text=No+Image';
            const productElement = document.createElement('article');
            productElement.className = 'product-item';
            productElement.innerHTML = `
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">Giá: ${product.price.toLocaleString('vi-VN')}₫</p>
                <img src="${imageUrl}" alt="${product.name}">
            `;
            productList.appendChild(productElement);
        });
    }

    function loadProducts() {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            products = JSON.parse(storedProducts);
        } else {
            products = [
                {
                    name: 'Espresso',
                    description: 'Một tách espresso đậm đà, được chiết xuất từ những hạt cà phê Arabica chất lượng cao.',
                    price: 35000,
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Wn8Q4lflLouLLYM-xg7LnKBK2yLAvSn7ww&s'
                },
                {
                    name: 'Latte',
                    description: 'Sự kết hợp hoàn hảo giữa espresso và sữa nóng, được tô điểm bằng một lớp bọt sữa mịn màng.',
                    price: 45000,
                    imageUrl: 'https://vinbarista.com/uploads/news/ca-phe-latte-la-gi-latte-co-vi-gi-latte-khac-gi-capuchino-202408161122.jpg'
                },
                {
                    name: 'Cappuccino',
                    description: 'Hương vị cà phê cân bằng giữa espresso, sữa nóng và lớp bọt sữa dày, bồng bềnh.',
                    price: 50000,
                    imageUrl: 'https://cdn.tgdd.vn/2021/11/CookRecipe/CookTipsNote/ca-phe-capuchino-la-gi-cach-uong-cafe-capuchino-va-cac-loai-tipsnote-800x450.jpg'
                }
            ];
            saveProductsToLocalStorage();
        }
        renderProducts();
    }

    // Xử lý sự kiện

    // Chức năng tìm kiếm
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const allProducts = productList.querySelectorAll('.product-item');
        allProducts.forEach(product => {
            const productName = product.querySelector('.product-name').textContent.toLowerCase();
            product.style.display = productName.includes(searchTerm) ? '' : 'none';
        });
    }

    searchBtn.addEventListener('click', filterProducts);
    searchInput.addEventListener('keyup', (event) => { if (event.key === 'Enter') filterProducts(); });

    // Ẩn/hiện form với hiệu ứng

    // Hàm đóng form (được cập nhật để dùng max-height)
    function closeForm() {
        addProductSection.classList.remove('is-open');
        addProductSection.style.maxHeight = '0px'; // Thu gọn form
        addProductBtn.textContent = 'Thêm sản phẩm';
    }

    // Hàm đóng và reset form
    function hideAndResetForm() {
        closeForm();
        // Thêm một chút delay để form kịp đóng lại trước khi reset, tránh giật cục
        setTimeout(() => {
            productForm.reset();
            errorMsg.textContent = '';
        }, 500); // 500ms, bằng với thời gian transition
    }
    
    // Sự kiện click nút "Thêm sản phẩm"
    addProductBtn.addEventListener('click', () => {
        // Kiểm tra xem form có đang mở hay không bằng class 'is-open'
        const isOpen = addProductSection.classList.contains('is-open');
        
        if (isOpen) {
            closeForm(); // Nếu đang mở thì đóng lại
        } else {
            addProductSection.classList.add('is-open');
            addProductBtn.textContent = 'Đóng Form';
            // Đặt max-height bằng đúng chiều cao nội dung của nó để form mở rộng ra
            addProductSection.style.maxHeight = addProductSection.scrollHeight + 'px';
        }
    });
    
    cancelBtn.addEventListener('click', hideAndResetForm);

    // Sự kiện SUBMIT form
    productForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Logic validate và tạo object
        const name = document.getElementById('newProductName').value.trim();
        const description = document.getElementById('newProductDescription').value.trim();
        const price = document.getElementById('newProductPrice').value.trim();
        const imageUrl = document.getElementById('newProductImage').value.trim();

        if (!name || !price || isNaN(price) || Number(price) <= 0) {
            errorMsg.textContent = 'Vui lòng nhập tên và giá hợp lệ (số lớn hơn 0).';
            return;
        }
        errorMsg.textContent = '';
        
        const newProduct = {
            name: name,
            description: description,
            price: Number(price),
            imageUrl: imageUrl
        };
        
        products.unshift(newProduct);
        saveProductsToLocalStorage();
        renderProducts();

        // Đóng và reset form sau khi thêm thành công
        hideAndResetForm();
    });

    // KHỞI CHẠY KHI TẢI TRANG (giữ nguyên)
    loadProducts();
});
