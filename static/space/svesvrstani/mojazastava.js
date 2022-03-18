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
    };

    $(".continue").click(() => {
       $("#continued").show();
    });

});