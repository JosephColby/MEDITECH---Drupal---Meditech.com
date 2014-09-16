// page init
jQuery(function(){
  initSameHeight();
  initMobileMenu();
  initStickyHeader();
  initPopups();
  initInputs();
  jQuery('input, textarea').placeholder();
        document.cookie = 'pagely_dev_mode=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
});

function initMobileMenu(){
  jQuery('.menu-toggle').mobileMenu({
    pageWrapper: '#wrapper',
    initResolution: 1023,
    fixedPanels: '#header .header-bar',
    animSpeed: 500
  });
}

function initStickyHeader(){
  var header = jQuery('#header').addClass('static');
  var origLogo = header.find('.logo');
  var logo = origLogo.clone().prependTo(origLogo.parent()).addClass('add-logo').wrap('<div class="logo-holder"></div>');
  var logoHolder = logo.parent();
  var panel = header.find('.header-bar');
  var panelClone = panel.clone().addClass('clone').insertBefore(panel);
  var addPanel = jQuery('.sub-nav');
  var win = jQuery(window);
  var timer;
  
  panel.addClass('orig');
  
  setState();
  win.on('resize scroll orientationchange load', setState);
  if(addPanel.length) win.on('resize scroll orientationchange load', setAddState);
  
  function setState(){
    var panelOffset = panelClone.offset().top;
    if(win.scrollTop() > panelOffset && !header.hasClass('fixed')) {
      header.removeClass('static').addClass('fixed');
      timer = setTimeout(function(){
        logoHolder.width(logo.outerWidth(true));
      }, 10);
    }
    else if(win.scrollTop() <= panelOffset && header.hasClass('fixed')) {
      header.removeClass('fixed').addClass('static');
      clearTimeout(timer);
      logoHolder.width(0);
    }
    
  }
  
  function setAddState(){
    var addPanelOffset = addPanel.offset().top;
    var offset = panel.outerHeight();
    if(win.scrollTop() + offset > addPanelOffset && !header.hasClass('fixed-add-panel')) {
      header.addClass('fixed-add-panel');
    }
    else if(win.scrollTop() + offset <= addPanelOffset && header.hasClass('fixed-add-panel')) {
      header.removeClass('fixed-add-panel');
    }
  }
}

function initStickyPanels(){
  var panel = jQuery('sub-nav').addClass('static');
  var origLogo = header.find('.logo');
  var logo = origLogo.clone().prependTo(origLogo.parent()).addClass('add-logo').wrap('<div class="logo-holder"></div>');
  var logoHolder = logo.parent();
  var panel = header.find('.header-bar');
  var panelClone = panel.clone().addClass('clone').insertBefore(panel);
  var win = jQuery(window);
  var timer;
  
  panel.addClass('orig');
  
  setState();
  win.on('resize scroll orientationchange load', setState);
  
  function setState(){
    var panelOffset = panelClone.offset().top;
    if(win.scrollTop() > panelOffset && !header.hasClass('fixed')) {
      header.removeClass('static').addClass('fixed');
      timer = setTimeout(function(){
        logoHolder.width(logo.outerWidth(true));
      }, 10);
    }
    else if(win.scrollTop() <= panelOffset && header.hasClass('fixed')) {
      header.removeClass('fixed').addClass('static');
      clearTimeout(timer);
      logoHolder.width(0);
    }
  }
}

// popups init
function initPopups() {
  jQuery('.search-bar').contentPopup({
    mode: 'click',
    popup: '.search-form',
    btnOpen: '.btn-search'
  });
  jQuery('.filter-heading>div').contentPopup({
    mode: 'click',
    popup: '.filter-set',
    btnOpen: '.title'
  });
}

// clear inputs on focus
function initInputs() {
  PlaceholderInput.replaceByOptions({
    // filter options
    clearInputs: true,
    clearTextareas: true,
    clearPasswords: true,
    skipClass: 'default',
    
    // input options
    wrapWithElement: false,
    showUntilTyping: false,
    getParentByClass: false,
    placeholderAttr: 'value'
  });
}

// align blocks height
function initSameHeight() {
  jQuery('.w1').sameHeight({
    elements: '.page-bg',
    flexible: true
  });
  jQuery('.topic-list.twocolumns-type').sameHeight({
    elements: '.descr',
    flexible: true,
    multiLine: true
  });
  jQuery('.products-list').sameHeight({
    elements: '.holder',
    flexible: true,
    multiLine: true
  });
}

/*
 * Popups plugin
 */
