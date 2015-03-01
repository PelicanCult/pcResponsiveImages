# pcResponsiveImages

The Pelican Cult Responsive Images JQuery plugin is a lightweight responsive image loader.

## Install
To include the pcResponsiveImges plugin add the `pcResponsiveImages_1.0.min.js` file to your project include the script before the closing `<body>` and below the JQuery script tags.

## Settings
The plugin accepts the following options:

#### Breakpoints
```
breakpoints: [
                {key: 'small', maxWidth: 768}, 
                {key: 'medium', minWidth: 769, maxWidth: 1024}, 
                {key: 'large', minWidth: 1025}
            ]
```

An array of breakpoints that define when image sizes are switched (based on `document.documentElement.clientWidth`)
- Each breakpoint object can contain the following properties:
    - key: a name used to reference the breakpoint
    - minWidth: the minimum width of the browser
    - maxWidth: the maximum widht of the browser

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
When `loadSmallerImages` is set to `tru`e, as a browser width shrinks and enters a new breakpoint, the smaller image size will be loaded. If set to `false`, smaller images will not be loaded (since an image is already downloaded to the client, there may be no need to make another request to the server).

#### debug
```
debug: false
```
When `debug` is set to true, the following data will be logged to the console:
- On page load
  - the Base pcResponsiveImages object
  -the settings object
- On breakpoint change
  - The current breakpoint object
- On element updated (when the image is changed on an element)
  - the current element object
  

#### debounceTolerance
```
debounceTolerance: 250
```

The `debounceTolerance` controls in miliseconds the time to use for this plugin's debounce function.


