## Canonical extension names, vendor prefixes and preferences

Extensions may be supported by browser vendors before being officially ratified (but only when they are in draft stage). In that case, their name can be prefixed by the vendor prefix (`MOZ_`, `WEBKIT_`, etc.) or the extension is only available once a browser preference has been toggled.

If you wish to work with the bleeding edge of extensions, and want to keep working on upon ratification (assuming, of course, that the extension doesn't change in incompatible ways), that you query the canonical extension name as well as the vendor extension name. For instance:

js
    
    
    const ext =
      gl.getExtension("OES_vertex_array_object") ||
      gl.getExtension("MOZ_OES_vertex_array_object") ||
      gl.getExtension("WEBKIT_OES_vertex_array_object");
    

Note that, vendor prefix have been discouraged thus most browser implement experimental extensions behind a feature flag rather than vendor prefix.

The feature flags are:

  * `webgl.enable-draft-extensions` in Firefox
  * `chrome://flags/#enable-webgl-draft-extensions` in Chromium based browsers (Chrome, Opera).



## Naming conventions

WebGL extensions are prefixed with "ANGLE", "OES", "EXT" or "WEBGL". These prefixes reflect origin and intent:

  * `ANGLE_`: Extensions that are written by the [ANGLE library](https://en.wikipedia.org/wiki/ANGLE_%28software%29) authors.
  * `OES_` and `KHR_`: Extensions that mirror functionality from OpenGL ES (OES) or OpenGL API extensions approved by the respective architecture review boards (Khronos).
  * `OVR_`: Extensions that optimize for virtual reality.
  * `EXT_`: Extensions that mirror other OpenGL ES or OpenGL API extensions.
  * `WEBGL_`: Extensions that are WebGL-specific and intended to be compatible with multiple web browsers. It should also be used for extensions which originated with the OpenGL ES or OpenGL APIs, but whose behavior has been significantly altered.



## Querying available extensions

The WebGL context supports querying what extensions are available.

js
    
    
    const availableExtensions = gl.getSupportedExtensions();
    

The [`WebGLRenderingContext.getSupportedExtensions()`](/en-US/docs/Web/API/WebGLRenderingContext/getSupportedExtensions) method returns an array of strings, one for each supported extension.

## Extension list

The current extensions are:

  * [`ANGLE_instanced_arrays`](/en-US/docs/Web/API/ANGLE_instanced_arrays)
  * [`EXT_blend_minmax`](/en-US/docs/Web/API/EXT_blend_minmax)
  * [`EXT_color_buffer_float`](/en-US/docs/Web/API/EXT_color_buffer_float)
  * [`EXT_color_buffer_half_float`](/en-US/docs/Web/API/EXT_color_buffer_half_float)
  * [`EXT_disjoint_timer_query`](/en-US/docs/Web/API/EXT_disjoint_timer_query)
  * [`EXT_float_blend`](/en-US/docs/Web/API/EXT_float_blend)
  * [`EXT_frag_depth`](/en-US/docs/Web/API/EXT_frag_depth)
  * [`EXT_shader_texture_lod`](/en-US/docs/Web/API/EXT_shader_texture_lod)
  * [`EXT_sRGB`](/en-US/docs/Web/API/EXT_sRGB)
  * [`EXT_texture_compression_bptc`](/en-US/docs/Web/API/EXT_texture_compression_bptc)
  * [`EXT_texture_compression_rgtc`](/en-US/docs/Web/API/EXT_texture_compression_rgtc)
  * [`EXT_texture_filter_anisotropic`](/en-US/docs/Web/API/EXT_texture_filter_anisotropic)
  * [`EXT_texture_norm16`](/en-US/docs/Web/API/EXT_texture_norm16)
  * [`KHR_parallel_shader_compile`](/en-US/docs/Web/API/KHR_parallel_shader_compile)
  * [`OES_draw_buffers_indexed`](/en-US/docs/Web/API/OES_draw_buffers_indexed)
  * [`OES_element_index_uint`](/en-US/docs/Web/API/OES_element_index_uint)
  * [`OES_fbo_render_mipmap`](/en-US/docs/Web/API/OES_fbo_render_mipmap)
  * [`OES_standard_derivatives`](/en-US/docs/Web/API/OES_standard_derivatives)
  * [`OES_texture_float`](/en-US/docs/Web/API/OES_texture_float)
  * [`OES_texture_float_linear`](/en-US/docs/Web/API/OES_texture_float_linear)
  * [`OES_texture_half_float`](/en-US/docs/Web/API/OES_texture_half_float)
  * [`OES_texture_half_float_linear`](/en-US/docs/Web/API/OES_texture_half_float_linear)
  * [`OES_vertex_array_object`](/en-US/docs/Web/API/OES_vertex_array_object)
  * [`OVR_multiview2`](/en-US/docs/Web/API/OVR_multiview2)
  * [`WEBGL_color_buffer_float`](/en-US/docs/Web/API/WEBGL_color_buffer_float)
  * [`WEBGL_compressed_texture_astc`](/en-US/docs/Web/API/WEBGL_compressed_texture_astc)
  * [`WEBGL_compressed_texture_etc`](/en-US/docs/Web/API/WEBGL_compressed_texture_etc)
  * [`WEBGL_compressed_texture_etc1`](/en-US/docs/Web/API/WEBGL_compressed_texture_etc1)
  * [`WEBGL_compressed_texture_pvrtc`](/en-US/docs/Web/API/WEBGL_compressed_texture_pvrtc)
  * [`WEBGL_compressed_texture_s3tc`](/en-US/docs/Web/API/WEBGL_compressed_texture_s3tc)
  * [`WEBGL_compressed_texture_s3tc_srgb`](/en-US/docs/Web/API/WEBGL_compressed_texture_s3tc_srgb)
  * [`WEBGL_debug_renderer_info`](/en-US/docs/Web/API/WEBGL_debug_renderer_info)
  * [`WEBGL_debug_shaders`](/en-US/docs/Web/API/WEBGL_debug_shaders)
  * [`WEBGL_depth_texture`](/en-US/docs/Web/API/WEBGL_depth_texture)
  * [`WEBGL_draw_buffers`](/en-US/docs/Web/API/WEBGL_draw_buffers)
  * [`WEBGL_lose_context`](/en-US/docs/Web/API/WEBGL_lose_context)
  * [`WEBGL_multi_draw`](/en-US/docs/Web/API/WEBGL_multi_draw)



## Enabling an extension

Before an extension can be used it has to be enabled using [`WebGLRenderingContext.getExtension()`](/en-US/docs/Web/API/WebGLRenderingContext/getExtension). For example:

js
    
    
    const ext = gl.getExtension("OES_texture_float");
    

The return value is `null` if the extension is not supported, or an extension object otherwise.

## Extension objects

If an extension defines specific symbols or functions that are not available in the core specification of WebGL, they will be available on the extension object returned by the call to `gl.getExtension()`.

## See also

  * [`WebGLRenderingContext.getSupportedExtensions()`](/en-US/docs/Web/API/WebGLRenderingContext/getSupportedExtensions)
  * [`WebGLRenderingContext.getExtension()`](/en-US/docs/Web/API/WebGLRenderingContext/getExtension)
  * [webglreport.com](https://webglreport.com/)
  * [web3dsurvey.com - WebGL Extension Support Survey](https://web3dsurvey.com/)



## Help improve MDN

Was this page helpful to you?

Yes No

[Learn how to contribute](/en-US/docs/MDN/Community/Getting_started)

This page was last modified on â¨Nov 3, 2025â© by [MDN contributors](/en-US/docs/Web/API/WebGL_API/Using_Extensions/contributors.txt). 

[View this page on GitHub](https://github.com/mdn/content/blob/main/files/en-us/web/api/webgl_api/using_extensions/index.md?plain=1 "Folder: â¨en-us/web/api/webgl_api/using_extensionsâ© \(Opens in a new tab\)") â¢ [Report a problem with this content](https://github.com/mdn/content/issues/new?template=page-report.yml&mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWebGL_API%2FUsing_Extensions&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EPage+report+details%3C%2Fsummary%3E%0A%0A*+Folder%3A+%60en-us%2Fweb%2Fapi%2Fwebgl_api%2Fusing_extensions%60%0A*+MDN+URL%3A+https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWebGL_API%2FUsing_Extensions%0A*+GitHub+URL%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fblob%2Fmain%2Ffiles%2Fen-us%2Fweb%2Fapi%2Fwebgl_api%2Fusing_extensions%2Findex.md%0A*+Last+commit%3A+https%3A%2F%2Fgithub.com%2Fmdn%2Fcontent%2Fcommit%2Ff336c5b6795a562c64fe859aa9ee2becf223ad8a%0A*+Document+last+modified%3A+2025-11-03T18%3A29%3A25.000Z%0A%0A%3C%2Fdetails%3E "This will take you to GitHub to file a new issue.")
