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

    let downloadSVG = (flag) => {
        flag.attr({
            "xmlns": "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink"
        });
        let svgData = flag.get(0).outerHTML;
        let svgBlob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
        let svgUrl = URL.createObjectURL(svgBlob);
        let downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = "flag.svg";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    let downloadPNG = (flag) => {
        console.log("saving png...");
        let s = {w: 600, h: 400};
        let svg = flag.get(0).outerHTML;

        let viewboxAttr = 'viewBox="0 0 150 100" preserveAspectRatio="xMidYMid meet"';
        let hwAttr = 'height="100px" width="150px"';
        svg = svg.replace(viewboxAttr, hwAttr);

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
    }

    $("#svg").click(() => {
        let flag = $(".chosen-flag > svg")
        downloadSVG(flag);
    });

    $("#png").click(() => {
        let flag = $(".chosen-flag > svg")
        downloadPNG(flag);
    });

    let setFlagClick = () => {
        for (let i = 0; i < svgCount; i++) {
            d3.select("#flag" + i).on("click", () => {
                $(".flag-downloader-back").fadeIn(100);
                let flag = $("#flag" + i);
                let flagCode = flag.get(0).outerHTML
                $(".chosen-flag").html(flagCode);
            });
        }
    };

    $("#go").click(() => {

        let flags = $("#flags");
        flags.empty();

        let spinner = $("#spinner");
        spinner.show();

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
            // $("#flags svg").attr("title", "Tooltip");
            spinner.hide();
            setFlagClick();
            console.log("flags received from backend, baby");
        });

    });

    let exitDownloader = () => {
        $(".flag-downloader-back").fadeOut(180, () => {
           $(".chosen-flag").html("");
        });
    };

    $("#exit").click(() => {
        exitDownloader();
    });

    $("#outer").click(() => {
        exitDownloader();
    }).children().on('click', function (e) {
        e.stopPropagation();
    });

});