var $parallaxBackground, $window, IMAGES_PATH, LooksGallery, currentBg, initRSVPButton, initWaitlistButtons, originalBg, updateParallaxBackground,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

$('.footer').hide();

$window = $(window);

IMAGES_PATH = 'https://everlane.s3.amazonaws.com/static/content-page-images/elevate-summer/mobile/';

$parallaxBackground = $('.summer__fixed-background');

originalBg = currentBg = 'v4/01-hero.jpg';

updateParallaxBackground = function() {
  var bg, scrollTop;
  scrollTop = $window.scrollTop();
  bg = scrollTop > 2200 ? 'v2/12-img.jpg' : originalBg;
  if (bg !== currentBg) {
    currentBg = bg;
    return $parallaxBackground.css('background-image', "url(" + (IMAGES_PATH + bg) + ")");
  }
};

$window.scroll(updateParallaxBackground);

if (window.E) {
  E.sub(E.Event.Mobile.SidebarMenu.OPENED, function() {
    return $parallaxBackground.css('margin-left', '100vw');
  });
  E.sub(E.Event.Mobile.SidebarMenu.CLOSE, function() {
    return $parallaxBackground.css('margin-left', '0');
  });
}

$(".summer__elevate-title--intro").velocity("transition.slideUpIn", {
  'top': '-=50vh'
});

LooksGallery = (function() {
  function LooksGallery($container) {
    this.render = bind(this.render, this);
    this.showNextLook = bind(this.showNextLook, this);
    this.showPreviousLook = bind(this.showPreviousLook, this);
    this.renderArrows = bind(this.renderArrows, this);
    this.renderPips = bind(this.renderPips, this);
    this.handleTouchEnd = bind(this.handleTouchEnd, this);
    this.handleTouchStart = bind(this.handleTouchStart, this);
    this.currentLook = 1;
    this.startX = 0;
    this.startY = 0;
    this.$looks = $container.find('.looks__look');
    this.$looks.on("touchstart", this.handleTouchStart);
    this.$looks.on("touchend", this.handleTouchEnd);
    this.$leftArrow = $container.find('.looks__arrow--left');
    this.$leftArrow.click((function(_this) {
      return function() {
        return _this.showPreviousLook();
      };
    })(this));
    this.$rightArrow = $container.find('.looks__arrow--right');
    this.$rightArrow.click((function(_this) {
      return function() {
        return _this.showNextLook();
      };
    })(this));
    this.$pips = $container.find('.looks__pip-outer-circle');
    this.render();
  }

  LooksGallery.prototype.handleTouchStart = function(jqEvent) {
    this.startX = jqEvent.originalEvent.changedTouches[0].screenX;
    return this.startY = jqEvent.originalEvent.changedTouches[0].screenY;
  };

  LooksGallery.prototype.handleTouchEnd = function(jqEvent) {
    var dx, dy, endX, endY;
    endX = jqEvent.originalEvent.changedTouches[0].screenX;
    endY = jqEvent.originalEvent.changedTouches[0].screenY;
    dx = endX - this.startX;
    dy = endY - this.startY;
    if (Math.abs(dy) > Math.abs(dx)) {
      this.startX = 0;
      return this.startY = 0;
    } else {
      if (dx < 0) {
        return this.showNextLook();
      } else {
        return this.showPreviousLook();
      }
    }
  };

  LooksGallery.prototype.renderPips = function() {
    this.$pips.css('border', 'none');
    return $(this.$pips[this.currentLook - 1]).css('border', '1px solid #f7f7f7');
  };

  LooksGallery.prototype.renderArrows = function() {
    this.$leftArrow.toggle(this.currentLook > 1);
    return this.$rightArrow.toggle(this.currentLook < this.$looks.length);
  };

  LooksGallery.prototype.showPreviousLook = function() {
    if (this.currentLook > 1) {
      this.currentLook -= 1;
      this.$looks.animate({
        'margin-left': '+=90vw'
      });
      return this.render();
    }
  };

  LooksGallery.prototype.showNextLook = function() {
    if (this.currentLook < this.$looks.length) {
      this.currentLook += 1;
      this.$looks.animate({
        'margin-left': '-=90vw'
      });
      return this.render();
    }
  };

  LooksGallery.prototype.render = function() {
    this.renderArrows();
    return this.renderPips();
  };

  return LooksGallery;

})();

new LooksGallery($('.summer__js-babo-looks'));

new LooksGallery($('.summer__js-sandals-looks'));

new LooksGallery($('.summer__js-sandals-2-looks'));

$window.on('scroll.elevate-summer', function() {
  if ($(this).scrollTop() > 50) {
    return $('.fade').fadeOut('slow');
  } else {
    return $('.fade').fadeIn('slow');
  }
});

if (window.E) {
  E.sub(E.Event.App.ROUTE, function(event, to, _, from) {
    if (from && from === '/elevate') {
      $('.footer').show();
      return $window.off('scroll.elevate-summer');
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
    initRSVPButton('Elevate Babo', 500000, $('.summer__js-waitlist-babo'), buttonOptions);
    initRSVPButton('Elevate Sandals', 500000, $('.summer__js-waitlist-sandals'), buttonOptions);
    return initRSVPButton('Elevate Nude', 500000, $('.summer__js-waitlist-nude'), buttonOptions);
  };
  initWaitlistButtons();
  E.sub(E.Event.User.SIGN_IN, function() {
    return initWaitlistButtons();
  });
}
