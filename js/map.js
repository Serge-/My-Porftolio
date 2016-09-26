function initialize() {

    var mapProp =
    {
        center:new google.maps.LatLng(50.44783659,30.523875),
        zoom:5,
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        zoomControl: false,
        scaleControl: false,
        scrollwheel: false

    };

    var stylesArray = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#b4d4e1"},{"visibility":"on"}]}]
    var myLatlng = new google.maps.LatLng(50.44783659,30.523875);
    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"Kiev City"
    });
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    map.setOptions({styles: stylesArray});
    marker.setMap(map);

}
google.maps.event.addDomListener(window, 'load', initialize);

//count numbers on scroll

(function ($) {

    $.fn.visible = function () {

        var $element = $(this).eq(0),
            $win = $(window),

            elemTop = $element.position().top,
            elemBottom = elemTop + $element.height(),

            winTop = $win.scrollTop(),
            winBottom = winTop + $win.height();

        if (elemBottom < winTop) {
            return false;
        } else if (elemTop > winBottom) {
            return false;
        } else {
            return true;
        }
    };

})(jQuery);

function padNum(num) {
    if (num < 10) {
        return " " + num;
    }
    return num;
}


var $count1 = $('.first-count');
var $count2 = $('.second-count');
var $count2 = $('.third-count');
var $count2 = $('.fourth-count');

// Scrolling Functions
$(window).scroll(function (event) {
    var first = 1000; // Count up to 25x for first
    var second = 40; // Count up to 4x for second
    var third = 194000;
    var fourth = 50;

    function countStuffUp(points, selector, duration) {
        //Animate count
        var $selector = $(selector);
        $selector.addClass('counting');

        var $counter = $({
            countNumber: $selector.text()
        }).animate({
            countNumber: points
        }, {
            duration: duration,
            easing: 'linear',
            step: function (now) {
                //console.log(now);
                $selector.data('remaining', (points - now) * (duration / points));
                $selector.text(padNum(parseInt(this.countNumber)));
            },
            complete: function () {
                $selector.removeClass('counting');
                $selector.text(points);

            }
        });

        $selector.data('counter', $counter);
    }

    // Output to div
    $([".first-count",".second-count",".third-count",".fourth-count"]).each(function (i, el) {
        var el = $(el);
        if (el.visible() && !el.hasClass('counting')) {
            var duration = el.data('remaining') || 3000;
            // console.log('duration', duration);
            countStuffUp(first, '.first-count', duration);
            countStuffUp(second, '.second-count', duration);
            countStuffUp(third, '.third-count', duration);
            countStuffUp(fourth, '.fourth-count', duration);
        } else if (!el.visible() && el.hasClass('counting')) {
            el.data('counter').stop(true);
            el.removeClass('counting');
        }
    });
});