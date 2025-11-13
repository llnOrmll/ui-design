## Define the positions of the cube's vertices

First, let's build the cube's vertex position buffer by updating the code in `initBuffers()`. This is pretty much the same as it was for the square plane, but somewhat longer since there are 24 vertices (4 per side).

In the `initPositionBuffer()` function of your "init-buffers.js" module, replace the `positions` declaration with this code:

js
    
    
    const positions = [
      // Front face
      -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
    
      // Back face
      -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,
    
      // Top face
      -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,
    
      // Bottom face
      -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
    
      // Right face
      1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,
    
      // Left face
      -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
    ];
    

Since we've added a z-component to our vertices, we need to update the `numComponents` of our `vertexPosition` attribute to 3.

In the `setPositionAttribute()` function of your "draw-scene.js" module, change the `numComponents` constant from `2` to `3`:

js
    
    
    const numComponents = 3;
    

## Define the vertices' colors

We also need to build an array of colors for each of the 24 vertices. This code starts by defining a color for each face, then uses a loop to assemble an array of all the colors for each of the vertices.

In the `initColorBuffer()` function of your "init-buffers.js" module, replace the `colors` declaration with this code:

js
    
    
    const faceColors = [
      [1.0, 1.0, 1.0, 1.0], // Front face: white
      [1.0, 0.0, 0.0, 1.0], // Back face: red
      [0.0, 1.0, 0.0, 1.0], // Top face: green
      [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
      [1.0, 1.0, 0.0, 1.0], // Right face: yellow
      [1.0, 0.0, 1.0, 1.0], // Left face: purple
    ];
    
    // Convert the array of colors into a table for all the vertices.
    
    let colors = [];
    
    for (const c of faceColors) {
      // Repeat each color four times for the four vertices of the face
      colors = colors.concat(c, c, c, c);
    }
    

## Define the element array

Once the vertex arrays are generated, we need to build the element array.

In your "init-buffer.js" module, add the following function:

js
    
    
    function initIndexBuffer(gl) {
      const indexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    
      // This array defines each face as two triangles, using the
      // indices into the vertex array to specify each triangle's
      // position.
    
      // prettier-ignore
      const indices = [
         0,  1,  2,      0,  2,  3,    // front
         4,  5,  6,      4,  6,  7,    // back
         8,  9,  10,     8,  10, 11,   // top
         12, 13, 14,     12, 14, 15,   // bottom
         16, 17, 18,     16, 18, 19,   // right
         20, 21, 22,     20, 22, 23,   // left
      ];
    
      // Now send the element array to GL
    
      gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices),
        gl.STATIC_DRAW,
      );
    
      return indexBuffer;
    }
    

The `indices` array defines each face like a pair of triangles, specifying each triangle's vertices as an index into the cube's vertex arrays. Thus the cube is described as a collection of 12 triangles.

Next, you need to call this new function from `initBuffers()`, and return the buffer it creates.

At the end of the `initBuffers()` function of your "init-buffers.js" module, add the following code, replacing the existing `return` statement:

js
    
    
    function initBuffers(gl) {
      // â¦
    
      const indexBuffer = initIndexBuffer(gl);
    
      return {
        position: positionBuffer,
        color: colorBuffer,
        indices: indexBuffer,
      };
    }
    

## Drawing the cube

Next we need to add code to our `drawScene()` function to draw using the cube's index buffer, adding new [`gl.bindBuffer()`](/en-US/docs/Web/API/WebGLRenderingContext/bindBuffer "gl.bindBuffer\(\)") and [`gl.drawElements()`](/en-US/docs/Web/API/WebGLRenderingContext/drawElements "gl.drawElements\(\)") calls.

In your `drawScene()` function, add the following code just before the `gl.useProgram` line:

js
    
    
    // Tell WebGL which indices to use to index the vertices
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
    

In the `drawScene()` function of your "draw-scene.js" module, replace the block just after the two `gl.uniformMatrix4fv` calls, that contains the `gl.drawArrays()` line, with the following block:

js
    
    
    {
      const vertexCount = 36;
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }
    

Since each face of our cube is comprised of two triangles, there are 6 vertices per side, or 36 total vertices in the cube, even though many of them are duplicates.

Finally, let's replace our variable `squareRotation` by `cubeRotation` and add a second rotation around the x axis.

At the start of your "webgl-demo.js" file, replace the `squareRotation` declaration with this line:

js
    
    
    let cubeRotation = 0.0;
    

In your `drawScene()` function declaration, replace the `squareRotation` with `cubeRotation`:

js
    
    
    function drawScene(gl, programInfo, buffers, cubeRotation) {
      // â¦
    }
    

In your `drawScene()` function, replace the `mat4.rotate` call with the following code:

js
    
    
    mat4.rotate(
      modelViewMatrix, // destination matrix
      modelViewMatrix, // matrix to rotate
      cubeRotation, // amount to rotate in radians
      [0, 0, 1],
    ); // axis to rotate around (Z)
    mat4.rotate(
      modelViewMatrix, // destination matrix
      modelViewMatrix, // matrix to rotate
      cubeRotation * 0.7, // amount to rotate in radians
      [0, 1, 0],
    ); // axis to rotate around (Y)
    mat4.rotate(
      modelViewMatrix, // destination matrix
      modelViewMatrix, // matrix to rotate
      cubeRotation * 0.3, // amount to rotate in radians
      [1, 0, 0],
    ); // axis to rotate around (X)
    

In your `main()` function, replace the code that calls `drawScene()` and updates `squareRotation` to pass in and update `cubeRotation` instead:

js
    
    
    drawScene(gl, programInfo, buffers, cubeRotation);
    cubeRotation += deltaTime;
    

At this point, we now have an animated cube rotating, its six faces rather vividly colored.

[View the complete code](https://github.com/mdn/dom-examples/tree/main/webgl-examples/tutorial/sample5) | [Open this demo on a new page](https://mdn.github.io/dom-examples/webgl-examples/tutorial/sample5/)

  * [ Previous ](/en-US/docs/Web/API/WebGL_API/Tutorial/Animating_objects_with_WebGL)
  * [ Next ](/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL)



## Help improve MDN

Was this page helpful to you?

Yes No

[Learn how to contribute](/en-US/docs/MDN/Community/Getting_started)

This page was last modified on â¨May 27, 2025â© by [MDN contributors](/en-US/docs/Web/API/WebGL_API/Tutorial/Creating_3D_objects_using_WebGL/contributors.txt). 

[View this page on GitHub](https://github.com/mdn/content/blob/main/files/en-us/web/api/webgl_api/tutorial/creating_3d_objects_using_webgl/index.md?plain=1 "Folder: â¨en-us/web/api/webgl_api/tutorial/creating_3d_objects_using_webglâ© \(Opens in a new tab\)") â¢ [Report a problem with this content](https://github.com/mdn/content/issues/new?template=page-report.yml&mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWebGL_API%2FTutorial%2FCreating_3D_objects_using_WebGL&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EPage+report+details%3C%2Fsummary%3E%0A%0A*+Folder%3A+%60en-us%2Fweb%2Fapi%2Fwebgl_api%2Ftutorial%2Fcreating_3d_objects_using_webgl%60%0A*+MDN+URL%3A+https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWebGL_API%2FTutorial%2FCreating_3D_objects_using_WebGL%0A*+GitHub+URL%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fblob%2Fmain%2Ffiles%2Fen-us%2Fweb%2Fapi%2Fwebgl_api%2Ftutorial%2Fcreating_3d_objects_using_webgl%2Findex.md%0A*+Last+commit%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fcommit%2Fb5437b737639d6952d18b95ebd1045ed73e4bfa7%0A*+Document+last+modified%3A+2025-05-27T11%3A11%3A59.000Z%0A%0A%3C%2Fdetails%3E "This will take you to GitHub to file a new issue.")
