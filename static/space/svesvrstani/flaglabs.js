$(document).ready(function () {

    let flagGenAPI = "_generate_flags",
        saveAPI = "_save",
        urlGen = $SCRIPT_ROOT + flagGenAPI,
        urlSave = $SCRIPT_ROOT + saveAPI,
        svgCount = 0;

    let setSvgEvents = () => {
        for (let i = 0; i < svgCount; i++) {
            d3.select("#flag" + i).on("click", () => {
                let saveParams = {vector: i};
                $.getJSON(urlSave, saveParams).done(() => {
                    console.log("flag saved.");
                });
            });
        }
    };

    let setSvgEventsPng = () => {
        for (let i = 0; i < svgCount; i++) {
            d3.select("#flag" + i).on("click", () => {
                console.log("SAVING IMAGE...");
                let s = { w: 600, h: 400 };
                let svg = $("#flag" + i).get(0).outerHTML;
                let canvas = document.createElement("canvas");
                canvas.width = s.w;
                canvas.height = s.h;
                let context = canvas.getContext('2d');

                let v = canvg.Canvg.fromString(context, svg, {
                    ignoreDimensions: true,
                    scaleWidth: s.w,
                    scaleHeight: s.h,
                    offsetX: 56.25,
                    offsetY: 37.5
                });
                v.start();

                let img = canvas.toDataURL("image/png");
                const link = document.createElement('a');
                link.download = 'flag.png';
                link.href = canvas.toDataURL("image/png");
                link.click();
            });
        }
    };

    $("#go").click(() => {

        let flags = $("#flags");
        flags.empty();

        let data = [];
        $("input[type=range]").each(function () {
            let input = $(this);
            let d = {
                "value": +input.val(),
                "key": input.attr("name"),
                "type": input.attr("data-input-type")
            };
            data.push(d);
        });

        let params = {vector: JSON.stringify(data)};
        $.getJSON(urlGen, params, (result) => {
            flags.empty();
            result.forEach((i) => {
                flags.append(i);
            });
            svgCount = result.length;
        }).done(() => {
            // setSvgEvents();
            setSvgEventsPng();
            console.log("flags received from backend, baby");
        });

    });

});