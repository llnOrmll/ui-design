# OffscreenCanvasRenderingContext2D

**Baseline - Widely available**

This feature is well established and works across many devices and browser versions. It's been available across browsers since March 2023.

> **Note:** This feature is available in [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API).

## Overview

The `OffscreenCanvasRenderingContext2D` interface is a [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) rendering context for drawing to the bitmap of an `OffscreenCanvas` object.

It is similar to the `CanvasRenderingContext2D` object, with the following differences:

- There is no support for user-interface features (`drawFocusIfNeeded`)
- Its `canvas` attribute refers to an `OffscreenCanvas` object rather than a `<canvas>` element
- The bitmap for the placeholder `<canvas>` element belonging to the `OffscreenCanvas` object is updated during the rendering update of the `Window` or `Worker` that owns the `OffscreenCanvas`

---

## Example

The following code snippet creates a [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker) object using the [Worker()](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker) constructor. The `transferControlToOffscreen()` method is used to get an `OffscreenCanvas` object from the [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas) element so it can be transferred to the worker:

```javascript
const canvas = document.getElementById("canvas");
const offscreen = canvas.transferControlToOffscreen();

const worker = new Worker("worker.js");
worker.postMessage({ canvas: offscreen }, [offscreen]);
```

In the worker thread, we can use the `OffscreenCanvasRenderingContext2D` to draw to the bitmap of the `OffscreenCanvas` object:

```javascript
onmessage = (event) => {
  const canvas = event.data.canvas;
  const offCtx = canvas.getContext("2d");
  
  // draw to the offscreen canvas context
  offCtx.fillStyle = "red";
  offCtx.fillRect(0, 0, 100, 100);
};
```

