$(document).ready(function () {

    let widthBase = 0.238;
    let idealRatio = 1.45;

    let setSize = () => {

        let h = window.innerHeight;
        let w = window.innerWidth;
        let wSvg = h * idealRatio;
        let wAside = w - wSvg;

        if (wAside < w * widthBase) {
            wAside = w * widthBase;
            wSvg = window.innerWidth - wAside;
        }

        $("#main-map").attr("height", h).attr("width", wSvg);
        $(".side-content").css("width", wAside);
    }

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


    setSize();
    zoomSettings();

    // $(window).resize(() => {
    //     setSize();
    // });

    // document.getElementById('reset').addEventListener('click', function (ev) {
    //     ev.preventDefault()
    //     panZoom.resetZoom()
    // });



    let noteTxt = "<p>Lazar i Marko putuju do vulkana. »Pogled mi klizne kroz prozor, u baruštine i sirotinjska sela. Krave se\n" +
        "                vuku kroz blato kao tužni, olindrali kosturi. Pogrbljena baka tegli na leđima divovski naramak drva.\n" +
        "                Mršava deca naduvenih trbuha, u poderanim gaćama, stoje kraj puta i mašu. Kvašiorkor, <em>stomak\n" +
        "                    gladi</em>.«</p>\n" +
        "            <p>Stomak gladi. Ulica <a href=\"#\">Nezavisnosti</a>. Tugaljiv kurati ponos.</p>";

    $(".mark").click(() => {
        console.log("mark clicked...");
        let note = $(".note"),
            noteTxtCont = $(".note-text");
        note.css({"visibility": "hidden"});
        noteTxtCont.html(noteTxt);
        let noteH = noteTxtCont.height();
        note.height(noteH + 16);
        note.css({"visibility": "visible"});
    });

    $("#note-x").click(() => {
        $(".note").css({"visibility": "hidden"});
    });

});