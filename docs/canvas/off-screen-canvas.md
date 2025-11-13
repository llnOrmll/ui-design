# OffscreenCanvas

**Baseline - Widely available**

This feature is well established and works across many devices and browser versions. It's been available across browsers since March 2023.

> **Note:** This feature is available in [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API).

## Overview

When using the [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas) element or the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API), rendering, animation, and user interaction usually happen on the main execution thread of a web application. The computation relating to canvas animations and rendering can have a significant impact on application performance.

The `OffscreenCanvas` interface provides a canvas that can be rendered off screen, decoupling the DOM and the Canvas API so that the [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas) element is no longer entirely dependent on the DOM.

Rendering operations can also be run inside a [worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) context, allowing you to run some tasks in a separate thread and avoid heavy work on the main thread.

`OffscreenCanvas` is a [transferable object](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects).

`OffscreenCanvas` inherits from [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget).

---

## Constructor

### OffscreenCanvas()

**Baseline - Widely available** (since March 2023)

The `OffscreenCanvas()` constructor returns a newly instantiated [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) object.

#### Syntax

```javascript
new OffscreenCanvas(width, height)
```

#### Parameters

- **width**: The width of the offscreen canvas.
- **height**: The height of the offscreen canvas.

#### Examples

This example creates a new offscreen canvas using the `OffscreenCanvas()` constructor. We then initialize a [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) context on it using the [getContext()](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas/getContext) method.

```javascript
const offscreen = new OffscreenCanvas(256, 256);
const gl = offscreen.getContext("webgl");
```

---

## Instance Properties

### height

**Baseline - Widely available** (since March 2023)

The `height` property returns and sets the height of an [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) object.

#### Value

A positive integer representing the height of the offscreen canvas in CSS pixels.

#### Examples

Creating a new offscreen canvas and returning or setting the height of the offscreen canvas:

```javascript
const offscreen = new OffscreenCanvas(256, 256);
offscreen.height; // 256
offscreen.height = 512;
```

---

### width

**Baseline - Widely available** (since March 2023)

The `width` property returns and sets the width of an [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) object.

#### Value

A positive integer representing the width of the offscreen canvas in CSS pixels.

#### Examples

Creating a new offscreen canvas and returning or setting the width of the offscreen canvas:

```javascript
const offscreen = new OffscreenCanvas(256, 256);
offscreen.width; // 256
offscreen.width = 512;
```

---

## Instance Methods

### convertToBlob()

**Baseline - Widely available** (since March 2023)

The `OffscreenCanvas.convertToBlob()` method creates a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) object representing the image contained in the canvas.

The desired file format and image quality may be specified.

If the file format is not specified, or if the given format is not supported, then the data will be exported as `image/png`.

Browsers are required to support `image/png`; many will support additional formats including `image/jpeg` and `image/webp`.

The created image will have a resolution of 96dpi for file formats that support encoding resolution metadata.

#### Syntax

```javascript
convertToBlob()
convertToBlob(options)
```

#### Parameters

- **options** (Optional): An object with the following properties:
  - **type**: A string indicating the image format. The default type is `image/png`; this image format will be also used if the specified type is not supported.
  - **quality**: A `Number` between `0` and `1` indicating the image quality to be used when creating images using file formats that support lossy compression (such as `image/jpeg` or `image/webp`). A user agent will use its default quality value if this option is not specified, or if the number is outside the allowed range.

#### Return Value

A [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) returning a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) object representing the image contained in the canvas.

#### Exceptions

The promise may be rejected with the following exceptions:

- **InvalidStateError DOMException**: The `OffscreenCanvas` is not detached; in other words it still associated with the DOM and not the current worker.
- **SecurityError DOMException**: The canvas context mode is 2d and the bitmap is not origin-clean; at least some of its contents have or may have been loaded from a site other than the one from which the document itself was loaded.
- **IndexSizeError DOMException**: The canvas bitmap has no pixels (either the horizontal or vertical dimension is zero).
- **EncodingError DOMException**: The blob could not be created due to an encoding error.

#### Examples

```javascript
const offscreen = new OffscreenCanvas(256, 256);
const gl = offscreen.getContext("webgl");

// Perform some drawing using the gl context

offscreen.convertToBlob().then((blob) => console.log(blob));
// Blob { size: 334, type: "image/png" }
```

---

### getContext()

**Baseline - Widely available** (since March 2023)

The `OffscreenCanvas.getContext()` method returns a drawing context for an offscreen canvas, or [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null) if the context identifier is not supported, or the offscreen canvas has already been set to a different context mode.

