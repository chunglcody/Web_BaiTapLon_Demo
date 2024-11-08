$(document).ready(function() {
    var products = JSON.parse(localStorage.getItem("products")) || [];

    if (products.length === 0) {
        displayEmptyCartMessage();
    } else {
        products.forEach(function(product) {
            addProductToPage(product.image, product.price, product.name, product.quantity);
        });
        updateBillSection();
    }
});

function addProductToPage(image, price, name, quantity = 1) {
    var productTableBody = $("#productTableBody");
    var productRow = $(`
        <tr>
            <td><img style="width: 100px;" src="${image}" alt="Product Image"></td>
            <td>${name}</td>
            <td>${price}</td>
            <td>
                <div class="quantity">
                    <button class="quantity-btn" onclick="decreaseQuantity(this)">-</button>
                    <input type="number" value="${quantity}" min="1" style="width: 50px; text-align: center; margin: auto;" onchange="updateBillSection()">
                    <button class="quantity-btn" onclick="increaseQuantity(this)">+</button>
                </div>
            </td>
            <td><button style="background-color: transparent; border: none; padding: 0; cursor: pointer; display: flex; justify-content: center;" class="delete-btn" onclick="deleteProduct(this, '${image}', '${name}', '${price}')"><img src="../img/rubbish-bin.png" alt="btn-remove" style="width: 20px;"></button></td>
        </tr>
    `);

    productTableBody.append(productRow);
}

function decreaseQuantity(button) {
    var quantityInput = $(button).next("input[type='number']");
    var currentValue = parseInt(quantityInput.val());
    if (currentValue > 1) {
        quantityInput.val(currentValue - 1);
        updateBillSection();
    }
}

function increaseQuantity(button) {
    var quantityInput = $(button).prev("input[type='number']");
    var currentValue = parseInt(quantityInput.val());
    quantityInput.val(currentValue + 1);
    updateBillSection();
}

function deleteProduct(button, image, name, price) {
    var productRow = $(button).closest("tr");
    productRow.remove();

    // Update localStorage
    var products = JSON.parse(localStorage.getItem("products")) || [];
    var updatedProducts = products.filter(function(product) {
        return !(product.image === image && product.name === name && product.price === price);
    });
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // Check if the cart is empty after deletion
    if (updatedProducts.length === 0) {
        displayEmptyCartMessage();
    } else {
        updateBillSection();
    }
}

function displayEmptyCartMessage() {
    var container = $(".container");
    $.get('../html/empty-cart.html', function(data) {
        container.html(data);
    }).fail(function() {
        console.error('Error loading empty cart message');
    });
}

function updateBillSection() {
    var productRows = $("#productTableBody tr");
    var billItems = $(".bill .items");
    var subtotal = 0;
    var totalProducts = 0;

    // Clear existing bill items
    billItems.empty();

    var products = [];

    productRows.each(function() {
        var row = $(this);
        var quantity = parseInt(row.find("input[type='number']").val());
        var name = row.find("td").eq(1).text();
        var priceText = row.find("td").eq(2).text().trim();
        var price = parseFloat(priceText.replace(/[^\d]/g, ''));

        var itemTotal = quantity * price;
        subtotal += itemTotal;
        totalProducts += quantity;

        products.push({ image: row.find("img").attr("src"), price: priceText, name: name, quantity: quantity });

        var item = $(`
            <div class="item">
                <div class="item-quantity">${quantity}x</div>
                <div class="item-name">${name}</div>
                <div class="item-price">${itemTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
            </div>
        `);
        billItems.append(item);
    });

    localStorage.setItem("products", JSON.stringify(products));

    $(".subtotal .amount").text(`${subtotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`);
    $(".total .amount-total").text(`${subtotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`);
    $(".summary-title").text(`(${totalProducts} sản phẩm)`);
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