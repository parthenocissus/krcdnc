$(document).ready(function () {

    // const genAPI = "_myflaggenerate";
    // const fromDatabaseAPI = "_myflagfromdatabase";

    const genAPI = "_generate_flags_clean";
    const fromDatabaseAPI = "_get_flags_from_database";

    let generate = (api) => {
        console.log("generating...");
        let flg = $("#flag");

        let genParams = {"n": 1};

        const urlGen = $SCRIPT_ROOT + api;

        $.getJSON(urlGen, genParams, (result) => {
            flg.empty();
            // flg.append(result.svg);
            flg.append(result[0]);
            let flagSvg = $("#flag-svg");
            flagSvg.removeAttr("width");
            flagSvg.removeAttr("height");
            flg.show();
            window.scrollTo(0, flg.offset().top - 70);
        }).done(() => {
            console.log("flag generated.");
            let svgH = $('#flag-svg').height();
            let viewportH = window.innerHeight;
            let svgTop = -(svgH - viewportH) / 2;
            $("#flag").css({top: svgTop + 'px'});
        });
    };

    setInterval(function () {
        let api = (Math.random() > .4) ? genAPI : fromDatabaseAPI;
        // let api = genAPI;
        // let api = fromDatabaseAPI;
        generate(api);
    }, 3500);

});