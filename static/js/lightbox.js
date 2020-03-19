let lightboxSetup = function () {


    $('.gallery').each(function () {
        let $pic = $(this),
            getItems = function () {
                let items = [];
                $pic.find('a').each(function () {
                    let $href = $(this).attr('href'),
                        $size = $(this).data('size').split('x'),
                        $width = $size[0],
                        $height = $size[1],
                        $cap = $(this).attr('caption');

                    let item = {
                        src: $href,
                        w: $width,
                        h: $height,
                        title: $cap
                    }

                    items.push(item);
                });
                return items;
            }

        let items = getItems();

        let $pswp = $('.pswp')[0];

        let options = {
            index: 0,
            bgOpacity: 1,
            showHideOpacity: true,
            captionEl: true,
            fullscreenEl: false,
            zoomEl: false,
            shareEl: false
        };

        $pic.on('click', 'figure', function (event) {
            event.preventDefault();
            options.index = $(this).index();
            let lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
            lightBox.init();
        });

        $(".sunrect").on('click', function (event) {
            event.preventDefault();
            let lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
            lightBox.init();
        });

    });

}