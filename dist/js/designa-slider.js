$(document).ready(function () {

    // Auto Play if set to true

    class AutoSlide {
        // google = 'ama';

        start(duration, slideId, effect, slidesLength) {
            let timmer = setInterval(function () {
                //check to see if the slider exists in the current page
                // For the sack of ajax calls

                if ($('#' + slideId).length == 0) {
                    console.log('interval cleared. no slider found');
                    clearInterval(timmer);
                } else {
                    // check if its paused

                    if (!$('#' + slideId)[0].hasAttribute('pause')) {
                        let currentSlide = $('#' + slideId).attr('currentslide');
                        // console.log('With current slide of', currentSlide, slidesLength);
                        // console.log('update Slide');
                        for (let i = 0; i < slidesLength; i++) {
                            if (i == currentSlide) {
                                // console.log('found a match');
                                $('#' + slideId)
                                    .find('.ad-slide')[i].classList.add('exit');
                                // wait to remove it
                                setTimeout(function () {
                                    $('#' + slideId)
                                        .find('.ad-slide')[i].classList.remove('active');
                                    $('#' + slideId)
                                        .find('.ad-slide')[i].classList.remove('exit');
                                }, 1050);

                                $('#' + slideId)
                                    .find('.ad-slide-bullet span')[i].classList.remove('active');

                                // console.log('current found');

                                if (effect == 'slideLeft' || effect == 'slideRight') {
                                    setTimeout(function () {
                                        if (
                                            $('#' + slideId).attr('currentslide') ==
                                            slidesLength - 1
                                        ) {
                                            // console.log('on the last slide');
                                            $('#' + slideId)
                                                .find('.ad-slide')[0]
                                                .classList.add('active');
                                            $('#' + slideId)
                                                .find('.ad-slide-bullet span')[0]
                                                .classList.add('active');
                                            $('#' + slideId).attr('currentslide', 0);
                                        } else {
                                            // console.log('any slide');
                                            $('#' + slideId).attr('currentslide', i + 1);
                                            $('#' + slideId)
                                                .find('.ad-slide')[i + 1].classList.add('active');
                                            $('#' + slideId)
                                                .find('.ad-slide-bullet span')[i + 1].classList.add('active');
                                        }

                                        // console.log('current slide attr is:', $('#' + slideId).attr('currentslide'));
                                    }, 100);
                                } else {
                                    // setTimeout(function () {

                                    if (
                                        $('#' + slideId).attr('currentslide') ==
                                        slidesLength - 1
                                    ) {
                                        // console.log('on the last slide');
                                        $('#' + slideId)
                                            .find('.ad-slide')[0]
                                            .classList.add('active');
                                        $('#' + slideId)
                                            .find('.ad-slide-bullet span')[0]
                                            .classList.add('active');
                                        $('#' + slideId).attr('currentslide', 0);
                                    } else {
                                        // console.log('any slide');
                                        $('#' + slideId).attr('currentslide', i + 1);
                                        $('#' + slideId)
                                            .find('.ad-slide')[i + 1].classList.add('active');
                                        $('#' + slideId)
                                            .find('.ad-slide-bullet span')[i + 1].classList.add('active');
                                    }

                                    // console.log('current slide attr is:', $('#' + slideId).attr('currentslide'));
                                    // }, 300)
                                }

                                // console.log('end loop');
                                // end the loop
                                return true;
                            }
                        }
                    } else {
                        // console.log('slider on pause');
                    }
                }
            }, duration);
        }
        slide(slideId, effect, slidesLength) {
            // autoplay = new AutoPlay;
            // console.log('autoplay meDat method called',autoplay.meDat());

            // console.log('function autopplay called', $('#' + slideId).attr('currentslide'));

            let currentSlide = $('#' + slideId).attr('currentslide');
            // console.log('update Slide');
            for (let i = 0; i < slidesLength; i++) {
                if (i == currentSlide) {
                    console.log($('#' + slideId).find('.ad-slide'));
                    $('#' + slideId)
                        .find('.ad-slide')[i].classList.add('exit');
                    // wait to remove it
                    setTimeout(function () {
                        $('#' + slideId)
                            .find('.ad-slide')[i].classList.remove('active');
                        $('#' + slideId)
                            .find('.ad-slide')[i].classList.remove('exit');
                    }, 1050);

                    $('#' + slideId)
                        .find('.ad-slide-bullet span')[i].classList.remove('active');

                    // console.log('current found');
                    // setTimeout(function () {

                    if ($this.attr('currentslide') == slidesLength - 1) {
                        $('#' + slideId)
                            .find('.ad-slide')[0]
                            .addClass('active');
                        $('#' + slideId)
                            .find('.ad-slide-bullet span')[0]
                            .classList.add('active');
                        $('#' + slideId).attr('currentslide', 0);
                    } else {
                        $('#' + slideId).attr('currentslide', i + 1);
                        $('#' + slideId)
                            .find('.ad-slide')[i + 1].classList.add('active');
                        $('#' + slideId)
                            .find('.ad-slide-bullet span')[i + 1].classList.add('active');
                    }

                    console.log(
                        'current slide attr is:',
                        $('#' + slideId).attr('currentslide')
                    );
                    // }, 300)

                    // console.log('end loop');
                    // end the loop
                    return true;
                }
            }
        }
    }
    var wrapper = $('body');

    // console.log($('.ad-slide-group').not('[_adConstructed]'));
    function scanDOM4media() {
        // scan for ad-slide-group
        if (wrapper.find('.ad-slide-group').not('[_adConstructed]').length !== 0) {
            // console.log('slider found', $('.ad-slide-group').not('[_adConstructed]').length);
            constructSlider();
        }

    }

    scanDOM4media();

    // Scan DOM Every 1s for unconstructed videos
    setInterval(function () {
        // console.log('scannning for media');
        scanDOM4media();
    }, 3000);


    // first scan DOM for .ad-slider or .ad-slide-group

    // windowsResize
    $(window).resize(function () {
        // make responsive slider take new height
        $('.ad-slide-group[responsive]').each(function () {
            // console.log('responsive slide found');
            let height = $(this)
                .find('.ad-slide:first')
                .height();
            $(this).css('height', height);
        });
    });




    // Make Construct

    function constructSlider() {
        $('.ad-slide-group')
            .not('[_adConstructed]')
            .each(function (id) {
                $this = $(this);

                // fix height if responsive

                if ($this[0].hasAttribute('responsive')) {
                    // console.log('responsive');
                    let height = $this.find('.ad-slide:first').height();

                    // console.log('height is',height);
                    $this.css('height', height);
                }
                // setIds  for them
                slideId = 'slide_' + id + Math.floor(Math.random() * (100 - 10) + 10);
                console.log('slide id of:', slideId);
                $this.attr('id', slideId);

                // Set Effect
                effect = $this[0].hasAttribute('effect') ?
                    $this.attr('effect') :
                    'fade';

                //Set autoplay or manual
                autoplay = $this[0].hasAttribute('manual') ? false : true;

                // Set Duration
                if ($this[0].hasAttribute('duration')) {
                    duration = $this.attr('duration') * 1000;
                } else {
                    duration = 5000;
                }

                // Set Effect

                // Create Bullets
                if ($this[0].hasAttribute('showBullets')) {
                    showBullets = $this.attr('showBullets') == 'false' ? false : true;
                } else {
                    showBullets = true;
                }

                // bullet building/construct needs the slidesLength for indexing
                var slides = $this.find('.ad-slide');
                var slidesLength = slides.length;

                if (showBullets && $this.find('.ad-slide-bullet').length == 0) {
                    // console.log('construct bullet');
                    openBullet = '<div class="ad-slide-bullet">';
                    closeBullet = '</div>';
                    bullets = '';
                    // console.log(slidesLength);
                    for (let i = 0; i < slidesLength; i++) {
                        bullets = bullets + '<span index="' + i + '"></span>';
                        // console.log('yo');
                    }
                    // console.log(bullets);
                    $this.append(openBullet + bullets + closeBullet);
                }

                // Create Nav
                if ($this[0].hasAttribute('showNav')) {
                    showNav = $this.attr('showNav') == 'false' ? false : true;
                } else {
                    showNav = true;
                }

                if (showNav && $this.find('.ad-slide-previous').length == 0) {
                    prevNav =
                        '<div  class="ad-slide-previous "><button class="ad-btn ad-sm ad-flat ad-round ad-icon no-margin"><i class="fa fa-angle-left "></i></button></div>';
                    nextNav =
                        '<div  class="ad-slide-next "><button class="ad-btn ad-sm ad-flat ad-round ad-icon no-margin" style="margin-left:-8px;"><i class="fa fa-angle-right "></i></button></div>';
                    $this.append(prevNav + nextNav);
                }

                var slideBullets = $this.find('.ad-slide-bullet span');

                var slide1 = $this.find('.ad-slide:first');

                // clear any active class predefined by user
                slides.removeClass('active');
                slideBullets.removeClass('active');

                slide1.addClass('active');
                slideBullets.first().addClass('active');
                currentSlide = 0;
                $this.attr('currentslide', 0);

                //Check for spinner
                let spinner = $this.find('.ad-spinner');

                let spinnerDuration = duration < 5000 ? 1300 : duration / 2;
                // remove loader in 3ms
                if (spinner.length !== 0) {
                    console.log('spinner found', spinner);
                    setTimeout(function () {
                        console.log('fade spinner');
                        spinner.fadeOut('slow');
                    }, spinnerDuration);
                }

                // Check  for is-loading class
                if ($this.hasClass('is-loading')) {
                    console.log('is-loading found', spinner);
                    setTimeout(function () {
                        $this.removeClass('is-loading');
                    }, spinnerDuration);
                }

                if (autoplay) {
                    autoSlide = new AutoSlide();
                    autoSlide.start(duration, slideId, effect, slidesLength);
                }

                // Mark element as constructed',true);
                $this.attr('_adConstructed', true);
            });
    }

    // then Listen for Event

    // When bullet is clicked
    wrapper.on('click', '.ad-slide-bullet span', function (e) {
        var parent = $(this).parents('.ad-slide-group');
        var slideIndex = $(this).attr('index');
        // console.log('index is', slideIndex);
        var slides = parent.find('.ad-slide');
        // console.log(parent);
        currentSlide = parent.attr('currentslide');

        // play exit animation
        slides[currentSlide].classList.add('exit');
        // wait to remove them
        setTimeout(function () {
            slides[currentSlide].classList.remove('active');
            slides[currentSlide].classList.remove('exit');
        }, 1050);

        slides[slideIndex].classList.add('active');
        parent.find('.ad-slide-bullet span').removeClass('active');
        $(this).addClass('active');

        parent.attr('currentslide', slideIndex);
    });

    // When previous BTN is clicked
    wrapper.on('click', '.ad-slide-previous', function (e) {
        var parent = $(this).parents('.ad-slide-group');
        currentSlide = parent.attr('currentslide');
        var slides = parent.find('.ad-slide');

        // play the exit animation
        slides[currentSlide].classList.add('exit');
        // wait to remove it
        setTimeout(function () {
            slides[currentSlide].classList.remove('active');
            slides[currentSlide].classList.remove('exit');
        }, 1050);

        var slideBullets = parent.find('.ad-slide-bullet span');
        slideBullets.removeClass('active');

        if (currentSlide == 0) {
            slides[slides.length - 1].classList.add('active');
            slideBullets[slides.length - 1].classList.add('active');

            parent.attr('currentslide', slides.length - 1);
        } else {
            slides[currentSlide - 1].classList.add('active');
            slideBullets[currentSlide - 1].classList.add('active');
            parent.attr('currentslide', currentSlide - 1);
        }

        // Set and Remove pause attr
        if (!parent[0].hasAttribute('pause')) {
            parent.attr('pause', true);

            // Set Duration
            if (parent[0].hasAttribute('duration')) {
                duration = parent.attr('duration') * 1000;
            } else {
                duration = 5000;
            }

            // console.log('pause added');
            setTimeout(function () {
                parent.removeAttr('pause');
                // console.log('pause removed');
            }, duration);
        }
    });

    // When next BTN is clicked
    wrapper.on('click', '.ad-slide-next', function (e) {
        var parent = $(this).parents('.ad-slide-group');
        currentSlide = parent.attr('currentslide');
        var slides = parent.find('.ad-slide');
        // play exit animation
        slides[currentSlide].classList.add('exit');
        // wait to remove them
        setTimeout(function () {
            slides[currentSlide].classList.remove('active');
            slides[currentSlide].classList.remove('exit');
        }, 1050);

        var slideBullets = parent.find('.ad-slide-bullet span');
        slideBullets.removeClass('active');

        // console.log('last is', slides.length - 1);
        if (currentSlide == slides.length - 1) {
            slides[0].classList.add('active');
            slideBullets[0].classList.add('active');

            parent.attr('currentslide', 0);
        } else {
            let $next = 1 * currentSlide + 1;
            slides[$next].classList.add('active');
            slideBullets[$next].classList.add('active');
            parent.attr('currentslide', $next);
        }

        // Set and Remove pause attr
        if (!parent[0].hasAttribute('pause')) {
            parent.attr('pause', true);

            // Set Duration
            if (parent[0].hasAttribute('duration')) {
                duration = parent.attr('duration') * 1000;
            } else {
                duration = 5000;
            }

            // console.log('pause added');
            setTimeout(function () {
                parent.removeAttr('pause');
                // console.log('pause removed');
            }, duration);
        }
    });

});