# HTMLCanvasElement

## Baseline - Widely available

This feature is well established and works across many devices and browser versions. It's been available across browsers since July 2015.

*Some parts of this feature may have varying levels of support.*

The `HTMLCanvasElement` interface provides properties and methods for manipulating the layout and presentation of `<canvas>` elements. The `HTMLCanvasElement` interface also inherits the properties and methods of the `HTMLElement` interface.

---

# Instance properties

Inherits properties from its parent, `HTMLElement`.

## HTMLCanvasElement.height

The `height` HTML attribute of the `<canvas>` element is a non-negative `integer` reflecting the number of logical pixels (or RGBA values) going down one column of the canvas. When the attribute is not specified, or if it is set to an invalid value, like a negative, the default value of `150` is used. If no [separate] CSS height is assigned to the `<canvas>`, then this value will also be used as the height of the canvas in the length-unit CSS Pixel.

## HTMLCanvasElement.width

The `width` HTML attribute of the `<canvas>` element is a non-negative `integer` reflecting the number of logical pixels (or RGBA values) going across one row of the canvas. When the attribute is not specified, or if it is set to an invalid value, like a negative, the default value of `300` is used. If no [separate] CSS width is assigned to the `<canvas>`, then this value will also be used as the width of the canvas in the length-unit CSS Pixel.

## HTMLCanvasElement.mozOpaque ⚠️ Non-standard Deprecated

A boolean value reflecting the `moz-opaque` HTML attribute of the `<canvas>` element. It lets the canvas know whether or not translucency will be a factor. If the canvas knows there's no translucency, painting performance can be optimized. This is only supported in Mozilla-based browsers; use the standardized `canvas.getContext('2d', { alpha: false })` instead.

## HTMLCanvasElement.mozPrintCallback ⚠️ Non-standard

A `function` that is Initially null. Web content can set this to a JavaScript function that will be called when the canvas is to be redrawn while the page is being printed. When called, the callback is passed a "printState" object that implements the MozCanvasPrintState interface. The callback can get the context to draw to from the printState object and must then call done() on it when finished. The purpose of `mozPrintCallback` is to obtain a higher resolution rendering of the canvas at the resolution of the printer being used. See this blog post.

---

# Instance methods

Inherits methods from its parent, `HTMLElement`.

## HTMLCanvasElement.captureStream()

Returns a `CanvasCaptureMediaStreamTrack` that is a real-time video capture of the surface of the canvas.

### Syntax

```javascript
captureStream()
captureStream(frameRate)
```

### Parameters

- **frameRate** (Optional) - A double-precision floating-point value that indicates the rate of capture of each frame. If not set, a new frame will be captured each time the canvas changes; if set to `0`, a single frame will be captured.

### Return value

A reference to a `MediaStream` object.

### Example

```javascript
// Find the canvas element to capture
const canvasElt = document.querySelector('canvas');

// Get the stream
const stream = canvasElt.captureStream(25); // 25 FPS

// Do things to the stream
// E.g. Send it to another computer using an RTCPeerConnection
// pc is an RTCPeerConnection created elsewhere
pc.addStream(stream);
```

---

## HTMLCanvasElement.getContext()

**Baseline - Widely available**

The `HTMLCanvasElement.getContext()` method returns a drawing context on the canvas, or `null` if the context identifier is not supported, or the canvas has already been set to a different context mode.

Later calls to this method on the same canvas element, with the same `contextType` argument, will always return the same drawing context instance as was returned the first time the method was invoked. It is not possible to get a different drawing context object on a given canvas element.

### Syntax

```javascript
getContext(contextType)
getContext(contextType, contextAttributes)
```

### Parameters

#### contextType

A string containing the context identifier defining the drawing context associated to the canvas. Possible values are:

- **`"2d"`** - Creates a `CanvasRenderingContext2D` object representing a two-dimensional rendering context.

- **`"webgl"`** (or `"experimental-webgl"`) - Creates a `WebGLRenderingContext` object representing a three-dimensional rendering context. This context is only available on browsers that implement WebGL version 1 (OpenGL ES 2.0).

- **`"webgl2"`** - Creates a `WebGL2RenderingContext` object representing a three-dimensional rendering context. This context is only available on browsers that implement WebGL version 2 (OpenGL ES 3.0).

