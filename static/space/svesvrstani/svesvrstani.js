$(document).ready(function () {

    let toggle = true;

    let mainMenuWidth = "18%";
    let mainMenuTop = "3vw";
    let mainMenuTopMobile = "0";
    let mobileQuery = "(max-width: 650px)";

    let changeLine = (id, x1, y1, x2, y2) => {
        d3.select(id).transition()
            .ease(d3.easeCubicOut)
            .duration(200)
            .attr("x1", x1)
            .attr("y1", y1)
            .attr("x2", x2)
            .attr("y2", y2);
    }

    let changeLineOn = () => {
        changeLine("#hamburgerLine1", 1.3, 18.8, 18.8, 1.3);
        changeLine("#hamburgerLine2", 1.3, 1.3, 18.8, 18.8);
    }

    let changeLineOff = () => {
        changeLine("#hamburgerLine1", 0, 6.2, 20, 6.2);
        changeLine("#hamburgerLine2", 0, 13.8, 20, 13.8);
    }

    let menuOn = () => {
        changeLineOn();
        $("#gray-fog").fadeIn();
        $("#main-menu").animate({
            top: mainMenuTop
        }, 400, () => {
            $("#vertical-menu").fadeIn(180);
        });
        toggle = false;
    }

    let menuOnMobile = () => {
        changeLineOn();
        $("#main-menu").fadeIn(300, () => {
            $("#vertical-menu").fadeIn(180);
        });
        toggle = false;
    }

    let menuOff = () => {
        changeLineOff();
        $("#vertical-menu").fadeOut(180, () => {
            $("#gray-fog").fadeOut();
            $("#main-menu").animate({
                top: "100vh"
            });
        });
        toggle = true;
    }

    let menuOffMobile = () => {
        changeLineOff();
        $("#vertical-menu").fadeOut(180, () => {
            $("#main-menu").fadeOut(180);
        });
        toggle = true;
    }

    if (window.matchMedia(mobileQuery).matches) {
        menuOn = menuOnMobile;
        menuOff = menuOffMobile;
    }

    d3.select(".menu").on("click", () => {
        (toggle) ? menuOn() : menuOff();
    });

    $("#gray-fog").on("click", () => {
        menuOff();
    });

});