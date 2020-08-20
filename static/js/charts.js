let chartUtility = (function () {

    /* Lang Section */

    let langParams;
    let currentItem;
    let dataCopy = [];
    let lang, pictoData, maximumProjectCount;
    let hovering = false;

    let setLangParams = function (params) {
        langParams = params;
        lang = params.lang;
        dataCopy = params.pictodata;
        maximumProjectCount = params.max;
    };

    let currentYear = function () {
        return (new Date()).getFullYear();
    };

    let mobileQuery = "(max-width: 650px)";

    /* Flowerchart Section */

    let flowerchartSVG, linechartSVG;

    let flowerchartParameters = {};

    let linechartParameters = {
        radius: 2.5,
        firstDate: new Date(1984, 1),
        lastDate: new Date(currentYear(), 1),
        yearParser: d3.timeParse("%Y"),
        xShift: 0
    };

    let parameters = {
        animationDuration: 300,
        animationDurationPictome: 400,
        precision: 1,
        animationInterval: 2000,
        maxProjectCount: 0,
        radius: 0
    };

    let generalFlowerPictogram = {
        name: "All Projects",
        id: "general",
        graphics: {
            "headcx": 8.5,
            "headcy": 5.131,
            "headr": 3.614,
            "arm1d": "M0.066,12.942c0.601,0,7.435,0,8.601,0 s7.716,0,8.399,0",
            "arm2d": "M0.066,12.942c0.601,0,7.435,0,8.601,0 s7.716,0,8.399,0",
            "leg1d": "M1.153,34.434 c0.28-0.635,7.486-16.977,7.486-16.977S15.628,33.7,15.98,34.434",
            "leg2d": "M1.153,34.434 c0.28-0.635,7.486-16.977,7.486-16.977S15.628,33.7,15.98,34.434"
        }
    };

    let drawPictogram = function (categoryId) {

        let pictogramClass = ".category-pictogram",
            //pictoHeight = 88, pictoWidth = 43, scale = 2.55;
            pictoHeight = 75, pictoWidth = 34, scale = 2;

        let pictogramSvg = d3.select(pictogramClass).append("svg")
            .attr("width", pictoWidth)
            .attr("height", pictoHeight)
            .attr("id", "categoryPictogramSvg");

        let item = dataCopy.find(object => {
            return object.id === categoryId;
        });

        let pictogramParams = {
            data: item.graphics,
            svg: pictogramSvg,
            width: pictoWidth,
            height: pictoHeight,
            class: pictogramClass,
            id: item.id,
            rectClass: "fill-bg",
            dotClass: "pictome-dot",
            scale: scale,
            idPrefix: "category-pictogram",
            rectMouseover: function () {
            },
            rectMouseout: function () {
            },
            transformFn: function () {
                return "scale(" + scale + " " + scale + ")";
            },
            rectClick: function () {
            }
        };
        drawSinglePictogram(pictogramParams);

    };

    // Project List Pictogram Symbol

    let listSymbol = {
        name: "All Projects",
        id: "all",
        graphics: {
            "headcx": 8.5,
            "headcy": 4.8,
            "headr": 3.5,
            "arm1d": "M1.2,15.3 1.2,34",
            "arm2d": "M16,15.3 16,34",
            "leg1d": "M6.1,15.3 6.1,34",
            "leg2d": "M11.1,15.3 11.1,34"
        }
    };

    let drawSymbolArray = function () {

        let params = projectPictolistParams,
            scale = 1.16,
            w = 17 * scale,
            h = 35 * scale;

        dataCopy.forEach(function (d, i) {

            let symbolSvg = d3.select("#" + d.id + "-symbol").append("svg")
                .attr("width", w).attr("height", h)
                .attr("id", "symbolSvg");

            let pictogramParams = {
                data: d.graphics, id: d.id,
                svg: symbolSvg, width: w, height: h, class: params.class,
                rectClass: params.rectClass, dotClass: params.dotClass,
                scale: scale, idPrefix: params.idPrefix,
                rectMouseover: function () {
                }, rectMouseout: function () {
                }, transformFn: function () {
                    return "translate(0, 0) scale(" + scale + " " + scale + ")";
                }, rectClick: function () {
                }
            };
            drawSinglePictogram(pictogramParams);

        });

        // let pctgrm = dataCopy.find(object => {
        //     return object.id === "ai";
        // });

        // let symbolSvg = d3.select(".symbol").append("svg")
        //     .attr("width", w).attr("height", h)
        //     .attr("id", "symbolSvg");
        //
        // let pictogramParams = {
        //     data: pctgrm.graphics, id: pctgrm.id,
        //     svg: symbolSvg, width: w, height: h, class: params.class,
        //     rectClass: params.rectClass, dotClass: params.dotClass,
        //     scale: scale, idPrefix: params.idPrefix,
        //     rectMouseover: function () {
        //     }, rectMouseout: function () {
        //     }, transformFn: function () {
        //         return "translate(0, 0) scale(" + scale + " " + scale + ")";
        //     }, rectClick: function () {
        //     }
        // };
        // drawSinglePictogram(pictogramParams);

    };

    let drawProjectListSymbol = function (pictogramId) {

        params = projectPictolistParams;

        let pctgrm;
        if (pictogramId === "general") {
            pctgrm = generalFlowerPictogram;
        } else {
            pctgrm = dataCopy.find(object => {
                return object.id === pictogramId;
            });
        }

        let scale = 1.43;
        if (window.matchMedia(mobileQuery).matches) {
            scale = 2.6;
        }
        let w = 17 * scale,
            h = 35 * scale;

        let symbolSvg = d3.select(".symbol").append("svg")
            //.attr("viewBox", "0 0 " + w + " " + h).attr("preserveAspectRatio", "xMinYMin meet")
            .attr("width", w).attr("height", h)
            .attr("id", "symbolSvg");

        let pictogramParams = {
            data: pctgrm.graphics,
            svg: symbolSvg,
            width: w,
            height: h,
            class: params.class,
            id: pctgrm.id,
            rectClass: params.rectClass,
            dotClass: params.dotClass,
            scale: scale,
            idPrefix: params.idPrefix,
            rectMouseover: function () {
            },
            rectMouseout: function () {
            },
            transformFn: function () {
                return "translate(0, 0) scale(" + scale + " " + scale + ")";
            },
            rectClick: function () {
            }
        };

        drawSinglePictogram(pictogramParams);

    };

    // Pictolist Section

    let projectPictolistParams = {
        scale: 1.5,
        svg: ".project-pictogram-list",
        class: "pictolist-item",
        rectClass: "light-fill",
        dotClass: "pictome-dot",
        idPrefix: "item-pictolist",
        getPictolistWidth: function (className) {
            let introDiv = d3.select('.article-main-description').node();
            return introDiv.getBoundingClientRect().width;
        }
    };

    let createProjectPictolist = function (tags, params = projectPictolistParams) {

        let pictoGap = 17 * params.scale,
            pictoWidth = 17 * params.scale,
            pictolistHeight = 35 * params.scale,
            pictolistWidth = (pictoWidth * tags.length) + (pictoGap * (tags.length - 1));
        pictoWidthPlusGap = pictoWidth + pictoGap;

        let pictolistSvg;
        if ((window.matchMedia(mobileQuery).matches) &&
            ((window.innerWidth - 40) < pictolistWidth)) {
            pictolistSvg = d3.select(params.svg).append("svg")
                .attr("viewBox", "0 0 " + pictolistWidth + " " + pictolistHeight)
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("id", "projectPictolistSvg");
        } else {
            pictolistSvg = d3.select(params.svg).append("svg")
                .attr("width", pictolistWidth).attr("height", pictolistHeight)
                .attr("id", "projectPictolistSvg");
        }

        tags.forEach(function (d, i) {

            let item = dataCopy.find(object => {
                return object.id === d.id;
            });

            let pictogramParams = {
                data: item.graphics,
                svg: pictolistSvg,
                width: pictoWidth,
                height: pictolistHeight,
                class: params.class,
                id: item.id,
                rectClass: params.rectClass,
                dotClass: params.dotClass,
                scale: params.scale,
                idPrefix: params.idPrefix,
                rectMouseover: function () {
                    d3.selectAll("#" + params.idPrefix + "-" + item.id).classed("sun-stroke-only", true);
                    d3.selectAll("#" + params.idPrefix + "-" + item.id + "Dot").classed("pictome-dot-sun", true);
                    d3.select(".project-categories").html(item.name.title);
                    d3.select(".project-categories").style("opacity", 1);
                },
                rectMouseout: function () {
                    d3.selectAll("#" + params.idPrefix + "-" + item.id).classed("sun-stroke-only", false);
                    d3.selectAll("#" + params.idPrefix + "-" + item.id + "Dot").classed("pictome-dot-sun", false);
                    d3.select(".project-categories").html(langParams.project_captions.categories_title);
                    d3.select(".project-categories").style("opacity", 0);
                },
                transformFn: function () {
                    return "translate(" + (pictoWidthPlusGap * i) + ",0) "
                        + "scale(" + params.scale + " " + params.scale + ")";
                },
                rectClick: function () {
                    url = langParams.paths.projects + langParams.paths.category + item.id;
                    window.open(url, "_self");
                }
            };

            drawSinglePictogram(pictogramParams);
        });

    };

    // Polar Chart Section

    let drawPolarChart = function (origRanks) {

        let radius = 80,
            w = 493,
            h = 2 * radius + 2,
            hext = h + 55,
            center = {x: 197, y: h / 2},
            startAngle = (Math.PI) - Math.PI / 3,
            incrementAngle = 2 * Math.PI / 3,
            ranks = [+origRanks.visual, +origRanks.digital, +origRanks.textual],
            data = [], axisData = [], labels = [],
            textAnchor = "start";

        let xPositionAdjustment = (langParams.lang === 'en') ? 0 : 15;

        let captions = langParams.project_captions.polarchart;
        labels[0] = captions.visual;
        labels[1] = captions.digital;
        labels[2] = captions.textual;
        labels[0].tx = 0;
        labels[1].tx = 0;
        labels[2].tx = w - 145;
        labels[0].yadj = 6;
        labels[1].yadj = 6;
        labels[2].yadj = 6;
        labels[0].xLine = 55 + xPositionAdjustment;
        labels[1].xLine = 55 + xPositionAdjustment;
        labels[2].xLine = w - 200;
        labels[0].lineLength = 75 - xPositionAdjustment;
        labels[1].lineLength = 75 - xPositionAdjustment;
        labels[2].lineLength = 42;
        labels[0].txtAnchor = textAnchor;
        labels[1].txtAnchor = textAnchor;
        labels[2].txtAnchor = textAnchor;

        let mobileYAdj = 0;

        let lineH = 18, firstLine = 32;

        if (window.matchMedia(mobileQuery).matches) {
            radius = 90;
            w = 360;
            h = 250;
            hext = h;
            center = {x: w / 2, y: h / 2 - 25};

            labels[2].txtAnchor = "end";
            labels[2].yadj = -18;
            labels[2].tx = w;
            lineH = 20;
            firstLine = 36;

            labels[0].xLine = 65 + xPositionAdjustment;
            labels[1].xLine = 65 + xPositionAdjustment;
            labels[0].lineLength = 45 - xPositionAdjustment;
            labels[1].lineLength = 45 - xPositionAdjustment;
            labels[2].lineLength = 76;
        }

        let p = {
            x: (t, r, cx) => r * Math.cos(t) + cx,
            y: (t, r, cy) => r * Math.sin(t) + cy
        };

        let polarMap = d3.scaleLinear()
            .domain([0, 4])
            .range([0, radius]);

        let rad2deg = function (angle) {
            return angle * (180 / Math.PI);
        };

        for (let i = 0; i < ranks.length; i++) {
            let currentAngle = startAngle + (i * incrementAngle);
            let halfRank = 0.5;
            let yText = p.y(currentAngle, polarMap(4), center.y) - labels[i].yadj;
            let yLine = p.y(currentAngle, polarMap(4), center.y);
            data[i] = {
                x: p.x(currentAngle, polarMap(ranks[i]), center.x),
                y: p.y(currentAngle, polarMap(ranks[i]), center.y),
                rank: ranks[i],
                angle: currentAngle,
                textAngle: rad2deg(currentAngle),
                label: labels[i],
                tx: labels[i].tx,
                ty: 10 + yText,
                tx2: labels[i].tx,
                ty2: [firstLine + yText,
                    firstLine + lineH + yText,
                    firstLine + 2 * lineH + yText],
                xLine: labels[i].xLine,
                txtAnchor: labels[i].txtAnchor,
                yLine: yLine,
                lineLength: labels[i].lineLength
            };
            for (let j = 0; j < 4; j++) {
                axisData.push({
                    x: p.x(currentAngle, polarMap(j + halfRank), center.x),
                    y: p.y(currentAngle, polarMap(j + halfRank), center.y)
                });
            }
        }

        let polarSvg = d3.select("#polar-chart-svg")
            .attr("viewBox", "0 0 " + w + " " + hext)
            .selectAll("svg");

        polarSvg.data([1, 2, 3, 4]).enter()
            .append("circle")
            // .attr("class", d => (d == 4) ? "final-ring-circle" : "ring-circle")
            .attr("class", "ring-circle")
            .attr("r", d => polarMap(d))
            .attr("cx", center.x)
            .attr("cy", center.y)
            .attr("transform", "rotate(180 " + center.x + " " + center.y + ")");

        polarSvg.data(axisData).enter()
            .append("circle")
            .attr("class", "tick-circle")
            .attr("r", 0.5)
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        let svgData = polarSvg.data(data).enter();

        svgData.append("circle")
            .classed("arms-end-circle", true)
            .attr("r", 2.5)
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        svgData.append("line")
            .attr("class", "arms-line")
            .attr("x1", center.x)
            .attr("y1", center.y)
            .attr("x2", d => d.x)
            .attr("y2", d => d.y);

        svgData.append("circle")
            .attr("class", "central-circle")
            .attr("r", 4.7)
            .attr("cx", center.x)
            .attr("cy", center.y);

        svgData.append("text")
            .attr("class", "text1")
            .attr("x", d => d.tx)
            .attr("y", d => d.ty)
            .attr("text-anchor", d => d.txtAnchor)
            .text(d => d.label.head);

        for (let i = 0; i < labels.length; i++) {
            svgData.append("text")
                .attr("class", "text2")
                .attr("x", d => d.tx2)
                .attr("y", d => d.ty2[i])
                .attr("text-anchor", d => d.txtAnchor)
                .text(d => d.label.sub[i]);
        }

        svgData.append("line")
            .attr("class", "pointer-line")
            .attr("x1", d => d.xLine)
            .attr("y1", d => d.yLine)
            .attr("x2", d => d.xLine + d.lineLength)
            .attr("y2", d => d.yLine);

    };

    // Flowerchart Section

    let flowerParamsIndex = {

        pictoMouseover: function (d) {
        },
        pictoMouseout: function (d) {
        },
        bgFillClass: "light-fill",
        dottedLineStrokeClass: "dark-stroke",
        pictomeSmallClass: "pictome-small-dark",
        pictoDotClass: "pictome-dot-flower"

    }

    let getFlowerParamsFooter = function () {
        return flowerParamsFooter;
    };
    let getFlowerParamsIndex = function () {
        return flowerParamsIndex;
    };

    let createFlowerchart = function (fp = flowerParamsFooter) {

        let fw = 340, ph = 35, pw = 17;

        flowerchartParameters = {
            divClass: ".flowerchart",
            flowerWidth: fw,
            pictogramHeight: ph,
            pictogramWidth: pw,
            halfPictogramHeight: ph / 2,
            halfPictogramWidth: pw / 2,
            halfFlowerWidth: fw / 2,
            // flowerHeight: (fw + ph)/2,
            flowerHeight: fw * 0.53,
            prevItem: null,
            fp: fp
        };

        flowerchartSVG = d3.select(flowerchartParameters.divClass).append("svg")
            .attr("viewBox", "0 0 "
                + flowerchartParameters.flowerWidth + " "
                + flowerchartParameters.flowerHeight)
            .attr("preserveAspectRatio", "xMinYMid meet")
            .attr("id", "flowerchartSvgId");

        let pictogramParams = {
            data: generalFlowerPictogram.graphics,
            svg: flowerchartSVG,
            width: flowerchartParameters.pictogramWidth,
            height: flowerchartParameters.pictogramHeight,
            //class: "pictome-small-sun",
            class: "pictome-small-dark",
            id: "general",
            rectClass: fp.bgFillClass,
            dotClass: "invisible",
            scale: 1,
            idPrefix: "pictogram",
            tooltip: langParams.tooltip.projects_index,

            rectMouseover: function () {
                // return fp.pictoMouseover(genData);
            },
            rectMouseout: function () {
                // return fp.pictoMouseout(genData);
            },
            transformFn: function () {
                let tx = flowerchartParameters.halfFlowerWidth - flowerchartParameters.halfPictogramWidth;
                return "translate(" + tx + " " + 0 + ")";
            },
            rectClick: function () {
                url = langParams.paths.projects;
                window.open(url, "_self");
            }
        };
        drawSinglePictogram(pictogramParams);

        mapDataToFlowerchart();

    };

    let mapDataToFlowerchart = function (data = dataCopy) {

        let params = flowerchartParameters,
            angle = 180 / (data.length - 1),
            angleRad = angle * Math.PI / 180,
            // rad1 = 50, rad2 = 135,
            rad1 = 50, rad2 = 115,
            rad3 = params.halfFlowerWidth - params.pictogramHeight,
            fp = params.fp;

        flowerchartSVG.selectAll("svg")
            .data(data)
            .enter()
            .append("line")
            .attr("class", "dashed " + fp.dottedLineStrokeClass)
            .attr("id", function (d) {
                return "line-" + d.id;
            })
            .attr("x1", function (d, i) {
                return params.halfFlowerWidth + rad1 * Math.cos(angleRad * (data.length - 1 - i));
            })
            .attr("y1", function (d, i) {
                return params.halfPictogramWidth + rad1 * Math.sin(angleRad * (data.length - 1 - i));
            })
            .attr("x2", function (d, i) {
                return params.halfFlowerWidth + rad2 * Math.cos(angleRad * (data.length - 1 - i));
            })
            .attr("y2", function (d, i) {
                return params.halfPictogramWidth + rad2 * Math.sin(angleRad * (data.length - 1 - i));
            });

        data.forEach(function (d, i) {

            let pictogramParams = {
                data: d.graphics,
                svg: flowerchartSVG,
                width: flowerchartParameters.pictogramWidth,
                height: flowerchartParameters.pictogramHeight,
                class: fp.pictomeSmallClass,
                id: d.id,
                rectClass: fp.bgFillClass,
                dotClass: fp.pictoDotClass,
                scale: 1,
                idPrefix: "pictogram",
                tooltip: d.name.title,

                rectMouseover: function () {
                    //return fp.pictoMouseover(d);
                },
                rectMouseout: function () {
                    //return fp.pictoMouseout(d);
                },
                transformFn: function () {
                    let hpw = flowerchartParameters.halfPictogramWidth,
                        tx = flowerchartParameters.halfFlowerWidth - hpw,
                        ty = hpw + rad3,
                        alpha = 90 - (angle * i);
                    return "translate(" + tx + " " + ty + ")" +
                        "rotate(" + alpha + " " + hpw + " " + (-rad3) + ")";
                },
                rectClick: function () {
                    url = langParams.paths.projects + langParams.paths.category + d.id;
                    window.open(url, "_self");
                }
            };
            drawSinglePictogram(pictogramParams);
        });
    };

    let drawSinglePictogram = function (params) {

        var pictogram = params.svg.append("g")
            .attr("id", params.idPrefix + "-" + params.id)
            .attr("class", params.class)
            .style("pointer-events", "none")
            .attr("width", params.width)
            .attr("height", params.height)
            .attr("transform", params.transformFn);

        pictogram.append("svg:title")
            .text(params.tooltip);

        pictogram.append("rect")
            .attr("class", params.rectClass)
            .attr("id", params.id + "Rect")
            .style("pointer-events", "all")
            .attr("stroke", "none")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", params.width / params.scale)
            .attr("height", params.height / params.scale)
            .on("mouseover", params.rectMouseover)
            .on("mouseout", params.rectMouseout)
            .on("click", params.rectClick);

        pictogram.append("circle")
            .attr("id", params.id + "Head")
            .attr("cx", params.data.headcx)
            .attr("cy", params.data.headcy)
            .attr("r", params.data.headr);

        pictogram.append("path")
            .attr("id", params.id + "Arm1")
            .attr("d", params.data.arm1d);

        pictogram.append("path")
            .attr("id", params.id + "Arm2")
            .attr("d", params.data.arm2d);

        pictogram.append("path")
            .attr("id", params.id + "Leg1")
            .attr("d", params.data.leg1d);

        pictogram.append("path")
            .attr("id", params.id + "Leg2")
            .attr("d", params.data.leg2d);

        pictogram.append("circle")
            .attr("id", params.idPrefix + "-" + params.id + "Dot")
            .attr("class", params.dotClass)
            .attr("cx", params.data.dotcx)
            .attr("cy", params.data.dotcy)
            .attr("r", params.data.dotr);

    };

    let periodicalAnimationParamsIndex = {

        d: {
            head: "#head",
            dot: "#dot",
            arm1: "#arm1",
            arm2: "#arm2",
            leg1: "#leg1",
            leg2: "#leg2"
        },

        hoverEffects: function () {
            // d3.selectAll(".pictome, #pictome-bg, #dot, #creates-what, #link-to-projects, #linechart-svg")
            d3.selectAll("#pictome-bg, #creates-what, #link-to-projects, #linechart-svg")
                .on("mouseover", function () {
                    hovering = true;
                    d3.selectAll(".pictome").classed("sun-stroke-only", true);
                    d3.selectAll("#dot").classed("pictome-dot-sun", true);
                    d3.selectAll("#link-to-projects").classed("manual-hover", true);
                    linechartParameters.radius = 3;
                    d3.selectAll(".linechartLine").attr("stroke-width", 3);
                    d3.selectAll(".linechartCircleVisible").attr("r", linechartParameters.radius);
                })
                .on("mouseout", function (d, i) {
                    hovering = false;
                    d3.selectAll(".pictome").classed("sun-stroke-only", false);
                    d3.selectAll("#dot").classed("pictome-dot-sun", false);
                    d3.selectAll("#link-to-projects").classed("manual-hover", false);
                    linechartParameters.radius = 2.5;
                    d3.selectAll(".linechartLine").attr("stroke-width", 2);
                    d3.selectAll(".linechartCircleVisible").attr("r", linechartParameters.radius);
                })
                .on("click", function () {
                    hovering = false;
                    if (currentItem) {
                        let url = langParams.paths.projects + langParams.paths.category + currentItem.id;
                        window.open(url, "_self");
                    }
                });
        },

        flowerchartUpdate: function () {
            if (flowerchartParameters.prevItem) {
                d3.select("#pictogram-" + flowerchartParameters.prevItem.id)
                    .attr("class", "pictome-small-dark");
                d3.select("#line-" + flowerchartParameters.prevItem.id)
                    .attr("class", "dashed dark-stroke");
                d3.select("#pictogram-" + flowerchartParameters.prevItem.id + "Dot")
                    .classed("pictome-dot-sun", false);
            } else {
                flowerchartParameters.prevItem = {};
            }
        },

        linechartUpdate: function (randomItem) {
            if (hovering) {
                d3.selectAll("#link-to-projects").classed("manual-hover", true);
            }
            updateLinechart(randomItem.projects, parameters.animationDuration)
        }

    };

    let periodicalAnimationParamsFooter = {
        d: {
            head: "#head",
            dot: "#dot",
            arm1: "#arm1",
            arm2: "#arm2",
            leg1: "#leg1",
            leg2: "#leg2"
        },
        hoverEffects: function () {
        },
        flowerchartUpdate: function () {
        },
        linechartUpdate: function () {
        }
    };

    let periodicalAnimationParamsFooterPL = {
        d: {
            head: "#head, #generalHead",
            dot: "#dot, #item-pictolist-generalDot",
            arm1: "#arm1, #generalArm1",
            arm2: "#arm2, #generalArm2",
            leg1: "#leg1, #generalLeg1",
            leg2: "#leg2, #generalLeg2"
        },
        hoverEffects: function () {
        },
        flowerchartUpdate: function () {
        },
        linechartUpdate: function () {
        }
    };

    let getPeriodicalAnimationParamsIndex = function () {
        return periodicalAnimationParamsIndex;
    };
    let getPeriodicalAnimationParamsFooter = function () {
        return periodicalAnimationParamsFooter;
    };
    let getPeriodicalAnimationParamsFooterPL = function () {
        return periodicalAnimationParamsFooterPL;
    };

    let metaAnimation = function (pictogramId) {
        let animParameters;
        if (pictogramId === "general") {
            animParameters = getPeriodicalAnimationParamsFooterPL();
        } else {
            animParameters = getPeriodicalAnimationParamsFooter();
        }
        setPeriodicalAnimation(animParameters);
    };

    let setPeriodicalAnimation = function (params = getPeriodicalAnimationParamsFooter()) {

        params.hoverEffects();

        setInterval(function () {

            if (document.hasFocus()) {

                params.flowerchartUpdate();

                d3.selectAll('.anchors').classed('hovered', false);

                let randomItem = dataCopy[Math.floor(Math.random() * dataCopy.length)];
                currentItem = randomItem;
                flowerchartParameters.prevItem = randomItem;

                d3.select("#creates-verb").html(randomItem.name.createsVerb);
                let baseLink = langParams.paths.projects + langParams.paths.category + randomItem.id;
                let linkToProjects = "<a id='link-to-projects' href='" + baseLink + "'>" + randomItem.name.case + "</a>";
                d3.select("#creates-what").html(linkToProjects);

                d3.select(linechartParamsIndex.class).attr("title", langParams.tooltip.linechart_index + randomItem.name.title);
                d3.select(".main-pictome").attr("title", langParams.tooltip.bio_link_index + randomItem.name.title);
                d3.select("#link-to-projects").attr("title", langParams.tooltip.bio_link_index + randomItem.name.title);

                d3.select('#' + randomItem.id + "-anchor").classed('hovered', true);

                d3.select("#pictogram-" + randomItem.id)
                    .attr("class", "pictome-small-sun");
                d3.select("#line-" + randomItem.id)
                    .attr("class", "dashed sun-stroke");
                d3.select("#pictogram-" + randomItem.id + "Dot")
                    .classed("pictome-dot-sun", true);

                d3.select("#pictome-svg");

                d3.selectAll(params.d.head)
                    .transition().duration(parameters.animationDurationPictome)
                    .ease(d3.easePolyOut)
                    .attr("cx", randomItem.graphics.headcx)
                    .attr("cy", randomItem.graphics.headcy)
                    .attr("r", randomItem.graphics.headr);

                d3.selectAll(params.d.dot)
                    .transition().duration(parameters.animationDurationPictome)
                    .ease(d3.easePolyOut)
                    .attr("cx", randomItem.graphics.dotcx)
                    .attr("cy", randomItem.graphics.dotcy)
                    .attr("r", randomItem.graphics.dotr);

                d3.selectAll(params.d.arm1)
                    .transition().duration(parameters.animationDurationPictome)
                    .ease(d3.easePolyOut)
                    .attrTween("d", baseUtility.pathTween(randomItem.graphics.arm1d, 3));

                d3.selectAll(params.d.arm2)
                    .transition().duration(parameters.animationDurationPictome)
                    .ease(d3.easePolyOut)
                    .attrTween("d", baseUtility.pathTween(randomItem.graphics.arm2d, 3));

                d3.selectAll(params.d.leg1)
                    .transition().duration(parameters.animationDurationPictome)
                    .ease(d3.easePolyOut)
                    .attrTween("d", baseUtility.pathTween(randomItem.graphics.leg1d, 3));

                d3.selectAll(params.d.leg2)
                    .transition().duration(parameters.animationDurationPictome)
                    .ease(d3.easePolyOut)
                    .attrTween("d", baseUtility.pathTween(randomItem.graphics.leg2d, 3));

                params.linechartUpdate(randomItem);
            }

        }, parameters.animationInterval);

    };

    let fillMissingDates = function (data) {
        let newData = data,
            startYear = linechartParameters.firstDate.getFullYear(),
            endYear = linechartParameters.lastDate.getFullYear();
        for (let i = startYear; i < endYear + 1; i++) {
            if (!(data.some(e => parseInt(e.year) === i))) {
                newData.push({"year": i.toString(), "projectCount": 0});
            }
        }
        newData.sort(function (obj1, obj2) {
            return parseInt(obj1.year) - parseInt(obj2.year);
        });
        return newData;
    };


    /* Linechart Section */

    let linechartParamsHeader = {
        computeWidth: function () {
            return d3.select(".main-container").node().getBoundingClientRect().width;
        },
        height: 50,
        class: ".linechart",
        margin: {top: 4, right: 4, bottom: 20, left: 4, lineAdj: 9, baseAdj: 8},
        ticks: [(new Date(1984, 1)), (new Date(currentYear(), 1))],
        xShift: 0
    };

    let linechartParamsIndex = {
        computeWidth: function () {
            if (window.matchMedia(mobileQuery).matches) {
                return window.innerWidth - 40;
            } else {
                return 440;
            }
        },
        height: 70,
        class: ".linechart-index",
        margin: {top: 4, right: 4, bottom: 28, left: 4, lineAdj: 9, baseAdj: 8},
        ticks: [(new Date(1984, 1)), (new Date(currentYear(), 1))],
        xShift: 0
    };

    let getLinechartParamsHeader = function (year = 1984) {
        let projectYear = +year;
        if ((projectYear !== undefined) && (projectYear !== currentYear())) {
            linechartParamsHeader.ticks = [
                (new Date(1984, 1)),
                (new Date(projectYear, 1)),
                (new Date(currentYear(), 1))];
        }
        return linechartParamsHeader;
    };
    let getLinechartParamsIndex = function () {
        return linechartParamsIndex;
    };

    let createLinechart = function (params = linechartParamsHeader) {

        linechartParameters.linechartWidth = params.computeWidth();
        linechartParameters.linechartHeight = params.height;
        linechartParameters.divClass = params.class;
        linechartParameters.tickDates2 = params.ticks;
        linechartParameters.params = params;
        linechartParameters.xShift = params.xShift;

        let margin = params.margin;
        linechartParameters.lineWidth = linechartParameters.linechartWidth - margin.left - margin.right;
        linechartParameters.lineHeight = linechartParameters.linechartHeight - margin.top - margin.bottom;

        linechartParameters.x = d3.scaleTime().range([0, linechartParameters.lineWidth]);

        linechartParameters.xAxis = d3.axisBottom().scale(linechartParameters.x)
            .tickValues(linechartParameters.tickDates2)
            .tickSize(0)
            .tickFormat(d3.timeFormat("%Y"));

        linechartSVG = d3.select(params.class)
            .append("svg")
            .attr("id", "linechart-svg")
            .attr("viewBox", "0 0 "
                + (linechartParameters.lineWidth + margin.left + margin.right) + " "
                + (linechartParameters.lineHeight + margin.top + margin.bottom))
            .attr("preserveAspectRatio", "xMinYMin meet")
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        linechartSVG.append("rect")
            .attr("class", "fill-bg")
            .attr("stroke", "none")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", linechartParameters.lineWidth)
            .attr("height", linechartParameters.lineHeight);

        linechartSVG.append("g")
            .attr("transform", "translate(0," + linechartParameters.lineHeight + ")")
            .attr("class", "linechartXaxis");

        linechartSVG.on("mouseover", function (d) {
            d3.select(this).classed("hover-pointer", true);
        })
            .on("mouseout", function (d) {
                d3.select(this).classed("hover-pointer", false);
            })
            .on("click", function (d) {
                let top = d3.select("#presentations").node().offsetTop;
                console.log(top);
                window.scroll({
                    top: top - 10,
                    left: 0,
                    behavior: 'smooth'
                });
            });

    };

    let drawLineChart = function (data = fillMissingDates([])) {
        updateLinechart(data);
    };

    let drawLineChartHeader = function (origTimeline) {

        let timelineData = [], maxCount = 0, projectYear;
        origTimeline.forEach(function (event, i) {
            if (i === 0) projectYear = +event.year;
            if (event.events.length > maxCount) maxCount = event.events.length;
            timelineData.push({year: event.year.toString(), projectCount: event.events.length});
        });

        tdata = fillMissingDates(timelineData);
        updateLinechart(tdata, 0, maxCount);
    };

    let drawLineChartHeaderPage = function (origTimeline) {
        let timelineData = [], maxCount = 0;
        origTimeline.forEach(function (item) {
            // if (i === 0) projectYear = +event.year;
            if (item.d > maxCount) maxCount = item.d;
            timelineData.push({year: item.year.toString(), projectCount: +item.d});
        });
        tdata = fillMissingDates(timelineData);
        updateLinechart(tdata, 0, maxCount);
    };

    let drawLineChartHeaderProjectList = function (origTimeline) {

        let timelineData = [], maxCount = 0;
        origTimeline.forEach(function (event, i) {
            if (event.projects > maxCount) maxCount = event.projects;
            timelineData.push({year: event.year.toString(), projectCount: event.projects});
        });

        tdata = fillMissingDates(timelineData);
        updateLinechart(tdata, 0, maxCount);
    };

    let updateLinechart = function (data, currentDuration = 0, maxCount = maximumProjectCount) {

        linechartParameters.y = d3.scaleLinear()
            .range([linechartParameters.lineHeight - linechartParameters.params.margin.lineAdj, 0])
            .domain([0, maxCount]);

        linechartParameters.yAxis = d3.axisLeft().scale(linechartParameters.y);
        linechartSVG.append("g")
            .attr("class", "linechartYaxis");

        linechartParameters.x.domain([linechartParameters.firstDate, linechartParameters.lastDate]);

        linechartSVG.selectAll(".linechartXaxis")
            .call(linechartParameters.xAxis);

        linechartSVG.selectAll("text")
            .attr("y", linechartParameters.params.margin.baseAdj)
            .attr("x", function (data) {
                if (data.getFullYear() === linechartParameters.firstDate.getFullYear()) {
                    return -3;
                } else if (data.getFullYear() === linechartParameters.lastDate.getFullYear() - 1) {
                    return -8;
                } else {
                    return 0;
                }
            })
            .style("text-anchor", function (data) {
                if (data.getFullYear() === linechartParameters.lastDate.getFullYear()) {
                    return "end";
                } else if ((data.getFullYear() === linechartParameters.firstDate.getFullYear())) {
                    return "start";
                } else {
                    return "end"; //"middle";
                }
            });

        let updateSelection = linechartSVG.selectAll(".linechartLine")
            .data([data], function (d) {
                return linechartParameters.yearParser(d.year)
            });

        updateSelection.enter()
            .append("path")
            .attr("class", "linechartLine")
            .attr("transform", "translate(" + linechartParameters.xShift + ", 0)")
            .merge(updateSelection)
            .transition()
            .duration(currentDuration)
            .ease(d3.easePolyOut)
            .attr('fill', 'none')
            .attr("d", d3.line()
                .x(function (d) {
                    return linechartParameters.x(linechartParameters.yearParser(d.year));
                })
                .y(function (d) {
                    return linechartParameters.y(d.projectCount);
                })
            );

        let circles = linechartSVG.selectAll(".linechartCircle")
            .data(data);

        circles.enter()
            .append("circle")
            .merge(circles)
            .transition()
            .duration(currentDuration)
            .ease(d3.easePolyOut)
            .attr("class", function (d) {
                let basicClass = "linechartCircle";
                let real = basicClass + " linechartCircleVisible";
                let imag = basicClass;
                return (d.projectCount > 0) ? real : imag;
            })
            .attr("cx", function (d) {
                return linechartParameters.x(linechartParameters.yearParser(d.year));
            })
            .attr("cy", function (d) {
                return linechartParameters.y(d.projectCount);
            })
            .attr("r", function (d) {
                return (d.projectCount > 0) ? linechartParameters.radius : 0;
            });

    }

    /* Return */

    return {
        setLangParams: setLangParams,
        createFlowerchart: createFlowerchart,
        getFlowerParamsIndex: getFlowerParamsIndex,
        createLinechart: createLinechart,
        drawLineChart: drawLineChart,
        getLinechartParamsIndex: getLinechartParamsIndex,
        getLinechartParamsHeader: getLinechartParamsHeader,
        setPeriodicalAnimation: setPeriodicalAnimation,
        createProjectPictolist: createProjectPictolist,
        drawLineChartHeader: drawLineChartHeader,
        drawLineChartHeaderProjectList: drawLineChartHeaderProjectList,
        drawLineChartHeaderPage: drawLineChartHeaderPage,
        drawProjectListSymbol: drawProjectListSymbol,
        getPeriodicalAnimationParamsIndex: getPeriodicalAnimationParamsIndex,
        drawPolarChart: drawPolarChart,
        metaAnimation: metaAnimation,
        drawSymbolArray: drawSymbolArray
    }

}());