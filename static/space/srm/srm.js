document.addEventListener("DOMContentLoaded", function () {

    (function () {

        $(".st1").hover(function() {
            $(this).css("opacity", 1);
        });

        let m = $("main");

        m.mousemove(function(event) {
            let w = $(this).width(),
                pct = 360 * (+event.pageX) / w,
                bg = "linear-gradient(" + pct + "deg, " +
                    "rgba(255, 57, 117, 1), " +
                    "rgba(106, 33, 213, 1))";
            $("main").css("background-image", bg);
        });

        m.click(function() {
            console.log("yes");
            $(".st1").css("opacity", 0);
        });

    })();

});