;(function($) {
  function ContentPopup(opt) {
    this.options = $.extend({
      holder: null,
      popup: '.popup',
      btnOpen: '.open',
      btnClose: '.close',
      openClass: 'popup-active',
      clickEvent: 'click',
      mode: 'click',
      hideOnClickLink: true,
      hideOnClickOutside: true,
      delay: 50
    }, opt);
    if(this.options.holder) {
      this.holder = $(this.options.holder);
      this.init();
    }
  }
  ContentPopup.prototype = {
    init: function() {
      this.findElements();
      this.attachEvents();
    },
    findElements: function() {
      this.popup = this.holder.find(this.options.popup);
      this.btnOpen = this.holder.find(this.options.btnOpen);
      this.btnClose = this.holder.find(this.options.btnClose);
    },
    attachEvents: function() {
      // handle popup openers
      var self = this;
      this.clickMode = isTouchDevice || (self.options.mode === self.options.clickEvent);

      if(this.clickMode) {
        // handle click mode
        this.btnOpen.bind(self.options.clickEvent, function(e) {
          if(self.holder.hasClass(self.options.openClass)) {
            if(self.options.hideOnClickLink) {
              self.hidePopup();
            }
          } else {
            self.showPopup();
          }
          e.preventDefault();
        });

        // prepare outside click handler
        this.outsideClickHandler = this.bind(this.outsideClickHandler, this);
      } else {
        // handle hover mode
        var timer, delayedFunc = function(func) {
          clearTimeout(timer);
          timer = setTimeout(function() {
            func.call(self);
          }, self.options.delay);
        };
        this.btnOpen.bind('mouseover', function() {
          delayedFunc(self.showPopup);
        }).bind('mouseout', function() {
          delayedFunc(self.hidePopup);
        });
        this.popup.bind('mouseover', function() {
          delayedFunc(self.showPopup);
        }).bind('mouseout', function() {
          delayedFunc(self.hidePopup);
        });
      }

      // handle close buttons
      this.btnClose.bind(self.options.clickEvent, function(e) {
        self.hidePopup();
        e.preventDefault();
      });
    },
    outsideClickHandler: function(e) {
      // hide popup if clicked outside
      var currentNode = (e.changedTouches ? e.changedTouches[0] : e).target;
      if(!$(currentNode).parents().filter(this.holder).length) {
        this.hidePopup();
      }
    },
    showPopup: function() {
      // reveal popup
      this.holder.addClass(this.options.openClass);
      this.popup.css({display:'block'});

      // outside click handler
      if(this.clickMode && this.options.hideOnClickOutside && !this.outsideHandlerActive) {
        this.outsideHandlerActive = true;
        $(document).bind('click touchstart', this.outsideClickHandler);
      }
    },
    hidePopup: function() {
      // hide popup
      this.holder.removeClass(this.options.openClass);
      this.popup.css({display:'none'});

      // outside click handler
      if(this.clickMode && this.options.hideOnClickOutside && this.outsideHandlerActive) {
        this.outsideHandlerActive = false;
        $(document).unbind('click touchstart', this.outsideClickHandler);
      }
    },
    bind: function(f, scope, forceArgs){
      return function() {return f.apply(scope, forceArgs ? [forceArgs] : arguments);};
    }
  };

  // detect touch devices
  var isTouchDevice = /MSIE 10.*Touch/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

  // jQuery plugin interface
  $.fn.contentPopup = function(opt) {
    return this.each(function() {
      new ContentPopup($.extend(opt, {holder: this}));
    });
  };
}(jQuery));

/*
 * jQuery SameHeight plugin
 */