- **`"webgpu"`** - Creates a `GPUCanvasContext` object representing a three-dimensional rendering context for WebGPU render pipelines. This context is only available on browsers that implement The WebGPU API.

- **`"bitmaprenderer"`** - Creates an `ImageBitmapRenderingContext` which only provides functionality to replace the content of the canvas with a given `ImageBitmap`.

**Note:** The identifier `"experimental-webgl"` is used in new implementations of WebGL. These implementations have either not reached test suite conformance, or the graphics drivers on the platform are not yet stable. The Khronos Group certifies WebGL implementations under certain conformance rules.

#### contextAttributes (Optional)

You can use several context attributes when creating your rendering context, for example:

```javascript
const gl = canvas.getContext("webgl", {
  antialias: false,
  depth: false,
});
```

**2d context attributes:**

- **`alpha`** - A boolean value that indicates if the canvas contains an alpha channel. If set to `false`, the browser now knows that the backdrop is always opaque, which can speed up drawing of transparent content and images.

- **`colorSpace`** (Optional) - Specifies the color space of the rendering context. Possible values are:
  - `"srgb"` selects the sRGB color space. This is the default value.
  - `"display-p3"` selects the display-p3 color space.

- **`colorType`** (Optional) - Specifies the color type of the rendering context. Possible values are:
  - `"unorm8"` sets the color channels to 8 bit unsigned values. This is the default value.
  - `"float16"` sets the color channels to 16-bit floating-point values.

- **`desynchronized`** - A boolean value that hints the user agent to reduce the latency by desynchronizing the canvas paint cycle from the event loop.

- **`willReadFrequently`** - A boolean value that indicates whether or not a lot of read-back operations are planned. This will force the use of a software (instead of hardware accelerated) 2D canvas and can save memory when calling `getImageData()` frequently.

**WebGL context attributes:**

- **`alpha`** - A boolean value that indicates if the canvas contains an alpha buffer.

- **`depth`** - A boolean value that indicates that the drawing buffer is requested to have a depth buffer of at least 16 bits.

- **`stencil`** - A boolean value that indicates that the drawing buffer is requested to have a stencil buffer of at least 8 bits.

- **`desynchronized`** - A boolean value that hints the user agent to reduce the latency by desynchronizing the canvas paint cycle from the event loop.

- **`antialias`** - A boolean value that indicates whether or not to perform anti-aliasing if possible.

- **`failIfMajorPerformanceCaveat`** - A boolean value that indicates if a context will be created if the system performance is low or if no hardware GPU is available.

- **`powerPreference`** - A hint to the user agent indicating what configuration of GPU is suitable for the WebGL context. Possible values are:
  - `"default"` - Let the user agent decide which GPU configuration is most suitable. This is the default value.
  - `"high-performance"` - Prioritizes rendering performance over power consumption.
  - `"low-power"` - Prioritizes power saving over rendering performance.

- **`premultipliedAlpha`** - A boolean value that indicates that the page compositor will assume the drawing buffer contains colors with pre-multiplied alpha.

- **`preserveDrawingBuffer`** - If the value is true the buffers will not be cleared and will preserve their values until cleared or overwritten by the author.

- **`xrCompatible`** - A boolean value that hints to the user agent to use a compatible graphics adapter for an immersive XR device. Setting this synchronous flag at context creation is discouraged; rather call the asynchronous `WebGLRenderingContext.makeXRCompatible()` method the moment you intend to start an XR session.

**Note:** The WebGPU specification does not define any specific context attributes for `getContext()`. Instead, it provides configuration options via the `GPUCanvasContext.configure()` method.

### Return value

A rendering context which is either a `CanvasRenderingContext2D` for `"2d"`, `WebGLRenderingContext` for `"webgl"` and `"experimental-webgl"`, `WebGL2RenderingContext` for `"webgl2"`, `GPUCanvasContext` for `"webgpu"`, `ImageBitmapRenderingContext` for `"bitmaprenderer"`.

If the context identifier is not supported, or the canvas has already been set to a different context mode, `null` is returned.

### Exceptions

- **`InvalidStateError` DOMException** - Throws if the canvas has transferred its control to offscreen by calling `HTMLCanvasElement.transferControlToOffscreen()`.

### Example

Given this `<canvas>` element:

