$(document).ready(function () {

    let toggle = true;

    let mainMenuWidth = "18%";
    let mainMenuTop = "40px";

    let changeLine = (id, x1, y1, x2, y2) => {
        d3.select(id).transition()
            .ease(d3.easeCubicOut)
            .duration(200)
            .attr("x1", x1)
            .attr("y1", y1)
            .attr("x2", x2)
            .attr("y2", y2);
    }

    let menuOn = () => {
        changeLine("#hamburgerLine1", 1.3, 18.8, 18.8, 1.3);
        changeLine("#hamburgerLine2", 1.3, 1.3, 18.8, 18.8);
        $("#gray-fog").fadeIn();
        $("#main-menu").animate({
            // width: mainMenuWidth
            top: mainMenuTop
        }, 400, () => {
            $("#vertical-menu").fadeIn(180);
        });
        // $("#main-menu").width("300px");
        toggle = false;
    }

    let menuOff = () => {
        changeLine("#hamburgerLine1", 0, 6.2, 20, 6.2);
        changeLine("#hamburgerLine2", 0, 13.8, 20, 13.8);
        $("#vertical-menu").fadeOut(180, () => {
            $("#gray-fog").fadeOut();
            $("#main-menu").animate({
                // width:'0'
                top: "100vh"
            });
        });
        toggle = true;
    }

    d3.select(".menu").on("click", () => {
        (toggle) ? menuOn() : menuOff();
    });

    $("#gray-fog").on("click", () => {
        menuOff();
    })


});