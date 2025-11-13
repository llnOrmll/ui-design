# CanvasPattern

## Baseline - Widely available

This feature is well established and works across many devices and browser versions. It's been available across browsers since July 2015.

**Note:** This feature is available in Web Workers.

The `CanvasPattern` interface represents an opaque object describing a pattern, based on an image, a canvas, or a video, created by the `CanvasRenderingContext2D.createPattern()` method.

It can be used as a `fillStyle` or `strokeStyle`.

## Instance properties

As an opaque object, this has no exposed property.

## Instance methods

There are no inherited method.

### CanvasPattern.setTransform()

The `CanvasPattern.setTransform()` method uses a `DOMMatrix` object as the pattern's transformation matrix and invokes it on the pattern.

**Note:** This method has been widely available since January 2020.

#### Syntax

```javascript
setTransform(matrix)
```

#### Parameters

- **`matrix`** - A `DOMMatrix` to use as the pattern's transformation matrix.

#### Return value

None (`undefined`).

#### Examples

##### Using the `setTransform` method

This is a code snippet which uses the `setTransform` method to create a `CanvasPattern` with the specified pattern transformation from a `DOMMatrix`. The pattern gets applied if you set it as the current `fillStyle` and gets drawn onto the canvas when using the `fillRect()` method, for example.

###### HTML

```html
<canvas id="canvas"></canvas>
```

###### JavaScript

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const matrix = new DOMMatrix([1, 0.2, 0.8, 1, 0, 0]);

const img = new Image();
img.src = "canvas_create_pattern.png";

img.onload = () => {
  const pattern = ctx.createPattern(img, "repeat");
  pattern.setTransform(matrix.rotate(-45).scale(1.5));
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, 400, 400);
};
```

## Specifications

| Specification |
|---------------|
| [HTML Standard - CanvasPattern](https://html.spec.whatwg.org/multipage/canvas.html#canvaspattern) |

## Browser compatibility

[Check MDN for current browser compatibility information]

## See also

- `CanvasRenderingContext2D.createPattern()`
- `DOMMatrix`
- The `<canvas>` element and its associated interface, `HTMLCanvasElement`