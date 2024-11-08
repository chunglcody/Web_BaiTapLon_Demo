$(document).ready(function() {

function ktratendn(giatri, text) {
    let regex = /^[A-Za-z0-9][A-Za-z0-9_'!@#$%^&]*$/;
    if (!regex.test(giatri)) {
        $(text).html("Ten đăng nhập bắt đầu bằng số hoặc chữ");
        return false;
    } else {
        $(text).html("");
        return true;
    }

}

function ktramk(giatri, text) {
    let regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,}$/;
    if (!regex.test(giatri)) {
        $(text).html("Mật khẩu phải có kí tự số in hoa kí tự đặc biệt");
        return false;
    } else {
        $(text).html("");
        return true;
    }

}
function ktraemail(giatri, text) {
    let regex = /^([A-Za-z0-9]+)@(gmail|yahoo).com$/;
    if (!regex.test(giatri)) {
        text.innerHTML = "Sai dạng email X@gmail|yahoo.com";
        return false;
    } else {
        text.innerHTML = "";
        return true;
    }
}
$("#tendn").blur(function(e) {
    let valdn = $("#tendn").val();
    ktratendn(valdn, "#txt1");
});
$("#email").blur(function(e) {
    let valmk = $("#email").val();
    ktraemail(valmk, txt2);
});

$("#mk").blur(function(e) {
    let valmk = $("#mk").val();
    ktramk(valmk, "#txt3");
});

$("#nhapmk").blur(function(e) {
    let valnmk = $("#mk").val();
    let valmk = $("#nhapmk").val();
    if (valmk != valnmk || valnmk == "") {
        txt4.innerHTML = "Nhập lại chưa chính xác";
    } else {
        txt4.innerHTML = "";
    }
});
$("#dangky").click(function (e) { 
    let valdn = $("#tendn").val();
    let valmk1 = $("#email").val();
    let valmk = $("#mk").val();
    let valnmk = $("#nhapmk").val();
    if(ktratendn(valdn, "#txt1")&&ktraemail(valmk1, txt2)&&ktramk(valmk, "#txt3")&&valmk == valnmk)
    {
        alert("Đăng ký thành công");
    }
    
});
});