$(document).ready(function () {


    /* Zoom Settings */

    let zoomSettings = () => {

        let eventsHandler = {
            haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel'],
            init: function (options) {

                let instance = options.instance,
                    initialScale = 1,
                    pannedX = 0,
                    pannedY = 0;

                // Init Hammer
                // Listen only for pointer and touch events
                this.hammer = Hammer(options.svgElement, {
                    inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
                });

                // Enable pinch
                this.hammer.get('pinch').set({enable: true})

                // Handle double tap
                this.hammer.on('doubletap', function (ev) {
                    instance.zoomIn()
                });

                // Handle pan
                this.hammer.on('panstart panmove', function (ev) {
                    // On pan start reset panned variables
                    if (ev.type === 'panstart') {
                        pannedX = 0
                        pannedY = 0
                    }

                    // Pan only the difference
                    instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY})
                    pannedX = ev.deltaX
                    pannedY = ev.deltaY
                });

                // Handle pinch
                this.hammer.on('pinchstart pinchmove', function (ev) {

                    const el = ev.target;
                    const rect = el.getBoundingClientRect();
                    const pos = {
                      x: (ev.center.x - rect.left),
                      y: (ev.center.y - rect.top)
                    };

                    // On pinch start remember initial zoom
                    if (ev.type === 'pinchstart') {
                        initialScale = instance.getZoom();
                        // instance.zoomAtPoint(initialScale * ev.scale, {x: pos.x, y: pos.y});
                        instance.zoomAtPoint(initialScale * ev.scale, {x: ev.center.x, y: ev.center.y});
                    }

                    // instance.zoomAtPoint(initialScale * ev.scale, {x: pos.x, y: pos.y})
                    instance.zoomAtPoint(initialScale * ev.scale, {x: ev.center.x, y: ev.center.y});
                });

                // Prevent moving the page on some devices when panning over SVG
                options.svgElement.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                });

            }, destroy: function () {
                this.hammer.destroy()
            }
        }

        window.panZoom = svgPanZoom('#main-map', {
            zoomEnabled: true,
            controlIconsEnabled: false,
            // fit: 1,
            // center: 1,
            customEventsHandler: eventsHandler
        });

        if (mediaQuery.matches) {
            panZoom.zoom(2.4);
        }

        document.getElementById('zoom-in').addEventListener('click', function (ev) {
            ev.preventDefault()
            panZoom.zoomIn()
        });

        document.getElementById('zoom-out').addEventListener('click', function (ev) {
            ev.preventDefault()
            panZoom.zoomOut()
        });
    }

    /* Main */

    zoomSettings();

});