## Preparing to render in 3D

First, create two new files:

  * "index.html"
  * "webgl-demo.js"



The "index.html" file should contain the following:

html
    
    
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>WebGL Demo</title>
        <script src="webgl-demo.js" type="module"></script>
      </head>
    
      <body>
        <canvas id="gl-canvas" width="640" height="480"></canvas>
      </body>
    </html>
    

Note that this declares a canvas that our sample will draw into.

### Preparing the WebGL context

Add the following code to the "webgl-demo.js" file:

js
    
    
    main();
    
    //
    // start here
    //
    function main() {
      const canvas = document.querySelector("#gl-canvas");
      // Initialize the GL context
      const gl = canvas.getContext("webgl");
    
      // Only continue if WebGL is available and working
      if (gl === null) {
        alert(
          "Unable to initialize WebGL. Your browser or machine may not support it.",
        );
        return;
      }
    
      // Set clear color to black, fully opaque
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      // Clear the color buffer with specified clear color
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    

The `main()` function is called when our script is loaded. Its purpose is to set up the WebGL context and start rendering content.

The first thing we do here is obtain a reference to the canvas, assigning it to a variable named `canvas`.

Once we have the canvas, we try to get a [`WebGLRenderingContext`](/en-US/docs/Web/API/WebGLRenderingContext) for it by calling [`getContext()`](/en-US/docs/Web/API/HTMLCanvasElement/getContext) and passing it the string `"webgl"`. If the browser does not support WebGL, `getContext()` will return `null` in which case we display a message to the user and exit.

If the context is successfully initialized, the variable `gl` is our reference to it. In this case, we set the clear color to black, and clear the context to that color (redrawing the canvas with the background color).

At this point, you have enough code that the WebGL context should successfully initialize, and you should wind up with a big black, empty box, ready and waiting to receive content.

[View the complete code](https://github.com/mdn/dom-examples/tree/main/webgl-examples/tutorial/sample1) | [Open this demo on a new page](https://mdn.github.io/dom-examples/webgl-examples/tutorial/sample1/)

## See also

  * [WebGL Fundamentals](https://webglfundamentals.org/)
  * [An intro to modern OpenGL:](https://duriansoftware.com/joe/an-intro-to-modern-opengl.-table-of-contents) A series of nice articles about OpenGL written by Joe Groff, providing a clear introduction to OpenGL from its history to the important graphics pipeline concept, and also includes some examples to demonstrate how OpenGL works. If you have no idea what OpenGL is, this is a good place to start.


  * [ Next ](/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context)



## Help improve MDN

Was this page helpful to you?

Yes No

[Learn how to contribute](/en-US/docs/MDN/Community/Getting_started)

This page was last modified on â¨Oct 28, 2024â© by [MDN contributors](/en-US/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL/contributors.txt). 

[View this page on GitHub](https://github.com/mdn/content/blob/main/files/en-us/web/api/webgl_api/tutorial/getting_started_with_webgl/index.md?plain=1 "Folder: â¨en-us/web/api/webgl_api/tutorial/getting_started_with_webglâ© \(Opens in a new tab\)") â¢ [Report a problem with this content](https://github.com/mdn/content/issues/new?template=page-report.yml&mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWebGL_API%2FTutorial%2FGetting_started_with_WebGL&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EPage+report+details%3C%2Fsummary%3E%0A%0A*+Folder%3A+%60en-us%2Fweb%2Fapi%2Fwebgl_api%2Ftutorial%2Fgetting_started_with_webgl%60%0A*+MDN+URL%3A+https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWebGL_API%2FTutorial%2FGetting_started_with_WebGL%0A*+GitHub+URL%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fblob%2Fmain%2Ffiles%2Fen-us%2Fweb%2Fapi%2Fwebgl_api%2Ftutorial%2Fgetting_started_with_webgl%2Findex.md%0A*+Last+commit%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fcommit%2F9a4005caa5cc13f5174e3b8981eeec5631ed83d1%0A*+Document+last+modified%3A+2024-10-28T12%3A46%3A03.000Z%0A%0A%3C%2Fdetails%3E "This will take you to GitHub to file a new issue.")
