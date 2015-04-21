// https://raw.githubusercontent.com/jquery/jquery-mousewheel/4.0.x/jquery.mousewheel.min.js
/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.12
 *
 * Requires: jQuery 1.2.2+
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});

// http://stackoverflow.com/a/14805098/1677077
// http://stackoverflow.com/a/9028213/1677077
$(function(){
  var $window = $(window);
  var timeStamp = new Date().getTime();
  var $header = $('#top-nav');
  var $header_li = $header.find("ul li a[href^='#']");
  var header_height = ($header.css('position') == 'fixed') ? Math.round($header.outerHeight(true)) : 0;
  $header_li.on('click',function(e){
    e.preventDefault();
    var hash = this.hash;
    var $this = $(this);
    $('html, body').finish().animate({
      //scrollTop: Math.round($(this.hash).offset().top)-header_height
      scrollTop: Math.round($(this.hash).offset().top)
    },450,function(){
      $header_li.removeClass('active');
      $this.addClass('active');
      //window.location.hash = hash;
    });
  });
  $window.on('scroll',function(){
    $this = $(this);
    for(var i = 0; i < $header_li.length; i++) {
      //if(Math.round($this.scrollTop()) < (Math.round($($($header_li[i]).attr('href')).offset().top)-header_height)) {
      if(Math.round($this.scrollTop()) < Math.round($($($header_li[i]).attr('href')).offset().top)) {
        $($header_li[i]).removeClass('active');
      }
      else {
        $($header_li[i]).addClass('active');
        if(typeof $header_li[i+1] != 'undefined') {
          //if(Math.round($this.scrollTop()) >= (Math.round($($($header_li[i+1]).attr('href')).offset().top)-header_height)) {
          if(Math.round($this.scrollTop()) >= Math.round($($($header_li[i+1]).attr('href')).offset().top)) {
            $($header_li[i]).removeClass('active');
          }
        }
      }
    }
  });
  var mousewheel_sections = [];
  for(var i = 0; i < $header_li.length; i++) {
    var header_li_href = $($header_li[i]).attr('href');
    mousewheel_sections[header_li_href.substr(1)] = i;
    $(header_li_href).on('mousewheel',function(e){
      $this = $(this);
      if(Math.round($window.height()) >= Math.round($this.outerHeight(true)) || (Math.round($(window).scrollTop())-Math.round($this.offset().top)) < header_height) {
        var timeNow = new Date().getTime();
        var mousewheel_attr = '';
        if(typeof e.deltaY != 'undefined' && (timeNow - timeStamp >= 100)) {
          timeStamp = timeNow;
          if(parseInt(e.deltaY) > 0) {
            if(typeof $header_li[mousewheel_sections[$this.attr('id')]-1] != 'undefined' && Math.round($window.height()) >= Math.round($this.outerHeight(true))) {
              mousewheel_attr = $($header_li[mousewheel_sections[$this.attr('id')]-1]).attr('href');
            }
          }
          else {
            if(parseInt(e.deltaY) < 0) {
              if(typeof $header_li[mousewheel_sections[$this.attr('id')]+1] != 'undefined' && Math.round($window.height()) >= Math.round($this.outerHeight(true))) {
                mousewheel_attr = $($header_li[mousewheel_sections[$this.attr('id')]+1]).attr('href');
              }
            }
          }
          if(mousewheel_attr) {
            e.preventDefault();
            $('html, body').finish().animate({
              //scrollTop: Math.round($(mousewheel_attr).offset().top)-header_height
              scrollTop: Math.round($(mousewheel_attr).offset().top)
            },450);
          }
        }
        else {
          timeStamp = timeNow;
          return;
        }
      }
    });
  }
});