For a full example, see our [OffscreenCanvas worker example](https://github.com/mdn/dom-examples/tree/main/web-workers/offscreen-canvas-worker) ([run OffscreenCanvas worker](https://mdn.github.io/dom-examples/web-workers/offscreen-canvas-worker/)).

---

## Additional Methods

The following method is new to the `OffscreenCanvasRenderingContext2D` interface and does not exist in the `CanvasRenderingContext2D` interface:

*Currently, there are no additional methods specific to this interface beyond what is inherited from CanvasRenderingContext2D.*

---

## Unsupported Features

The following user interface method is not supported by the `OffscreenCanvasRenderingContext2D` interface:

### CanvasRenderingContext2D.drawFocusIfNeeded()

If a given element is focused, this method draws a focus ring around the current path. **This method is not supported** in OffscreenCanvasRenderingContext2D.

---

## Inherited Properties and Methods

The following properties and methods are inherited from [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D). They have the same usage as in `CanvasRenderingContext2D`.

### Context

- **CanvasRenderingContext2D.getContextAttributes()** (Experimental): Returns an object containing the actual context attributes. Context attributes can be requested with `OffscreenCanvas.getContext()`.
- **CanvasRenderingContext2D.isContextLost()**: Returns `true` if the rendering context was lost.

### Drawing Rectangles

- **CanvasRenderingContext2D.clearRect()**: Sets all pixels in the rectangle defined by starting point (x, y) and size (width, height) to transparent black, erasing any previously drawn content.
- **CanvasRenderingContext2D.fillRect()**: Draws a filled rectangle at (x, y) position whose size is determined by width and height.
- **CanvasRenderingContext2D.strokeRect()**: Paints a rectangle which has a starting point at (x, y) and has a w width and an h height onto the canvas, using the current stroke style.

### Drawing Text

The following methods and properties control drawing text. See also the [TextMetrics](https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics) object for text properties.

- **CanvasRenderingContext2D.fillText()**: Draws (fills) a given text at the given (x, y) position.
- **CanvasRenderingContext2D.strokeText()**: Draws (strokes) a given text at the given (x, y) position.
- **CanvasRenderingContext2D.measureText()**: Returns a `TextMetrics` object.
- **CanvasRenderingContext2D.textRendering**: Text rendering. Possible values: `auto` (default), `optimizeSpeed`, `optimizeLegibility`, `geometricPrecision`.

### Line Styles

The following methods and properties control how lines are drawn.

- **CanvasRenderingContext2D.lineWidth**: Width of lines. Default `1.0`.
- **CanvasRenderingContext2D.lineCap**: Type of endings on the end of lines. Possible values: `butt` (default), `round`, `square`.
- **CanvasRenderingContext2D.lineJoin**: Defines the type of corners where two lines meet. Possible values: `round`, `bevel`, `miter` (default).
- **CanvasRenderingContext2D.miterLimit**: Miter limit ratio. Default `10`.
- **CanvasRenderingContext2D.getLineDash()**: Returns the current line dash pattern array containing an even number of non-negative numbers.
- **CanvasRenderingContext2D.setLineDash()**: Sets the current line dash pattern.
- **CanvasRenderingContext2D.lineDashOffset**: Specifies where to start a dash array on a line.

### Text Styles

The following properties control how text is laid out.

- **CanvasRenderingContext2D.font**: Font setting. Default value `10px sans-serif`.
- **CanvasRenderingContext2D.textAlign**: Text alignment setting. Possible values: `start` (default), `end`, `left`, `right`, `center`.
- **CanvasRenderingContext2D.textBaseline**: Baseline alignment setting. Possible values: `top`, `hanging`, `middle`, `alphabetic` (default), `ideographic`, `bottom`.
- **CanvasRenderingContext2D.direction**: Directionality. Possible values: `ltr`, `rtl`, `inherit` (default).
- **CanvasRenderingContext2D.letterSpacing**: Letter spacing. Default: `0px`.
- **CanvasRenderingContext2D.fontKerning**: Font kerning. Possible values: `auto` (default), `normal`, `none`.
- **CanvasRenderingContext2D.fontStretch**: Font stretch. Possible values: `ultra-condensed`, `extra-condensed`, `condensed`, `semi-condensed`, `normal` (default), `semi-expanded`, `expanded`, `extra-expanded`, `ultra-expanded`.
- **CanvasRenderingContext2D.fontVariantCaps**: Font variant caps. Possible values: `normal` (default), `small-caps`, `all-small-caps`, `petite-caps`, `all-petite-caps`, `unicase`, `titling-caps`.
- **CanvasRenderingContext2D.textRendering** (Experimental): Text rendering. Possible values: `auto` (default), `optimizeSpeed`, `optimizeLegibility`, `geometricPrecision`.
- **CanvasRenderingContext2D.wordSpacing**: Word spacing. Default value: `0px`.
- **CanvasRenderingContext2D.lang** (Experimental): Gets or sets the language of the canvas drawing context.

### Fill and Stroke Styles

Fill styling is used for colors and styles inside shapes and stroke styling is used for the lines around shapes.

- **CanvasRenderingContext2D.fillStyle**: Color or style to use inside shapes. Default to `black`.
- **CanvasRenderingContext2D.strokeStyle**: Color or style to use for the lines around shapes. Default to `black`.

### Gradients and Patterns

- **CanvasRenderingContext2D.createConicGradient()**: Creates a conic gradient around a point given by coordinates represented by the parameters.
- **CanvasRenderingContext2D.createLinearGradient()**: Creates a linear gradient along the line given by the coordinates represented by the parameters.
- **CanvasRenderingContext2D.createRadialGradient()**: Creates a radial gradient given by the coordinates of the two circles represented by the parameters.
- **CanvasRenderingContext2D.createPattern()**: Creates a pattern using the specified image. It repeats the source in the directions specified by the repetition argument. This method returns a `CanvasPattern`.

### Shadows

- **CanvasRenderingContext2D.shadowBlur**: Specifies the blurring effect. Default: `0`.
- **CanvasRenderingContext2D.shadowColor**: Color of the shadow. Default: fully-transparent black.
- **CanvasRenderingContext2D.shadowOffsetX**: Horizontal distance the shadow will be offset. Default: `0`.
- **CanvasRenderingContext2D.shadowOffsetY**: Vertical distance the shadow will be offset. Default: `0`.

### Paths

The following methods can be used to manipulate paths of objects.

- **CanvasRenderingContext2D.beginPath()**: Starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.
- **CanvasRenderingContext2D.closePath()**: Causes the point of the pen to move back to the start of the current sub-path. It tries to draw a straight line from the current point to the start. If the shape has already been closed or has only one point, this function does nothing.
- **CanvasRenderingContext2D.moveTo()**: Moves the starting point of a new sub-path to the (x, y) coordinates.
- **CanvasRenderingContext2D.lineTo()**: Connects the last point in the current sub-path to the specified (x, y) coordinates with a straight line.
- **CanvasRenderingContext2D.bezierCurveTo()**: Adds a cubic Bézier curve to the current path.
- **CanvasRenderingContext2D.quadraticCurveTo()**: Adds a quadratic Bézier curve to the current path.
- **CanvasRenderingContext2D.arc()**: Adds a circular arc to the current path.
- **CanvasRenderingContext2D.arcTo()**: Adds an arc to the current path with the given control points and radius, connected to the previous point by a straight line.
- **CanvasRenderingContext2D.ellipse()**: Adds an elliptical arc to the current path.
- **CanvasRenderingContext2D.rect()**: Creates a path for a rectangle at position (x, y) with a size that is determined by width and height.
- **CanvasRenderingContext2D.roundRect()**: Creates a path for a rectangle with rounded corners at position (x, y) with a size that is determined by width and height and radii determined by radii.

### Drawing Paths

- **CanvasRenderingContext2D.fill()**: Fills the current sub-paths with the current fill style.
- **CanvasRenderingContext2D.stroke()**: Strokes the current sub-paths with the current stroke style.
- **CanvasRenderingContext2D.clip()**: Creates a clipping path from the current sub-paths. Everything drawn after `clip()` is called appears inside the clipping path only. For an example, see [Clipping paths](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing) in the Canvas tutorial.
- **CanvasRenderingContext2D.isPointInPath()**: Reports whether or not the specified point is contained in the current path.
- **CanvasRenderingContext2D.isPointInStroke()**: Reports whether or not the specified point is inside the area contained by the stroking of a path.

### Transformations

Objects in the `CanvasRenderingContext2D` rendering context have a current transformation matrix and methods to manipulate it. The transformation matrix is applied when creating the current default path, painting text, shapes and [Path2D](https://developer.mozilla.org/en-US/docs/Web/API/Path2D) objects. The methods listed below remain for historical and compatibility reasons as [DOMMatrix](https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix) objects are used in most parts of the API nowadays and will be used in the future instead.

- **CanvasRenderingContext2D.getTransform()**: Retrieves the current transformation matrix being applied to the context.
- **CanvasRenderingContext2D.rotate()**: Adds a rotation to the transformation matrix. The angle argument represents a clockwise rotation angle and is expressed in radians.
- **CanvasRenderingContext2D.scale()**: Adds a scaling transformation to the canvas units by x horizontally and by y vertically.
- **CanvasRenderingContext2D.translate()**: Adds a translation transformation by moving the canvas and its origin x horizontally and y vertically on the grid.
- **CanvasRenderingContext2D.transform()**: Multiplies the current transformation matrix with the matrix described by its arguments.
- **CanvasRenderingContext2D.setTransform()**: Resets the current transform to the identity matrix, and then invokes the `transform()` method with the same arguments.
- **CanvasRenderingContext2D.resetTransform()**: Resets the current transform by the identity matrix.

### Compositing

- **CanvasRenderingContext2D.globalAlpha**: Alpha value that is applied to shapes and images before they are composited onto the canvas. Default `1.0` (opaque).
- **CanvasRenderingContext2D.globalCompositeOperation**: With `globalAlpha` applied this sets how shapes and images are drawn onto the existing bitmap.

### Drawing Images

- **CanvasRenderingContext2D.drawImage()**: Draws the specified image. This method is available in multiple formats, providing a great deal of flexibility in its use.

### Pixel Manipulation

See also the [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object.

- **CanvasRenderingContext2D.createImageData()**: Creates a new, blank `ImageData` object with the specified dimensions. All of the pixels in the new object are transparent black.
- **CanvasRenderingContext2D.getImageData()**: Returns an `ImageData` object representing the underlying pixel data for the area of the canvas denoted by the rectangle which starts at (sx, sy) and has an sw width and sh height.
- **CanvasRenderingContext2D.putImageData()**: Paints data from the given `ImageData` object onto the bitmap. If a dirty rectangle is provided, only the pixels from that rectangle are painted.

### Image Smoothing

- **CanvasRenderingContext2D.imageSmoothingEnabled**: Image smoothing mode; if disabled, images will not be smoothed if scaled.
- **CanvasRenderingContext2D.imageSmoothingQuality**: Allows you to set the quality of image smoothing.

### The Canvas State

The `CanvasRenderingContext2D` rendering context contains a variety of drawing style states (attributes for line styles, fill styles, shadow styles, text styles). The following methods help you to work with that state:

- **CanvasRenderingContext2D.save()**: Saves the current drawing style state using a stack so you can revert any change you make to it using `restore()`.
- **CanvasRenderingContext2D.restore()**: Restores the drawing style state to the last element on the 'state stack' saved by `save()`.
- **CanvasRenderingContext2D.canvas**: A read-only reference to an `OffscreenCanvas` object.
- **CanvasRenderingContext2D.getContextAttributes()** (Experimental): Returns an object containing the actual context attributes. Context attributes can be requested with `HTMLCanvasElement.getContext()`.
- **CanvasRenderingContext2D.reset()**: Resets the current drawing style state to the default values.

### Filters

- **CanvasRenderingContext2D.filter**: Applies a CSS or SVG filter to the canvas; e.g., to change its brightness or blurriness.

---

## See Also

- [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) - The base interface
- [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)
- [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas)
- [OffscreenCanvas worker example](https://github.com/mdn/dom-examples/tree/main/web-workers/offscreen-canvas-worker)