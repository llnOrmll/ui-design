# Canvas API

## Baseline - Widely Available

This feature is well established and works across many devices and browser versions. It's been available across browsers since July 2015.

## Overview

The Canvas API provides a means for drawing graphics via [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and the [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) `<canvas>` element. Among other things, it can be used for:

- Animation
- Game graphics
- Data visualization
- Photo manipulation
- Real-time video processing

The Canvas API largely focuses on 2D graphics. The [WebGL API](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API), which also uses the `<canvas>` element, draws hardware-accelerated 2D and 3D graphics.

## Basic Example

This simple example draws a green rectangle onto a canvas.

### HTML

```html
<canvas id="canvas"></canvas>
```

### JavaScript

The `Document.getElementById()` method gets a reference to the HTML `<canvas>` element. Next, the `HTMLCanvasElement.getContext()` method gets that element's context—the thing onto which the drawing will be rendered.

The actual drawing is done using the `CanvasRenderingContext2D` interface. The `fillStyle` property makes the rectangle green. The `fillRect()` method places its top-left corner at (10, 10), and gives it a size of 150 units wide by 100 tall.

```javascript
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 150, 100);
```

### Result

A green rectangle will be drawn on the canvas at position (10, 10) with dimensions 150×100 pixels.

## Reference

### Core Interfaces

- **HTMLCanvasElement** - The HTML `<canvas>` element itself
- **CanvasRenderingContext2D** - The 2D rendering context for the canvas
- **CanvasGradient** - Represents gradient objects
- **CanvasPattern** - Represents pattern objects
- **ImageBitmap** - Bitmap images
- **ImageData** - Underlying pixel data
- **TextMetrics** - Text measurement information
- **OffscreenCanvas** - Canvas that can be rendered off screen (Experimental)
- **Path2D** - Path objects for drawing (Experimental)
- **ImageBitmapRenderingContext** - Rendering context for ImageBitmap (Experimental)

### Notes

- The interfaces related to `WebGLRenderingContext` are referenced under [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- `OffscreenCanvas` is also available in web workers
- `CanvasCaptureMediaStreamTrack` is a related interface for capturing canvas content as media streams

## Guides and Tutorials

### Official Resources

- **[Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)** - A comprehensive tutorial covering both the basic usage of the Canvas API and its advanced features
- **[HTML5 Canvas Deep Dive](https://joshondesign.com/p/books/canvasdeepdive/title.html)** - A hands-on, book-length introduction to the Canvas API and WebGL
- **[Canvas Handbook](https://bucephalus.org/text/CanvasHandbook/CanvasHandbook.html)** - A handy reference for the Canvas API
- **[Manipulating Video Using Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Manipulating_video_using_canvas)** - Combining `<video>` and `<canvas>` to manipulate video data in real time

## Libraries

The Canvas API is extremely powerful, but not always simple to use. The libraries listed below can make the creation of canvas-based projects faster and easier.

### Popular Canvas Libraries

1. **[EaselJS](https://createjs.com/easeljs)** - An open-source canvas library that makes creating games, generative art, and other highly graphical experiences easy

2. **[Fabric.js](https://fabricjs.com/)** - An open-source canvas library with SVG parsing capabilities

3. **[heatmap.js](https://www.patrick-wied.at/static/heatmapjs/)** - An open-source library for creating canvas-based data heat maps

4. **[JavaScript InfoVis Toolkit](https://philogb.github.io/jit/)** - Creates interactive data visualizations

5. **[Konva.js](https://konvajs.org/)** - A 2D canvas library for desktop and mobile applications

6. **[p5.js](https://p5js.org/)** - Has a full set of canvas drawing functionality for artists, designers, educators, and beginners

7. **[Phaser](https://phaser.io/)** - A fast, free and fun open source framework for Canvas and WebGL powered browser games

8. **[Pts.js](https://ptsjs.org/)** - A library for creative coding and visualization in canvas and SVG

9. **[Rekapi](https://github.com/jeremyckahn/rekapi)** - An animation key-framing API for Canvas

10. **[Scrawl-canvas](https://scrawl.rikweb.org.uk/)** - An open-source JavaScript library for creating and manipulating 2D canvas elements

11. **[ZIM](https://zimjs.com/)** - A framework that provides conveniences, components, and controls for coding creativity on the canvas — includes accessibility and hundreds of colorful tutorials

12. **[Sprig](https://github.com/hackclub/sprig)** - A beginner-friendly, open-source, tile-based game development library that uses Canvas

> **Note:** See the [WebGL API](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) for 2D and 3D libraries that use WebGL.

## Specifications

The Canvas API is specified in the HTML specification:

- [HTML Standard - The canvas element](https://html.spec.whatwg.org/multipage/canvas.html#the-canvas-element)

## Browser Compatibility

The Canvas API has been widely supported across all major browsers since July 2015. For detailed compatibility information, please refer to the MDN documentation.

---

*Documentation extracted from [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)*