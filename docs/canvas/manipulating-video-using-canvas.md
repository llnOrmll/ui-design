# Manipulating Video Using Canvas

## Overview

By combining the capabilities of the `<video>` element with a `<canvas>`, you can manipulate video data in real time to incorporate a variety of visual effects to the video being displayed. This tutorial demonstrates how to perform **chroma-keying** (also known as the "green screen effect") using JavaScript code.

## The Document Content

The HTML document used to render this content is shown below.

```html
<!doctype html>
<html lang="en-US">
<head>
  <meta charset="UTF-8" />
  <title>Video test page</title>
  <style>
    body {
      background: black;
      color: #cccccc;
    }
    #c2 {
      background-image: url("media/foo.png");
      background-repeat: no-repeat;
    }
    div {
      float: left;
      border: 1px solid #444444;
      padding: 10px;
      margin: 10px;
      background: #3b3b3b;
    }
  </style>
</head>
<body>
  <div>
    <video
      id="video"
      src="media/video.mp4"
      controls
      crossorigin="anonymous"></video>
  </div>
  <div>
    <canvas id="c1" width="160" height="96"></canvas>
    <canvas id="c2" width="160" height="96"></canvas>
  </div>
  <script src="processor.js"></script>
</body>
</html>
```

### Key Points

The key bits to take away from this are:

- This document establishes two `<canvas>` elements, with the IDs `c1` and `c2`
- Canvas `c1` is used to display the current frame of the original video
- Canvas `c2` is used to display the video after performing the chroma-keying effect
- Canvas `c2` is preloaded with the still image that will be used to replace the green background in the video
- The JavaScript code is imported from a script named `processor.js`

## The JavaScript Code

The JavaScript code in `processor.js` consists of three methods.

### Initializing the Chroma-Key Player

The `doLoad()` method is called when the HTML document initially loads. This method's job is to prepare the variables needed by the chroma-key processing code, and to set up an event listener so we can detect when the user starts playing the video.

```javascript
const processor = {};

processor.doLoad = function doLoad() {
  const video = document.getElementById("video");
  this.video = video;

  this.c1 = document.getElementById("c1");
  this.ctx1 = this.c1.getContext("2d");

  this.c2 = document.getElementById("c2");
  this.ctx2 = this.c2.getContext("2d");

  video.addEventListener("play", () => {
    this.width = video.videoWidth / 2;
    this.height = video.videoHeight / 2;
    this.timerCallback();
  });
};
```

#### How It Works

This code grabs references to the elements in the HTML document that are of particular interest:
- The `video` element
- The two `canvas` elements

It also fetches references to the graphics contexts for each of the two canvases. These will be used when we're actually doing the chroma-keying effect.

Then `addEventListener()` is called to begin watching the `video` element so that we obtain notification when the user presses the play button on the video. In response to the user beginning playback, this code:

1. Fetches the width and height of the video
2. Halves each dimension (we will be halving the size of the video when we perform the chroma-keying effect)
3. Calls the `timerCallback()` method to start watching the video and computing the visual effect

### The Timer Callback

The timer callback is called initially when the video starts playing (when the "play" event occurs), then takes responsibility for establishing itself to be called periodically in order to launch the keying effect for each frame.

```javascript
processor.timerCallback = function timerCallback() {
  if (this.video.paused || this.video.ended) {
    return;
  }
  this.computeFrame();
  setTimeout(() => {
    this.timerCallback();
  }, 0);
};
```

#### How It Works

1. **Check Video Status**: The first thing the callback does is check to see if the video is even playing; if it's not, the callback returns immediately without doing anything.

2. **Process Frame**: Then it calls the `computeFrame()` method, which performs the chroma-keying effect on the current video frame.

3. **Schedule Next Call**: The last thing the callback does is call `setTimeout()` to schedule itself to be called again as soon as possible. In the real world, you would probably schedule this to be done based on knowledge of the video's frame rate.

### Manipulating the Video Frame Data

The `computeFrame()` method, shown below, is responsible for actually fetching a frame of data and performing the chroma-keying effect.

```javascript
processor.computeFrame = function () {
  this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
  const frame = this.ctx1.getImageData(0, 0, this.width, this.height);
  const data = frame.data;

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i + 0];
    const green = data[i + 1];
    const blue = data[i + 2];
    if (green > 100 && red > 100 && blue < 43) {
      data[i + 3] = 0;
    }
  }
  this.ctx2.putImageData(frame, 0, 0);
};
```

#### How It Works

**Step 1: Draw Video Frame to Canvas**

When this routine is called, the video element is displaying the most recent frame of video data. That frame of video is copied into the graphics context `ctx1` of the first canvas, specifying as the height and width the values we previously saved to draw the frame at half size. 

> **Note**: You can pass the video element into the context's `drawImage()` method to draw the current video frame into the context.

**Step 2: Get Image Data**

Calling the `getImageData()` method on the first context fetches a copy of the raw graphics data for the current frame of video. This provides raw 32-bit pixel image data we can then manipulate.

**Step 3: Process Pixels**

The `for` loop scans through the frame's pixels, pulling out the red, green, and blue values for each pixel, and compares the values against predetermined numbers that are used to detect the green screen.

The algorithm:
- Iterates through pixel data in chunks of 4 (RGBA values)
- Extracts red, green, and blue values
- Checks if the pixel matches the green screen criteria: `green > 100 && red > 100 && blue < 43`
- If matched, sets the alpha value to 0 (fully transparent)

**Step 4: Display Result**

Every pixel in the frame's image data that is found that is within the parameters that are considered to be part of the green screen has its alpha value replaced with a zero, indicating that the pixel is entirely transparent. 

As a result, the final image has the entire green screen area 100% transparent, so that when it's drawn into the destination context using `ctx2.putImageData()`, the result is an overlay onto the static backdrop.

## The Process in Action

This is done repeatedly as the video plays, so that frame after frame is processed and displayed with the chroma-key effect:

1. **Original video frame** is captured
2. **Frame is drawn** to the first canvas at half size
3. **Pixel data is extracted** from the canvas
4. **Green screen pixels** are made transparent by setting alpha to 0
5. **Processed frame** is drawn to the second canvas (which has the background image)
6. **Result**: Video appears with background replaced

The chroma-key effect continues processing each frame in real-time as the video plays.

## Use Cases

This technique can be used for:
- **Green screen effects** - Replace backgrounds in real-time
- **Video filters** - Apply color corrections and effects
- **Motion detection** - Analyze pixel changes between frames
- **Video overlays** - Combine multiple video sources
- **Real-time effects** - Add dynamic visual processing to live video

## Performance Considerations

- Processing happens on every frame, so performance matters
- Consider using `requestAnimationFrame()` instead of `setTimeout()` for better performance
- The computational cost increases with video resolution
- Using half-size video in this example helps maintain smooth playback

---

*Documentation extracted from [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Manipulating_video_using_canvas)*