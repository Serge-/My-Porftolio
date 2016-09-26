var $arrowsOverlay, $callout, $firstProduct, $header, $introText, $lastProduct, $leftMenu, $leftMenuImage, $pageWidths, $parallaxBackground, $productContent, $products, $rightMenu, $rightMenuImage, $shadow, $siteHeader, $titles, $walkoff, $window, createFadeInWaypoint, createSlideUpInWaypoint, date, doFadeIn, fixedTitleOffsets, hideStickyMenuLeft, hideStickyMenuRight, i, initRSVPButton, initWaitlistButtons, j, lastProductHeight, len, len1, minTitleTops, productHeights, ref, showStickyMenuLeft, showStickyMenuRight, title, titleHeights, transitionToSolidHeader, transitionToTransparentHeader, waypoints;

waypoints = [];

$arrowsOverlay = $('.summer__header-arrows-overlay');

$callout = $('.summer__callout');

$header = $(".summer__header-root");

$introText = $(".summer__intro-text");

$leftMenu = $('.summer__sticky-menu--left');

$leftMenuImage = $leftMenu.find('.summer__sticky-menu-image');

$parallaxBackground = $(".summer__parallax-background");

$productContent = $('.summer__product-content');

$pageWidths = $('.summer__page-width');

$rightMenu = $('.summer__sticky-menu--right');

$rightMenuImage = $rightMenu.find('.summer__sticky-menu-image');

$shadow = $(".summer__shadow");

$titles = $('.summer__section-title');

$walkoff = $('.summer__shop-all');

$window = $(window);

$products = $('.summer__page-width');

$firstProduct = $($products[0]);

$lastProduct = $($products[$products.length - 1]);

lastProductHeight = $lastProduct.height();

doFadeIn = function(element) {
  var $element, $fadeAfter;
  $element = $(element);
  if (!parseFloat($element.css('opacity'))) {
    $element.css('opacity', 1);
  }
  $fadeAfter = $element.siblings('.summer__fade-in--after');
  if ($fadeAfter.length > 0) {
    return setTimeout(function() {
      return $fadeAfter.css('opacity', 1);
    }, 500);
  }
};

transitionToSolidHeader = function($header) {
  return $header.css({
    'color': '#4c4c4b',
    'background-color': '#fff'
  });
};

transitionToTransparentHeader = function($header) {
  return $header.css({
    'color': '#fff',
    'background-color': 'transparent'
  });
};

createFadeInWaypoint = function(el, offset) {
  return waypoints.push(new Waypoint({
    element: el,
    offset: offset,
    handler: function() {
      return doFadeIn(this.element);
    }
  }));
};

createSlideUpInWaypoint = function($el, offset) {
  return waypoints.push(new Waypoint({
    element: $el[0],
    offset: offset,
    handler: function() {
      if (!parseFloat($el.css('opacity'))) {
        return $el.velocity('transition.slideUpIn');
      }
    }
  }));
};

$('#fixed-navigation').hide();

$('#footer').hide();

$siteHeader = $('.site-header');

$siteHeader.on('mouseenter', function() {
  return transitionToSolidHeader($siteHeader);
});

$siteHeader.on('mouseleave', function() {
  return transitionToTransparentHeader($siteHeader);
});

transitionToTransparentHeader($siteHeader);

$('.summer__fade-in').each(function(idx, el) {
  return createFadeInWaypoint(el, '90%');
});

$('.summer__fade-in--45').each(function(idx, el) {
  return createFadeInWaypoint(el, '45%');
});

$('.summer__fade-in--start').each(function(idx, el) {
  return setTimeout(function() {
    return doFadeIn(el);
  }, 500);
});

createSlideUpInWaypoint($(".summer__header-title"), '50%');

createSlideUpInWaypoint($(".summer__callout > div"), '50%');

createSlideUpInWaypoint($(".summer__shop-all > *"), '50%');

for (i = 0, len = $titles.length; i < len; i++) {
  title = $titles[i];
  createSlideUpInWaypoint($(title), '50%');
}

ref = $(".summer__section-date");
for (j = 0, len1 = ref.length; j < len1; j++) {
  date = ref[j];
  createSlideUpInWaypoint($(date), '50%');
}

waypoints.push(new Waypoint({
  element: $header[0],
  offset: -2000,
  handler: function(direction) {
    if (direction === 'down') {
      return $parallaxBackground.css({
        'background-image': 'url(https://everlane.s3.amazonaws.com/static/content-page-images/elevate-summer/desktop/v3/11-walkoff.jpg)'
      });
    } else {
      return $parallaxBackground.css({
        'background-image': 'url(https://everlane.s3.amazonaws.com/static/content-page-images/elevate-summer/desktop/v3/01-hero.jpg)'
      });
    }
  }
}));

