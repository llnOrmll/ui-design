## Usage

Unless otherwise specified, this article applies to both WebGL 1 and 2 contexts.

If supported, textures can be stored in a compressed format in video memory. This allows for additional detail while limiting the added video memory necessary. Textures are uncompressed on the fly when being accessed by a shader. Note that this advantage doesn't translate to network bandwidth: while the formats are better than uncompressed data, they are in general far worse than standard image formats such as PNG and JPG.

As compressed textures require hardware support, therefore no specific formats are required by WebGL; instead, a context can make different formats available, depending on hardware support. The [WebGL Texture Tester](https://toji.github.io/texture-tester/) site shows which formats are supported in the used browser.

Usage of compressed formats first requires activating the respective extension with [`WebGLRenderingContext.getExtension()`](/en-US/docs/Web/API/WebGLRenderingContext/getExtension). If supported, it will return an extension object with constants for the added formats and the formats will also be returned by calls to `gl.getParameter(gl.COMPRESSED_TEXTURE_FORMATS)`. (E.g. `ext.COMPRESSED_RGBA_S3TC_DXT1_EXT` for the [`WEBGL_compressed_texture_s3tc`](/en-US/docs/Web/API/WEBGL_compressed_texture_s3tc) extension.) These can then be used with [`compressedTexImage[23]D`](/en-US/docs/Web/API/WebGLRenderingContext/compressedTexImage2D "compressedTexImage\[23\]D") or [`compressedTexSubImage[23]D`](/en-US/docs/Web/API/WebGLRenderingContext/compressedTexSubImage2D "compressedTexSubImage\[23\]D") instead of `texImage2D` calls.

Note that WebGL makes no functionality available to compress or decompress textures: they must already be in a compressed format and can then be directly uploaded to video memory.

All formats support 2D textures. Which formats support `TEXTURE_2D_ARRAY` and `TEXTURE_3D` targets (in combination with `compressedTexImage3D`) are noted in the following table.

Extension | Notes | TEXTURE_2D_ARRAY | TEXTURE_3D  
---|---|---|---  
WEBGL_compressed_texture_astc |  | Yes | Yes  
WEBGL_compressed_texture_etc |  | Yes | No  
WEBGL_compressed_texture_etc1* | Not usable with compressedTexSubImage2D/copyTexSubImage2D. | No | No  
WEBGL_compressed_texture_pvrtc | Width and height must be powers of 2. | No | No  
WEBGL_compressed_texture_s3tc | Width and height must be multiples of 4. | Yes | No  
WEBGL_compressed_texture_s3tc_srgb | Width and height must be multiples of 4. | ? | No  
  
## Examples

js
    
    
    async function getCompressedTextureIfAvailable(gl) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture); // create texture object on GPU
      const ext = gl.getExtension("WEBGL_compressed_texture_s3tc"); // will be null if not supported
      if (ext) {
        // the file is already in the correct compressed format
        const dataArrayBuffer = await fetch(
          "/textures/foobar512x512.RGBA_S3TC_DXT1",
        ).then((response) => response.arrayBuffer());
        gl.compressedTexImage2D(
          gl.TEXTURE_2D,
          0, // set the base image level
          ext.COMPRESSED_RGBA_S3TC_DXT1_EXT, // the compressed format we are using
          512,
          512, // width, height of the image
          0, // border, always 0
          new DataView(dataArrayBuffer),
        );
        gl.generateMipMap(gl.TEXTURE_2D); // create mipmap levels, like we would for a standard image
        return texture;
      }
    }
    

## Help improve MDN

Was this page helpful to you?

Yes No

[Learn how to contribute](/en-US/docs/MDN/Community/Getting_started)

This page was last modified on â¨May 14, 2025â© by [MDN contributors](/en-US/docs/Web/API/WebGL_API/Compressed_texture_formats/contributors.txt). 

[View this page on GitHub](https://github.com/mdn/content/blob/main/files/en-us/web/api/webgl_api/compressed_texture_formats/index.md?plain=1 "Folder: â¨en-us/web/api/webgl_api/compressed_texture_formatsâ© \(Opens in a new tab\)") â¢ [Report a problem with this content](https://github.com/mdn/content/issues/new?template=page-report.yml&mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWebGL_API%2FCompressed_texture_formats&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EPage+report+details%3C%2Fsummary%3E%0A%0A*+Folder%3A+%60en-us%2Fweb%2Fapi%2Fwebgl_api%2Fcompressed_texture_formats%60%0A*+MDN+URL%3A+https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWebGL_API%2FCompressed_texture_formats%0A*+GitHub+URL%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fblob%2Fmain%2Ffiles%2Fen-us%2Fweb%2Fapi%2Fwebgl_api%2Fcompressed_texture_formats%2Findex.md%0A*+Last+commit%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fcommit%2Fe488eba036b2fee56444fd579c3759ef45ff2ca8%0A*+Document+last+modified%3A+2025-05-14T04%3A00%3A04.000Z%0A%0A%3C%2Fdetails%3E "This will take you to GitHub to file a new issue.")
