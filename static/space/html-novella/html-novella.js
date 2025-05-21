document.addEventListener("DOMContentLoaded", function () {
// $(document).ready(function () {

    let links = params.current_links;

    const mq = window.matchMedia("(max-width: 769px)");

    window.addEventListener('load', () => {
        setGraph();
        setSidenotes();
    });

    window.addEventListener('resize', () => {
        setSidenotes();
    });

    window.onerror = function (message, source, lineno, colno, error) {
        alert(`JS Error:\n${message}\nLine: ${lineno}:${colno}`);
    };

    /* Sidenote Position */

    let setSidenotes = () => {

        let threshold = 0;
        let sidenote = $(".sidenote");

        sidenote.each(function (i) {

            let index = i + 1,
                ref = $("#s" + index),
                sidenote = $(this),
                top = document.querySelector("#s" + index).offsetTop;


            let exactPos = (top > threshold) ? top : threshold;
            if (!mq.matches) {
                sidenote.css("top", exactPos + "px");
            }

            let sydenoteSymbolIndexed = $("#sidenote-symbol" + index);
            sydenoteSymbolIndexed.html(ref.text());
            threshold = exactPos + $(this).innerHeight();

            ref.mouseover(function () {
                sidenote.addClass("selected");
            }).mouseout(function () {
                sidenote.removeClass("selected");
            }).click(function () {
                let tp = sidenote.offset().top;
                window.scroll({top: tp - 10, left: 0, behavior: 'smooth'});
            });

            sideref = sydenoteSymbolIndexed;
            sideref.mouseover(function () {
                ref.addClass("selected");
                sideref.addClass("selected-ref");
                sidenote.addClass("selected");
            }).mouseout(function () {
                ref.removeClass("selected");
                sideref.removeClass("selected-ref");
                sidenote.removeClass("selected");
            }).click(function () {
                let tp = ref.offset().top;
                window.scroll({top: tp - 10, left: 0, behavior: 'smooth'});
            });
        });

        sidenote.css("visibility", "visible");

    };

    let setGraph = () => {

        $('#graph svg').remove();

        const linkPath = params.path + params.chapter_path;

        const nodeIds = new Set();
        links.forEach(link => {
            nodeIds.add(link.source);
            nodeIds.add(link.target);
        });
        const nodes = Array.from(nodeIds).map(id => ({id}));

        const width = document.getElementById('graph').clientWidth;
        const height = document.getElementById('graph').clientHeight;
        const margin = width * 0.03;

        const svg = d3.select('#graph')
            .append('svg')
            .attr('viewBox', `0 0 ${width} ${height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .style('width', '100%')
            .style('height', '100%');

        svg.append('defs').append('marker')
            .attr('id', 'arrowhead')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 10)
            .attr('refY', 0)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr('fill', '#999');

        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(width * 0.12).strength(0.1))
            .force('charge', d3.forceManyBody().strength(-width * 0.4))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide(width * 0.03))
            .on('tick', ticked);

        const link = svg.append('g')
            .selectAll('path')
            .data(links)
            .join('path')
            .attr('class', d => 'link' + (d.consecutive ? '' : ' dashed'))
            .attr('marker-end', d => d.consecutive ? 'url(#arrowhead)' : null);

        const node = svg.append('g')
            .selectAll('a')
            .data(nodes)
            .join('a')
            .attr('href', d => `/${linkPath + d.id}`)
            .attr('target', '_blank')
            .on('click', (event, d) => {
                event.preventDefault();
                location.reload();
            })
            .append('g')
            .attr('class', 'node')
            .call(drag(simulation));

        node.append('circle')
            .attr('r', width * 0.03);

        node.append('text')
            .text(d => d.id);

        function ticked() {
            link.attr('d', d => {
                const dx = d.target.x - d.source.x,
                    dy = d.target.y - d.source.y,
                    dr = Math.sqrt(dx * dx + dy * dy) * (d.consecutive ? 0 : 0.7);

                if (d.consecutive) {
                    return `M${d.source.x},${d.source.y}L${d.target.x},${d.target.y}`;
                } else {
                    return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
                }
            });

            node.attr('transform', d => {
                d.x = Math.max(margin, Math.min(width - margin, d.x));
                d.y = Math.max(margin, Math.min(height - margin, d.y));
                return `translate(${d.x},${d.y})`;
            });
        }

        function drag(simulation) {
            function dragstarted(event, d) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
            }

            function dragended(event, d) {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }

            return d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended);
        }

    };

});