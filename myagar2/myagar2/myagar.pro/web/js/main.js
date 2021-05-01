$("#div_lb > .header").attr("id", "title");
$("#input_box2").attr("placeholder", "Enter chat message...");
$("#input_box2").attr("onkeydown", "getText();");

function getText() {
    UIObject = document.getElementById("input_box2");
    if (/\b(?=\w)(controlbots)\b(?!\w)/i.test(UIObject.value)) {
        var getName = $("#nick").val();
        $.toast({
            heading: '<span id="server-toast" class="toast_sender">SERVER:</span>',
            text: '<span class="toast_chatmsg">Hello <b>' + getName + "</b>, To control your bots press Q and press again for control your self.</span>",
            icon: 'success',
            showHideTransition: 'slide',
            bgColor: 'rgba(10, 10, 10, 0.95)',
            allowToastClose: false,
            hideAfter: 5000,
            stack: 5
        });
        UIObject.value = "";
    }
}

$("#profile-main").prependTo("#home");
$("#preview-img").attr("src", $("#skin_url").val());
$("#skin_url").change(function() {
    $("#preview-img").attr("src", this.value);
});

$(".btn-green").insertBefore(".btn-blue");
$(".btn-red").insertAfter(".btn-green");

$("n2").remove();

! function(c) {
    $(document).ready(function() {
        drawColor();
    });
    
    var round;
    var colors;
    round = {
        r1: '.round.red',
        r2: '.round.mahogany',
        r3: '.round.dulllime',
        r4: '.round.peru',
        r5: '.round.tuftsblue',
        r6: '.round.raspberry',
        r7: '.round.white',
        r8: '.round.aqua',
        r9: '.round.lawngreen',
        r10: '.round.magenta',
        r11: '.round.aztec',
        r12: '.round.yellow',
    };
    colors = {
        r1: '#ff0000',
        r2: '#ce4242',
        r3: '#42ce42',
        r4: '#ce8842',
        r5: '#4288ce',
        r6: '#d35695',
        r7: '#ffffff',
        r8: '#18ffff',
        r9: '#76ff03',
        r10: '#e040fb',
        r11: '#893bff',
        r12: '#ffff00',
    };

    function drawColor() {
        $(round.r1).on("click", function() {
            $("#div_lb > .header").css({
                color: colors.r1
            });
        });
        $(round.r2).on("click", function() {
            $("#div_lb > .header").css({
                color: colors.r2
            });
        });
        $(round.r3).on("click", function() {
            $("#div_lb > .header").css({
                color: colors.r3
            });
        });
        $(round.r4).on("click", function() {
            $("#div_lb > .header").css({
                color: colors.r4
            });
        });
        $(round.r5).on("click", function() {
            $("#div_lb > .header").css({
                color: colors.r5
            });
        });
        $(round.r6).on("click", function() {
            $("#div_lb > .header").css({
                color: colors.r6
            });
        });
        $(round.r7).on("click", function() {
            $("#div_lb > .header").css({
                color: colors.r7
            });
        });
        $(round.r8).on("click", function() {
            $("#div_lb > .header").css({
                color: colors.r8
            });
        });
        $(round.r9).on("click", function() {
            $("#div_lb > .header").css({
                color: colors.r9
            });
        });
        $(round.r10).on("click", function() {
            $("#div_lb > .header").css({
                color: colors.r10
            });
        });
        $(round.r11).on("click", function() {
            $("#div_lb > .header").css({
                color: colors.r11
            });
        });
        $(round.r12).on("click", function() {
            $("#div_lb > .header").css({
                color: colors.r12
            });
        });
    }
}(window.jQuery);

if (localStorage.getItem("lb_title") !== null) {
    $("#div_lb > .header").text(localStorage.getItem("lb_title"));
    $("#lb_name").val(localStorage.getItem("lb_title"));
}

function setTitle(newTitle) {
    $("#div_lb > .header").text("MYAGAR.PRO");
}


$(".btn-green").on("click", function() {
        window.SwallToast.fire({
            icon: "success",
            type: "success",
            title: "Your hotkeys has been saved!"
        })
});

var l = localStorage.getItem("player_profile");
var profiles = JSON.parse(l);

function xAzError(image) {
    image.onerror = "";
    image.src = "img/error.png";
    return true;
}

$('#profile-bg').click(function() {
    while (localStorage.getItem("selected_profile") != 0) {
        $('.arrow-right').trigger('click');
    }
});
$('#profile-bg2').click(function() {
    while (localStorage.getItem("selected_profile") != 1) {
        $('.arrow-right').trigger('click');
    }
});
$('#profile-bg3').click(function() {
    while (localStorage.getItem("selected_profile") != 2) {
        $('.arrow-right').trigger('click');
    }
});
$('#profile-bg4').click(function() {
    while (localStorage.getItem("selected_profile") != 3) {
        $('.arrow-right').trigger('click');
    }
});
$('#profile-bg5').click(function() {
    while (localStorage.getItem("selected_profile") != 4) {
        $('.arrow-right').trigger('click');
    }
});
$('#profile-bg6').click(function() {
    while (localStorage.getItem("selected_profile") != 5) {
        $('.arrow-right').trigger('click');
    }
});
$('#profile-bg7').click(function() {
    while (localStorage.getItem("selected_profile") != 6) {
        $('.arrow-right').trigger('click');
    }
});
$('#profile-bg8').click(function() {
    while (localStorage.getItem("selected_profile") != 7) {
        $('.arrow-right').trigger('click');
    }
});
$('#profile-bg9').click(function() {
    while (localStorage.getItem("selected_profile") != 8) {
        $('.arrow-right').trigger('click');
    }
});
$('#profile-bg10').click(function() {
    while (localStorage.getItem("selected_profile") != 9) {
        $('.arrow-right').trigger('click');
    }
});