```html
<canvas id="canvas" width="300" height="300"></canvas>
```

You can get a `2d` context of the canvas with the following code:

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
console.log(ctx); // CanvasRenderingContext2D { /* … */ }
```

Now you have the 2D rendering context for a canvas and you can draw within it.

---

## HTMLCanvasElement.toDataURL()

**Baseline - Widely available**

The `HTMLCanvasElement.toDataURL()` method returns a data URL containing a representation of the image in the format specified by the `type` parameter.

The desired file format and image quality may be specified. If the file format is not specified, or if the given format is not supported, then the data will be exported as `image/png`. In other words, if the returned value starts with `data:image/png` for any other requested `type`, then that format is not supported.

Browsers are required to support `image/png`; many will support additional formats including `image/jpeg` and `image/webp`.

The created image data will have a resolution of 96dpi for file formats that support encoding resolution metadata.

**Warning:** `toDataURL()` encodes the whole image in an in-memory string. For larger images, this can have performance implications, and may even overflow browsers' URL length limit when assigned to `HTMLImageElement.src`. You should generally prefer `toBlob()` instead, in combination with `URL.createObjectURL()`.

### Syntax

```javascript
toDataURL()
toDataURL(type)
toDataURL(type, quality)
```

### Parameters

- **`type`** (Optional) - A string indicating the image format. The default type is `image/png`; this image format will be also used if the specified type is not supported.

- **`quality`** (Optional) - A `Number` between `0` and `1` indicating the image quality to be used when creating images using file formats that support lossy compression (such as `image/jpeg` or `image/webp`). A user agent will use its default quality value if this option is not specified, or if the number is outside the allowed range.

### Return value

A string containing the requested data URL.

If the height or width of the canvas is `0` or larger than the maximum canvas size, the string `"data:,"` is returned.

### Exceptions

- **`SecurityError`** - The canvas's bitmap is not origin clean; at least some of its contents have or may have been loaded from a site other than the one from which the document itself was loaded.

### Examples

#### Basic example

Given this `<canvas>` element:

```html
<canvas id="canvas" width="5" height="5"></canvas>
```

You can get a data-URL of the canvas with the following lines:

```javascript
const canvas = document.getElementById("canvas");
const dataURL = canvas.toDataURL();
console.log(dataURL);
// "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNby
// blAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC"
```

#### Setting image quality with jpegs

```javascript
const fullQuality = canvas.toDataURL("image/jpeg", 1.0);
// data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ…9oADAMBAAIRAxEAPwD/AD/6AP/Z"
const mediumQuality = canvas.toDataURL("image/jpeg", 0.5);
const lowQuality = canvas.toDataURL("image/jpeg", 0.1);
```

#### Example: Dynamically change images

You can use this technique in coordination with mouse events in order to dynamically change images (gray-scale vs. color in this example):

##### HTML

```html
<img class="grayscale" src="myPicture.png" alt="Description of my picture" />
```

##### JavaScript

```javascript
function showColorImg() {
  this.style.display = "none";
  this.nextSibling.style.display = "inline";
}

function showGrayImg() {
  this.previousSibling.style.display = "inline";
  this.style.display = "none";
}

function removeColors() {
  const images = document.getElementsByClassName("grayscale");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  for (const colorImg of images) {
    const width = colorImg.offsetWidth;
    const height = colorImg.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(colorImg, 0, 0);

    const imgData = ctx.getImageData(0, 0, width, height);
    const pix = imgData.data;
    const pixLen = pix.length;

    for (let pixel = 0; pixel < pixLen; pixel += 4) {
      pix[pixel + 2] =
        pix[pixel + 1] =
        pix[pixel] =
          (pix[pixel] + pix[pixel + 1] + pix[pixel + 2]) / 3;
    }

    ctx.putImageData(imgData, 0, 0);

    const grayImg = new Image();
    grayImg.src = canvas.toDataURL();
    grayImg.onmouseover = showColorImg;
    colorImg.onmouseout = showGrayImg;
    ctx.clearRect(0, 0, width, height);
    colorImg.style.display = "none";
    colorImg.parentNode.insertBefore(grayImg, colorImg);
  }
}