;(function($){
  $.fn.sameHeight = function(opt) {
    var options = $.extend({
      skipClass: 'same-height-ignore',
      leftEdgeClass: 'same-height-left',
      rightEdgeClass: 'same-height-right',
      elements: '>*',
      flexible: false,
      multiLine: false,
      useMinHeight: false,
      biggestHeight: false
    },opt);
    return this.each(function(){
      var holder = $(this), postResizeTimer, ignoreResize;
      var elements = holder.find(options.elements).not('.' + options.skipClass);
      if(!elements.length) return;

      // resize handler
      function doResize() {
        elements.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', '');
        if(options.multiLine) {
          // resize elements row by row
          resizeElementsByRows(elements, options);
        } else {
          // resize elements by holder
          resizeElements(elements, holder, options);
        }
      }
      doResize();

      // handle flexible layout / font resize
      var delayedResizeHandler = function() {
        if(!ignoreResize) {
          ignoreResize = true;
          doResize();
          clearTimeout(postResizeTimer);
          postResizeTimer = setTimeout(function() {
            doResize();
            setTimeout(function(){
              ignoreResize = false;
            }, 10);
          }, 100);
        }
      };

      // handle flexible/responsive layout
      if(options.flexible) {
        $(window).bind('resize orientationchange fontresize', delayedResizeHandler);
      }

      // handle complete page load including images and fonts
      $(window).bind('load', delayedResizeHandler);
    });
  };

  // detect css min-height support
  var supportMinHeight = typeof document.documentElement.style.maxHeight !== 'undefined';

  // get elements by rows
  function resizeElementsByRows(boxes, options) {
    var currentRow = $(), maxHeight, maxCalcHeight = 0, firstOffset = boxes.eq(0).offset().top;
    boxes.filter(':visible').each(function(ind){
      var curItem = $(this);
      if(curItem.offset().top === firstOffset) {
        currentRow = currentRow.add(this);
      } else {
        maxHeight = getMaxHeight(currentRow);
        maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
        currentRow = curItem;
        firstOffset = curItem.offset().top;
      }
    });
    if(currentRow.length) {
      maxHeight = getMaxHeight(currentRow);
      maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
    }
    if(options.biggestHeight) {
      boxes.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', maxCalcHeight);
    }
  }

  // calculate max element height
  function getMaxHeight(boxes) {
    var maxHeight = 0;
    boxes.each(function(){
      maxHeight = Math.max(maxHeight, $(this).outerHeight());
    });
    return maxHeight;
  }

  // resize helper function
  function resizeElements(boxes, parent, options) {
    var calcHeight;
    var parentHeight = typeof parent === 'number' ? parent : parent.height();
    boxes.removeClass(options.leftEdgeClass).removeClass(options.rightEdgeClass).each(function(i){
      var element = $(this);
      var depthDiffHeight = 0;
      var isBorderBox = element.css('boxSizing') === 'border-box' || element.css('-moz-box-sizing') === 'border-box' || '-webkit-box-sizing' === 'border-box';

      if(typeof parent !== 'number') {
        element.parents().each(function(){
          var tmpParent = $(this);
          if(parent.is(this)) {
            return false;
          } else {
            depthDiffHeight += tmpParent.outerHeight() - tmpParent.height();
          }
        });
      }
      calcHeight = parentHeight - depthDiffHeight;
      calcHeight -= isBorderBox ? 0 : element.outerHeight() - element.height();

      if(calcHeight > 0) {
        element.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', calcHeight);
      }
    });
    boxes.filter(':first').addClass(options.leftEdgeClass);
    boxes.filter(':last').addClass(options.rightEdgeClass);
    return calcHeight;
  }
}(jQuery));

/*
 * jQuery FontResize Event
 */
jQuery.onFontResize = (function($) {
  $(function() {
    var randomID = 'font-resize-frame-' + Math.floor(Math.random() * 1000);
    var resizeFrame = $('<iframe>').attr('id', randomID).addClass('font-resize-helper');

    // required styles
    resizeFrame.css({
      width: '100em',
      height: '10px',
      position: 'absolute',
      borderWidth: 0,
      top: '-9999px',
      left: '-9999px'
    }).appendTo('body');

    // use native IE resize event if possible
    if (window.attachEvent && !window.addEventListener) {
      resizeFrame.bind('resize', function () {
        $.onFontResize.trigger(resizeFrame[0].offsetWidth / 100);
      });
    }
    // use script inside the iframe to detect resize for other browsers
    else {
      var doc = resizeFrame[0].contentWindow.document;
      doc.open();
      doc.write('<scri' + 'pt>window.onload = function(){var em = parent.jQuery("#' + randomID + '")[0];window.onresize = function(){if(parent.jQuery.onFontResize){parent.jQuery.onFontResize.trigger(em.offsetWidth / 100);}}};</scri' + 'pt>');
      doc.close();
    }
    jQuery.onFontResize.initialSize = resizeFrame[0].offsetWidth / 100;
  });
  return {
    // public method, so it can be called from within the iframe
    trigger: function (em) {
      $(window).trigger("fontresize", [em]);
    }
  };
}(jQuery));

