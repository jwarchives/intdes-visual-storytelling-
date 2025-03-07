/* ========================================================================= */
/*  Preloader
/* ========================================================================= */

jQuery(window).load(function(){
    $("#preloader").fadeOut("slow");
});

/* ========================================================================= */
/*  Welcome Section Slider
/* ========================================================================= */

$(function() {
    var Page = (function() {
        var $navArrows = $( '#nav-arrows' ),
            $nav = $( '#nav-dots > span' ),
            slitslider = $( '#slider' ).slitslider( {
                onBeforeChange : function( slide, pos ) {
                    $nav.removeClass( 'nav-dot-current' );
                    $nav.eq( pos ).addClass( 'nav-dot-current' );
                }
            } ),

            init = function() {
                initEvents();
            },
            initEvents = function() {
                // add navigation events
                $navArrows.children( ':last' ).on( 'click', function() {
                    slitslider.next();
                    return false;
                } );

                $navArrows.children( ':first' ).on( 'click', function() {
                    slitslider.previous();
                    return false;
                } );

                $nav.each( function( i ) {
                    $( this ).on( 'click', function( event ) {
                        var $dot = $( this );
                        if( !slitslider.isActive() ) {
                            $nav.removeClass( 'nav-dot-current' );
                            $dot.addClass( 'nav-dot-current' );
                        }
                        slitslider.jump( i + 1 );
                        return false;
                    } );
                } );
            };
        return { init : init };
    })();

    Page.init();
});

$(document).ready(function(){

    /* ========================================================================= */
    /*  Menu item highlighting
    /* ========================================================================= */

    jQuery('#nav').singlePageNav({
        offset: jQuery('#nav').outerHeight(),
        filter: ':not(.external)',
        speed: 2000,
        currentClass: 'current',
        easing: 'easeInOutExpo',
        updateHash: true,
        beforeStart: function() {
            console.log('begin scrolling');
        },
        onComplete: function() {
            console.log('done scrolling');
        }
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() > 400) {
            $(".navbar-brand a").css("color","#fff");
            $("#navigation").removeClass("animated-header");
        } else {
            $(".navbar-brand a").css("color","inherit");
            $("#navigation").addClass("animated-header");
        }
    });

    /* ========================================================================= */
    /*  Fix Slider Height
    /* ========================================================================= */

    // Slider Height
    var slideHeight = $(window).height();

    $('#home-slider, #slider, .sl-slider, .sl-content-wrapper').css('height',slideHeight);

    $(window).resize(function(){'use strict',
        $('#home-slider, #slider, .sl-slider, .sl-content-wrapper').css('height',slideHeight);
    });

    $("#works, #testimonial").owlCarousel({
        navigation : true,
        pagination : false,
        slideSpeed : 700,
        paginationSpeed : 400,
        singleItem:true,
        navigationText: ["<i class='fa fa-angle-left fa-lg'></i>","<i class='fa fa-angle-right fa-lg'></i>"]
    });

    /* ========================================================================= */
    /*  Featured Project Lightbox
    /* ========================================================================= */

    $(".fancybox").fancybox({
        padding: 0,
        openEffect : 'elastic',
        openSpeed  : 650,
        closeEffect : 'elastic',
        closeSpeed  : 550,
        closeClick : true,
        beforeShow: function () {
            this.title = $(this.element).attr('title');
            this.title = '<h3>' + this.title + '</h3>' + '<p>' + $(this.element).parents('.portfolio-item').find('img').attr('alt') + '</p>';
        },
        helpers : {
            title : {
                type: 'inside'
            },
            overlay : {
                css : {
                    'background' : 'rgba(0,0,0,0.8)'
                }
            }
        }
    });

    // Smooth scrolling function
    function smoothScrollTo(target, duration) {
        const targetPosition = target.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Easing function (easeOutCubic)
        function ease(t, b, c, d) {
            t /= d;
            t--;
            return c * (t*t*t + 1) + b;
        };

        requestAnimationFrame(animation);
    }

    function handlePlayButtonClick() {
        const playButton = document.getElementById('start-button'); // Use ID selector

        if (playButton) {
            playButton.addEventListener('click', function(e) {
                e.preventDefault();
                const gameSection = document.getElementById('game-section');
                if (gameSection) {
                    smoothScrollTo(gameSection, 1500);
                } else {
                    console.error("Target element with ID 'game-section' not found.");
                }
            });
        } else {
            console.error("Button with ID 'start-button' not found.");
        }
    }

    handlePlayButtonClick(); // Call the function

});

var wow = new WOW ({
    offset:      75,
    mobile:      false,
});
wow.init();