## Applying color to the vertices

In WebGL objects are built using sets of vertices, each of which has a position and a color. By default, all other pixels' colors (and all its other attributes, including position) are computed using interpolation, automatically creating smooth gradients. Previously, our vertex shader didn't apply any specific colors to the vertices. Between this and the fragment shader assigning the fixed color of white to each pixel, the entire square was rendered as solid white.

Let's say we want to render a gradient in which each corner of the square is a different color: red, blue, green, and white. The first thing to do is to establish these colors for the four vertices. To do this, we first need to create an array of vertex colors, then store it into a WebGL buffer.

**Note:** Add the following function to your `init-buffers.js` module:

js
    
    
    function initColorBuffer(gl) {
      const colors = [
        1.0,
        1.0,
        1.0,
        1.0, // white
        1.0,
        0.0,
        0.0,
        1.0, // red
        0.0,
        1.0,
        0.0,
        1.0, // green
        0.0,
        0.0,
        1.0,
        1.0, // blue
      ];
    
      const colorBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    
      return colorBuffer;
    }
    

This code starts by creating a JavaScript array containing four 4-value vectors, one for each vertex color. Then a new WebGL buffer is allocated to store these colors, and the array is converted into floats and stored into the buffer.

Of course, we also need to call this new function from `initBuffers()`, and return the new buffer it creates.

**Note:** At the end of your `initBuffers()` function, add the following code, replacing the existing `return` statement:

js
    
    
    const colorBuffer = initColorBuffer(gl);
    
    return {
      position: positionBuffer,
      color: colorBuffer,
    };
    

To use these colors, the vertex shader needs to be updated to pull the appropriate color from the color buffer.

**Note:** Update the `vsSource` declaration in your `main()` function like this:

js
    
    
    // Vertex shader program
    
    const vsSource = `
        attribute vec4 aVertexPosition;
        attribute vec4 aVertexColor;
    
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
    
        varying lowp vec4 vColor;
    
        void main(void) {
          gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
          vColor = aVertexColor;
        }
      `;
    

The key difference here is that for each vertex, we pass its color using a `varying` to the fragment shader.

## Coloring the fragments

In order to pick up the interpolated color for each pixel, we need to change the fragment shader to fetch the value from the `vColor` varying.

**Note:** Update the `fsSource` declaration in your `main()` function like this:

js
    
    
    // Fragment shader program
    
    const fsSource = `
        varying lowp vec4 vColor;
    
        void main(void) {
          gl_FragColor = vColor;
        }
      `;
    

Each fragment receives the interpolated color based on its position relative to the vertex positions instead of a fixed value.

## Drawing using the colors

Next, you need to add code to look up the attribute location for the colors and set up that attribute for the shader program.

**Note:** Update the `programInfo` declaration in your `main()` function like this:

js
    
    
    // Collect all the info needed to use the shader program.
    // Look up which attributes our shader program is using
    // for aVertexPosition, aVertexColor and also
    // look up uniform locations.
    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
      },
    };
    

Next, `drawScene()` needs to use these colors when drawing the square.

**Note:** Add the following function to your `draw-scene.js` module:

js
    
    
    // Tell WebGL how to pull out the colors from the color buffer
    // into the vertexColor attribute.
    function setColorAttribute(gl, buffers, programInfo) {
      const numComponents = 4;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
      gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset,
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
    }
    

**Note:** Call the `setColorAttribute()` function from `drawScene()`, right before the `gl.useProgram()` call:

js
    
    
    setColorAttribute(gl, buffers, programInfo);
    

The result should now look like this:

[View the complete code](https://github.com/mdn/dom-examples/tree/main/webgl-examples/tutorial/sample3) | [Open this demo on a new page](https://mdn.github.io/dom-examples/webgl-examples/tutorial/sample3/)

  * [ Previous ](/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context)
  * [ Next ](/en-US/docs/Web/API/WebGL_API/Tutorial/Animating_objects_with_WebGL)



## Help improve MDN

Was this page helpful to you?

Yes No

[Learn how to contribute](/en-US/docs/MDN/Community/Getting_started)

This page was last modified on â¨Jul 26, 2024â© by [MDN contributors](/en-US/docs/Web/API/WebGL_API/Tutorial/Using_shaders_to_apply_color_in_WebGL/contributors.txt). 

[View this page on GitHub](https://github.com/mdn/content/blob/main/files/en-us/web/api/webgl_api/tutorial/using_shaders_to_apply_color_in_webgl/index.md?plain=1 "Folder: â¨en-us/web/api/webgl_api/tutorial/using_shaders_to_apply_color_in_webglâ© \(Opens in a new tab\)") â¢ [Report a problem with this content](https://github.com/mdn/content/issues/new?template=page-report.yml&mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWebGL_API%2FTutorial%2FUsing_shaders_to_apply_color_in_WebGL&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EPage+report+details%3C%2Fsummary%3E%0A%0A*+Folder%3A+%60en-us%2Fweb%2Fapi%2Fwebgl_api%2Ftutorial%2Fusing_shaders_to_apply_color_in_webgl%60%0A*+MDN+URL%3A+https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWebGL_API%2FTutorial%2FUsing_shaders_to_apply_color_in_WebGL%0A*+GitHub+URL%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fblob%2Fmain%2Ffiles%2Fen-us%2Fweb%2Fapi%2Fwebgl_api%2Ftutorial%2Fusing_shaders_to_apply_color_in_webgl%2Findex.md%0A*+Last+commit%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fcommit%2F44c4ec928281dc2d7c5ea42b7d2c74a2013f16ac%0A*+Document+last+modified%3A+2024-07-26T15%3A41%3A23.000Z%0A%0A%3C%2Fdetails%3E "This will take you to GitHub to file a new issue.")