/*! http://mths.be/placeholder v2.0.7 by @mathias */
;(function(window, document, $) {

  // Opera Mini v7 doesn’t support placeholder although its DOM seems to indicate so
  var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
  var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
  var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
  var prototype = $.fn;
  var valHooks = $.valHooks;
  var propHooks = $.propHooks;
  var hooks;
  var placeholder;

  if (isInputSupported && isTextareaSupported) {

    placeholder = prototype.placeholder = function() {
      return this;
    };

    placeholder.input = placeholder.textarea = true;

  } else {

    placeholder = prototype.placeholder = function() {
      var $this = this;
      $this
        .filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
        .not('.placeholder')
        .bind({
          'focus.placeholder': clearPlaceholder,
          'blur.placeholder': setPlaceholder
        })
        .data('placeholder-enabled', true)
        .trigger('blur.placeholder');
      return $this;
    };

    placeholder.input = isInputSupported;
    placeholder.textarea = isTextareaSupported;

    hooks = {
      'get': function(element) {
        var $element = $(element);

        var $passwordInput = $element.data('placeholder-password');
        if ($passwordInput) {
          return $passwordInput[0].value;
        }

        return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
      },
      'set': function(element, value) {
        var $element = $(element);

        var $passwordInput = $element.data('placeholder-password');
        if ($passwordInput) {
          return $passwordInput[0].value = value;
        }

        if (!$element.data('placeholder-enabled')) {
          return element.value = value;
        }
        if (value == '') {
          element.value = value;
          // Issue #56: Setting the placeholder causes problems if the element continues to have focus.
          if (element != safeActiveElement()) {
            // We can't use `triggerHandler` here because of dummy text/password inputs :(
            setPlaceholder.call(element);
          }
        } else if ($element.hasClass('placeholder')) {
          clearPlaceholder.call(element, true, value) || (element.value = value);
        } else {
          element.value = value;
        }
        // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
        return $element;
      }
    };

    if (!isInputSupported) {
      valHooks.input = hooks;
      propHooks.value = hooks;
    }
    if (!isTextareaSupported) {
      valHooks.textarea = hooks;
      propHooks.value = hooks;
    }

    $(function() {
      // Look for forms
      $(document).delegate('form', 'submit.placeholder', function() {
        // Clear the placeholder values so they don't get submitted
        var $inputs = $('.placeholder', this).each(clearPlaceholder);
        setTimeout(function() {
          $inputs.each(setPlaceholder);
        }, 10);
      });
    });

    // Clear placeholder values upon page reload
    $(window).bind('beforeunload.placeholder', function() {
      $('.placeholder').each(function() {
        this.value = '';
      });
    });

  }

  function args(elem) {
    // Return an object of element attributes
    var newAttrs = {};
    var rinlinejQuery = /^jQuery\d+$/;
    $.each(elem.attributes, function(i, attr) {
      if (attr.specified && !rinlinejQuery.test(attr.name)) {
        newAttrs[attr.name] = attr.value;
      }
    });
    return newAttrs;
  }

  function clearPlaceholder(event, value) {
    var input = this;
    var $input = $(input);
    if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
      if ($input.data('placeholder-password')) {
        $input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
        // If `clearPlaceholder` was called from `$.valHooks.input.set`
        if (event === true) {
          return $input[0].value = value;
        }
        $input.focus();
      } else {
        input.value = '';
        $input.removeClass('placeholder');
        input == safeActiveElement() && input.select();
      }
    }
  }

  function setPlaceholder() {
    var $replacement;
    var input = this;
    var $input = $(input);
    var id = this.id;
    if (input.value == '') {
      if (input.type == 'password') {
        if (!$input.data('placeholder-textinput')) {
          try {
            $replacement = $input.clone().attr({ 'type': 'text' });
          } catch(e) {
            $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
          }
          $replacement
            .removeAttr('name')
            .data({
              'placeholder-password': $input,
              'placeholder-id': id
            })
            .bind('focus.placeholder', clearPlaceholder);
          $input
            .data({
              'placeholder-textinput': $replacement,
              'placeholder-id': id
            })
            .before($replacement);
        }
        $input = $input.removeAttr('id').hide().prev().attr('id', id).show();
        // Note: `$input[0] != input` now!
      }
      $input.addClass('placeholder');
      $input[0].value = $input.attr('placeholder');
    } else {
      $input.removeClass('placeholder');
    }
  }

  function safeActiveElement() {
    // Avoid IE9 `document.activeElement` of death
    // https://github.com/mathiasbynens/jquery-placeholder/pull/99
    try {
      return document.activeElement;
    } catch (err) {}
  }

}(this, document, jQuery));

