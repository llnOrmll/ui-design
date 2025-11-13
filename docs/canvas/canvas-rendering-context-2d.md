# CanvasRenderingContext2D

## Baseline - Widely available

This feature is well established and works across many devices and browser versions. It's been available across browsers since July 2015.

*Some parts of this feature may have varying levels of support.*

The `CanvasRenderingContext2D` interface, part of the Canvas API, provides the 2D rendering context for the drawing surface of a `<canvas>` element. It is used for drawing shapes, text, images, and other objects.

The interface's properties and methods are described in the reference section of this page.

The Canvas tutorial has more explanation, examples, and resources, as well.

For `OffscreenCanvas`, there is an equivalent interface that provides the rendering context. The offscreen rendering context inherits most of the same properties and methods as the `CanvasRenderingContext2D` and is described in more detail in the `OffscreenCanvasRenderingContext2D` reference page.

## Basic example

To get a `CanvasRenderingContext2D` instance, you must first have an HTML `<canvas>` element to work with:

```html
<canvas id="my-house" width="300" height="300"></canvas>
```

To get the canvas' 2D rendering context, call `getContext()` on the `<canvas>` element, supplying `'2d'` as the argument:

```javascript
const canvas = document.getElementById("my-house");
const ctx = canvas.getContext("2d");
```

With the context in hand, you can draw anything you like. This code draws a house:

```javascript
// Set line width
ctx.lineWidth = 10;

// Wall
ctx.strokeRect(75, 140, 150, 110);

// Door
ctx.fillRect(130, 190, 40, 60);

// Roof
ctx.beginPath();
ctx.moveTo(50, 140);
ctx.lineTo(150, 60);
ctx.lineTo(250, 140);
ctx.closePath();
ctx.stroke();
```

---

# Reference

## Context

### CanvasRenderingContext2D.canvas

**Baseline - Widely available**

The `CanvasRenderingContext2D.canvas` property, part of the Canvas API, is a read-only reference to the `HTMLCanvasElement` object that is associated with a given context. It might be `null` if there is no associated `<canvas>` element.

#### Value

A `HTMLCanvasElement` object.

#### Example

Given this `<canvas>` element:

```html
<canvas id="canvas"></canvas>
```

…you can get a reference to the canvas element within the `CanvasRenderingContext2D` by using the `canvas` property:

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas; // HTMLCanvasElement
```

### CanvasRenderingContext2D.getContextAttributes()

Returns an object containing the context attributes used by the browser. Context attributes can be requested when using `HTMLCanvasElement.getContext()` to create the 2D context.

### CanvasRenderingContext2D.isContextLost() 🧪

Returns `true` if the rendering context was lost.

---

## Drawing rectangles

There are three methods that immediately draw rectangles to the canvas.

### CanvasRenderingContext2D.clearRect()

Sets all pixels in the rectangle defined by starting point (x, y) and size (width, height) to transparent black, erasing any previously drawn content.

### CanvasRenderingContext2D.fillRect()

**Baseline - Widely available**

The `CanvasRenderingContext2D.fillRect()` method of the Canvas 2D API draws a rectangle that is filled according to the current `fillStyle`.

This method draws directly to the canvas without modifying the current path, so any subsequent `fill()` or `stroke()` calls will have no effect on it.

#### Syntax

```javascript
fillRect(x, y, width, height)
```

The `fillRect()` method draws a filled rectangle whose starting point is at (x, y) and whose size is specified by `width` and `height`. The fill style is determined by the current `fillStyle` attribute.

#### Parameters

- **x** - The x-axis coordinate of the rectangle's starting point.
- **y** - The y-axis coordinate of the rectangle's starting point.
- **width** - The rectangle's width. Positive values are to the right, and negative to the left.
- **height** - The rectangle's height. Positive values are down, and negative are up.

#### Return value

None (`undefined`).

#### Examples

##### A simple filled rectangle

This example draws a filled green rectangle using the `fillRect()` method.

```html
<canvas id="canvas"></canvas>
```

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
ctx.fillRect(20, 10, 150, 100);
```