#### Syntax

```javascript
getContext(contextType, contextAttributes)
```

#### Parameters

- **contextType**: A string containing the context identifier defining the drawing context associated to the canvas. Possible values are:
  - **`2d`**: Creates a `OffscreenCanvasRenderingContext2D` object representing a two-dimensional rendering context.
  - **`webgl`**: Creates a `WebGLRenderingContext` object representing a three-dimensional rendering context. This context is only available on browsers that implement [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) version 1 (OpenGL ES 2.0).
  - **`webgl2`**: Creates a `WebGL2RenderingContext` object representing a three-dimensional rendering context. This context is only available on browsers that implement [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) version 2 (OpenGL ES 3.0).
  - **`"webgpu"`**: Creates a `GPUCanvasContext` object representing a three-dimensional rendering context for WebGPU render pipelines. This context is only available on browsers that implement [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API).
  - **`bitmaprenderer`**: Creates a `ImageBitmapRenderingContext` which only provides functionality to replace the content of the canvas with a given `ImageBitmap`.

> **Note:** The identifiers `"experimental-webgl"` or `"experimental-webgl2"` are also used in implementations of WebGL. These implementations have not reached test suite conformance, or the graphic drivers situation on the platform is not yet stable. The [Khronos Group](https://www.khronos.org/) certifies WebGL implementations under certain [conformance rules](https://registry.khronos.org/webgl/sdk/tests/CONFORMANCE_RULES.txt).

- **contextAttributes** (Optional): You can use several context attributes when creating your rendering context, for example:

```javascript
const gl = canvas.getContext("webgl", {
  antialias: false,
  depth: false,
});
```

**2d context attributes:**

- **alpha**: A boolean value that indicates if the canvas contains an alpha channel. If set to `false`, the browser now knows that the backdrop is always opaque, which can speed up drawing of transparent content and images.
- **colorSpace** (Optional): Specifies the color space of the rendering context. Possible values:
  - `"srgb"` selects the [sRGB color space](https://en.wikipedia.org/wiki/SRGB). This is the default value.
  - `"display-p3"` selects the [display-p3 color space](https://en.wikipedia.org/wiki/DCI-P3).
- **colorType** (Optional): Specifies the color type of the rendering context. Possible values:
  - `"unorm8"` sets the color channels to 8 bit unsigned values. This is the default value.
  - `"float16"` sets the color channels to 16-bit floating-point values.
- **desynchronized**: A boolean value that hints the user agent to reduce the latency by desynchronizing the canvas paint cycle from the event loop.
- **willReadFrequently**: A boolean value that indicates whether or not a lot of read-back operations are planned. This will force the use of a software (instead of hardware accelerated) 2D canvas and can save memory when calling `getImageData()` frequently.

**WebGL context attributes:**

- **alpha**: A boolean value that indicates if the canvas contains an alpha buffer.
- **depth**: A boolean value that indicates that the drawing buffer is requested to have a depth buffer of at least 16 bits.
- **stencil**: A boolean value that indicates that the drawing buffer is requested to have a stencil buffer of at least 8 bits.
- **desynchronized**: A boolean value that hints the user agent to reduce the latency by desynchronizing the canvas paint cycle from the event loop.
- **antialias**: A boolean value that indicates whether or not to perform anti-aliasing if possible.
- **failIfMajorPerformanceCaveat**: A boolean value that indicates if a context will be created if the system performance is low or if no hardware GPU is available.
- **powerPreference**: A hint to the user agent indicating what configuration of GPU is suitable for the WebGL context. Possible values:
  - `"default"`: Let the user agent decide which GPU configuration is most suitable. This is the default value.
  - `"high-performance"`: Prioritizes rendering performance over power consumption.
  - `"low-power"`: Prioritizes power saving over rendering performance.
- **premultipliedAlpha**: A boolean value that indicates that the page compositor will assume the drawing buffer contains colors with pre-multiplied alpha.
- **preserveDrawingBuffer**: If the value is true the buffers will not be cleared and will preserve their values until cleared or overwritten by the author.
- **xrCompatible**: A boolean value that hints to the user agent to use a compatible graphics adapter for an [immersive XR device](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API). Setting this synchronous flag at context creation is discouraged; rather call the asynchronous `WebGLRenderingContext.makeXRCompatible()` method the moment you intend to start an XR session.

> **Note:** The WebGPU specification does not define any specific context attributes for `getContext()`. Instead, it provides configuration options via the `GPUCanvasContext.configure()` method.

#### Return Value

A rendering context which is either a `OffscreenCanvasRenderingContext2D` for `"2d"`, `WebGLRenderingContext` for `"webgl"` and `"experimental-webgl"`, `WebGL2RenderingContext` for `"webgl2"` and `"experimental-webgl2"`, `GPUCanvasContext` for `"webgpu"`, `ImageBitmapRenderingContext` for `"bitmaprenderer"`.

If the context identifier is not supported, or the canvas has already been set to a different context mode, `null` is returned.

#### Exceptions

- **InvalidStateError DOMException**: Throws if the canvas has transferred to another context scope, for example, to worker.

#### Examples

```javascript
const offscreen = new OffscreenCanvas(256, 256);
const gl = offscreen.getContext("webgl");

gl; // WebGLRenderingContext
gl.canvas; // OffscreenCanvas
```

---

### transferToImageBitmap()

**Baseline - Widely available** (since March 2023)

The `OffscreenCanvas.transferToImageBitmap()` method creates an [ImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap) object from the most recently rendered image of the `OffscreenCanvas`. The `OffscreenCanvas` allocates a new image for its subsequent rendering.

#### Syntax

```javascript
transferToImageBitmap()
```

#### Parameters

None.

#### Return Value

A newly-allocated [ImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap).

This `ImageBitmap` references a potentially large graphics resource, and to ensure your web application remains robust, it is important to avoid allocating too many of these resources at any point in time. For this reason it is important to ensure that the `ImageBitmap` is either consumed or closed.

As described in the [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) examples, passing this `ImageBitmap` to [ImageBitmapRenderingContext.transferFromImageBitmap()](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmapRenderingContext/transferFromImageBitmap) consumes the `ImageBitmap` object; it no longer references the underlying graphics resource, and can not be passed to any other web APIs.

If your goal is to pass the `ImageBitmap` to other web APIs which do not consume it - for example, [CanvasRenderingContext2D.drawImage()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage) - then you should close it when you're done with it by calling [ImageBitmap.close()](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap/close). Don't simply drop the JavaScript reference to the `ImageBitmap`; doing so will keep its graphics resource alive until the next time the garbage collector runs.

If you call `transferToImageBitmap()` and don't intend to pass it to [ImageBitmapRenderingContext.transferFromImageBitmap()](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmapRenderingContext/transferFromImageBitmap), consider whether you need to call `transferToImageBitmap()` at all. Many web APIs which accept `ImageBitmap` also accept `OffscreenCanvas` as an argument.

#### Exceptions

- **InvalidStateError DOMException**: Throws if:
  - the canvas has transferred to another context scope, such as a worker
  - the canvas context mode has not been set by calling `OffscreenCanvas.getContext()`.

#### Examples

```javascript
const offscreen = new OffscreenCanvas(256, 256);
const gl = offscreen.getContext("webgl");

// Perform some drawing using the gl context

offscreen.transferToImageBitmap();
// ImageBitmap { width: 256, height: 256 }

// Either:
// Pass this `ImageBitmap` to `ImageBitmapRenderingContext.transferFromImageBitmap`
// or:
// Use the `ImageBitmap` with other web APIs, and call `ImageBitmap.close()`!
```

---

## Events

Inherits events from its parent, [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget).

Listen to these events using [addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) or by assigning an event listener to the `oneventname` property of this interface.

### contextlost

**Limited availability**

The `contextlost` event of the [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) interface is fired if the browser detects that the [OffscreenCanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvasRenderingContext2D) context is lost. Contexts can be lost for several reasons, such as an associated GPU driver crashes, or the application runs out of memory, and so on.

By default the user agent will attempt to restore the context and then fire the [contextrestored event](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas/contextrestored_event).

User code can prevent the context from being restored by calling [Event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) during event handling.

#### Syntax

Use the event name in methods like [addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), or set an event handler property.

```javascript
addEventListener("contextlost", (event) => { })

oncontextlost = (event) => { }
```

#### Event Type

A generic [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event).

#### Examples

The code fragment below detects the `contextlost` event.

```javascript
const canvas = new OffscreenCanvas(256, 256);
const gl = offscreen.getContext("2d");

// Do drawing etc

canvas.addEventListener("contextlost", (event) => {
  console.log(event);
});
```

To prevent the context from being restored the event handler code might instead look like this:

```javascript
canvas.addEventListener("contextlost", (event) => {
  event.preventDefault();
});
```

---

### contextrestored

**Limited availability**

The `contextrestored` event of the [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) interface is fired if the browser restores an [OffscreenCanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvasRenderingContext2D) context that was [previously lost](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas/contextlost_event).

You can redraw, re-retrieve resources, and reinitialize the state of your context after receiving this event.

#### Syntax

Use the event name in methods like [addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), or set an event handler property.

```javascript
addEventListener("contextrestored", (event) => { })

oncontextrestored = (event) => { }
```

#### Event Type

A generic [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event).

#### Examples

The code fragment below detects the context restored event.

```javascript
const canvas = new OffscreenCanvas(256, 256);
const gl = offscreen.getContext("2d");

canvas.addEventListener("contextrestored", (e) => {
  console.log(e);
  // call to redrawCanvas() or similar
});
```

---

## Usage Examples

### Synchronous display of frames produced by an OffscreenCanvas

One way to use the `OffscreenCanvas` API is to use a rendering context that has been obtained from an `OffscreenCanvas` object to generate new frames. Once a new frame has finished rendering in this context, the [transferToImageBitmap()](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas/transferToImageBitmap) method can be called to save the most recent rendered image. This method returns an [ImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap) object, which can be used in a variety of Web APIs and also in a second canvas without creating a transfer copy.

To display the `ImageBitmap`, you can use an [ImageBitmapRenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmapRenderingContext) context, which can be created by calling `canvas.getContext("bitmaprenderer")` on a (visible) canvas element. This context only provides functionality to replace the canvas's contents with the given `ImageBitmap`. A call to [ImageBitmapRenderingContext.transferFromImageBitmap()](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmapRenderingContext/transferFromImageBitmap) with the previously rendered and saved `ImageBitmap` from the `OffscreenCanvas`, will display the `ImageBitmap` on the canvas and transfer its ownership to the canvas. A single `OffscreenCanvas` may transfer frames into an arbitrary number of other `ImageBitmapRenderingContext` objects.

Given these two [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas) elements:

```html
<canvas id="one"></canvas>
<canvas id="two"></canvas>
```

The following code will provide the rendering using `OffscreenCanvas` as described above.

```javascript
const one = document.getElementById("one").getContext("bitmaprenderer");
const two = document.getElementById("two").getContext("bitmaprenderer");

const offscreen = new OffscreenCanvas(256, 256);
const gl = offscreen.getContext("webgl");

// Perform some drawing for the first canvas using the gl context

const bitmapOne = offscreen.transferToImageBitmap();
one.transferFromImageBitmap(bitmapOne);

// Perform some more drawing for the second canvas

const bitmapTwo = offscreen.transferToImageBitmap();
two.transferFromImageBitmap(bitmapTwo);
```

### Asynchronous display of frames produced by an OffscreenCanvas

Another way to use the `OffscreenCanvas` API, is to call [transferControlToOffscreen()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/transferControlToOffscreen) on a [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas) element, either on a [worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) or the main thread, which will return an `OffscreenCanvas` object from an [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) object from the main thread. Calling [getContext()](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas/getContext) will then obtain a rendering context from that `OffscreenCanvas`.

The `main.js` script (main thread) may look like this:

```javascript
const htmlCanvas = document.getElementById("canvas");
const offscreen = htmlCanvas.transferControlToOffscreen();

const worker = new Worker("offscreen-canvas.js");
worker.postMessage({ canvas: offscreen }, [offscreen]);
```

While the `offscreen-canvas.js` script (worker thread) can look like this:

```javascript
onmessage = (evt) => {
  const canvas = evt.data.canvas;
  const gl = canvas.getContext("webgl");
  // Perform some drawing using the gl context
};
```

It's also possible to use [requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) in workers:

```javascript
onmessage = (evt) => {
  const canvas = evt.data.canvas;
  const gl = canvas.getContext("webgl");
  function render(time) {
    // Perform some drawing using the gl context
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
};
```

For a full example, see the [OffscreenCanvas example source](https://github.com/mdn/dom-examples/tree/main/web-workers/offscreen-canvas-worker) on GitHub or run the [OffscreenCanvas example live](https://mdn.github.io/dom-examples/web-workers/offscreen-canvas-worker/).

---

## See Also

- [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
- [OffscreenCanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvasRenderingContext2D)
- [ImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap)
- [ImageBitmapRenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmapRenderingContext)
- [HTMLCanvasElement.transferControlToOffscreen()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/transferControlToOffscreen)
- [requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
- [WebGL Off the Main Thread – Mozilla Hacks (2016)](https://hacks.mozilla.org/2016/01/webgl-off-the-main-thread/)