// placeholder class
;(function(){
  var placeholderCollection = [];
  PlaceholderInput = function() {
    this.options = {
      element:null,
      showUntilTyping:false,
      wrapWithElement:false,
      getParentByClass:false,
      showPasswordBullets:false,
      placeholderAttr:'value',
      inputFocusClass:'focus',
      inputActiveClass:'text-active',
      parentFocusClass:'parent-focus',
      parentActiveClass:'parent-active',
      labelFocusClass:'label-focus',
      labelActiveClass:'label-active',
      fakeElementClass:'input-placeholder-text'
    };
    placeholderCollection.push(this);
    this.init.apply(this,arguments);
  };
  PlaceholderInput.refreshAllInputs = function(except) {
    for(var i = 0; i < placeholderCollection.length; i++) {
      if(except !== placeholderCollection[i]) {
        placeholderCollection[i].refreshState();
      }
    }
  };
  PlaceholderInput.replaceByOptions = function(opt) {
    var inputs = [].concat(
      convertToArray(document.getElementsByTagName('input')),
      convertToArray(document.getElementsByTagName('textarea'))
    );
    for(var i = 0; i < inputs.length; i++) {
      if(inputs[i].className.indexOf(opt.skipClass) < 0) {
        var inputType = getInputType(inputs[i]);
        var placeholderValue = inputs[i].getAttribute('placeholder');
        if(opt.focusOnly || (opt.clearInputs && (inputType === 'text' || inputType === 'email' || placeholderValue)) ||
          (opt.clearTextareas && inputType === 'textarea') ||
          (opt.clearPasswords && inputType === 'password')
        ) {
          new PlaceholderInput({
            element:inputs[i],
            focusOnly: opt.focusOnly,
            wrapWithElement:opt.wrapWithElement,
            showUntilTyping:opt.showUntilTyping,
            getParentByClass:opt.getParentByClass,
            showPasswordBullets:opt.showPasswordBullets,
            placeholderAttr: placeholderValue ? 'placeholder' : opt.placeholderAttr
          });
        }
      }
    }
  };
  PlaceholderInput.prototype = {
    init: function(opt) {
      this.setOptions(opt);
      if(this.element && this.element.PlaceholderInst) {
        this.element.PlaceholderInst.refreshClasses();
      } else {
        this.element.PlaceholderInst = this;
        if(this.elementType !== 'radio' || this.elementType !== 'checkbox' || this.elementType !== 'file') {
          this.initElements();
          this.attachEvents();
          this.refreshClasses();
        }
      }
    },
    setOptions: function(opt) {
      for(var p in opt) {
        if(opt.hasOwnProperty(p)) {
          this.options[p] = opt[p];
        }
      }
      if(this.options.element) {
        this.element = this.options.element;
        this.elementType = getInputType(this.element);
        if(this.options.focusOnly) {
          this.wrapWithElement = false;
        } else {
          if(this.elementType === 'password' && this.options.showPasswordBullets && !this.options.showUntilTyping) {
            this.wrapWithElement = false;
          } else {
            this.wrapWithElement = this.elementType === 'password' || this.options.showUntilTyping ? true : this.options.wrapWithElement;
          }
        }
        this.setPlaceholderValue(this.options.placeholderAttr);
      }
    },
    setPlaceholderValue: function(attr) {
      this.origValue = (attr === 'value' ? this.element.defaultValue : (this.element.getAttribute(attr) || ''));
      if(this.options.placeholderAttr !== 'value') {
        this.element.removeAttribute(this.options.placeholderAttr);
      }
    },
    initElements: function() {
      // create fake element if needed
      if(this.wrapWithElement) {
        this.fakeElement = document.createElement('span');
        this.fakeElement.className = this.options.fakeElementClass;
        this.fakeElement.innerHTML += this.origValue;
        this.fakeElement.style.color = getStyle(this.element, 'color');
        this.fakeElement.style.position = 'absolute';
        this.element.parentNode.insertBefore(this.fakeElement, this.element);
        
        if(this.element.value === this.origValue || !this.element.value) {
          this.element.value = '';
          this.togglePlaceholderText(true);
        } else {
          this.togglePlaceholderText(false);
        }
      } else if(!this.element.value && this.origValue.length) {
        this.element.value = this.origValue;
      }
      // get input label
      if(this.element.id) {
        this.labels = document.getElementsByTagName('label');
        for(var i = 0; i < this.labels.length; i++) {
          if(this.labels[i].htmlFor === this.element.id) {
            this.labelFor = this.labels[i];
            break;
          }
        }
      }
      // get parent node (or parentNode by className)
      this.elementParent = this.element.parentNode;
      if(typeof this.options.getParentByClass === 'string') {
        var el = this.element;
        while(el.parentNode) {
          if(hasClass(el.parentNode, this.options.getParentByClass)) {
            this.elementParent = el.parentNode;
            break;
          } else {
            el = el.parentNode;
          }
        }
      }
    },
    attachEvents: function() {
      this.element.onfocus = bindScope(this.focusHandler, this);
      this.element.onblur = bindScope(this.blurHandler, this);
      if(this.options.showUntilTyping) {
        this.element.onkeydown = bindScope(this.typingHandler, this);
        this.element.onpaste = bindScope(this.typingHandler, this);
      }
      if(this.wrapWithElement) this.fakeElement.onclick = bindScope(this.focusSetter, this);
    },
    togglePlaceholderText: function(state) {
      if(!this.element.readOnly && !this.options.focusOnly) {
        if(this.wrapWithElement) {
          this.fakeElement.style.display = state ? '' : 'none';
        } else {
          this.element.value = state ? this.origValue : '';
        }
      }
    },
    focusSetter: function() {
      this.element.focus();
    },
    focusHandler: function() {
      clearInterval(this.checkerInterval);
      this.checkerInterval = setInterval(bindScope(this.intervalHandler,this), 1);
      this.focused = true;
      if(!this.element.value.length || this.element.value === this.origValue) {
        if(!this.options.showUntilTyping) {
          this.togglePlaceholderText(false);
        }
      }
      this.refreshClasses();
    },
    blurHandler: function() {
      clearInterval(this.checkerInterval);
      this.focused = false;
      if(!this.element.value.length || this.element.value === this.origValue) {
        this.togglePlaceholderText(true);
      }
      this.refreshClasses();
      PlaceholderInput.refreshAllInputs(this);
    },
    typingHandler: function() {
      setTimeout(bindScope(function(){
        if(this.element.value.length) {
          this.togglePlaceholderText(false);
          this.refreshClasses();
        }
      },this), 10);
    },
    intervalHandler: function() {
      if(typeof this.tmpValue === 'undefined') {
        this.tmpValue = this.element.value;
      }
      if(this.tmpValue != this.element.value) {
        PlaceholderInput.refreshAllInputs(this);
      }
    },
    refreshState: function() {
      if(this.wrapWithElement) {
        if(this.element.value.length && this.element.value !== this.origValue) {
          this.togglePlaceholderText(false);
        } else if(!this.element.value.length) {
          this.togglePlaceholderText(true);
        }
      }
      this.refreshClasses();
    },
    refreshClasses: function() {
      this.textActive = this.focused || (this.element.value.length && this.element.value !== this.origValue);
      this.setStateClass(this.element, this.options.inputFocusClass,this.focused);
      this.setStateClass(this.elementParent, this.options.parentFocusClass,this.focused);
      this.setStateClass(this.labelFor, this.options.labelFocusClass,this.focused);
      this.setStateClass(this.element, this.options.inputActiveClass, this.textActive);
      this.setStateClass(this.elementParent, this.options.parentActiveClass, this.textActive);
      this.setStateClass(this.labelFor, this.options.labelActiveClass, this.textActive);
    },
    setStateClass: function(el,cls,state) {
      if(!el) return; else if(state) addClass(el,cls); else removeClass(el,cls);
    }
  };
  
  // utility functions
  function convertToArray(collection) {
    var arr = [];
    for (var i = 0, ref = arr.length = collection.length; i < ref; i++) {
      arr[i] = collection[i];
    }
    return arr;
  }
  function getInputType(input) {
    return (input.type ? input.type : input.tagName).toLowerCase();
  }
  function hasClass(el,cls) {
    return el.className ? el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')) : false;
  }
  function addClass(el,cls) {
    if (!hasClass(el,cls)) el.className += " "+cls;
  }
  function removeClass(el,cls) {
    if (hasClass(el,cls)) {el.className=el.className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'),' ');}
  }
  function bindScope(f, scope) {
    return function() {return f.apply(scope, arguments);};
  }
  function getStyle(el, prop) {
    if (document.defaultView && document.defaultView.getComputedStyle) {
      return document.defaultView.getComputedStyle(el, null)[prop];
    } else if (el.currentStyle) {
      return el.currentStyle[prop];
    } else {
      return el.style[prop];
    }
  }
}());

// side sliding mobile menu
jQuery.fn.mobileMenu = function(opt) {
  var options = jQuery.extend({
    pageWrapper: null,
    animSpeed: 500,
    initResolution: 767,
    useSwipe: false,
    fixedPanels: null,
    fixedHeight: false,
    fixedPosition: false
  }, opt);

  return this.each(function(){
    var opener = jQuery(this),
      win = jQuery(window),
      body = jQuery('body'),
      wrapper = body.find(options.pageWrapper),
      initResolution = "'.." + options.initResolution + "'",
      animSpeed = options.animSpeed,
      isTouchDevice = /MSIE 10.*Touch/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
      navBlock,
      fixedPanels,
      obj = {};

    obj[initResolution] = {
      on: function(){
        init();
      },
      off: function() {
        destroy();
      }
    }

    //init layouts
    ResponsiveHelper.addRange(obj);
    
    //init mobile menu function
    function init(){
      //preparation of html structure
      if(!wrapper.length){
        body.wrapInner('<div id="wrapper" class="temp-wrap" />');
        wrapper = jQuery('#wrapper');
      }
      wrapper.wrap('<div id="page" class="temp-wrap" />');
      if(options.fixedPosition) opener.parent().addClass('fixed');
      if(options.fixedPanels) fixedPanels = wrapper.find(options.fixedPanels);
      
      //set variables
      var page = jQuery('#page');
      navBlock = jQuery('#' + opener.attr('data-rel'))
      navBlock.data('parent', navBlock.parent());
      navBlock.appendTo(page).show();
      var defWidth = navBlock.outerWidth();
      
      //addition the necessary styles
      wrapper.add(page).css({
        overflow: 'hidden',
        position: 'relative'
      });
      navBlock.css({
        position: options.fixedPosition ? 'fixed' : 'absolute',
        top: 0,
        right: '100%'
      });
      
      //click handler
      opener.bind('click', function(e){
        e.preventDefault();
        opener.hasClass('active') ? hideMenu() : showMenu();
      });
      
      //recalc sizes on window width change
      win.bind('resize.Mobile orientationchange.Mobile', function(){
        if(opener.hasClass('active')){
          defWidth = navBlock.outerWidth();
          navBlock.css({marginRight: - defWidth});
          wrapper.css({left: defWidth});
          page.css({height: Math.max(win.height(), navBlock.outerHeight())});
        }
      });
      
      //show menu function
      function showMenu(){
        opener.addClass('active');
        //crop extra space if option fixedHeight is active
        if(options.fixedHeight) {
          page.css({height: Math.max(win.height(), navBlock.outerHeight())});
        }
        defWidth = navBlock.outerWidth();
        
        //animate menu
        navBlock.stop().animate({
          marginRight: - defWidth
        }, animSpeed);
        fixedPanels.stop().animate({
          marginLeft: defWidth,
          marginRight: -defWidth
        }, animSpeed);
        wrapper.stop().animate({
          left: defWidth
        }, animSpeed);
        if(options.fixedPosition) {
          opener.parent().stop().animate({
            marginLeft: defWidth
          }, animSpeed);
          navBlock.css({
            top: navBlock.offset().top,
            position: 'absolute'
          });
          win.bind('scroll.Mobile', function(){
            if(win.scrollTop() < navBlock.offset().top) {
              navBlock.css('top', win.scrollTop());
            }
          });
        }
      }
      
      //hide menu function
      function hideMenu(){
        //animate menu
        fixedPanels.stop().animate({
          marginLeft: 0,
          marginRight: 0
        }, animSpeed);
        navBlock.stop().animate({
          marginRight: 0
        }, animSpeed);
        wrapper.stop().animate({
          left: 0
        }, {
          duration: animSpeed,
          complete: function(){
            opener.removeClass('active');
            //remove fixed height of page
            if(options.fixedHeight) page.css('height', '');
          }
        });
        
        if(options.fixedPosition) {
          opener.parent().stop().animate({
            marginLeft: 0
          }, animSpeed);
          navBlock.css({
            top: '',
            position: 'fixed'
          });
          win.unbind('scroll.Mobile');
        }
      }
      
      //enable swipe for menu opening on touch devices 
      if(options.useSwipe && isTouchDevice) {
        Hammer(page).on("swipeleft", hideMenu).on("swiperight", showMenu);
      }
    }
    //destroy mobile menu function
    function destroy(){
      win.unbind('resize.Mobile orientationchange.Mobile scroll.Mobile');
      wrapper.stop().removeAttr('style');
      navBlock.stop().removeAttr('style').appendTo(navBlock.data('parent'));
      jQuery('.temp-wrap > *:first-child').unwrap();
      if(fixedPanels) {
        fixedPanels.css({
          marginLeft: '',
          marginRight: ''
        });
      }
      opener.removeClass('active').unbind('click');
    }
  });
}

/*
 * Responsive Layout helper
 */
ResponsiveHelper = (function($){
  // init variables
  var handlers = [];
  var win = $(window), prevWinWidth;
  var scrollBarWidth = 0;

  // prepare resize handler
  function resizeHandler() {
    var winWidth = win.width() + scrollBarWidth;
    if(winWidth !== prevWinWidth) {
      prevWinWidth = winWidth;

      // loop through range groups
      $.each(handlers, function(index, rangeObject){
        // disable current active area if needed
        $.each(rangeObject.data, function(property, item) {
          if((winWidth < item.range[0] || winWidth > item.range[1]) && item.currentActive) {
            item.currentActive = false;
            if(typeof item.disableCallback === 'function') {
              item.disableCallback();
            }
          }
        });

        // enable areas that match current width
        $.each(rangeObject.data, function(property, item) {
          if(winWidth >= item.range[0] && winWidth <= item.range[1] && !item.currentActive) {
            // make callback
            item.currentActive = true;
            if(typeof item.enableCallback === 'function') {
              item.enableCallback();
            }
          }
        });
      });
    }
  }
  win.bind('load', function(){
    if(($.browser.mozilla || $.browser.opera || $.browser.msie) && window.addEventListener) {
      scrollBarWidth = window.innerWidth - $('body').width();
      resizeHandler();
    }
    win.bind('resize orientationchange', resizeHandler);
  });

  // range parser
  function parseRange(rangeStr) {
    var rangeData = rangeStr.split('..');
    var x1 = parseInt(rangeData[0], 10) || -Infinity;
    var x2 = parseInt(rangeData[1], 10) || Infinity;
    return [x1, x2].sort(function(a, b){
      return a - b;
    });
  }

  // export public functions
  return {
    addRange: function(ranges) {
      // parse data and add items to collection
      var result = {data:{}};
      $.each(ranges, function(property, data){
        result.data[property] = {
          range: parseRange(property),
          enableCallback: data.on,
          disableCallback: data.off
        };
      });
      handlers.push(result);

      // call resizeHandler to recalculate all events
      prevWinWidth = null;
      resizeHandler();
    }
  };
}(jQuery));

/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
;window.matchMedia=window.matchMedia||(function(e,f){var c,a=e.documentElement,b=a.firstElementChild||a.firstChild,d=e.createElement("body"),g=e.createElement("div");g.id="mq-test-1";g.style.cssText="position:absolute;top:-100em";d.appendChild(g);return function(h){g.innerHTML='&shy;<style media="'+h+'"> #mq-test-1 { width: 42px; }</style>';a.insertBefore(d,b);c=g.offsetWidth==42;a.removeChild(d);return{matches:c,media:h}}})(document);

/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with span elements). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */
;(function(a){a.picturefill=function(){var b=a.document.getElementsByTagName("span");for(var f=0,l=b.length;f<l;f++){if(b[f].getAttribute("data-picture")!==null){var c=b[f].getElementsByTagName("span"),h=[];for(var e=0,g=c.length;e<g;e++){var d=c[e].getAttribute("data-media");if(!d||(a.matchMedia&&a.matchMedia(d).matches)){h.push(c[e])}}var m=b[f].getElementsByTagName("img")[0];if(h.length){var k=h.pop();if(!m||m.parentNode.nodeName==="NOSCRIPT"){m=a.document.createElement("img");m.alt=b[f].getAttribute("data-alt")}if(k.getAttribute("data-width")){m.setAttribute("width",k.getAttribute("data-width"))}else{m.removeAttribute("width")}if(k.getAttribute("data-height")){m.setAttribute("height",k.getAttribute("data-height"))}else{m.removeAttribute("height")}m.src=k.getAttribute("data-src");k.appendChild(m)}else{if(m){m.parentNode.removeChild(m)}}}}};if(a.addEventListener){a.addEventListener("resize",a.picturefill,false);a.addEventListener("DOMContentLoaded",function(){a.picturefill();a.removeEventListener("load",a.picturefill,false)},false);a.addEventListener("load",a.picturefill,false)}else{if(a.attachEvent){a.attachEvent("onload",a.picturefill)}}}(this));
