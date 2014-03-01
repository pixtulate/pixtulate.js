/**
 * @author Gregory Willis
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Pixtulate. All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @param domainName
 * @param modifyURL
 * @param constrainDimensions
 */
function pixtulate(domainName, modifyURL, constrainDimensions) {
  if (domainName)
    domainName = "http://" + domainName + ".api.pixtulate.com/";
  var viewportDPR = window.devicePixelRatio || 1;
  var viewportW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var viewportH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  var url = domainName || "http://demo.api.pixtulate.com/";
  var mod_url = modifyURL || false;
  var constrain = constrainDimensions || false;
  var images = document.images;
  var img = document.getElementsByTagName("img");
  var placeholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC";
  var i = 0;
  var device = navigator.userAgent;
  for (i = 0; i < images.length; i++) {
    if (img[i].getAttribute("data-src") !== null) {
      var imgCW;
      var imgCH;
      var origSrc = img[i].getAttribute("data-src") || img[i].src;
      var newSrc;
      if (mod_url && origSrc.indexOf("://") > -1) {
        var regex = /(\.\w+\/)/g;
        var r = origSrc.match(regex);
        var a = origSrc.indexOf(r);
        var b = a + r[0].length;
        var c = origSrc.substr(0, b);
        newSrc = origSrc.replace(c, url);
      } else if (origSrc.indexOf("://") === -1) {
        newSrc = url;
        newSrc += origSrc;
      } else {
        newSrc = origSrc;
      }
      var parent = img[i].parentNode;
      if (parent !== null && parent.nodeName !== "BODY") {
        imgCW = img[i].getAttribute("width");
        if (img[i].getAttribute("width") || img[i].getAttribute("height")) {
          imgCH = img[i].getAttribute("height");
        } else {
          if (device.indexOf("MSIE 8.0") > -1) {
            var type = parent.currentStyle.width || parent.currentStyle.height;
            if (type.indexOf("em") > -1) {
              var w = parseInt(parent.currentStyle.width) * 16;
              var h = parseInt(parent.currentStyle.height) * 16;
              imgCW = img[i].getAttribute("width") || w;
              imgCH = img[i].getAttribute("height") || h;
            } else if (type.indexOf("%") > -1) {
              var pct_w = parseInt(parent.currentStyle.width);
              var pct_h = parseInt(parent.currentStyle.height);
              var w = (pct_w / 100) * document.documentElement.clientWidth;
              var h = (pct_h / 100) * document.documentElement.clientWidth;
              imgCW = img[i].getAttribute("width") || parseInt(w);
              imgCH = img[i].getAttribute("height") || parseInt(h);
            } else {
              imgCW = img[i].getAttribute("width") || parseInt(parent.currentStyle.width);
              imgCH = img[i].getAttribute("height") || parseInt(parent.currentStyle.height);
            }
          } else {
            imgCW = img[i].getAttribute("width") || parseInt(window.getComputedStyle(parent).getPropertyValue("width"));
            imgCH = img[i].getAttribute("height") || parseInt(window.getComputedStyle(parent).getPropertyValue("height"));
          }
        }
      } else {
        if ((device.indexOf("MSIE 8.0") > -1) && typeof img[i].getAttribute("class") === 'string') {
          var type = img[i].currentStyle.width || img[i].currentStyle.height;
          if (type.indexOf("em") > -1) {
            var w = parseInt(img[i].currentStyle.width) * 16;
            var h = parseInt(img[i].currentStyle.height) * 16;
            imgCW = w || img[i].getAttribute("width");
            imgCH = h || img[i].getAttribute("height");
          } else if (type.indexOf("%") > -1) {
            var pct_w = parseInt(img[i].currentStyle.width);
            var pct_h = parseInt(img[i].currentStyle.height);
            var w = (pct_w / 100) * document.documentElement.clientWidth;
            var h = (pct_h / 100) * document.documentElement.clientWidth;
            imgCW = parseInt(w) || img[i].getAttribute("width");
            imgCH = parseInt(h) || img[i].getAttribute("height");
          } else {
            imgCW = parseInt(img[i].currentStyle.width) || img[i].getAttribute("width");
            imgCH = parseInt(img[i].currentStyle.height) || img[i].getAttribute("height");
          }
        } else if (typeof img[i].getAttribute("class") === 'string') {
          imgCW = parseInt(window.getComputedStyle(img[i]).getPropertyValue("width")) || img[i].getAttribute("width");
          imgCH = parseInt(window.getComputedStyle(img[i]).getPropertyValue("height")) || img[i].getAttribute("height");
        } else {
          imgCW = (constrain) ? img[i].getAttribute("width") || viewportW : img[i].getAttribute("width");
          imgCH = (constrain) ? img[i].getAttribute("height") || viewportH : img[i].getAttribute("height");
        }
      }
      if (newSrc.indexOf("?") > -1) {
        var regexW = /w=(\d+)/ig;
        var regexH = /h=(\d+)/ig;
        var regexDPR = /dpr=(\d+)/ig;
        var matchesW = newSrc.match(regexW);
        var matchesH = newSrc.match(regexH);
        var matchesDPR = newSrc.match(regexDPR);
        var paramW = matchesW || imgCW;
        var paramH = matchesH || imgCH;
        var paramDPR = matchesDPR || viewportDPR;
        if (!matchesW && paramW > 0) {
          newSrc += "&w=" + paramW;
        }
        if (!matchesH && paramH > 0) {
          newSrc += "&h=" + paramH;
        }
        if (!matchesDPR)
          newSrc += "&dpr=" + paramDPR;
        newSrc += "&viewport_width=" + viewportW + "&viewport_height=" + viewportH;
        img[i].src = newSrc;
      }
      else {
        if (imgCW > 0)
          newSrc += "?w=" + imgCW;
        if (imgCH > 0 && imgCW > 0) {
          newSrc += "&h=" + imgCH;
        }
        else if (imgCH > 0 && !imgCW) {
          newSrc += "?h=" + imgCH;
        }
        if (imgCH > 0 || imgCW > 0) {
          newSrc += "&dpr=" + viewportDPR;
        } else if (!imgCW && !imgCH) {
          newSrc += "?dpr=" + viewportDPR;
        }
        newSrc += "&viewport_width=" + viewportW + "&viewport_height=" + viewportH;
        img[i].src = newSrc;
      }
      if (newSrc.indexOf("api.pixtulate") === -1)
        img[i].src = placeholder;
    }
  }
}