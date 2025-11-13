# ImageBitmap

## Baseline - Widely available

This feature is well established and works across many devices and browser versions. It's been available across browsers since September 2021.

**Note:** This feature is available in Web Workers.

The `ImageBitmap` interface represents a bitmap image which can be drawn to a `<canvas>` without undue latency. It can be created from a variety of source objects using the `Window.createImageBitmap()` or `WorkerGlobalScope.createImageBitmap()` factory method.

`ImageBitmap` provides an asynchronous and resource efficient pathway to prepare textures for rendering in WebGL.

`ImageBitmap` is a transferable object.

---

# Instance properties

## ImageBitmap.height

**Read only** - **Baseline - Widely available**

The `ImageBitmap.height` read-only property returns the `ImageBitmap` object's height in CSS pixels.

### Value

A number represents the `ImageBitmap` object's height in CSS pixels.

### Specifications

| Specification |
|---------------|
| [HTML Standard - ImageBitmap.height](https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html#dom-imagebitmap-height-dev) |

---

## ImageBitmap.width

**Read only** - **Baseline - Widely available**

The `ImageBitmap.width` read-only property returns the `ImageBitmap` object's width in CSS pixels.

### Value

A number represents the `ImageBitmap` object's width in CSS pixels.

### Specifications

| Specification |
|---------------|
| [HTML Standard - ImageBitmap.width](https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html#dom-imagebitmap-width-dev) |

---

# Instance methods

## ImageBitmap.close()

**Baseline - Widely available**

The `ImageBitmap.close()` method disposes of all graphical resources associated with an `ImageBitmap`.

### Syntax

```javascript
close()
```

### Parameters

None.

### Return value

None (`undefined`).

### Examples

```javascript
const offscreen = new OffscreenCanvas(256, 256);
const gl = offscreen.getContext("webgl");

// Perform some drawing using the gl context
const bitmap = offscreen.transferToImageBitmap();
// ImageBitmap { width: 256, height: 256 }

bitmap.close();
// ImageBitmap { width: 0, height: 0 } — disposed
```

### Specifications

| Specification |
|---------------|
| [HTML Standard - ImageBitmap.close()](https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html#dom-imagebitmap-close-dev) |

---

# Creating ImageBitmap objects

`ImageBitmap` objects are created using factory methods rather than constructors. There are two main ways to create an `ImageBitmap`:

## Window.createImageBitmap()

Available in the main thread context.

```javascript
createImageBitmap(image)
createImageBitmap(image, options)
createImageBitmap(image, sx, sy, sw, sh)
createImageBitmap(image, sx, sy, sw, sh, options)
```

## WorkerGlobalScope.createImageBitmap()

Available in Web Worker contexts.

```javascript
createImageBitmap(image)
createImageBitmap(image, options)
createImageBitmap(image, sx, sy, sw, sh)
createImageBitmap(image, sx, sy, sw, sh, options)
```

### Parameters

- **`image`** - An image source, which can be an `<img>` element, SVG `<image>` element, `<video>` element, `<canvas>` element, `HTMLImageElement`, `SVGImageElement`, `HTMLVideoElement`, `HTMLCanvasElement`, `Blob`, `ImageData`, or another `ImageBitmap` object.

- **`sx`** (Optional) - The x coordinate of the reference point of the rectangle from which the `ImageBitmap` will be extracted.

- **`sy`** (Optional) - The y coordinate of the reference point of the rectangle from which the `ImageBitmap` will be extracted.

- **`sw`** (Optional) - The width of the rectangle from which the `ImageBitmap` will be extracted. This value can be negative.

- **`sh`** (Optional) - The height of the rectangle from which the `ImageBitmap` will be extracted. This value can be negative.

- **`options`** (Optional) - An object that sets options for the image's extraction. The available options are:
  - **`imageOrientation`** - Specifies how the bitmap image should be oriented.
    - `"from-image"` (default) - Image oriented according to EXIF orientation metadata, if present.
    - `"flipY"` - Image oriented according to EXIF orientation metadata, if present, and then flipped vertically.
    - `"none"` - Image oriented according to image encoding, ignoring any metadata about the orientation.
  - **`premultiplyAlpha`** - Specifies whether the bitmap's color channels should be premultiplied by the alpha channel. One of `"none"`, `"premultiply"`, or `"default"` (default).
  - **`colorSpaceConversion`** - Specifies whether the image should be decoded using color space conversion. Either `"none"` or `"default"` (default). The value `"default"` indicates that implementation-specific behavior is used.
  - **`resizeWidth`** - A long integer that indicates the output width.
  - **`resizeHeight`** - A long integer that indicates the output height.
  - **`resizeQuality`** - Specifies the algorithm to be used for resizing the input to match the output dimensions. One of `"pixelated"`, `"low"` (default), `"medium"`, or `"high"`.

### Return value

A `Promise` which resolves to an `ImageBitmap` object containing bitmap data from the given rectangle.

### Example

```javascript
const image = document.getElementById('myImage');

createImageBitmap(image).then((bitmap) => {
  console.log('ImageBitmap created:', bitmap.width, 'x', bitmap.height);
  
  // Use the bitmap
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, 0, 0);
  
  // Dispose of the bitmap when done
  bitmap.close();
});
```

---

# Use cases

## Drawing to Canvas

`ImageBitmap` objects can be drawn to a canvas using `CanvasRenderingContext2D.drawImage()`:

```javascript
const ctx = canvas.getContext('2d');
ctx.drawImage(imageBitmap, 0, 0);
```

## WebGL Textures

`ImageBitmap` provides an efficient way to prepare textures for WebGL:

```javascript
const gl = canvas.getContext('webgl');
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageBitmap);
```

## Transferable Objects

`ImageBitmap` objects are transferable, meaning they can be efficiently transferred between workers:

```javascript
// In main thread
const bitmap = await createImageBitmap(image);
worker.postMessage({ bitmap }, [bitmap]); // Transfer ownership

// In worker
self.onmessage = (event) => {
  const bitmap = event.data.bitmap;
  // Use bitmap in worker
  bitmap.close(); // Clean up when done
};
```

---

# Important notes

## Memory Management

- Always call `close()` on `ImageBitmap` objects when you're done with them to free up memory.
- After calling `close()`, the width and height properties will return `0`.
- Transferred `ImageBitmap` objects (via `postMessage`) are automatically detached in the sending context.

## Origin-Clean Flag

`ImageBitmap` objects have an origin-clean flag that tracks whether the bitmap contains data from cross-origin sources. If the bitmap is not origin-clean, certain operations may throw security errors.

## Performance

`ImageBitmap` is designed for performance:
- Asynchronous creation doesn't block the main thread
- Optimized for repeated drawing operations
- Efficient memory usage compared to keeping full DOM elements
- Can be hardware-accelerated

---

# Specifications

| Specification |
|---------------|
| [HTML Standard - ImageBitmap](https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html#imagebitmap) |

# Browser compatibility

[Check MDN for current browser compatibility information]

# See also

- `Window.createImageBitmap()`
- `WorkerGlobalScope.createImageBitmap()`
- `CanvasRenderingContext2D.drawImage()`
- `WebGLRenderingContext.texImage2D()`
- `OffscreenCanvas.transferToImageBitmap()`
- `ImageBitmapRenderingContext`
- Transferable objects
- Web Workers API