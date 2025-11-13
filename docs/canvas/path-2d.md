# Path2D

**Baseline - Widely available**

This feature is well established and works across many devices and browser versions. It's been available across browsers since August 2016.

> **Note:** This feature is available in [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API).

## Overview

The `Path2D` interface of the Canvas 2D API is used to declare a path that can then be used on a [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) object. The [path methods](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#paths) of the `CanvasRenderingContext2D` interface are also present on this interface, which gives you the convenience of being able to retain and replay your path whenever desired.

---

## Constructor

### Path2D()

**Baseline - Widely available** (since August 2016)

The `Path2D()` constructor returns a newly instantiated `Path2D` object, optionally with another path as an argument (creates a copy), or optionally with a string consisting of [SVG path](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Paths) data.

#### Syntax

```javascript
new Path2D()
new Path2D(path)
new Path2D(d)
```

#### Parameters

- **path** (Optional): When invoked with another `Path2D` object, a copy of the `path` argument is created.
- **d** (Optional): When invoked with a string consisting of [SVG path](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Paths) data, a new path is created from that description.

#### Examples

##### Creating and copying paths

This example creates and copies a `Path2D` path.

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let path1 = new Path2D();
path1.rect(10, 10, 100, 100);

let path2 = new Path2D(path1);
path2.moveTo(220, 60);
path2.arc(170, 60, 50, 0, 2 * Math.PI);

ctx.stroke(path2);
```

##### Using SVG paths

This example creates a `Path2D` path using [SVG path data](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Paths). The path will move to point (`M10 10`) and then move horizontally 80 points to the right (`h 80`), then 80 points down (`v 80`), then 80 points to the left (`h -80`), and then back to the start (`Z`).

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let p = new Path2D("M10 10 h 80 v 80 h -80 Z");
ctx.fill(p);
```

---

## Instance Methods

### addPath()

**Baseline - Widely available** (since January 2020)

The `Path2D.addPath()` method of the Canvas 2D API adds one [Path2D](https://developer.mozilla.org/en-US/docs/Web/API/Path2D) object to another `Path2D` object.

#### Syntax

```javascript
addPath(path)
addPath(path, transform)
```

#### Parameters

- **path**: A `Path2D` path to add.
- **transform** (Optional): A `DOMMatrix` to be used as the transformation matrix for the path that is added. (Technically an object that possesses the same properties as a `DOMMatrix` object.)

#### Return Value

None ([undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)).

#### Examples

##### Adding a path to an existing path

This example adds one path to another.

###### HTML

```html
<canvas id="canvas"></canvas>
```

###### JavaScript

First, we create two separate [Path2D](https://developer.mozilla.org/en-US/docs/Web/API/Path2D) objects, each of which contains a rectangle made using the [rect()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rect) method. We then create a matrix using [DOMMatrix()](https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix/DOMMatrix). We then add the second path to the first using `addPath()`, also applying the matrix to move the second path to the right.

Finally, we draw the first path (which now contains both rectangles) using [fill()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill).

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Create first path and add a rectangle
let p1 = new Path2D();
p1.rect(0, 0, 100, 150);

// Create second path and add a rectangle
let p2 = new Path2D();
p2.rect(0, 0, 100, 75);

// Create transformation matrix that moves 200 points to the right
let m = new DOMMatrix();
m.a = 1;
m.b = 0;
m.c = 0;
m.d = 1;
m.e = 200;
m.f = 0;

// Add second path to the first path
p1.addPath(p2, m);

// Draw the first path
ctx.fill(p1);
```

---

### Path Methods

The following path methods are inherited from [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) and available on `Path2D` objects:

#### closePath()

Causes the point of the pen to move back to the start of the current sub-path. It tries to draw a straight line from the current point to the start. If the shape has already been closed or has only one point, this function does nothing.

#### moveTo()

Moves the starting point of a new sub-path to the (x, y) coordinates.

#### lineTo()

Connects the last point in the subpath to the (x, y) coordinates with a straight line.

#### bezierCurveTo()

Adds a cubic Bézier curve to the path. It requires three points. The first two points are control points and the third one is the end point. The starting point is the last point in the current path, which can be changed using `moveTo()` before creating the Bézier curve.

#### quadraticCurveTo()

Adds a quadratic Bézier curve to the current path.

#### arc()

Adds an arc to the path which is centered at (x, y) position with radius `r` starting at `startAngle` and ending at `endAngle` going in the given direction by `counterclockwise` (defaulting to clockwise).

#### arcTo()

Adds a circular arc to the path with the given control points and radius, connected to the previous point by a straight line.

#### ellipse()

Adds an elliptical arc to the path which is centered at (x, y) position with the radii `radiusX` and `radiusY` starting at `startAngle` and ending at `endAngle` going in the given direction by `counterclockwise` (defaulting to clockwise).

#### rect()

Creates a path for a rectangle at position (x, y) with a size that is determined by `width` and `height`.

#### roundRect()

Creates a path for a rounded rectangle at position (x, y) with a size that is determined by `width` and `height` and the radii of the circular arc to be used for the corners of the rectangle is determined by `radii`.

---

## Examples

### Creating a reusable path

Here's a simple example showing how to create and reuse a `Path2D` object:

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Create a path
const myPath = new Path2D();
myPath.rect(10, 10, 50, 50);
myPath.rect(70, 10, 50, 50);
myPath.rect(130, 10, 50, 50);

// Fill the path
ctx.fillStyle = "blue";
ctx.fill(myPath);

// Reuse the same path with a different style
ctx.strokeStyle = "red";
ctx.lineWidth = 3;
ctx.stroke(myPath);
```

### Using SVG path data

You can create complex paths using SVG path syntax:

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Create a heart shape using SVG path data
const heart = new Path2D(
  "M 25,60 L 35,50 L 45,60 L 35,70 Z " +
  "M 50,45 C 50,35 60,30 70,35 C 80,40 80,55 70,60 " +
  "L 50,80 L 30,60 C 20,55 20,40 30,35 C 40,30 50,35 50,45"
);

ctx.fillStyle = "red";
ctx.fill(heart);
```

### Combining multiple paths

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Create individual paths
const circle = new Path2D();
circle.arc(75, 75, 50, 0, 2 * Math.PI);

const square = new Path2D();
square.rect(150, 25, 100, 100);

// Combine paths
const combined = new Path2D();
combined.addPath(circle);
combined.addPath(square);

// Draw the combined path
ctx.strokeStyle = "purple";
ctx.lineWidth = 2;
ctx.stroke(combined);
```

---

## See Also

- [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [SVG Paths](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorials/SVG_from_scratch/Paths)
- [DOMMatrix](https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix)