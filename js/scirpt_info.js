$(document).ready(function() {
    var modal = $("#reviewModal");
    var btn = $("#btn-danhgia");
    var span = $(".close");
    var submitBtn = $("#submitReview");
    var hoten = $(".hoten");
    var danhgia = $(".danhgia");

    btn.on("click", function() {
        modal.show();
    });

    span.on("click", function() {
        modal.hide();
    });

    $(window).on("click", function(event) {
        if ($(event.target).is(modal)) {
            modal.hide();
        }
    });

    submitBtn.on("click", function() {
        var reviewName = $("#reviewName").val();
        var reviewEmail = $("#reviewEmail").val();
        var reviewText = $("#reviewText").val();
        if ($.trim(reviewName) !== "" && validateEmail(reviewEmail) && $.trim(reviewText) !== "") {
            hoten.text("Họ tên: " + reviewName);
            danhgia.text("Lời đánh giá: " + reviewText);
            modal.hide();
        } else {
            alert("Vui lòng điền đầy đủ thông tin đánh giá của bạn và đảm bảo email hợp lệ.");
        }
    });

    function validateEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
$(document).ready(function() {
    var buyNowButton = $(".buy-now-button");

    buyNowButton.on("click", function(event) {
        event.preventDefault();
        var productImage = $(".slideshow-container .mySlides img").attr("src");

        var productPrice = $(".current-price").text().trim();

        var productName = $(".product-title").text().trim();
        var existingProducts = JSON.parse(localStorage.getItem("products")) || [];

        existingProducts.push({ image: productImage, price: productPrice, name: productName }); 
        localStorage.setItem("products", JSON.stringify(existingProducts));

        window.location.href = "../html/price.html";
    });
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