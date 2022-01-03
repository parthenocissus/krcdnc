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
        let panZoom = svgPanZoom('#main-map', {
            zoomEnabled: true,
            controlIconsEnabled: false
        });

        document.getElementById('zoom-in').addEventListener('click', function (ev) {
            ev.preventDefault()
            panZoom.zoomIn()
        });

        document.getElementById('zoom-out').addEventListener('click', function (ev) {
            ev.preventDefault()
            panZoom.zoomOut()
        });
    }

    /* Main */

    setSize();
    zoomSettings();

    $(window).resize(() => {
        setSize();
    });

    /* Notes Functionality */

    let noteTxt = "<p>Lazar i Marko putuju do vulkana. »Pogled mi klizne kroz prozor, u baruštine i sirotinjska sela. Krave se\n" +
        "                vuku kroz blato kao tužni, olindrali kosturi. Pogrbljena baka tegli na leđima divovski naramak drva.\n" +
        "                Mršava deca naduvenih trbuha, u poderanim gaćama, stoje kraj puta i mašu. Kvašiorkor, <em>stomak\n" +
        "                    gladi</em>.«</p>\n" +
        "            <p>Stomak gladi. Ulica <a href=\"#\">Nezavisnosti</a>. Tugaljiv kurati ponos.</p>";

    $(".mark").on('click tap touchstart', () => {
        console.log("mark clicked...");
        let note = $(".note"),
            noteTxtCont = $(".note-text");
        note.css({"visibility": "hidden"});
        noteTxtCont.html(noteTxt);
        let noteH = noteTxtCont.height();
        note.height(noteH + 16);
        note.css({"visibility": "visible"});
    });

    $("#note-x").on('click tap touchstart', () => {
        $(".note").css({"visibility": "hidden"});
    });

});