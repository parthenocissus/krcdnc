$(document).ready(function () {

    /* Sliders */

    let sliderHtml = (key, label, type, data) => {
        return `<div class="slider-div"><input type="range" ` +
            `id="${key}" name="${key}" min="${data.min}" max="${data.max}" ` +
            `value="${data.value}" step="${data.step}" data-input-type="${type}">` +
            `<label for="warm">${label}</label></div>`;
    };

    let sliderGroup = $('#slider-group');

    for (let key in flagMappings) {
        let type = flagMappings[key]["type"];
        let label = flagMappings[key]["label"];
        let labelSr = flagMappings[key]["label_sr"];
        let data = flagMappings[key]["data"];
        sliderGroup.append(sliderHtml(key, labelSr, type, data));
    }

    /* Buttons */

    let genPrime = $("#gen-prime");
    genPrime.click(() => {
        genPrime.hide();
        $("#under-buttons").show();
        generate();
    });

    $("#gen-secundum").click(() => {
        generate();
    });

    let generate = () => {
        console.log("generating...");
        $("#flag").show();
        window.scrollTo(0, $("#flag").offset().top - 30);
    };

    $(".continue").click(() => {
        $("#continued").show();
        window.scrollTo(0, $(".continue").offset().top - 30);
    });

    let svg2pngDownloader = () => {
        let s = {w: 600, h: 400};

        let flagSvg = $("#flag-svg");
        flagSvg.attr({
            "width": "150px",
            "height": "100px"
        });

        // let svg = $("#flag").html();
        let svg = flagSvg.get(0).outerHTML;

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

        flagSvg.removeAttr("width");
        flagSvg.removeAttr("height");

    }

    $(".get-flag").click(() => {

        let failed = $(".failed");
        failed.hide();

        let valid = true;
        $(".required").each(function () {
            let element = $(this);
            if (element.val() === "") {
                valid = false;
            }
        });

        if (valid) {
            svg2pngDownloader();
        } else {
            failed.show();
        }

    });

});