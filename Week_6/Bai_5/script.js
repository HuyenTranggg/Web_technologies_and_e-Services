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
    // Mảng này sẽ là nguồn dữ liệu chính cho trang web
    let products = [];

    // Hàm lưu mảng products vào LocalStorage
    function saveProductsToLocalStorage() {
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Hàm render lại toàn bộ danh sách sản phẩm ra HTML từ mảng `products`
    function renderProducts() {
        // Xóa sạch danh sách hiện tại để vẽ lại từ đầu
        productList.innerHTML = '';

        // Lặp qua mảng products và tạo HTML cho từng sản phẩm
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

    // Hàm tải sản phẩm khi trang được load
    function loadProducts() {
        const storedProducts = localStorage.getItem('products');

        // Nếu có dữ liệu trong LocalStorage, lấy ra dùng
        if (storedProducts) {
            products = JSON.parse(storedProducts);
        } 
        // Nếu không có (lần đầu truy cập), tạo dữ liệu mẫu và lưu vào LocalStorage
        else {
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
            saveProductsToLocalStorage(); // Lưu dữ liệu mẫu này lại
        }

        // Sau khi có dữ liệu, render ra màn hình
        renderProducts();
    }

    // Xử lý sự kiện

    // Chức năng tìm kiếm (vẫn hoạt động như cũ trên các phần tử DOM đã được render)
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

    searchBtn.addEventListener('click', filterProducts);
    searchInput.addEventListener('keyup', (event) => { if (event.key === 'Enter') filterProducts(); });

    // Ẩn/hiện và reset form
    function hideAndResetForm() {
        addProductSection.classList.add('hidden');
        productForm.reset();
        errorMsg.textContent = '';
        addProductBtn.textContent = 'Thêm sản phẩm';
    }

    addProductBtn.addEventListener('click', () => {
        addProductSection.classList.toggle('hidden');
        addProductBtn.textContent = addProductSection.classList.contains('hidden') ? 'Thêm sản phẩm' : 'Đóng Form';
    });
    
    cancelBtn.addEventListener('click', hideAndResetForm);

    // Xử lý sự kiện SUBMIT form để thêm sản phẩm mới
    productForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('newProductName').value.trim();
        const description = document.getElementById('newProductDescription').value.trim();
        const price = document.getElementById('newProductPrice').value.trim();
        const imageUrl = document.getElementById('newProductImage').value.trim();

        if (!name || !price || isNaN(price) || Number(price) <= 0) {
            errorMsg.textContent = 'Vui lòng nhập tên và giá hợp lệ (số lớn hơn 0).';
            return;
        }
        errorMsg.textContent = '';

        // Tạo một đối tượng sản phẩm mới
        const newProduct = {
            name: name,
            description: description,
            price: Number(price),
            imageUrl: imageUrl
        };

        // Thêm sản phẩm mới vào ĐẦU mảng dữ liệu
        products.unshift(newProduct);

        // Lưu mảng mới vào LocalStorage
        saveProductsToLocalStorage();

        // Render lại toàn bộ danh sách sản phẩm ra màn hình
        renderProducts();

        // Đóng và reset form
        hideAndResetForm();
    });


    // KHỞI CHẠY KHI TẢI TRANG
    loadProducts();

});
