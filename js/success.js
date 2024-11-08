$(document).ready(function() {
    var products = JSON.parse(localStorage.getItem("products")) || [];

    if (products.length === 0) {
        displayEmptyCartMessage();
    } else {
        products.forEach(function(product) {
            addProductToBill(product.image, product.price, product.name, product.quantity);
        });
        updateBillSummary();
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

$(document).ready(function() {
    var orderData = JSON.parse(localStorage.getItem("orderData"));

    if (orderData) {
        $("#idOrder").text(orderData.idOrder);
        $("#dateOrder").text(orderData.dateOrder);
        $("#nameKhachHang").text(orderData.nameKhachHang);
        $("#addressKhachHang").text(orderData.addressKhachHang);
        $("#phoneKhachHang").text(orderData.phoneKhachHang);
        $("#emailKhachHang").text(orderData.emailKhachHang);
    }
});

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