removeColors();
```

---

## HTMLCanvasElement.toBlob()

**Baseline - Widely available**

The `HTMLCanvasElement.toBlob()` method creates a `Blob` object representing the image contained in the canvas; this file may be cached on the disk or stored in memory at the discretion of the user agent.

If `type` is not specified, the image type is `image/png`. The created image is in a resolution of 96dpi.

The third argument is used with `image/jpeg` images to specify the quality of the output.

### Syntax

```javascript
toBlob(callback)
toBlob(callback, type)
toBlob(callback, type, quality)
```

### Parameters

- **`callback`** - A callback function with the resulting `Blob` object as a single argument. `null` may be passed if the image cannot be created for any reason.

- **`type`** (Optional) - A string indicating the image format. The default type is `image/png`; this image format will be also used if the specified type is not supported.

- **`quality`** (Optional) - A `Number` between `0` and `1` indicating image quality if the requested type is `image/jpeg` or `image/webp`. If this argument is anything else, the default value for image quality is used. Other arguments are ignored.

### Return value

None (`undefined`).

### Examples

#### Creating a blob from a canvas

Once you have drawn content into a canvas, you can convert it into a file of any supported image format. The code snippet below, for example, takes the image in the `<canvas>` element whose ID is "canvas", obtains a copy of it as a PNG image, then appends a new `<img>` element to the document, whose source image is the one created using the canvas.

```javascript
const canvas = document.getElementById('canvas');

canvas.toBlob((blob) => {
  const newImg = document.createElement('img');
  const url = URL.createObjectURL(blob);

  newImg.onload = () => {
    // no longer need to read the blob so it's revoked
    URL.revokeObjectURL(url);
  };

  newImg.src = url;
  document.body.appendChild(newImg);
});
```

Note that here we're creating a PNG image; if you add a second parameter to the `toBlob()` call, you can specify the image type. For example, to get the image in JPEG format:

```javascript
canvas.toBlob((blob) => { /* ... */ }, 'image/jpeg', 0.95); // JPEG at 95% quality
```

---

## HTMLCanvasElement.transferControlToOffscreen()

The `HTMLCanvasElement.transferControlToOffscreen()` method transfers control to an `OffscreenCanvas` object, either on the main thread or on a worker.

### Syntax

```javascript
transferControlToOffscreen()
```

### Return value

An `OffscreenCanvas` object.

### Examples

#### Transferring control to an OffscreenCanvas on the main thread

The following example shows how to transfer control to an `OffscreenCanvas` object on the main thread.

```javascript
const htmlCanvas = document.createElement("canvas");
const offscreen = htmlCanvas.transferControlToOffscreen();
const gl = offscreen.getContext("webgl");

// Some drawing using the gl context…
```

#### Transferring control to an OffscreenCanvas on a worker

The following example shows how to transfer control to an `OffscreenCanvas` object on a worker.

```javascript
const offscreen = document.querySelector("canvas").transferControlToOffscreen();
const worker = new Worker("my-worker-url.js");
worker.postMessage({ canvas: offscreen }, [offscreen]);
```

---

# Events

Inherits events from its parent, `HTMLElement`.

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface.

## contextlost

Fired if the browser detects that the `CanvasRenderingContext2D` context has been lost.

## contextrestored

Fired if the browser successfully restores a `CanvasRenderingContext2D` context.

## webglcontextcreationerror

Fired if the user agent is unable to create a `WebGLRenderingContext` or `WebGL2RenderingContext` context.

## webglcontextlost

Fired if the user agent detects that the drawing buffer associated with a `WebGLRenderingContext` or `WebGL2RenderingContext` object has been lost.

## webglcontextrestored

Fired if the user agent restores the drawing buffer for a `WebGLRenderingContext` or `WebGL2RenderingContext` object.

---

# Specifications

| Specification |
|---------------|
| [HTML Standard - HTMLCanvasElement](https://html.spec.whatwg.org/multipage/canvas.html#htmlcanvaselement) |

# Browser compatibility

[Check MDN for current browser compatibility information]

# See also

- HTML element implementing this interface: `<canvas>`
- `OffscreenCanvas`
- `CanvasRenderingContext2D`
- `WebGLRenderingContext`
- `WebGL2RenderingContext`
- `GPUCanvasContext`
- Canvas API

---

*Note: ⚠️ indicates non-standard or deprecated features that should be avoided in production code.*