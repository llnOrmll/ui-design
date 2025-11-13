# TextMetrics API Documentation

## Overview

**Baseline**: Widely available  
**Availability**: Available since July 2015  
**Web Workers**: Available in Web Workers

The `TextMetrics` interface represents the dimensions of a piece of text in the canvas. A `TextMetrics` instance can be retrieved using the [`CanvasRenderingContext2D.measureText()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/measureText) method.

---

## Instance Properties

### width

**Baseline**: Widely available (since July 2015)  
**Type**: Read-only  
**Availability**: Available in Web Workers

The read-only `width` property of the `TextMetrics` interface contains the text's advance width (the width of that inline box) in CSS pixels. It takes into account the current font of the context.

**Example:**
```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let text = ctx.measureText("foo"); // TextMetrics object
text.width; // 16;
```

---

### actualBoundingBoxLeft

**Baseline**: Widely available (since July 2020)  
**Type**: Read-only  
**Availability**: Available in Web Workers

The read-only `actualBoundingBoxLeft` property of the `TextMetrics` interface is a double giving the distance parallel to the baseline from the alignment point given by the `CanvasRenderingContext2D.textAlign` property to the left side of the bounding rectangle of the given text, in CSS pixels; positive numbers indicating a distance going left from the given alignment point.

**Example:**
```javascript
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const text = ctx.measureText("foo"); // returns TextMetrics object
text.actualBoundingBoxLeft; // 0;
```

---

### actualBoundingBoxRight

**Baseline**: Widely available (since July 2020)  
**Type**: Read-only  
**Availability**: Available in Web Workers

The read-only `actualBoundingBoxRight` property of the `TextMetrics` interface is a double giving the distance parallel to the baseline from the alignment point given by the `CanvasRenderingContext2D.textAlign` property to the right side of the bounding rectangle of the given text, in CSS pixels.

**Example:**
```javascript
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const text = ctx.measureText("foo"); // returns TextMetrics object
text.actualBoundingBoxRight; // 15.633333333333333;
```

---

### actualBoundingBoxAscent

**Baseline**: Widely available (since July 2020)  
**Type**: Read-only  
**Availability**: Available in Web Workers

The read-only `actualBoundingBoxAscent` property of the `TextMetrics` interface is a double giving the distance from the horizontal line indicated by the `CanvasRenderingContext2D.textBaseline` attribute to the top of the bounding rectangle used to render the text, in CSS pixels.

**Example:**
```javascript
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const text = ctx.measureText("foo"); // returns TextMetrics object
text.actualBoundingBoxAscent; // 8;
```

---

### actualBoundingBoxDescent

**Baseline**: Widely available (since July 2020)  
**Type**: Read-only  
**Availability**: Available in Web Workers

The read-only `actualBoundingBoxDescent` property of the `TextMetrics` interface is a double giving the distance from the horizontal line indicated by the `CanvasRenderingContext2D.textBaseline` attribute to the bottom of the bounding rectangle used to render the text, in CSS pixels.

**Example:**
```javascript
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const text = ctx.measureText("foo"); // returns TextMetrics object
text.actualBoundingBoxDescent; // 0;
```

---

### fontBoundingBoxAscent

**Baseline**: Newly available (since August 2023)  
**Type**: Read-only  
**Availability**: Available in Web Workers  
**Value**: A number, in CSS pixels

The read-only `fontBoundingBoxAscent` property of the `TextMetrics` interface returns the distance from the horizontal line indicated by the `CanvasRenderingContext2D.textBaseline` attribute, to the top of the highest bounding rectangle of all the fonts used to render the text, in CSS pixels.

**Example:**
```javascript
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
ctx.font = "25px serif";
const text = "Foo";
const textMetrics = ctx.measureText(text); // returns TextMetrics object
const ascentCssPixels = textMetrics.fontBoundingBoxAscent;
```

---

### fontBoundingBoxDescent

**Baseline**: Newly available (since August 2023)  
**Type**: Read-only  
**Availability**: Available in Web Workers  
**Value**: A number, in CSS pixels

The read-only `fontBoundingBoxDescent` property of the `TextMetrics` interface returns the distance from the horizontal line indicated by the `CanvasRenderingContext2D.textBaseline` attribute to the bottom of the bounding rectangle of all the fonts used to render the text, in CSS pixels.

**Example:**
```javascript
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
ctx.font = "25px serif";
const text = "Foo";
const textMetrics = ctx.measureText(text); // returns TextMetrics object
const descentCssPixels = textMetrics.fontBoundingBoxDescent;
```

---

### emHeightAscent

**Baseline**: Limited availability (not in all widely-used browsers)  
**Type**: Read-only  
**Availability**: Available in Web Workers  
**Value**: A number, in CSS pixels

The read-only `emHeightAscent` property of the `TextMetrics` interface returns the distance from the horizontal line indicated by the `CanvasRenderingContext2D.textBaseline` property to the top of the em square in the line box, in CSS pixels.

**Example:**
```javascript
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const text = ctx.measureText("foo"); // returns TextMetrics object
text.emHeightAscent; // 7.59765625;
```

---

### emHeightDescent

**Baseline**: Limited availability (not in all widely-used browsers)  
**Type**: Read-only  
**Availability**: Available in Web Workers  
**Value**: A number, in CSS pixels

The read-only `emHeightDescent` property of the `TextMetrics` interface returns the distance from the horizontal line indicated by the `CanvasRenderingContext2D.textBaseline` property to the bottom of the em square in the line box, in CSS pixels.

**Example:**
```javascript
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const text = ctx.measureText("foo"); // returns TextMetrics object
text.emHeightDescent; // -2.40234375;
```

---

### hangingBaseline

**Baseline**: Newly available (since October 2023)  
**Type**: Read-only  
**Availability**: Available in Web Workers

The read-only `hangingBaseline` property of the `TextMetrics` interface is a double giving the distance from the horizontal line indicated by the `CanvasRenderingContext2D.textBaseline` property to the hanging baseline of the line box, in CSS pixels.

**Example:**
```javascript
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const text = ctx.measureText("foo"); // returns TextMetrics object
text.hangingBaseline; // 6.078125;
```

---

### alphabeticBaseline

**Baseline**: Newly available (since October 2023)  
**Type**: Read-only  
**Availability**: Available in Web Workers

The read-only `alphabeticBaseline` property of the `TextMetrics` interface is a double giving the distance from the horizontal line indicated by the `CanvasRenderingContext2D.textBaseline` property to the alphabetic baseline of the line box, in CSS pixels.

**Example:**
```javascript
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const text = ctx.measureText("foo"); // returns TextMetrics object
text.alphabeticBaseline; // -0;
```

---

### ideographicBaseline

**Baseline**: Newly available (since October 2023)  
**Type**: Read-only  
**Availability**: Available in Web Workers

The read-only `ideographicBaseline` property of the `TextMetrics` interface is a double giving the distance from the horizontal line indicated by the `CanvasRenderingContext2D.textBaseline` property to the ideographic baseline of the line box, in CSS pixels.

**Example:**
```javascript
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const text = ctx.measureText("foo"); // returns TextMetrics object
text.ideographicBaseline; // -1.201171875;
```

---

## Examples

### Baselines Illustrated

This example demonstrates the baselines the `TextMetrics` object holds. The default baseline is the `alphabeticBaseline`. See also the [`CanvasRenderingContext2D.textBaseline`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline) property.

**HTML:**
```html
<canvas id="canvas" width="550" height="500"></canvas>
```

**JavaScript:**
```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const baselinesAboveAlphabetic = [
  "fontBoundingBoxAscent",
  "actualBoundingBoxAscent",
  "emHeightAscent",
  "hangingBaseline",
];

const baselinesBelowAlphabetic = [
  "ideographicBaseline",
  "emHeightDescent",
  "actualBoundingBoxDescent",
  "fontBoundingBoxDescent",
];

const baselines = [...baselinesAboveAlphabetic, ...baselinesBelowAlphabetic];
ctx.font = "25px serif";
ctx.strokeStyle = "red";

baselines.forEach((baseline, index) => {
  const text = `Abcdefghijklmnop (${baseline})`;
  const textMetrics = ctx.measureText(text);
  const y = 50 + index * 50;
  ctx.beginPath();
  ctx.fillText(text, 0, y);

  const baselineMetricValue = textMetrics[baseline];
  if (baselineMetricValue === undefined) {
    return;
  }

  const lineY = baselinesBelowAlphabetic.includes(baseline)
    ? y + Math.abs(baselineMetricValue)
    : y - Math.abs(baselineMetricValue);

  ctx.moveTo(0, lineY);
  ctx.lineTo(550, lineY);
  ctx.stroke();
});
```

---

### Measuring Text Width

When measuring the x-direction of a piece of text, the sum of `actualBoundingBoxLeft` and `actualBoundingBoxRight` can be wider than the width of the inline box (`width`), due to slanted/italic fonts where characters overhang their advance width.

It can therefore be useful to use the sum of `actualBoundingBoxLeft` and `actualBoundingBoxRight` as a more accurate way to get the absolute text width:

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const text = "Abcdefghijklmnop";
ctx.font = "italic 50px serif";
const textMetrics = ctx.measureText(text);

console.log(textMetrics.width);
// 459.8833312988281

console.log(
  textMetrics.actualBoundingBoxRight + textMetrics.actualBoundingBoxLeft,
);
// 462.8833333333333
```

---

## Specifications

Specification: [HTML Standard - TextMetrics](https://html.spec.whatwg.org/multipage/canvas.html#textmetrics)

---

## See Also

- Creator method in `CanvasRenderingContext2D`: [`measureText()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/measureText)
- The `<canvas>` element and its associated interface, `HTMLCanvasElement`
- [`CanvasRenderingContext2D.textBaseline`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline)
- [`CanvasRenderingContext2D.textAlign`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign)