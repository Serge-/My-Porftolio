/**
 * Created by lol on 9/26/2015.
 */
$(function() {
  $("#example1").dateDropdowns();
});

$('.slider').slick({
  dots: true,
  infinite: false,
  speed: 800,
  fade: false,
  cssEase: 'linear',
  autoplay: true,
  arrows: false
});
$('.sliderFacts').slick({
  dots: true,
  infinite: false,
  speed: 800,
  fade: false,
  cssEase: 'linear',
  autoplay: true,
  arrows: false
});
$('.sliderPlanets').slick({
  dots: true,
  infinite: false,
  speed: 800,
  fade: false,
  cssEase: 'linear',
  autoplay: true,
  arrows: false
});

$(document).ready(function () {
  size_li = $(".seventhSection li").size();
  x=2;
  $('.seventhSection li:lt('+x+')').show();
  $('.clickme').click(function () {
    x= (x+2 <= size_li) ? x+2 : size_li;
    $('.seventhSection li:lt('+x+')').show(600);
  });
});


$(window).load(function() { // makes sure the whole site is loaded
  $('#status').fadeOut(); // will first fade out the loading animation
  $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
  $('body').delay(350).css({'overflow':'visible'});
});
