<h1>Pixtulate.js</h1>

Pixtulate.js is a JavaScript to automatically scale, crop and optimize responsive images via <a href="http://www.pixtulate.com">Pixtulate's</a> backend image service - on the fly. 

All you need to do is to include the script in your page, markup an img element with a data-src attribute and a single high resolution source images.

Before using the script, please <a href="http://www.pixulate.com/signup">sign up</a> to process images with <a href="http://www.pixtulate.com">Pixtulate</a>.

<h2>Quick Start</h2>

Signature:
```javascript
/**
* String accountId - Your account slug obtained at signup
* boolean replaceHost - Wheather to replace hosts. i.e. http://www.mywebsite.com/img -> http://mydomain.api.pixtulate.com/img
* boolean capSizeToWindow - Unless image width/height can be determined, cap the size of an image at viewport width/height
**/
void pixtulate(String accountId, boolean replaceHost, boolean capSizeToWindow);
```

Include pixtulate.js from our global CDN in your page before the closing body tag and initialize:
```html
<script src="http://www.pixtulate.com/js/pixtulate.js"></script>
<script>pixtulate("mydomain", true, true);</script>
```
Make sure to replace "mydomain" with your domain slug obtained during <a href="http://www.pixtulate.com">Sign Up</a>.

Make an image responsive:
```html
<img data-src="/img/my-high-res-image.jpg" alt="this is now a responsive image"/>
```

<h2>Overview</h2>
Responsive images depend on the the layout dictating the image's size. The script will determine the image's dimensions by measuring the image container's CSS pixel width and height. Additionally, it determines the screen's pixel density and the viewport's height and width. Please see the <a href="http://www.pixtulate.com/docs">documentation</a> for more information on query paramters.

The Pixtulate host will be automatically prefixed to your relative image's path as 
```
http://mydomain.api.pixtulate.com
```
If your image's src path already contains a host, and you have set the replaceHost parameter to true, your host will be replaced with that of Pixtulate's.  

You can still keep the src attribute of the img element, but remember it will be pre-loaded by the browser at page load so make it something which can be cached and re-used from browser cache, i.e a single pixel transparant .png. By omitting the src attribute, you prevent double loading images. Naturally, your src image can also be served by Pixtulate.

If you do not want an image to be reponsively scaled, simply omit the data-src attribute.

<h3>Customization</h3>
<h4>Scaling</h4>
You can at any point lock down any input otherwise automatically determined by the script:

For example, lock down the width of an image:
```html
<img data-src="/img/my-high-res-image.jpg?w=500" alt="width will be locked at 500px"/>
```

Lock down the pixel density:
```html
<img data-src="/img/my-high-res-image.jpg?dpr=1" alt="device pixel ratio locked at 1"/>
```

<h4>Cropping</h4>
The script is also compatible with Pixtulate's <a href="http://wwww.pixtulate.com/docs/crop.htm">crop</a> API:

```html
<img data-src="/img/my-high-res-image.jpg?tlc=min,max" alt="image will be automatically cropped"/>
```

You can enter and lock down any query parameter outlined in the documentation.

<h4>Note</h4>
This script will only work if your image's dimensions can be determined by the sizing of its container. Layouts which flow depending on the size of their images are not compatible with this script.

If there are any issues, you can:
1. Email <a href="mailto:support@pixtulate.com">support</a>
2. Tweet us at <a href="http://www.twitter.com/pixtulate">@Pixtulate</a>
