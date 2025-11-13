## Making the square rotate

In this example, we'll actually rotate our camera. By doing so, it will look as if we are rotating the square. First we'll need some variables in which to track the current rotation of the camera.

**Note:** Add this code at the start of your "webgl-demo.js" script:

js
    
    
    let squareRotation = 0.0;
    let deltaTime = 0;
    

Now we need to update the `drawScene()` function to apply the current rotation to the camera when drawing it. After translating the camera to the initial drawing position for the square, we apply the rotation.

In your "draw-scene.js" module, update the declaration of your `drawScene()` function so it can be passed the rotation to use:

js
    
    
    function drawScene(gl, programInfo, buffers, squareRotation) {
      // â¦
    }
    

In your `drawScene()` function, right after the line `mat4.translate()` call, add this code:

js
    
    
    mat4.rotate(
      modelViewMatrix, // destination matrix
      modelViewMatrix, // matrix to rotate
      squareRotation, // amount to rotate in radians
      [0, 0, 1],
    ); // axis to rotate around
    

This rotates the modelViewMatrix by the current value of `squareRotation`, around the Z axis.

To actually animate, we need to add code that changes the value of `squareRotation` over time.

Add this code at the end of your `main()` function, replacing the existing `drawScene()` call:

js
    
    
    let then = 0;
    
    // Draw the scene repeatedly
    function render(now) {
      now *= 0.001; // convert to seconds
      deltaTime = now - then;
      then = now;
    
      drawScene(gl, programInfo, buffers, squareRotation);
      squareRotation += deltaTime;
    
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    

This code uses `requestAnimationFrame` to ask the browser to call the function `render` on each frame. `requestAnimationFrame` passes us the time in milliseconds since the page loaded. We convert that to seconds and then subtract from it the last time to compute `deltaTime`, which is the number of second since the last frame was rendered.

Finally, we update `squareRotation`.

[View the complete code](https://github.com/mdn/dom-examples/tree/main/webgl-examples/tutorial/sample4) | [Open this demo on a new page](https://mdn.github.io/dom-examples/webgl-examples/tutorial/sample4/)

  * [ Previous ](/en-US/docs/Web/API/WebGL_API/Tutorial/Using_shaders_to_apply_color_in_WebGL)
  * [ Next ](/en-US/docs/Web/API/WebGL_API/Tutorial/Creating_3D_objects_using_WebGL)



## Help improve MDN

Was this page helpful to you?

Yes No

[Learn how to contribute](/en-US/docs/MDN/Community/Getting_started)

This page was last modified on â¨Apr 3, 2025â© by [MDN contributors](/en-US/docs/Web/API/WebGL_API/Tutorial/Animating_objects_with_WebGL/contributors.txt). 

[View this page on GitHub](https://github.com/mdn/content/blob/main/files/en-us/web/api/webgl_api/tutorial/animating_objects_with_webgl/index.md?plain=1 "Folder: â¨en-us/web/api/webgl_api/tutorial/animating_objects_with_webglâ© \(Opens in a new tab\)") â¢ [Report a problem with this content](https://github.com/mdn/content/issues/new?template=page-report.yml&mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWebGL_API%2FTutorial%2FAnimating_objects_with_WebGL&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EPage+report+details%3C%2Fsummary%3E%0A%0A*+Folder%3A+%60en-us%2Fweb%2Fapi%2Fwebgl_api%2Ftutorial%2Fanimating_objects_with_webgl%60%0A*+MDN+URL%3A+https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWebGL_API%2FTutorial%2FAnimating_objects_with_WebGL%0A*+GitHub+URL%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fblob%2Fmain%2Ffiles%2Fen-us%2Fweb%2Fapi%2Fwebgl_api%2Ftutorial%2Fanimating_objects_with_webgl%2Findex.md%0A*+Last+commit%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fcommit%2Fcc41ecd796870c2b6c77ad0b04fcb8d8c7d877d2%0A*+Document+last+modified%3A+2025-04-03T13%3A29%3A19.000Z%0A%0A%3C%2Fdetails%3E "This will take you to GitHub to file a new issue.")
