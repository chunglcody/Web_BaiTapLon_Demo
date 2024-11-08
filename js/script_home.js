
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