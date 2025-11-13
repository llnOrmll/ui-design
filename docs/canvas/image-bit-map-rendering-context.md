# ImageBitmapRenderingContext

**Baseline - Widely available**

This feature is well established and works across many devices and browser versions. It's been available across browsers since January 2020.

> **Note:** This feature is available in [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API).

## Overview

The `ImageBitmapRenderingContext` interface is a canvas rendering context that provides the functionality to replace the canvas's contents with the given [ImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap). Its context id (the first argument to [HTMLCanvasElement.getContext()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext) or [OffscreenCanvas.getContext()](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas/getContext)) is `"bitmaprenderer"`.

This interface is available in both the window and the [worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) context.

---

## Instance Properties

### canvas

**Read-only** | **Baseline - Widely available** (since February 2022)

The `ImageBitmapRenderingContext.canvas` property, part of the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API), is a read-only reference to the [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) or [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) object that is associated with the given context.

#### Value

A [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) or [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) object.

#### Examples

Given this [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas) element:

```html
<canvas id="canvas"></canvas>
```

You can get a reference to the canvas element within the `ImageBitmapRenderingContext` by using the `canvas` property:

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("bitmaprenderer");
console.log(ctx.canvas === canvas); // true
```

---

## Instance Methods

### transferFromImageBitmap()

**Baseline - Widely available** (since January 2020)

The `ImageBitmapRenderingContext.transferFromImageBitmap()` method displays the given [ImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap) in the canvas associated with this rendering context. The ownership of the `ImageBitmap` is transferred to the canvas as well.

This method was previously named `transferImageBitmap()`, but was renamed in a spec change. The old name is being kept as an alias to avoid code breakage.

#### Syntax

```javascript
transferFromImageBitmap(bitmap)
```

#### Parameters

- **bitmap**: An `ImageBitmap` object to transfer, or `null`. If the value is `null`, the canvas is reset to blank.

#### Return Value

None ([undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)).

#### Examples

##### HTML

```html
<canvas id="htmlCanvas"></canvas>
```

##### JavaScript

```javascript
const htmlCanvas = document
  .getElementById("htmlCanvas")
  .getContext("bitmaprenderer");

// Draw a WebGL scene offscreen
const offscreen = new OffscreenCanvas(256, 256);
const gl = offscreen.getContext("webgl");

// Perform some drawing using the gl context

// Transfer the current frame to the visible canvas
const bitmap = offscreen.transferToImageBitmap();
htmlCanvas.transferFromImageBitmap(bitmap);
```

---

## See Also

- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [OffscreenCanvas.transferToImageBitmap()](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas/transferToImageBitmap)
- [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)