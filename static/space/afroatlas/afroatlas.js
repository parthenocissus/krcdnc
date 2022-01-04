$(document).ready(function () {

    /* Setting Dimensions */

    let widthBase = 0.238;
    let idealRatio = 1.45;
    let origRatio = 1.401;

    let setSize = () => {

        let h = window.innerHeight;
        let w = window.innerWidth;
        let hSvg = h;
        let wSvg = h * idealRatio;
        let wAside = w - wSvg;

        if (wAside < w * widthBase) {
            wAside = w * widthBase;
            wSvg = window.innerWidth - wAside;
        }

        const mediaQuery = window.matchMedia('(max-width: 768px)')
        if (mediaQuery.matches) {
            wAside = w;
            wSvg = w;
            // hSvg = w / origRatio;
            hSvg = w / 1.3 - 10;

            let topControls = "calc(" + $("footer").offset().top + "px - 6vw)";
            $(".controls").css({
                top: topControls,
                bottom: 'auto'
            });

            let topNote = "calc(" + $("#main-map").offset().top + "px - 10vw)";
            $(".note").css({
                top: topNote,
                bottom: 'auto'
            });
        }

        $("#main-map").attr("height", hSvg).attr("width", wSvg);
        $(".side-content").css("width", wAside);
    }

    /* Zoom Settings */

    let zoomSettings = () => {

        let eventsHandler = {
            haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel'],
            init: function (options) {

                let instance = options.instance,
                    initialScale = 1,
                    pannedX = 0,
                    pannedY = 0;

                // Init Hammer
                // Listen only for pointer and touch events
                this.hammer = Hammer(options.svgElement, {
                    inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
                });

                // Enable pinch
                this.hammer.get('pinch').set({enable: true})

                // Handle double tap
                this.hammer.on('doubletap', function (ev) {
                    instance.zoomIn()
                });

                // Handle pan
                this.hammer.on('panstart panmove', function (ev) {
                    // On pan start reset panned variables
                    if (ev.type === 'panstart') {
                        pannedX = 0
                        pannedY = 0
                    }

                    // Pan only the difference
                    instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY})
                    pannedX = ev.deltaX
                    pannedY = ev.deltaY
                });

                // Handle pinch
                this.hammer.on('pinchstart pinchmove', function (ev) {

                    const el = ev.target;
                    const rect = el.getBoundingClientRect();
                    const pos = {
                      x: (ev.center.x - rect.left),
                      y: (ev.center.y - rect.top)
                    };

                    // On pinch start remember initial zoom
                    if (ev.type === 'pinchstart') {
                        initialScale = instance.getZoom();
                        instance.zoomAtPoint(initialScale * ev.scale, {x: ev.center.x, y: ev.center.y});
                        // instance.zoomAtPoint(initialScale * ev.scale, {x: pos.x, y: pos.y});
                    }

                    instance.zoomAtPoint(initialScale * ev.scale, {x: pos.x, y: pos.y})
                });

                // Prevent moving the page on some devices when panning over SVG
                options.svgElement.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                });

            }, destroy: function () {
                this.hammer.destroy()
            }
        }

        // Expose to window namespace for testing purposes
        // window.panZoom = svgPanZoom('#mobile-svg', {
        //     zoomEnabled: true,
        //     controlIconsEnabled: true,
        //     fit: 1,
        //     center: 1,
        //     customEventsHandler: eventsHandler
        // });

        window.panZoom = svgPanZoom('#main-map', {
            zoomEnabled: true,
            controlIconsEnabled: true,
            fit: 1,
            // center: 1,
            customEventsHandler: eventsHandler
        });

        // document.getElementById('zoom-in').addEventListener('click', function (ev) {
        //     ev.preventDefault()
        //     panZoom.zoomIn()
        // });
        //
        // document.getElementById('zoom-out').addEventListener('click', function (ev) {
        //     ev.preventDefault()
        //     panZoom.zoomOut()
        // });
    }

    /* Main */

    setSize();
    zoomSettings();

    $(window).resize(() => {
        setSize();
    });

    /* Notes Functionality */

    // let noteTxt = "<p>Lazar i Marko putuju do vulkana. »Pogled mi klizne kroz prozor, u baruštine i sirotinjska sela. Krave se\n" +
    //     "                vuku kroz blato kao tužni, olindrali kosturi. Pogrbljena baka tegli na leđima divovski naramak drva.\n" +
    //     "                Mršava deca naduvenih trbuha, u poderanim gaćama, stoje kraj puta i mašu. Kvašiorkor, <em>stomak\n" +
    //     "                    gladi</em>.«</p>\n" +
    //     "            <p>Stomak gladi. Ulica <a href=\"#\">Nezavisnosti</a>. Tugaljiv kurati ponos.</p>";

    // $(".mark").on('click tap touchstart touchend', () => {
    //     let note = $(".note"),
    //         noteTxtCont = $(".note-text");
    //     note.css({"visibility": "hidden"});
    //     noteTxtCont.html(noteTxt);
    //     let noteH = noteTxtCont.height();
    //     note.height(noteH + 16);
    //     note.css({"visibility": "visible"});
    // });

    $("#note-x").on('click tap touchstart touchend', () => {
        $(".note").css({"visibility": "hidden"});
    });

});