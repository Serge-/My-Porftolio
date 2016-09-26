
$(document).ready(function() {

    $(window).load(function(){
        $('#preloader').fadeOut('slow',function(){$(this).remove();});
    });

    $('.slider').slider({
        full_width: true,
        height: "100vh",
        interval: 6000,
        indicators: false
    });

    $(".fakeloader").fakeLoader({
        timeToHide:1200,
        zIndex:"1000",//Default zIndex
        bgColor:"gray",
        spinner:"spinner1"
    });
    $('.button-collapse').sideNav({
            edge: 'right', // Choose the horizontal origin
            closeOnClick: true
        }
    );

    $("#owl-example").owlCarousel({
        autoPlay : true

    });
    $("#owl-quotes").owlCarousel({
        autoPlay : true,
        singleItem:true
    });

    $('.parallax').parallax(); //Materialize default parallax effect initialization

    $('.collapsible').collapsible({
        accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
    $('.scrollspy').scrollSpy(); // default scroll spy

    $('ul.tabs').tabs();
    $('ul.tabs-category').tabs();

    $('.modal-trigger').leanModal();

    $('.video-material-link').magnificPopup({  //Popup width video
        items: [
            {

                src: 'https://www.youtube.com/watch?v=rrT6v5sOwJg',
                type: 'iframe' // this overrides default type
            }

        ]

        });
    $('.video-mobile-link').magnificPopup({  //Popup width video
        items: [
            {

                src: 'https://www.youtube.com/watch?v=D25OVUVBVt8',
                type: 'iframe' // this overrides default type
            }

        ]

    });


});

$('#Container').mixItUp(
    {
        pagination: {
            limit: 3
        },
        animation: {
            duration: 400,
            easing: 'ease'
        }
    }
);

$(document).on("scroll", function() {
    if
    ($(document).scrollTop() < 20 && $(document).width() > 992) {
        $("nav").addClass("transparent").removeClass("grey-dark");
        $("nav .table-of-content a").removeClass("grey-text");
    }
    else
    {
        $("nav").removeClass("transparent").addClass("grey-dark");
        $("nav .table-of-content a").addClass("grey-text");
    }
});

$(window).on('load resize', function () {
    if
    ($(document).width() < 992){
        $("nav").addClass("grey-dark").removeClass("transparent");
    }
    if
    ($(document).width() > 992 && $(document).scrollTop() < 50){
        $("nav").addClass("transparent").removeClass("grey-dark");
    }
    if
    ($(document).width() < 600){
        $(".section__choose-me > div > div").removeClass("valign-wrapper");
        $(".section__about > div > div").removeClass("valign-wrapper");
    }
    else{
        $(".section__choose-me > div > div").addClass("valign-wrapper");
        $(".section__about > div > div").addClass("valign-wrapper");

    }
});

$('.item-wrap a').magnificPopup({

    type:'ajax',
    fixedContentPos: false,
    removalDelay: 200,
    showCloseBtn: false,
    mainClass: 'mfp-fade'

});

$('.ajax-popup-link').magnificPopup({
    type: 'ajax',
    gallery: {
        enabled: true, // set to true to enable gallery

        preload: [0,2], // read about this option in next Lazy-loading section

        navigateByImgClick: true,

        arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button

        tPrev: 'Previous (Left arrow key)', // title for left button
        tNext: 'Next (Right arrow key)', // title for right button
        tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
    }

});


var wow = new WOW(
    {
        boxClass:     'wow',      // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset:       0,          // distance to the element when triggering the animation (default is 0)
        mobile:       true,       // trigger animations on mobile devices (default is true)
        live:         true,       // act on asynchronously loaded content (default is true)
        callback:     function(box) {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null // optional scroll container selector, otherwise use window
    }
);
wow.init();

$(document).ready(function(){
    $('.collapsible').collapsible({
        accordion : false
    });
});

function changeImage(a) {
    document.getElementById("img").src=a;
}

$(document).submit(function(e){
    var form = jQuery(e.target);
    if(form.is("#contact-form")){ // check if this is the form that you want (delete this check to apply this to all forms)
        e.preventDefault();
        jQuery.ajax({
            type: "POST",
            url: 'mail.php',
            data: form.serialize(), // serializes the form's elements.
            dataType: 'json',
            success: function(response) {
                if(response.status){
                    $('#contact_name').val('');
                    $('#contact_email').val('');
                    $('#subject').val('');
                    $('#contact-form textarea').val('');
                }
                $('#response').empty().html(response.html);
            }
        });
    }
});