The rectangle's top-left corner is at (20, 10). It has a width of 150 and a height of 100.

##### Filling the whole canvas

This code snippet fills the entire canvas with a rectangle. This is often useful for creating a background, on top of which other things may then be drawn. To achieve this, the dimensions of the rectangle are set to equal the `<canvas>` element's width and height attributes.

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

### CanvasRenderingContext2D.strokeRect()

Paints a rectangle which has a starting point at (x, y) and has a w width and an h height onto the canvas, using the current stroke style.

---

## Drawing text

The following methods draw text. See also the `TextMetrics` object for text properties.

### CanvasRenderingContext2D.fillText()

Draws (fills) a given text at the given (x, y) position.

### CanvasRenderingContext2D.strokeText()

Draws (strokes) a given text at the given (x, y) position.

### CanvasRenderingContext2D.measureText()

Returns a `TextMetrics` object.

---

## Line styles

The following methods and properties control how lines are drawn.

### CanvasRenderingContext2D.lineWidth

Width of lines. Default `1.0`.

### CanvasRenderingContext2D.lineCap

Type of endings on the end of lines. Possible values: `butt` (default), `round`, `square`.

### CanvasRenderingContext2D.lineJoin

Defines the type of corners where two lines meet. Possible values: `round`, `bevel`, `miter` (default).

### CanvasRenderingContext2D.miterLimit

Miter limit ratio. Default `10`.

### CanvasRenderingContext2D.getLineDash()

Returns the current line dash pattern array containing an even number of non-negative numbers.

### CanvasRenderingContext2D.setLineDash()

Sets the current line dash pattern.

### CanvasRenderingContext2D.lineDashOffset

Specifies where to start a dash array on a line.

---

## Text styles

The following properties control how text is laid out.

### CanvasRenderingContext2D.font

Font setting. Default value `"10px sans-serif"`.

### CanvasRenderingContext2D.textAlign

Text alignment setting. Possible values: `start` (default), `end`, `left`, `right`, `center`.

### CanvasRenderingContext2D.textBaseline

Baseline alignment setting. Possible values: `top`, `hanging`, `middle`, `alphabetic` (default), `ideographic`, `bottom`.

### CanvasRenderingContext2D.direction

Directionality. Possible values: `ltr`, `rtl`, `inherit` (default).

### CanvasRenderingContext2D.letterSpacing

Letter spacing. Default: `0px`.

### CanvasRenderingContext2D.fontKerning

Font kerning. Possible values: `auto` (default), `normal`, `none`.

### CanvasRenderingContext2D.fontStretch

Font stretch. Possible values: `ultra-condensed`, `extra-condensed`, `condensed`, `semi-condensed`, `normal` (default), `semi-expanded`, `expanded`, `extra-expanded`, `ultra-expanded`.

### CanvasRenderingContext2D.fontVariantCaps

Font variant caps. Possible values: `normal` (default), `small-caps`, `all-small-caps`, `petite-caps`, `all-petite-caps`, `unicase`, `titling-caps`.

### CanvasRenderingContext2D.textRendering

Text rendering. Possible values: `auto` (default), `optimizeSpeed`, `optimizeLegibility`, `geometricPrecision`.

### CanvasRenderingContext2D.wordSpacing

Word spacing. Default value: `0px`

### CanvasRenderingContext2D.lang 🧪

Gets or sets the language of the canvas drawing context.

---

## Fill and stroke styles

Fill styling is used for colors and styles inside shapes and stroke styling is used for the lines around shapes.

### CanvasRenderingContext2D.fillStyle

**Baseline - Widely available**

The `CanvasRenderingContext2D.fillStyle` property of the Canvas 2D API specifies the color, gradient, or pattern to use inside shapes. The default style is `black`.

#### Value

One of the following:
- A string parsed as CSS `<color>` value.
- A `CanvasGradient` object (a linear or radial gradient).
- A `CanvasPattern` object (a repeating image).

#### Examples

##### Changing the fill color of a shape

This example applies a blue fill color to a rectangle.

```html
<canvas id="canvas"></canvas>
```

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "blue";
ctx.fillRect(10, 10, 100, 100);
```

##### Creating multiple fill colors using loops

In this example, we use two `for` loops to draw a grid of rectangles, each having a different fill color. To achieve this, we use the two variables `i` and `j` to generate a unique RGB color for each square, and only modify the red and green values. (The blue channel has a fixed value.) By modifying the channels, you can generate all kinds of palettes.

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 6; j++) {
    ctx.fillStyle = `rgb(
      ${Math.floor(255 - 42.5 * i)}
      ${Math.floor(255 - 42.5 * j)}
      0)`;
    ctx.fillRect(j * 25, i * 25, 25, 25);
  }
}
```

### CanvasRenderingContext2D.strokeStyle

Color or style to use for the lines around shapes. Default is `black`.

---

## Gradients and patterns

### CanvasRenderingContext2D.createConicGradient()

Creates a conic gradient around a point given by coordinates represented by the parameters.

### CanvasRenderingContext2D.createLinearGradient()

Creates a linear gradient along the line given by the coordinates represented by the parameters.

### CanvasRenderingContext2D.createRadialGradient()

Creates a radial gradient given by the coordinates of the two circles represented by the parameters.

### CanvasRenderingContext2D.createPattern()

Creates a pattern using the specified image. It repeats the source in the directions specified by the repetition argument. This method returns a `CanvasPattern`.

---

## Shadows

### CanvasRenderingContext2D.shadowBlur

Specifies the blurring effect. Default: `0`.

### CanvasRenderingContext2D.shadowColor

Color of the shadow. Default: fully-transparent black.

### CanvasRenderingContext2D.shadowOffsetX

Horizontal distance the shadow will be offset. Default: `0`.

### CanvasRenderingContext2D.shadowOffsetY

Vertical distance the shadow will be offset. Default: `0`.

---

## Paths

The following methods can be used to manipulate paths of objects.

### CanvasRenderingContext2D.beginPath()

Starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.

### CanvasRenderingContext2D.closePath()

Causes the point of the pen to move back to the start of the current sub-path. It tries to draw a straight line from the current point to the start. If the shape has already been closed or has only one point, this function does nothing.

### CanvasRenderingContext2D.moveTo()

Moves the starting point of a new sub-path to the (x, y) coordinates.

### CanvasRenderingContext2D.lineTo()

Connects the last point in the current sub-path to the specified (x, y) coordinates with a straight line.

### CanvasRenderingContext2D.bezierCurveTo()

Adds a cubic Bézier curve to the current path.

### CanvasRenderingContext2D.quadraticCurveTo()

Adds a quadratic Bézier curve to the current path.

### CanvasRenderingContext2D.arc()

Adds a circular arc to the current path.

### CanvasRenderingContext2D.arcTo()

Adds an arc to the current path with the given control points and radius, connected to the previous point by a straight line.

### CanvasRenderingContext2D.ellipse()

Adds an elliptical arc to the current path.

### CanvasRenderingContext2D.rect()

Creates a path for a rectangle at position (x, y) with a size that is determined by width and height.

### CanvasRenderingContext2D.roundRect()

Creates a path for a rounded rectangle with a specified position, width, height, and corner radii.

---

## Drawing paths

### CanvasRenderingContext2D.fill()

Fills the current sub-paths with the current fill style.

### CanvasRenderingContext2D.stroke()

Strokes the current sub-paths with the current stroke style.

### CanvasRenderingContext2D.drawFocusIfNeeded()

If a given element is focused, this method draws a focus ring around the current path.

### CanvasRenderingContext2D.clip()

Creates a clipping path from the current sub-paths. Everything drawn after `clip()` is called appears inside the clipping path only. For an example, see Clipping paths in the Canvas tutorial.

### CanvasRenderingContext2D.isPointInPath()

Reports whether or not the specified point is contained in the current path.

### CanvasRenderingContext2D.isPointInStroke()

Reports whether or not the specified point is inside the area contained by the stroking of a path.

---

## Transformations

Objects in the `CanvasRenderingContext2D` rendering context have a current transformation matrix and methods to manipulate it. The transformation matrix is applied when creating the current default path, painting text, shapes and `Path2D` objects. The methods listed below remain for historical and compatibility reasons as `DOMMatrix` objects are used in most parts of the API nowadays and will be used in the future instead.

### CanvasRenderingContext2D.getTransform()

Retrieves the current transformation matrix being applied to the context.

### CanvasRenderingContext2D.rotate()

Adds a rotation to the transformation matrix. The angle argument represents a clockwise rotation angle and is expressed in radians.

### CanvasRenderingContext2D.scale()

Adds a scaling transformation to the canvas units by x horizontally and by y vertically.

### CanvasRenderingContext2D.translate()

Adds a translation transformation by moving the canvas and its origin x horizontally and y vertically on the grid.

### CanvasRenderingContext2D.transform()

Multiplies the current transformation matrix with the matrix described by its arguments.

### CanvasRenderingContext2D.setTransform()

Resets the current transform to the identity matrix, and then invokes the `transform()` method with the same arguments.

### CanvasRenderingContext2D.resetTransform()

Resets the current transform by the identity matrix.

---

## Compositing

### CanvasRenderingContext2D.globalAlpha

Alpha value that is applied to shapes and images before they are composited onto the canvas. Default `1.0` (opaque).

### CanvasRenderingContext2D.globalCompositeOperation

With `globalAlpha` applied this sets how shapes and images are drawn onto the existing bitmap.

---

## Drawing images

### CanvasRenderingContext2D.drawImage()

Draws the specified image. This method is available in multiple formats, providing a great deal of flexibility in its use.

---

## Pixel manipulation

See also the `ImageData` object.

### CanvasRenderingContext2D.createImageData()

Creates a new, blank `ImageData` object with the specified dimensions. All of the pixels in the new object are transparent black.

### CanvasRenderingContext2D.getImageData()

Returns an `ImageData` object representing the underlying pixel data for the area of the canvas denoted by the rectangle which starts at (sx, sy) and has an sw width and sh height.

### CanvasRenderingContext2D.putImageData()

Paints data from the given `ImageData` object onto the bitmap. If a dirty rectangle is provided, only the pixels from that rectangle are painted.

---

## Image smoothing

### CanvasRenderingContext2D.imageSmoothingEnabled

Image smoothing mode; if disabled, images will not be smoothed if scaled.

### CanvasRenderingContext2D.imageSmoothingQuality

Allows you to set the quality of image smoothing.

---

## The canvas state

The `CanvasRenderingContext2D` rendering context contains a variety of drawing style states (attributes for line styles, fill styles, shadow styles, text styles). The following methods help you to work with that state:

### CanvasRenderingContext2D.save()

Saves the current drawing style state using a stack so you can revert any change you make to it using `restore()`.

### CanvasRenderingContext2D.restore()

Restores the drawing style state to the last element on the 'state stack' saved by `save()`.

### CanvasRenderingContext2D.reset() 🧪

Resets the rendering context, including the backing buffer, the drawing state stack, path, and styles.

---

## Filters

### CanvasRenderingContext2D.filter

Applies a CSS or SVG filter to the canvas, e.g., to change its brightness or blurriness.

---

## Specifications

| Specification |
|---------------|
| [HTML Standard - CanvasRenderingContext2D](https://html.spec.whatwg.org/multipage/canvas.html#2dcontext) |

## Browser compatibility

[Check MDN for current browser compatibility information]

## See also

- Canvas API
- The `<canvas>` element
- `HTMLCanvasElement`
- `OffscreenCanvas`
- Canvas tutorial

---

*Note: 🧪 indicates experimental features that may have limited browser support.*