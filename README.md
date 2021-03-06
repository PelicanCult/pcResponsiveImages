# pcResponsiveImages

The Pelican Cult Responsive Images JQuery plugin is a lightweight responsive image loader.  The plugin works by defining a set of media queires that coorespond to data-attributes added to the HTML elements on your page.  When you call the plugin on any container on the page, it will update all child elments that are identified with the supplied class name.

## Install
To include the pcResponsiveImges plugin add the `pcResponsiveImages_1.0.min.js` file to your project and include the script before the closing `<\body>` tag and below the JQuery script tags.

This plugin relies on <a href="http://caniuse.com/#feat=matchmedia">matchMedia</a>.  For older browsers a matchMedia polyfill will be required.

## Basic Usage

1. Add a class to the HTML Elements
2. Add a the `data-image-sources` attribute the the HTML elements
3. Call the plugin on the parent container (for example, the `body` element)
  - The plugin takes two parameters
    - The class name used on the elements
    - The setting options


##### Sample Image Element
```
<img class="pelican" src="" data-image-sources ='[ {"small" : "img/600x450.jpg"} , {"medium": "img/1024x768.jpg"} , {"large" : "img/1600x1200.jpg"} ]'}> 
```
The `class="pelican"` and the `data-image-sources ='[ {"small" : "img/600x450.jpg"} , {"medium": "img/1024x768.jpg"} , {"large" : "img/1600x1200.jpg"} ]'` are the two pieces of information used by the plugin.  The class name can be anything you choose to identify the elments to be used by the plugin.  The data attribute is a json array that contains a media query key, and the image to use when the media query matches the current window.

##### Sample plugin call

The simplest call is:
```
$( document ).ready(function() {

      $('body').pcResponsiveImages('.pelican');

});
```
This applies the plugin to all elements with the `.pelican` class in the body of the page and will use all of the default settings of the plugin.

##### A typical plugin call with settings
```
$( document ).ready(function() {

      $('body').pcResponsiveImages('.pelican', 
      {
        loadSmallerImages: true,
        onEnterViewport: true,
        viewPortTolerance: 50,
        breakpoints: {
            'small' : '(max-width: 768px)', 
            'medium': '(min-width: 769px) AND (max-width: 1024px)', 
            'large': '(min-width: 1025px)'
        }
      });

});
```
In this call we are also passing along the settings to be used.  The breakpoints used for the plugin can be defined here as media queries.  Note that the breakpoint keys should match the values used in the `data-image-sources` attributes.

When the browser changes from one breakpoint to another, the plugin looks at the `data-image-sources` json and loads the image that is specified for that key.  The image is only loaded if it is different than the currently loaded image.

## Supported Elements.
The plugin can be used to switch `<img>` tag `scr` values, `<video>` tag `poster` values, and for any other element it will apply an inline `background-image` style.

Why use inline `background-image` styles?  For some sites that are content managed, you may have a situation where you want to use a background image on your page, but it needs to be dynamic as it is managed in the CMS.  Since it is dynamic, it can not be included using an external CSS file.

## Settings
The plugin accepts the following options:

### Defaults
```
var settings = $.extend({}, {
    breakpoints: {
        'small' : '(max-width: 768px)', 
        'medium': '(min-width: 769px) AND (max-width: 1024px)', 
        'large': '(min-width: 1025px)'
    },
    onEnterViewport: false,
    viewPortTolerance: 25,
    debounceTolerance: 250,
    loadSmallerImages: true,
    debug: false,
}, options);

```

#### Breakpoints
```
breakpoints: {
                'small' : '(max-width: 768px)', 
                'medium': '(min-width: 769px) AND (max-width: 1024px)', 
                'large': '(min-width: 1025px)'
            },
```

An array of breakpoints that define when image sizes are switched.  Each breakpoint contains a name and a media query.

#### onEnterViewport and viewPortTolerance
```
onEnterViewport: false
viewPortTolerance: 25
```

If `onEnterViewport` set to `true`, images will only be loaded when they enter the viewport of the browser.

The `viewPortTolerance` controls how close to the viewport, in pixels, that the image needs to be before being loaded.  For example, the default value of 25 pixels will load an image when it is within 25 pixels of the viewport.

#### loadSmallerImages

```
loadSmallerImages: true
```
When `loadSmallerImages` is set to `true`, as a browser width shrinks and enters a new breakpoint, the smaller image size will be loaded. If set to `false`, smaller images will not be loaded (since an image is already downloaded to the client, there may be no need to make another request to the server).

#### debug
```
debug: false
```
When `debug` is set to true, the following data will be logged to the console:
- On page load
  - the Base pcResponsiveImages object
  - the settings object
- On breakpoint change
  - The current breakpoint object
- On element updated (when the image is changed on an element)
  - the current element object
  

#### debounceTolerance
```
debounceTolerance: 250
```

The `debounceTolerance` controls in miliseconds the delay to use for this plugin's debounce function.


