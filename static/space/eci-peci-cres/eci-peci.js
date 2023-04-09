$(document).ready(function () {

    let storyPoints = eciPeciData["story_points"];

    let geo = {
        "lat": 44.9587,
        "lon": 14.403,
        "lonOffset": 0.002,
        "zoomDefault": 17,
        "zoomClick": 18
    }

    let defaultTileOSM = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    let mapboxToken = 'https://api.mapbox.com/styles/v1/krcadinac/clg3xxogx004v01mwtm3t5lg3/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia3JjYWRpbmFjIiwiYSI6ImNpaTF6dHpzbTAwMXp2bm0yb3gyZXExeG0ifQ.7LKMENHOM-oWtLn3B3moOQ';

    let map = L.map('map', {
        zoomControl: false
    }).setView([geo.lat, geo.lon], geo.zoomDefault);

    L.tileLayer(mapboxToken, {
        maxZoom: 20
    }).addTo(map);

    L.control.zoom({
        position: 'topright'
    }).addTo(map);

    let vw = (percent) => {
        let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        return (percent * w) / 100;
    }

    let params = {
        radius: vw(1.5),
        fillOpacity: {
            'on': .95,
            'hover': .7
        }
    };

    let defineColor = (name) => {
        return {
            "name": name,
            "hex": getComputedStyle(document.body).getPropertyValue('--' + name),
            "hexLight": getComputedStyle(document.body).getPropertyValue('--' + name + "Light")
        };
    }

    let offsets = [];
    let h1 = $('h1');
    let titleHeight = h1.offset().top + h1.height() + $('.shadow-up').height() + 10;
    storyPoints.forEach((sp) => {
        let id = sp["properties"]["id"];
        let storyH2 = $("#s" + id);
        let offset = storyH2.offset().top - titleHeight;
        offsets.push(offset);
        let clr = defineColor(sp["properties"]["color"]);
        storyH2.css({
            "color": clr.hex,
            "border-left": "solid 1vw " + clr.hex
        });
        storyH2.click(() => {
            let coords = markersById[id].getLatLng();
            map.setView([coords.lat, coords.lng - geo.lonOffset], geo.zoomClick);
        });
    });

    let idToTitle = (id) => {
        return parseInt(id) < 10 ? ("0" + id) : id;
    }

    let markersById = {};

    let stories = new L.geoJson(storyPoints, {
        pointToLayer: function (feature, latlng) {
            let clr = defineColor(feature.properties.color);
            return new L.circleMarker([latlng.lat, latlng.lng],
                {
                    radius: params.radius,
                    weight: 1.5,
                    fillColor: clr.hexLight,
                    color: clr.hex,
                    fillOpacity: params.fillOpacity.on
                });
        },
        onEachFeature: function (feature, layer) {
            let clr = defineColor(feature.properties.color);
            let text = L.tooltip({
                permanent: true,
                direction: 'center',
                className: 'storyLabel ' + clr.name
            })
                .setContent(idToTitle(feature.properties.id))
                .setLatLng(layer.getLatLng());
            text.addTo(map);

            layer.on('mouseover', function (e) {
                // this.setStyle({ 'fillOpacity': params.fillOpacity.hover });
                L.DomUtil.addClass(this.getElement(), 'leaflet-marker-hover');
            });

            layer.on('mouseout', function (e) {
                // this.setStyle({ 'fillOpacity': params.fillOpacity.on });
                L.DomUtil.removeClass(this.getElement(), 'leaflet-marker-hover');
            });

            layer.on('click', function () {
                $('.book-scroll-container').animate({
                    scrollTop: offsets[parseInt(feature.properties.id) - 1]
                }, 500);
            });

            markersById[feature.properties.id] = layer;

        }
    }).addTo(map);

    document.getElementsByClassName('leaflet-control-attribution')[0].style.display = 'none';

    $("#landing").click(() => {
        $("#overlay").hide();
    });

});