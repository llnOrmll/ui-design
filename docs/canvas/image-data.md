# ImageData

**Baseline - Widely available**

This feature is well established and works across many devices and browser versions. It's been available across browsers since July 2015.

> **Note:** This feature is available in [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API).

## Overview

The `ImageData` interface represents the underlying pixel data of an area of a [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas) element.

It is created using the [ImageData()](https://developer.mozilla.org/en-US/docs/Web/API/ImageData/ImageData) constructor or creator methods on the [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) object associated with a canvas: [createImageData()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createImageData) and [getImageData()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData). It can also be used to set a part of the canvas by using [putImageData()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData).

---

## Constructor

### ImageData()

**Baseline - Widely available** (since August 2016)

The `ImageData()` constructor returns a newly instantiated [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object built from the typed array given and having the specified width and height.

This constructor is the preferred way of creating such an object in a [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker).

#### Syntax

```javascript
new ImageData(width, height)
new ImageData(width, height, settings)
new ImageData(dataArray, width)
new ImageData(dataArray, width, height)
new ImageData(dataArray, width, height, settings)
```

#### Parameters

- **width**: An unsigned long representing the width of the image.
- **height**: An unsigned long representing the height of the image. This value is optional if an array is given: the height will be inferred from the array's size and the given width.
- **settings** (Optional): An object with the following properties:
  - **colorSpace**: Specifies the color space of the image data. Can be set to `"srgb"` for the [sRGB color space](https://en.wikipedia.org/wiki/SRGB) or `"display-p3"` for the [display-p3 color space](https://en.wikipedia.org/wiki/DCI-P3).
  - **pixelFormat**: Specifies the pixel format. Possible values:
    - `"rgba-unorm8"` - for RGBA with 8 bit per component unsigned normalized format, using a `Uint8ClampedArray`. This is the default.
    - `"rgba-float16"` - for RGBA with 16 bits per component, using a `Float16Array`. Floating-point pixel values allow representing colors in arbitrarily wide gamuts and high dynamic range (HDR).
- **dataArray**: A `Uint8ClampedArray` or `Float16Array` containing the underlying pixel representation of the image. If no such array is given, an image with a transparent black rectangle of the specified `width` and `height` will be created. The type of the `dataArray` must match `settings.pixelFormat`.

#### Return Value

A new [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object.

#### Exceptions

- **IndexSizeError DOMException**: Thrown if `dataArray` is specified, but its length is not `(bytesPerPixel * width * height)`, or a multiple of `(bytesPerPixel * width)` if `height` is not specified. `bytesPerPixel` is `4` when `pixelFormat` is `"rgba-unorm8"` and `8` otherwise.
- **InvalidStateError DOMException**: Thrown if `dataArray` is of type `Uint8ClampedArray` and `pixelFormat` is not set to `"rgba-unorm8"`, or if `dataArray` is of type `Float16Array` and `pixelFormat` is not set to `"rgba-float16"`.

#### Examples

##### Creating a blank ImageData object

This example creates an `ImageData` object that is 200 pixels wide and 100 pixels tall, containing a total of 20,000 pixels.

```javascript
let imageData = new ImageData(200, 100);
// ImageData { width: 200, height: 100, data: Uint8ClampedArray[80000] }
```

##### ImageData using the display-p3 color space

This example creates an `ImageData` object with the [display-p3 color space](https://en.wikipedia.org/wiki/DCI-P3).

```javascript
let imageData = new ImageData(200, 100, { colorSpace: "display-p3" });
```

##### Floating-point pixel data for wide gamuts and high dynamic range (HDR)

Floating-point pixel values allow representing colors in arbitrarily wide gamuts and high dynamic range (HDR). You can set the `pixelFormat` setting to `"rgba-float16"` to use RGBA values with 16 bits per component. This requires the `dataArray` to be a [Float16Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float16Array).

```javascript
let floatArray = new Float16Array(4 * 200 * 200);
let imageData = new ImageData(floatArray, 200, 200, {
  pixelFormat: "rgba-float16",
});
console.log(imageData.pixelFormat); // "rgba-float16"
```

##### Initializing ImageData with an array

This example instantiates an `ImageData` object with pixel colors defined by an array.

###### HTML

```html
<canvas id="canvas"></canvas>
```

###### JavaScript

The array (`arr`) has a length of `40000`: it consists of 10,000 pixels, each of which is defined by 4 values. The `ImageData` constructor specifies a `width` of `200` for the new object, so its `height` defaults to 10,000 divided by 200, which is `50`.

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const arr = new Uint8ClampedArray(40_000);

// Fill the array with the same RGBA values
for (let i = 0; i < arr.length; i += 4) {
  arr[i + 0] = 0; // R value
  arr[i + 1] = 190; // G value
  arr[i + 2] = 0; // B value
  arr[i + 3] = 255; // A value
}

// Initialize a new ImageData object
let imageData = new ImageData(arr, 200);

// Draw image data to the canvas
ctx.putImageData(imageData, 20, 20);
```

---

## Instance Properties

### colorSpace

**Read-only** | **Limited availability**

The read-only `ImageData.colorSpace` property is a string indicating the color space of the image data.

The color space can be set during `ImageData` initialization using either the [ImageData()](https://developer.mozilla.org/en-US/docs/Web/API/ImageData/ImageData) constructor or the [createImageData()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createImageData) method.

#### Value

This property can have the following values:

- `"srgb"` representing the [sRGB color space](https://en.wikipedia.org/wiki/SRGB).
- `"display-p3"` representing the [display-p3 color space](https://en.wikipedia.org/wiki/DCI-P3).

#### Examples

##### Getting the color space of canvas image data

The [getImageData()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData) method allows you to explicitly request a color space. If it doesn't match the color space the canvas was initialized with, a conversion will be performed.

Use the `colorSpace` property to know which color space your `ImageData` object is in.

```javascript
const context = canvas.getContext("2d", { colorSpace: "display-p3" });
context.fillStyle = "color(display-p3 0.5 0 0)";
context.fillRect(0, 0, 10, 10);

const p3ImageData = context.getImageData(0, 0, 1, 1);
console.log(p3ImageData.colorSpace); // "display-p3"

const srgbImageData = context.getImageData(0, 0, 1, 1, { colorSpace: "srgb" });
console.log(srgbImageData.colorSpace); // "srgb"
```

---

### data

**Read-only** | **Baseline - Widely available** (since July 2015)

The readonly `ImageData.data` property returns a [Uint8ClampedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray) or [Float16Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float16Array) that contains the [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object's pixel data. Data is stored as a one-dimensional array in the RGBA order.

#### Value

The type depends on the [ImageData.pixelFormat](https://developer.mozilla.org/en-US/docs/Web/API/ImageData/pixelFormat) used:

- A `Uint8ClampedArray` if the `pixelFormat` is `"rgba-unorm8"`.
- A `Float16Array` if the `pixelFormat` is `"rgba-float16"`.

#### Examples

##### Getting an ImageData object's pixel data

This example creates an `ImageData` object that is 100 pixels wide and 100 pixels tall, making 10,000 pixels in all. The `data` array stores four values for each pixel, making 4 x 10,000, or 40,000 values in all.

```javascript
let imageData = new ImageData(100, 100);
console.log(imageData.data); // Uint8ClampedArray[40000]
console.log(imageData.data.length); // 40000
```

If the `ImageData` object is set up for floating-point pixels — for example, for high dynamic range (HDR) images —`data` will be a [Float16Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float16Array) instead.

```javascript
let floatArray = new Float16Array(4 * 200 * 200);
let imageData = new ImageData(floatArray, 200, 200, {
  pixelFormat: "rgba-float16",
});
console.log(imageData.data); // Float16Array
```

##### Filling a blank ImageData object

This example creates and fills a new `ImageData` object with colorful pixels.

###### HTML

```html
<canvas id="canvas"></canvas>
```

###### JavaScript

Since each pixel consists of four values within the `data` array, the `for` loop iterates by multiples of four. The values associated with each pixel are R (red), G (green), B (blue), and A (alpha), in that order.

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const imageData = ctx.createImageData(100, 100);

// Fill the array with RGBA values
for (let i = 0; i < imageData.data.length; i += 4) {
  // Percentage in the x direction, times 255
  let x = ((i % 400) / 400) * 255;
  // Percentage in the y direction, times 255
  let y = (Math.ceil(i / 400) / 100) * 255;

  // Modify pixel data
  imageData.data[i + 0] = x; // R value
  imageData.data[i + 1] = y; // G value
  imageData.data[i + 2] = 255 - x; // B value
  imageData.data[i + 3] = 255; // A value
}

// Draw image data to the canvas
ctx.putImageData(imageData, 20, 20);
```

##### More examples

For more examples using `ImageData.data`, see [Pixel manipulation with canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas), [CanvasRenderingContext2D.createImageData()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createImageData), and [CanvasRenderingContext2D.putImageData()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData).

---

### height

**Read-only** | **Baseline - Widely available** (since July 2015)

The readonly `ImageData.height` property returns the number of rows in the [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object.

#### Value

A number.

#### Examples

This example creates an `ImageData` object that is 200 pixels wide and 100 pixels tall. Thus, the `height` property is `100`.

```javascript
let imageData = new ImageData(200, 100);
console.log(imageData.height); // 100
```

---

### pixelFormat

**Read-only** | **Experimental**

The read-only `ImageData.pixelFormat` property is a string indicating the pixel format of the image data.

The pixel format can be set during `ImageData` initialization using either the [ImageData()](https://developer.mozilla.org/en-US/docs/Web/API/ImageData/ImageData) constructor or the [createImageData()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createImageData) method.

#### Value

This property can have the following values:

- `"rgba-unorm8"` representing RGBA with 8 bit per component unsigned normalized format, using a `Uint8ClampedArray`.
- `"rgba-float16"` representing RGBA with 16 bits per component, using a `Float16Array`. Floating-point pixel values allow representing colors in arbitrarily wide gamuts and high dynamic range (HDR).

#### Examples

##### Floating-point pixel data for wide gamuts and high dynamic range (HDR)

Floating-point pixel values allow representing colors in arbitrarily wide gamuts and high dynamic range (HDR). You can set the `pixelFormat` setting to `"rgba-float16"` to use RGBA values with 16 bits per component. This requires the `dataArray` to be a [Float16Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float16Array).

```javascript
let floatArray = new Float16Array(4 * 200 * 200);
let imageData = new ImageData(floatArray, 200, 200, {
  pixelFormat: "rgba-float16",
});
console.log(imageData.pixelFormat); // "rgba-float16"
```

---

### width

**Read-only** | **Baseline - Widely available** (since July 2015)

The readonly `ImageData.width` property returns the number of pixels per row in the [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object.

#### Value

A number.

#### Examples

This example creates an `ImageData` object that is 200 pixels wide and 100 pixels tall. Thus, the `width` property is `200`.

```javascript
let imageData = new ImageData(200, 100);
console.log(imageData.width); // 200
```

---

## See Also

- [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
- The [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/canvas) element and its associated interface, [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)
- [CanvasRenderingContext2D.createImageData()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createImageData), the creator method that can be used outside workers
- [Pixel manipulation with canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas)