# CanvasGradient

## Baseline - Widely available

This feature is well established and works across many devices and browser versions. It's been available across browsers since July 2015.

**Note:** This feature is available in Web Workers.

The `CanvasGradient` interface represents an opaque object describing a gradient. It is returned by the methods `CanvasRenderingContext2D.createLinearGradient()`, `CanvasRenderingContext2D.createConicGradient()` or `CanvasRenderingContext2D.createRadialGradient()`.

It can be used as a `fillStyle` or `strokeStyle`.

## Instance properties

As an opaque object, there is no exposed property.

## Instance methods

### CanvasGradient.addColorStop()

The `CanvasGradient.addColorStop()` method adds a new color stop, defined by an `offset` and a `color`, to a given canvas gradient.

#### Syntax

```javascript
addColorStop(offset, color)
```

#### Parameters

- **`offset`** - A number between `0` and `1`, inclusive, representing the position of the color stop. `0` represents the start of the gradient and `1` represents the end.

- **`color`** - A CSS `<color>` value representing the color of the stop.

#### Return value

None (`undefined`).

#### Exceptions

- **`IndexSizeError` DOMException** - Thrown if `offset` is not between 0 and 1 (both included).

- **`SyntaxError` DOMException** - Thrown if `color` cannot be parsed as a CSS `<color>` value.

#### Examples

##### Adding stops to a gradient

This example uses the `addColorStop` method to add stops to a linear `CanvasGradient` object. The gradient is then used to fill a rectangle.

###### HTML

```html
<canvas id="canvas"></canvas>
```

###### JavaScript

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let gradient = ctx.createLinearGradient(0, 0, 200, 0);
gradient.addColorStop(0, "green");
gradient.addColorStop(0.7, "white");
gradient.addColorStop(1, "pink");
ctx.fillStyle = gradient;
ctx.fillRect(10, 10, 200, 100);
```

###### Result

[The result shows a rectangle with a gradient from green to white to pink]

## Specifications

| Specification |
|---------------|
| [HTML Standard - CanvasGradient](https://html.spec.whatwg.org/multipage/canvas.html#canvasgradient) |

## Browser compatibility

[Check MDN for current browser compatibility information]

## See also

- Creator methods in `CanvasRenderingContext2D`:
  - `CanvasRenderingContext2D.createLinearGradient()`
  - `CanvasRenderingContext2D.createRadialGradient()`
  - `CanvasRenderingContext2D.createConicGradient()`
- The `<canvas>` element and its associated interface, `HTMLCanvasElement`.