showStickyMenuLeft = function() {
  return $leftMenu.add($leftMenuImage).css('margin-left', 0);
};

showStickyMenuRight = function() {
  return $rightMenu.add($rightMenuImage).css('margin-right', 0);
};

hideStickyMenuLeft = function() {
  return $leftMenu.add($leftMenuImage).css('margin-left', -30);
};

hideStickyMenuRight = function() {
  return $rightMenu.add($rightMenuImage).css('margin-right', -30);
};

waypoints.push(new Waypoint({
  element: $introText[0],
  offset: '30%',
  handler: function(direction) {
    if (direction === 'down') {
      showStickyMenuLeft();
      return showStickyMenuRight();
    } else {
      hideStickyMenuLeft();
      return hideStickyMenuRight();
    }
  }
}));

waypoints.push(new Waypoint({
  element: $walkoff[0],
  offset: '90%',
  handler: function(direction) {
    if (direction === 'down') {
      hideStickyMenuLeft();
      return hideStickyMenuRight();
    } else {
      showStickyMenuLeft();
      return showStickyMenuRight();
    }
  }
}));

titleHeights = [null, null, null];

productHeights = [null, null, null];

fixedTitleOffsets = [null, null, null];

minTitleTops = [null, null, null];

$window.on('scroll.elevate-summer', function() {
  var arrowsOverlayOpacity, arrowsTop, arrowsTransitionHeight, arrowsTransitionStartY, bp, buffer, calloutTop, dY, firstProductTop, index, k, l, lastProductTop, len2, len3, parallaxOpacity, pc, screenHeight, scrollTop, shadowOpacity, startY, walkoffTop;
  screenHeight = $window.height();
  for (index = k = 0, len2 = $productContent.length; k < len2; index = ++k) {
    pc = $productContent[index];
    productHeights[index] = $(pc).height();
  }
  for (index = l = 0, len3 = $titles.length; l < len3; index = ++l) {
    title = $titles[index];
    titleHeights[index] = $(title).height();
  }
  arrowsTop = $arrowsOverlay.offset().top;
  calloutTop = $callout.offset().top;
  firstProductTop = $firstProduct.offset().top;
  lastProductTop = $lastProduct.offset().top;
  scrollTop = $window.scrollTop();
  walkoffTop = $walkoff.offset().top;
  buffer = [scrollTop, [], [], []];
  bp = function(s, index) {
    return;
    return buffer[index + 1].push(s);
  };
  arrowsTransitionHeight = 400;
  arrowsTransitionStartY = arrowsTop - arrowsTransitionHeight;
  if (scrollTop < screenHeight * 2) {
    arrowsOverlayOpacity = (function() {
      switch (true) {
        case scrollTop < arrowsTransitionStartY:
          return 0;
        case scrollTop >= arrowsTransitionStartY && scrollTop <= arrowsTransitionStartY + arrowsTransitionHeight:
          return (scrollTop - arrowsTransitionStartY) / arrowsTransitionHeight;
        default:
          return 1;
      }
    })();
    $arrowsOverlay.css('opacity', arrowsOverlayOpacity);
  }
  shadowOpacity = (function() {
    switch (true) {
      case scrollTop < screenHeight:
        return 0;
      case scrollTop >= screenHeight && scrollTop <= screenHeight + 400:
        return (scrollTop - screenHeight) / 400;
      default:
        return 1;
    }
  })();
  dY = screenHeight / 3.0;
  startY = calloutTop - (1.1 * screenHeight);
  shadowOpacity = (function() {
    switch (true) {
      case scrollTop >= startY:
        return 1 - ((scrollTop - startY) / dY);
      case scrollTop >= calloutTop + dY:
        return 0;
      default:
        return shadowOpacity;
    }
  })();
  $shadow.css('opacity', shadowOpacity);
  if ((firstProductTop <= scrollTop && scrollTop <= lastProductTop + lastProductHeight)) {
    $titles.each(function(index) {
      var $pageWidth, $pc, $title, contentEnd, fixedOffset, minTitleTop, pageWidthHeight, pageWidthTop, productEnd, productHeight, productOffset, titleHeight, titleOffset, top, transitionStart, unfixTransitionHeight;
      $title = $(this);
      titleOffset = $title.offset().top;
      titleHeight = titleHeights[index];
      $pc = $($productContent[index]);
      $pageWidth = $($pageWidths[index]);
      productOffset = $pc.offset().top;
      productHeight = $pc.innerHeight();
      contentEnd = productOffset + $pc.innerHeight();
      fixedOffset = fixedTitleOffsets[index];
      pageWidthTop = $pageWidth.offset().top;
      pageWidthHeight = $pageWidth.height();
      if (minTitleTops[index] === null) {
        minTitleTops[index] || (minTitleTops[index] = titleOffset);
        bp("min[" + index + "] set to " + titleOffset, index);
      }
      minTitleTop = minTitleTops[index];
      productEnd = pageWidthTop + pageWidthHeight;
      unfixTransitionHeight = 30;
      transitionStart = contentEnd - titleHeight - unfixTransitionHeight;
      if (fixedOffset === null) {
        bp('not fixed', index);
        if (titleOffset < scrollTop + 30 && scrollTop < productEnd) {
          fixedTitleOffsets[index] = titleOffset + (scrollTop - titleOffset);
          bp("set fixed " + fixedTitleOffsets[index], index);
          $title.addClass('summer__fixed');
        }
        if (scrollTop < transitionStart) {
          return $title.css('top', 30);
        } else if ((transitionStart <= scrollTop && scrollTop <= contentEnd)) {
          top = unfixTransitionHeight - (scrollTop - transitionStart);
          bp("set top " + top, index);
          return $title.css('top', top);
        } else if (contentEnd < scrollTop) {
          top = -titleHeight;
          $title.css('top', top);
          return bp("set min top " + top, index);
        }
      } else {
        bp("fixed at " + fixedOffset, index);
        if (scrollTop < Math.min(minTitleTop, fixedOffset)) {
          bp("unset fixed minTitleTop=" + minTitleTop + ", fixedOffset=" + fixedOffset, index);
          fixedTitleOffsets[index] = null;
          return $title.removeClass('summer__fixed');
        } else if (scrollTop < transitionStart) {
          return $title.css('top', 30);
        } else if ((transitionStart <= scrollTop && scrollTop <= contentEnd)) {
          top = unfixTransitionHeight - (scrollTop - transitionStart);
          bp("set top " + top, index);
          return $title.css('top', top);
        } else if (contentEnd < scrollTop) {
          top = -titleHeight;
          $title.css('top', top);
          return bp("set min top " + top, index);
        }
      }
    });
  } else {
    fixedTitleOffsets = [null, null, null];
    $titles.removeClass('summer__fixed');
  }
  parallaxOpacity = 1;
  if (scrollTop > walkoffTop - screenHeight) {
    parallaxOpacity = (scrollTop - walkoffTop + screenHeight) / screenHeight;
  }
  return $parallaxBackground.css('opacity', parallaxOpacity);
});

if (window.E) {
  E.sub(E.Event.App.ROUTE, function(event, to, _, from) {
    var k, len2, waypoint;
    if (from && from === '/elevate') {
      for (k = 0, len2 = waypoints.length; k < len2; k++) {
        waypoint = waypoints[k];
        waypoint.destroy();
      }
      $(window).off('scroll.elevate-summer');
      $('#fixed-navigation, #footer').show();
      $('.site-header').css('background-color', 'white');
      $('.site-header').css('color', '#333');
      $('.site-header').off('mouseenter', transitionToSolidHeader);
      return $('.site-header').off('mouseleave', transitionToTransparentHeader);
    }
  });
  initRSVPButton = function(eventName, eventQuota, $container, buttonOptions) {
    var model;
    $container.click(function() {
      return $container.addClass('summer__waitlist-button--clicked');
    });
    model = new E.base.models.Event({
      name: eventName,
      quota: eventQuota
    });
    return model.findOrCreate().then(function(fetchedEvent) {
      $container.empty();
      return new E.base.views.components.RsvpButtonView(_.extend({
        async: true,
        container: $container,
        model: new E.base.models.Event(fetchedEvent)
      }, buttonOptions));
    });
  };
  initWaitlistButtons = function() {
    var buttonOptions;
    buttonOptions = {
      available_text: 'Waitlist',
      logged_out_text: 'Waitlist',
      previous_reservation_text: 'You\'re on the list! We\'ll notify you a day before launch.',
      sold_out_text: 'Sorry, the list is full.'
    };
    initRSVPButton('Elevate Babo', 500000, $('.summer__js-waitlist-babo'), _.extend({}, buttonOptions, {
      available_text: 'Waitlist Babo'
    }));
    initRSVPButton('Elevate Sandals', 500000, $('.summer__js-waitlist-sandals'), _.extend({}, buttonOptions, {
      available_text: 'Waitlist Sandals'
    }));
    return initRSVPButton('Elevate Nude', 500000, $('.summer__js-waitlist-nude'), _.extend({}, buttonOptions, {
      available_text: 'Waitlist Nude'
    }));
  };
  initWaitlistButtons();
  E.sub(E.Event.User.SIGN_IN, function() {
    return initWaitlistButtons();
  });
}
