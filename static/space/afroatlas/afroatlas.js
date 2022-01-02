$(document).ready(function () {

    let setSize = () => {
        let h = window.innerHeight;
        // let wSvg = h * 1.401;
        let wSvg = h * 1.45;
        let wAside = window.innerWidth - wSvg;

        $("#test-svg")
            .attr("height", h)
            .attr("width", wSvg);
        // $("#aside-main").css("width", wAside);
        $(".side-content").css("width", wAside);
    }

    let zoomSettings = () => {
        let panZoom = svgPanZoom('#test-svg', {
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
        let n = $(".note"),
            noteTxtCont = $(".note-text");
        n.css({"visibility": "hidden"});
        noteTxtCont.html(noteTxt);
        let noteH = noteTxtCont.height();
        n.height(noteH + 16);
        n.css({"visibility": "visible"});
        console.log(noteH);
        console.log(noteTxtCont.height());
    });

    $("#note-x").click(() => {
        $(".note").css({"visibility": "hidden"});
    });

});