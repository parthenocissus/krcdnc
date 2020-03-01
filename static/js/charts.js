let chartUtility = (function () {

    /* Flowerchart Section */

    let dataCopy = [], flowerchartSVG, linechartSVG;

    let flowerchartParameters = {};

    let linechartParameters = {
            radius: 2.5,
            firstDate: new Date(1984, 1),
            lastDate: new Date(2020, 1),
            yearParser: d3.timeParse("%Y")
        };

    let parameters = {
            animationDuration: 300,
            animationDurationPictome: 400,
            precision: 1,
            animationInterval: 2000,
            maxProjectCount: 0,
            radius: 2
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
            rectMouseover: function () { },
            rectMouseout: function () { },
            transformFn: function () {
                return "scale(" + scale + " " + scale + ")";
            }
        }
        drawSinglePictogram(pictogramParams);

    };

    // Pictolist Section

    let projectPictolistParams = {
        scale: 3.2,
        svg: ".project-pictogram-list",
        class: "pictolist-item",
        rectClass: "light-fill",
        dotClass: "pictome-dot",
        idPrefix: "item-pictolist",
        getPictolistWidth: function (className) {
            let introDiv = d3.select('.article-main-description').node();
            return introDiv.getBoundingClientRect().width;
        }
    }

    let createProjectPictolist = function (tags, params = projectPictolistParams) {

        let pictoWidth = 17 * params.scale,
            pictolistHeight = 35 * params.scale, // 105px
            pictolistWidth = params.getPictolistWidth(), // 528px
            pictoCount = tags.length,
            pictoGap = (pictolistWidth - pictoCount * pictoWidth) / (pictoCount - 1),
            //pictoGap = 20 * params.scale,
            pictoWidthPlusGap = (pictoWidth + pictoGap) * 0.9;

        let pictolistSvg = d3.select(params.svg).append("svg")
            .attr("viewBox", "0 0 " + pictolistWidth + " " + pictolistHeight).attr("preserveAspectRatio", "xMinYMin meet")
            //.attr("width", pictolistWidth).attr("height", pictolistHeight)
            .attr("id", "projectPictolistSvg");

        tags.forEach(function (d, i) {

            let item = dataCopy.find(object => {
                return object.id === d;
            });

            console.log(item.graphics);

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
                    // d3.select(this).classed("hover-pointer", true);
                    // d3.selectAll("#pictolist-" + item.id).classed("sun-stroke-only", true);
                    // d3.selectAll("#pictolist-" + item.id + "Dot").classed("pictome-dot-sun", true);
                    // d3.select(".project-pictogram-name").html(item.name).style("opacity", 1);
                },
                rectMouseout: function () {
                    // d3.select(this).classed("hover-pointer", false);
                    // d3.selectAll("#pictolist-" + item.id).classed("sun-stroke-only", false);
                    // d3.selectAll("#pictolist-" + item.id + "Dot").classed("pictome-dot-sun", false);
                    // d3.select(".project-pictogram-name").style("opacity", 0);
                },
                transformFn: function () {
                    return "translate(" + (pictoWidthPlusGap * i) + ",0) "
                        + "scale(" + params.scale + " " + params.scale + ")";
                }
            }

            drawSinglePictogram(pictogramParams);
        });
    };

    // Flowerchart Section

    let flowerParamsIndex = {

        pictoMouseover: function (d) {
            //console.log("OVDE JE");
            // d3.select(this).classed("hover-pointer", true);
            // parameters.tooltip.html(generalFlowerPictogram.name)
            //     .style("visibility", "visible")
            //     .style("left", (d3.event.pageX) + "px")
            //     .style("top", (d3.event.pageY + 15) + "px");
        },

        pictoMouseout: function (d) {
            // d3.select(this).classed("hover-pointer", false);
            // parameters.tooltip.style("visibility", "hidden");
        },

        bgFillClass: "light-fill",
        dottedLineStrokeClass: "dark-stroke",
        pictomeSmallClass: "pictome-small-dark",
        pictoDotClass: "pictome-dot"

    }

    let getFlowerParamsFooter = function () {
        return flowerParamsFooter;
    };
    let getFlowerParamsIndex = function () {
        return flowerParamsIndex;
    };

    let createFlowerchart = function (fp = flowerParamsFooter) {

        let fw = 340, ph = 35, pw = 17,
            genData = {id: generalFlowerPictogram.id, name: generalFlowerPictogram.name};

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
            class: "pictome-small-sun",
            id: "general",
            rectClass: fp.bgFillClass,
            dotClass: "invisible",
            scale: 1,
            idPrefix: "pictogram",

            rectMouseover: function () {
                // return fp.pictoMouseover(genData);
            },
            rectMouseout: function () {
                // return fp.pictoMouseout(genData);
            },
            transformFn: function () {
                let tx = flowerchartParameters.halfFlowerWidth - flowerchartParameters.halfPictogramWidth;
                return "translate(" + tx + " " + 0 + ")";
            }
        };
        drawSinglePictogram(pictogramParams);

    };

    let addData = function (data) {

        data.forEach(function (d) {

            dataCopy.push({
                "id": d.id,
                "name": d.name,
                "createsVerb": d.createsVerb,
                "nameS": d.nameS,
                "createsVerbS": d.createsVerbS,
                "nameSCase": d.nameSCase,
                "graphics": d.graphics,
                //"projects": fillMissingDates(d.projects)
                "projects": d.projects
            });

            parameters.maxProjectCount = maximumProjectCount;

        });
    };

    let mapDataToFlowerchart = function (data) {

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
                }
            }
            drawSinglePictogram(pictogramParams);
        });
    }

    let drawSinglePictogram = function (params) {

        var pictogram = params.svg.append("g")
            .attr("id", params.idPrefix + "-" + params.id)
            .attr("class", params.class)
            .style("pointer-events", "none")
            .attr("width", params.width)
            .attr("height", params.height)
            .attr("transform", params.transformFn);

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
            .on("mouseout", params.rectMouseout);

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

    let setPeriodicalAnimation = function () {

        d3.selectAll(".pictome, #pictome-bg, #dot, #creates-what, #link-to-projects, #linechart-svg")
            .on("mouseover", function () {
                d3.selectAll(".pictome").classed("sun-stroke-only", true);
                d3.selectAll("#dot").classed("pictome-dot-sun", true);
                d3.selectAll("#link-to-projects").classed("manual-hover", true);
                linechartParameters.radius = 3;
                d3.selectAll(".linechartLine").attr("stroke-width", 1.5);
                d3.selectAll(".linechartCircleVisible").attr("r", linechartParameters.radius);
            })
            .on("mouseout", function (d, i) {
                d3.selectAll(".pictome").classed("sun-stroke-only", false);
                d3.selectAll("#dot").classed("pictome-dot-sun", false);
                d3.selectAll("#link-to-projects").classed("manual-hover", false);
                linechartParameters.radius = 2.5;
                d3.selectAll(".linechartLine").attr("stroke-width", 1);
                d3.selectAll(".linechartCircleVisible").attr("r", linechartParameters.radius);
            });

        setInterval(intervalFunction, parameters.animationInterval);

    };

    let intervalFunction = function () {

        if (document.hasFocus()) {

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

            let randomItem = dataCopy[Math.floor(Math.random() * dataCopy.length)];

            /* Link to project */
            /* Lang check */

            if (lang === "en") {
                d3.select("#creates-verb").html(randomItem.createsVerb);
                let linkToProjects = "<a id='link-to-projects' href='../work/projects/" + randomItem.id + "'>" + randomItem.name + "</a>";
                d3.select("#creates-what").html(linkToProjects);
            } else {
                d3.select("#creates-verb").html(randomItem.createsVerbS);
                let linkToProjects = "<a id='link-to-projects' href='../rad/projekti/" + randomItem.id + "'>" + randomItem.nameSCase + "</a>";
                d3.select("#creates-what").html(linkToProjects);
            }


            d3.select("#pictogram-" + randomItem.id)
                .attr("class", "pictome-small-sun");
            d3.select("#line-" + randomItem.id)
                .attr("class", "dashed sun-stroke");
            d3.select("#pictogram-" + randomItem.id + "Dot")
                .classed("pictome-dot-sun", true);

            d3.select("#pictome-svg");
                // .attr("viewBox", "0 0 " + 200 + " " + 200)
                // .attr("preserveAspectRatio", "xMinYMid meet");
                // .attr("tooltip-text", randomItem.name);

            d3.select("#head")
                .transition().duration(parameters.animationDurationPictome)
                .ease(d3.easePolyOut)
                .attr("cx", randomItem.graphics.headcx)
                .attr("cy", randomItem.graphics.headcy)
                .attr("r", randomItem.graphics.headr);

            d3.select("#dot")
                .transition().duration(parameters.animationDurationPictome)
                .ease(d3.easePolyOut)
                .attr("cx", randomItem.graphics.dotcx)
                .attr("cy", randomItem.graphics.dotcy)
                .attr("r", randomItem.graphics.dotr);

            d3.select("#arm1")
                .transition().duration(parameters.animationDurationPictome)
                .ease(d3.easePolyOut)
                .attrTween("d", baseUtility.pathTween(randomItem.graphics.arm1d, 3));

            d3.select("#arm2")
                .transition().duration(parameters.animationDurationPictome)
                .ease(d3.easePolyOut)
                .attrTween("d", baseUtility.pathTween(randomItem.graphics.arm2d, 3));

            d3.select("#leg1")
                .transition().duration(parameters.animationDurationPictome)
                .ease(d3.easePolyOut)
                .attrTween("d", baseUtility.pathTween(randomItem.graphics.leg1d, 3));

            d3.select("#leg2")
                .transition().duration(parameters.animationDurationPictome)
                .ease(d3.easePolyOut)
                .attrTween("d", baseUtility.pathTween(randomItem.graphics.leg2d, 3));

            updateLinechart(randomItem.projects, parameters.animationDuration);

            flowerchartParameters.prevItem = randomItem;

        }

    };

    // let fillMissingDates = function (data) {
    //     let newData = data,
    //         startYear = linechartParameters.firstDate.getFullYear(),
    //         endYear = linechartParameters.lastDate.getFullYear();
    //     for (let i = startYear; i < endYear + 1; i++) {
    //         if (!(data.some(e => parseInt(e.year) === i))) {
    //             newData.push({"year": i.toString(), "projectCount": 0});
    //         }
    //     }
    //     newData.sort(function (obj1, obj2) {
    //         return parseInt(obj1.year) - parseInt(obj2.year);
    //     });
    //     return newData;
    // };


    /* Linechart Section */

    let linechartParamsList = {
        computeWidth: function () {
            let a = d3.select(".project-list").node().getBoundingClientRect().width;
            let b = d3.select(".category-pictogram").node().getBoundingClientRect().width;
            return a - b;
        },
        height: 75,
        class: ".linechart",
        margin: {top: 4, right: 4, bottom: 28, left: 4},
        //ticks: [(new Date(1984, 1)), (new Date(1990, 1)), (new Date(2000, 1)), (new Date(2010, 1)), (new Date(2019, 1))]
        ticks: [(new Date(1984, 1)), (new Date(1989, 1)), (new Date(1994, 1)),
            (new Date(1999, 1)), (new Date(2004, 1)), (new Date(2009, 1)),
            (new Date(2014, 1)), (new Date(2020, 1))]
    }

    let linechartParamsIndex = {
        computeWidth: function () {
            return 340;
        },
        height: 100,
        class: ".linechart",
        margin: {top: 4, right: 4, bottom: 28, left: 4},
        ticks: [(new Date(1984, 1)), (new Date(2020, 1))]
    };

    let getLinechartParamsList = function () {
        return linechartParamsList;
    };
    let getLinechartParamsIndex = function () {
        return linechartParamsIndex;
    };

    let createLinechart = function (params = linechartParamsList) {

        linechartParameters.linechartWidth = params.computeWidth();
        linechartParameters.linechartHeight = params.height;
        linechartParameters.divClass = params.class;
        linechartParameters.tickDates2 = params.ticks;
        linechartParameters.params = params;

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
            .append("g");
            // .attr("transform",
            //     "translate(" + margin.left + "," + margin.top + ")");

        linechartSVG.append("rect")
            .attr("class", "fill-bg")
            .attr("stroke", "none")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", linechartParameters.lineWidth + margin.left + margin.right)
            .attr("height", linechartParameters.lineHeight + margin.top + margin.bottom);

        linechartSVG.append("g")
            .attr("transform", "translate(0," + linechartParameters.lineHeight + ")")
            .attr("class", "linechartXaxis");

        linechartSVG.on("mouseover", function (d) {
            d3.select(this).classed("hover-pointer", true);
        })
            .on("mouseout", function (d) {
                d3.select(this).classed("hover-pointer", false);
            });

    };

    let drawLineChart = function (data = fillMissingDates([])) {
        updateLinechart(data);
    };

    let drawLinechartForCategory = function (categoryId) {
        let item = dataCopy.find(object => {
            return object.id === categoryId;
        });
        updateLinechart(item.projects);
    };

    let updateLinechart = function (data, currentDuration = 0) {

        linechartParameters.y = d3.scaleLinear()
            .range([linechartParameters.lineHeight - 11, 4])
            .domain([0, parameters.maxProjectCount]);

        linechartParameters.yAxis = d3.axisLeft().scale(linechartParameters.y);
        linechartSVG.append("g")
            .attr("class", "linechartYaxis");

        linechartParameters.x.domain([linechartParameters.firstDate, linechartParameters.lastDate]);

        linechartSVG.selectAll(".linechartXaxis")
            .call(linechartParameters.xAxis);

        linechartSVG.selectAll("text")
            .attr("y", 12)
            .attr("x", function (data) {
                return (data.getFullYear() === linechartParameters.firstDate.getFullYear()) ? -3 : 0;
            })
            .style("text-anchor", function (data) {
                if (data.getFullYear() === linechartParameters.lastDate.getFullYear()) {
                    return "end";
                } else if ((data.getFullYear() === linechartParameters.firstDate.getFullYear())) {
                    return "start";
                } else {
                    return "middle";
                }
            });

        let updateSelection = linechartSVG.selectAll(".linechartLine")
            .data([data], function(d) {
                return linechartParameters.yearParser(d.year)
            });

        updateSelection.enter()
            .append("path")
            .attr("class", "linechartLine")
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
            .attr("class", function(d) {
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
        createFlowerchart: createFlowerchart,
        getFlowerParamsIndex: getFlowerParamsIndex,
        createLinechart: createLinechart,
        addData: addData,
        mapDataToFlowerchart: mapDataToFlowerchart,
        drawLineChart: drawLineChart,
        getLinechartParamsIndex: getLinechartParamsIndex,
        setPeriodicalAnimation: setPeriodicalAnimation,
        createProjectPictolist: createProjectPictolist
    }

}());