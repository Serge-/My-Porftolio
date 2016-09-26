var $siteHeader, $window, createFadeInWaypoint, doFadeIn, transitionToSolidHeader, transitionToTransparentHeader;

$window = $(window);

$siteHeader = $('.site-header');

transitionToSolidHeader = function() {
  return $siteHeader.css({
    'color': '#4c4c4b',
    'background-color': '#fff'
  });
};

transitionToTransparentHeader = function() {
  return $siteHeader.css({
    'color': '#fff',
    'background-color': 'transparent'
  });
};

$siteHeader.hover(transitionToSolidHeader, transitionToTransparentHeader);

transitionToTransparentHeader();

doFadeIn = function(element) {
  var $element, $fadeAfter;
  $element = $(element);
  if (!parseFloat($element.css('opacity'))) {
    $element.css('opacity', 1);
  }
  $fadeAfter = $element.siblings('.linen__fade-in--after');
  if ($fadeAfter.length > 0) {
    return setTimeout(function() {
      return $fadeAfter.css('opacity', 1);
    }, 500);
  }
};

createFadeInWaypoint = function(el, offset) {
  return new Waypoint({
    element: el,
    offset: offset,
    handler: function() {
      return doFadeIn(this.element);
    }
  });
};

$('.linen__fade-in').each(function(idx, el) {
  return createFadeInWaypoint(el, '90%');
});

$('.linen__fade-in--45').each(function(idx, el) {
  return createFadeInWaypoint(el, '45%');
});

$('.linen__fade-in--start').each(function(idx, el) {
  return setTimeout(function() {
    return doFadeIn(el);
  }, 500);
});

$('#footer').hide();
