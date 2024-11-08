$(document).ready(function() {
    var products = JSON.parse(localStorage.getItem("products")) || [];

    if (products.length === 0) {
        displayEmptyCartMessage();
    } else {
        // Clear the bill items container before adding new items
        $(".bill .items").empty();
        
        products.forEach(function(product) {
            addProductToBill(product.image, product.price, product.name, product.quantity);
        });
        updateBillSummary();
    }

    // Disable the "Tiếp theo" button initially
    $("#next-button").prop("disabled", true);

    // Function to validate the form
    function validateForm() {
        var isValid = true;

        // Validate name
        var name = $("#name").val().trim();
        if (name === "" || name.split(" ").length < 2) {
            $("#helpName").text("Họ và tên phải có ít nhất 2 chữ và không được để trống.");
            isValid = false;
        } else {
            $("#helpName").text("");
        }

        // Validate phone number
        var phone = $("#sdt").val().trim();
        var phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(phone)) {
            $("#helpSdt").text("Số điện thoại phải có 10 số và bắt đầu bằng số 0.");
            isValid = false;
        } else {
            $("#helpSdt").text("");
        }

        // Validate email
        var email = $("#email").val().trim();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $("#helpEmail").text("Email phải có dạng hợp lệ.");
            isValid = false;
        } else {
            $("#helpEmail").text("");
        }

        // Validate address
        var address = $("#diahci").val().trim();
        if (address === "") {
            $("#helpDiachi").text("Địa chỉ không được để trống.");
            isValid = false;
        } else {
            $("#helpDiachi").text("");
        }

        // Validate payment method
        if (!$("input[name='payment']:checked").val()) {
            $("#helpPayment").text("Vui lòng chọn một hình thức thanh toán.");
            isValid = false;
        } else {
            $("#helpPayment").text("");
        }

        // Check if the terms checkbox is checked
        if (!$("#agree").is(":checked")) {
            isValid = false;
        }

        // Enable or disable the "Tiếp theo" button based on the form validity
        $("#next-button").prop("disabled", !isValid);
    }

    // Attach the validateForm function to the input fields, checkbox, and radio buttons
    $("#name, #sdt, #email, #diahci, #agree, input[name='payment']").on("input change", validateForm);

    // Initial validation
    validateForm();

    // Store form data in localStorage when the "Tiếp theo" button is clicked
    $("#next-button").on("click", function(event) {
        if (!$("#next-button").prop("disabled")) {
            var orderData = {
                idOrder: generateOrderId(),
                dateOrder: new Date().toLocaleString(),
                nameKhachHang: $("#name").val().trim(),
                addressKhachHang: $("#diahci").val().trim(),
                phoneKhachHang: $("#sdt").val().trim(),
                emailKhachHang: $("#email").val().trim()
            };

            localStorage.setItem("orderData", JSON.stringify(orderData));
            window.location.href = "../html/success.html";
        } else {
            event.preventDefault();
            alert("Vui lòng điền đầy đủ thông tin và chọn hình thức thanh toán.");
        }
    });

    // Function to generate a random order ID
    function generateOrderId() {
        return 'OD' + Math.floor(Math.random() * 1000000);
    }
});

function addProductToBill(image, price, name, quantity) {
    var billItems = $(".bill .items");
    var item = $(`
        <div class="item">
            <div class="item-quantity">${quantity}x</div>
            <div class="item-name">${name}</div>
            <div class="item-price">${price}</div>
        </div>
    `);
    billItems.append(item);
}

function updateBillSummary() {
    var products = JSON.parse(localStorage.getItem("products")) || [];
    var subtotal = 0;
    var totalProducts = 0;

    products.forEach(function(product) {
        var price = parseFloat(product.price.replace(/[^\d]/g, ''));
        subtotal += price * product.quantity;
        totalProducts += product.quantity;
    });

    $(".subtotal .amount").text(`${subtotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`);
    $(".total .amount-total").text(`${subtotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`);
    $(".summary-title").text(`(${totalProducts} sản phẩm)`);
}

function displayEmptyCartMessage() {
    var container = $(".container");
    container.html(`
        <div class="empty-cart-message" style="text-align: center; margin-top: 50px;">
            <h2>Giỏ hàng của bạn đang trống</h2>
            <p>Hãy quay lại và thêm sản phẩm vào giỏ hàng của bạn.</p>
            <a href="../html/home.html" class="btn btn-primary">Quay lại trang chủ</a>
        </div>
    `);
}

$(document).ready(function() {
    updateCartCount();

    function updateCartCount() {
        var products = JSON.parse(localStorage.getItem("products")) || [];
        var totalQuantity = products.reduce(function(total, product) {
            return total + product.quantity;
        }, 0);

        $("#cart-count").text(totalQuantity);
    }
});