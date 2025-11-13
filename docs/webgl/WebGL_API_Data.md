## GLSL data types

See [Data Types](https://wikis.khronos.org/opengl/Data_Type_\(GLSL\)) in the GLSL documentation.

## GLSL variables

There are three kinds of "variable" or data storage available in GLSL, each of which with its own purpose and use cases: **attributes** , **varyings** , and **uniforms**.

### Attributes

**Attributes** are GLSL variables which are only available to the vertex shader (as variables) and the JavaScript code. Attributes are typically used to store color information, texture coordinates, and any other data calculated or retrieved that needs to be shared between the JavaScript code and the vertex shader.

js
    
    
    // init colors
    const vertexColors = [
      vec4(0.0, 0.0, 0.0, 1.0), // black
      vec4(1.0, 0.0, 0.0, 1.0), // red
      vec4(1.0, 1.0, 0.0, 1.0), // yellow
      vec4(0.0, 1.0, 0.0, 1.0), // green
      vec4(0.0, 0.0, 0.0, 1.0), // black
      vec4(1.0, 0.0, 0.0, 1.0), // red
      vec4(1.0, 1.0, 0.0, 1.0), // yellow
      vec4(0.0, 1.0, 0.0, 1.0), // green
    ];
    const cBuffer = gl.createBuffer();
    

js
    
    
    // continued
    // create buffer to store colors and reference it to "vColor" which is in GLSL
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);
    
    const vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
    

glsl
    
    
    attribute  vec4 vColor;
    
    void main()
    {
      fColor = vColor;
    }
    

### Varyings

**Varyings** are variables that are declared by the vertex shader and used to pass data from the vertex shader to the fragment shader. This is commonly used to share a vertex's [normal vector](https://en.wikipedia.org/wiki/Normal_\(geometry\)) after it has been computed by the vertex shader.

<<how to use>>

### Uniforms

**Uniforms** are set by the JavaScript code and are available to both the vertex and fragment shaders. They're used to provide values that will be the same for everything drawn in the frame, such as lighting positions and magnitudes, global transformation and perspective details, and so forth.

<<add details>>

## Buffers

<<add information>>

## Textures

<<add information>>

## Help improve MDN

Was this page helpful to you?

Yes No

[Learn how to contribute](/en-US/docs/MDN/Community/Getting_started)

This page was last modified on â¨Oct 7, 2025â© by [MDN contributors](/en-US/docs/Web/API/WebGL_API/Data/contributors.txt). 

[View this page on GitHub](https://github.com/mdn/content/blob/main/files/en-us/web/api/webgl_api/data/index.md?plain=1 "Folder: â¨en-us/web/api/webgl_api/dataâ© \(Opens in a new tab\)") â¢ [Report a problem with this content](https://github.com/mdn/content/issues/new?template=page-report.yml&mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWebGL_API%2FData&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EPage+report+details%3C%2Fsummary%3E%0A%0A*+Folder%3A+%60en-us%2Fweb%2Fapi%2Fwebgl_api%2Fdata%60%0A*+MDN+URL%3A+https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWebGL_API%2FData%0A*+GitHub+URL%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fblob%2Fmain%2Ffiles%2Fen-us%2Fweb%2Fapi%2Fwebgl_api%2Fdata%2Findex.md%0A*+Last+commit%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fcommit%2F3cbd2b2b2eb0be9425949c20ca5d398645f7c0e9%0A*+Document+last+modified%3A+2025-10-07T19%3A57%3A47.000Z%0A%0A%3C%2Fdetails%3E "This will take you to GitHub to file a new issue.")
