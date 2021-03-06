let baseUtility = (function () {

    let parameters, generalPictogram, currentPictogram;
    let mobileQuery = "(max-width: 650px)";
    let menuSelect = "#pictome-logo";

    /* Base Functions */

    let baseSetup = function () {
        baseSetupDefault();
        setLogoEvents();
    };

    let baseSetupHomepage = function () {
        baseSetupDefault();
        menuSelect = "#pictome-logo, #left-margin";
        d3.selectAll("#name-aside").style("pointer-events", "none");
        setLogoEvents();
    };

    let baseSetupDefault = function () {

        parameters = {
            animationDurationLogo: 300,
            menuFlag: true,
            langFlag: true,
            logoLeftDefault: "22px",
            logoLeftMenu: "28px"
        };

        generalPictogram = {
            name: "All sProjects",
            id: "general",
            graphics: {
                "headcx": 6.5,
                "headcy": 3.7,
                "headr": 2.7,
                "arm1d": "M0.1,9.6c0.5,0,5.6,0,6.5,0s5.8,0,6.3,0",
                "arm2d": "M0.1,9.6c0.5,0,5.6,0,6.5,0s5.8,0,6.3,0",
                "leg1d": "M1,25.7C1.2,25.2,6.6,13,6.6,13s5.2,12.2,5.5,12.7",
                "leg2d": "M1,25.7C1.2,25.2,6.6,13,6.6,13s5.2,12.2,5.5,12.7"
            }, onHover: {
                "headcx": 9.7,
                "headcy": 15.5,
                "headr": 2.7,
                "arm1d": "M0,8.5c0.4,0,5.7,0,6.6,0s6,0,6.4,0",
                "arm2d": "M0,22.5c0.4,0,5.6,0,6.7,0s5.8,0,6.3,0",
                "leg1d": "M0,15.5c0.2,0,3.1,0,3.6,0s3.2,0,3.4,0",
                "leg2d": "M0,1.5c0.4,0,5.7,0,6.6,0s5.9,0,6.4,0"
            }, menu: {
                "headcx": 6.5,
                "headcy": 3.7,
                "headr": 2.7,
                "arm1d": "M0.6,21.5l6-6.1l5.8-5.9",
                "arm2d": "M0.6,21.5l6-6.1l5.8-5.9",
                "leg1d": "M0.6,9.5l5.8,5.9l6,6.1",
                "leg2d": "M0.6,9.5l5.8,5.9l6,6.1"
            }, menuOnHover: {
                "headcx": 9.7,
                "headcy": 3.5,
                "headr": 2.7,
                "arm1d": "M7,22.7C6.7,22.4,0.9,16,0.9,16S6.7,9.9,7,9.5",
                "arm2d": "M12,22.7C11.8,22.4,5.9,16,5.9,16s5.8-6.1,6.1-6.5",
                "leg1d": "M7,22.7C6.7,22.4,0.9,16,0.9,16S6.7,9.9,7,9.5",
                "leg2d": "M12,22.7C11.8,22.4,5.9,16,5.9,16s5.8-6.1,6.1-6.5"
            }
        };

        currentPictogram = {
            graphics: generalPictogram.graphics,
            onHover: generalPictogram.onHover
        };
        // setLogoEvents();

    };

    let setLogoEvents = function () {

        let pictomeLogo = d3.selectAll(menuSelect);

        let desktopEvents = {
            mouseover: function () {
                let hoverClass = "fill-none-stroke-light";
                pictomeLogo.classed(hoverClass + " cursor-pointer", true);
                updateLogoGraphics(currentPictogram.onHover);
                if (parameters.menuFlag) hideNameAside();
            },
            mouseout: function () {
                pictomeLogo.classed("fill-none-stroke-light fill-none-stroke-sun cursor-pointer", false);
                updateLogoGraphics(currentPictogram.graphics);
                if (parameters.menuFlag) showNameAside();
            },
            onClick: function () {
                if (parameters.menuFlag) {
                    moveMenu();
                } else {
                    moveBackMenu();
                }
            }
        };

        let mobileEvents = {
            mouseover: function () {
            },
            mouseout: function () {
            },
            onClick: function () {
                if (parameters.menuFlag) {
                    moveMenu();
                    updateLogoGraphics(generalPictogram.menu);
                } else {
                    moveBackMenu();
                    updateLogoGraphics(generalPictogram.graphics);
                }
            }
        };

        let defaultEvents = desktopEvents;
        if (window.matchMedia(mobileQuery).matches) {
            defaultEvents = mobileEvents;
        }

        pictomeLogo.on("mouseover", defaultEvents.mouseover)
            .on("mouseout", defaultEvents.mouseout)
            .on("click", defaultEvents.onClick);

        d3.select("main").on("click", function () {
            resetMenu();
        });

    };

    let updateLogoGraphics = function (parts) {

        let dur = parameters.animationDurationLogo,
            precision = 3;

        d3.select("#idle-pictome-head").transition().duration(dur).ease(d3.easePolyOut)
            .attr("cx", parts.headcx)
            .attr("cy", parts.headcy)
            .attr("r", parts.headr);

        d3.select("#idle-pictome-arm1").transition().duration(dur).ease(d3.easePolyOut)
            .attrTween("d", pathTween(parts.arm1d, precision));
        d3.select("#idle-pictome-arm2").transition().duration(dur).ease(d3.easePolyOut)
            .attrTween("d", pathTween(parts.arm2d, precision));
        d3.select("#idle-pictome-leg1").transition().duration(dur).ease(d3.easePolyOut)
            .attrTween("d", pathTween(parts.leg1d, precision));
        d3.select("#idle-pictome-leg2").transition().duration(dur).ease(d3.easePolyOut)
            .attrTween("d", pathTween(parts.leg2d, precision));

    };

    let pathTween = function (d1, precision = 1) {

        return function () {

            let path0 = this,
                path1 = path0.cloneNode(),
                n0 = path0.getTotalLength(),
                n1 = (path1.setAttribute("d", d1), path1).getTotalLength();

            let distances = [0], i = 0, dt = precision / Math.max(n0, n1);
            while ((i += dt) < 1) distances.push(i);
            distances.push(1);

            let points = distances.map(function (t) {
                let p0 = path0.getPointAtLength(t * n0),
                    p1 = path1.getPointAtLength(t * n1);
                return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
            });

            return function (t) {
                return t < 1 ? "M" + points.map(function (p) {
                    return p(t);
                }).join("L") : d1;
            };

        };

    };

    let moveMenu = function () {

        hideNameAside();

        parameters.menuFlag = false;
        let menuMargin = 150,
            menuWidth = menuMargin + "px",
            logoLeft = parameters.logoLeftMenu;

        if (window.matchMedia(mobileQuery).matches) {
            menuWidth = "50%";
            // parameters.logoLeftDefault = "14px";
            logoLeft = parameters.logoLeftDefault;
        }

        d3.select("#side-menu").style("visibility", "visible").style("width", menuWidth);
        d3.select("#main-logo").style("left", logoLeft);

        setTimeout(function () {
            d3.selectAll(".side-nav").style("opacity", "1");
        }, 300);

        currentPictogram = {
            graphics: generalPictogram.menu,
            onHover: generalPictogram.menuOnHover
        }
    };

    let moveBackMenu = function () {

        updateLogoGraphics(generalPictogram.graphics);

        let pictomeLogo = d3.selectAll("#pictome-logo");
        pictomeLogo.classed("fill-none-stroke-light fill-none-stroke-sun cursor-pointer", false);

        parameters.menuFlag = true;

        d3.select("#side-menu").style("visibility", "hidden").style("width", "0");
        d3.selectAll(".side-nav").style("opacity", "0");
        d3.select("#main-logo").style("left", parameters.logoLeftDefault);
        setTimeout(showNameAside, 300);

        currentPictogram = {
            graphics: generalPictogram.graphics,
            onHover: generalPictogram.onHover
        }

    };

    let hideNameAside = function () {
        d3.select("#name-aside").style("opacity", "0");
    };

    let showNameAside = function () {
        d3.select("#name-aside").style("opacity", "1");
    };

    let resetMenu = function () {
        if (!parameters.menuFlag) moveBackMenu();
        // if (!parameters.langFlag) moveBackLangMenu();
    };

    /* Lightbox */

    let lightboxSetup = function () {

        $('.gallery').each(function () {
            let $pic = $(this),
                getItems = function () {
                    let items = [];
                    $pic.find('a').each(function () {
                        let $href = $(this).attr('href'),
                            $size = $(this).data('size').split('x'),
                            $width = $size[0],
                            $height = $size[1],
                            $cap = $(this).attr('caption');

                        let item = {
                            src: $href,
                            w: $width,
                            h: $height,
                            title: $cap
                        }

                        items.push(item);
                    });
                    return items;
                }

            let items = getItems();

            let $pswp = $('.pswp')[0];

            let options = {
                index: 0,
                bgOpacity: 1,
                showHideOpacity: true,
                captionEl: true,
                fullscreenEl: false,
                zoomEl: false,
                shareEl: false
            };

            $pic.on('click', 'figure', function (event) {
                event.preventDefault();
                options.index = $(this).index();
                let lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });

            $(".lightbox-rect").on('click', function (event) {
                event.preventDefault();
                let lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });

        });

    };

    /* Generals */

    let noteSetup = function () {

        let threshold = 0;

        /* Sidenote Position */

        $(".sidenote").each(function (i) {

            let index = i + 1,
                ref = $("#s" + index),
                sidenote = $(this),
                top = document.querySelector("#s" + index).offsetTop;

            let exactPos = (top > threshold) ? top : threshold;

            sidenote.css("top", exactPos + "px");
            // sidenote.css("visibility", "visible");
            $("#sidenote-symbol" + index).html(ref.text());
            threshold = exactPos + $(this).innerHeight();

            ref.mouseover(function () {
                sidenote.addClass("selected");
            }).mouseout(function () {
                sidenote.removeClass("selected");
            }).click(function () {
                let tp = sidenote.offset().top;
                window.scroll({top: tp - 10, left: 0, behavior: 'smooth'});
            });

            sideref = $("#sidenote-symbol" + index);
            sideref.mouseover(function () {
                ref.addClass("selected");
                sideref.addClass("selected-ref");
                sidenote.addClass("selected");
            }).mouseout(function () {
                ref.removeClass("selected");
                sideref.removeClass("selected-ref");
                sidenote.removeClass("selected");
            }).click(function () {
                let tp = ref.offset().top;
                window.scroll({top: tp - 10, left: 0, behavior: 'smooth'});
            });
        });

        $(".sidenote").css("visibility", "visible");

        /* Facebook Button */

        let fbButton = document.getElementById('fb-share-button');
        let url = window.location.href;

        fbButton.addEventListener('click', function () {
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + url,
                'facebook-share-dialog',
                'width=800,height=600'
            );
            return false;
        });

        /* Mobile Queries */

        if (window.matchMedia(mobileQuery).matches) {
            $(".gallery").css("grid-template-columns", "1fr");
            $(".overburn").remove();
        }

    };

    /* Return */

    return {
        baseSetup: baseSetup,
        resetMenu: resetMenu,
        pathTween: pathTween,
        lightboxSetup: lightboxSetup,
        baseSetupHomepage: baseSetupHomepage,
        noteSetup: noteSetup
    }

}());

