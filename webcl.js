var cl = module.exports = require('./build/Release/webcl.node');
var WebGL=require('webgl');

cl.size = {};
cl.size.CHAR=cl.size_CHAR;
cl.size.SHORT=cl.size_SHORT;
cl.size.INT=cl.size_INT;
cl.size.LONG=cl.size_LONG;
cl.size.FLOAT=cl.size_FLOAT;
cl.size.DOUBLE=cl.size_DOUBLE;
cl.size.HALF=cl.size_HALF;

cl.type = {};
cl.type.UNKNOWN = 0;
cl.type.LOCAL = 1<<0;
cl.type.POINTER = 1<<1;
cl.type.UNSIGNED = 1<<2;
cl.type.MEM=1<<3;
cl.type.SAMPLER=1<<30;
cl.type.COMPLEX = 1<<4;
cl.type.IMAGINARY = 1<<5;
cl.type.BOOL=1<<8;
cl.type.CHAR=1<<9;
cl.type.SHORT=1<<10;
cl.type.INT=1<<11;
cl.type.LONG=1<<12;
cl.type.FLOAT=1<<13;
cl.type.HALF_FLOAT=1<<14;
cl.type.DOUBLE=1<<15;
cl.type.QUAD=1<<16;
cl.type.LONG_LONG=1<<17;
cl.type.V2=1<<20;
cl.type.V3=1<<21;
cl.type.V4=1<<22;
cl.type.V8=1<<23;
cl.type.V16=1<<24;
cl.type.M2xN=1<<25;
cl.type.M3xN=1<<26;
cl.type.M4xN=1<<27;
cl.type.M8xN=1<<28;
cl.type.M16xN=1<<29;

//////////////////////////////
// WebCL object
//////////////////////////////
var _getPlatforms = cl.getPlatforms;
cl.getPlatforms = function () {
  if (!(arguments.length === 0)) {
    throw new TypeError('Expected getPlatforms()');
  }
  return _getPlatforms();
}

var _createContext = cl.createContext;
cl.createContext = function (devices,properties) {
  if (!(arguments.length >=1 && 
      (typeof devices === 'object' || typeof devices === 'number') && 
      (properties===null || typeof properties === 'undefined' || typeof properties === 'number' || typeof properties === 'object'))) {
    throw new TypeError('Expected createContext(WebCLDevice[] devices, optional CLenum[] properties) or createContext(CLenum deviceType, optional CLenum[] properties)');
  }
  return _createContext(devices,properties);
}

var _waitForEvents = cl.waitForEvents;
cl.waitForEvents = function (events) {
  if (!(arguments.length === 1 && typeof events === 'object' )) {
    throw new TypeError('Expected waitForEvents(WebCLEvent[] events)');
  }
  return _waitForEvents(events);
}

var _unloadCompiler = cl.unloadCompiler;
cl.unloadCompiler = function () {
  if (!(arguments.length === 0 )) {
    throw new TypeError('Expected unloadCompiler()');
  }
  return _unloadCompiler();
}

//Creates a WebCL context that can share resources with the given WebGL context.
//WebCLContext createContextFromGL(WebGLRenderingContext gl, optional WebCLPlatform platform, optional CLenum deviceType);

//////////////////////////////
//WebCLCommandQueue object
//////////////////////////////
cl.CommandQueue.prototype.getCommandQueueInfo=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLCommandQueue.getCommandQueueInfo(CLenum param_name)');
  }
  return this._getCommandQueueInfo(param_name);
}

// TODO what do we do with event_list in those methods?
cl.CommandQueue.prototype.enqueueNDRangeKernel=function (kernel, offsets, globals, locals, event_list, generate_event) {
  if (!(arguments.length>= 4 && typeof kernel === 'object' &&
      typeof offsets === 'object' && typeof globals === 'object' && typeof locals === 'object' &&
      (typeof event_list === 'undefined' || typeof event_list === 'object') &&
      (typeof generate_event === 'undefined' || typeof generate_event === 'boolean')
      )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueNDRangeKernel(WebCLKernel kernel, int[3] offsets, int[3] globals, int[3] locals, WebCLEvent[] event_list, boolean generate_event)');
  }
  return this._enqueueNDRangeKernel(kernel, offsets, globals, locals, event_list, generate_event);
}

cl.CommandQueue.prototype.enqueueTask=function (kernel, event_list, generate_event) {
  if (!(arguments.length >= 1 && typeof kernel === 'cl.Kernel'
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof generate_event === 'undefined' || typeof generate_event === 'boolean')
    )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueTask(WebCLKernel kernel, WebCLEvent[] event_list, boolean generate_event)');
  }
  return this._enqueueTask(kernel, event_list, generate_event);
}

cl.CommandQueue.prototype.enqueueWriteBuffer=function (memory_object, blocking_write, region, event_list, generate_event) {
  if (!(arguments.length >= 3 && 
    typeof memory_object === 'object' &&
    (typeof blocking_write === 'boolean' || typeof blocking_write === 'number') &&
    typeof region === 'object' &&
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof generate_event === 'undefined' || typeof generate_event === 'boolean')
    )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueWriteBuffer(WebCLMemoryObject memory_object, boolean blocking_write, WebCLRegion region, WebCLEvent[] event_list, boolean generate_event)');
  }
  return this._enqueueWriteBuffer(memory_object, blocking_write, region, event_list, generate_event);
}

cl.CommandQueue.prototype.enqueueReadBuffer=function (memory_object, blocking_read, region, event_list, generate_event) {
  if (!(arguments.length >= 3 && 
      typeof memory_object === 'object' &&
      (typeof blocking_read === 'boolean' || typeof blocking_read === 'number') &&
      typeof region === 'object' &&
      (typeof event_list === 'undefined' || typeof event_list === 'object') &&
      (typeof generate_event === 'undefined' || typeof generate_event === 'boolean') )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueReadBuffer(WebCLMemoryObject memory_object, boolean blocking_read, WebCLRegion region, WebCLEvent[] event_list, boolean generate_event)');
  }
  return this._enqueueReadBuffer(memory_object, blocking_read, region, event_list, generate_event);
}

cl.CommandQueue.prototype.enqueueCopyBuffer=function (memory_object_src, memory_object_dst, src_offset, dst_offset, size, event_list, generate_event) {
  if (!(arguments.length >= 5 && 
      typeof memory_object_src === 'object' &&
      typeof memory_object_dst === 'object' &&
      typeof src_offset === 'number' &&
      typeof src_offset === 'number' &&
      (typeof event_list === 'undefined' || typeof event_list === 'object') &&
      (typeof generate_event === 'undefined' || typeof generate_event === 'boolean'))) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueCopyBuffer(WebCLMemoryObject memory_object_src, WebCLMemoryObject memory_object_dst, int src_offset, int dst_offset, int size, WebCLEvent[] event_list, boolean generate_event)');
  }
  return this._enqueueCopyBuffer(memory_object_src, memory_object_dst, src_offset, dst_offset, size, event_list, generate_event);
}

cl.CommandQueue.prototype.enqueueWriteBufferRect=function (memory_object, blocking_write, 
    bufferOrigin, hostOrigin, regionArray, buffer_row_pitch, buffer_slice_pitch, 
    host_row_pitch, host_slice_pitch, host_ptr,
    event_list, generate_event) {
  if (!(arguments.length >= 10 && 
    typeof memory_object === 'object' &&
    (typeof blocking_write === 'boolean' || typeof blocking_write === 'number') &&
    typeof bufferOrigin === 'object' && typeof hostOrigin === 'object' &&
    typeof regionArray === 'object' &&
    typeof buffer_row_pitch === 'number' &&
    typeof buffer_slice_pitch === 'number' &&
    typeof host_row_pitch === 'number' &&
    typeof buffer_row_pitch === 'number' &&
    typeof host_slice_pitch === 'number' &&
    typeof host_ptr === 'ArrayBuffer' &&
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof generate_event === 'undefined' || typeof generate_event === 'boolean'))) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueWriteBufferRect(WebCLMemoryObject memory_object, boolean blocking_write, WebCLRegion region, WebCLEvent[] event_list, boolean generate_event)');
  }
  return this._enqueueWriteBufferRect(memory_object, blocking_write, 
      bufferOrigin, hostOrigin, regionArray, buffer_row_pitch, buffer_slice_pitch, 
      host_row_pitch, host_slice_pitch, host_ptr,
      event_list, generate_event);
}

cl.CommandQueue.prototype.enqueueReadBufferRect=function (memory_object, blocking_read, 
    bufferOrigin, hostOrigin, regionArray, buffer_row_pitch, buffer_slice_pitch, 
    host_row_pitch, host_slice_pitch, host_ptr,
    event_list, generate_event) {
  if (!(arguments.length >= 10 && 
    typeof memory_object === 'object' &&
    (typeof blocking_read === 'boolean' || typeof blocking_read === 'number') &&
    typeof bufferOrigin === 'object' && typeof hostOrigin === 'object' &&
    typeof regionArray === 'object' &&
    typeof buffer_row_pitch === 'number' &&
    typeof buffer_slice_pitch === 'number' &&
    typeof host_row_pitch === 'number' &&
    typeof host_slice_pitch === 'number' &&
    typeof host_ptr === 'ArrayBuffer' &&
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof generate_event === 'undefined' || typeof generate_event === 'boolean'))) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueReadBufferRect(WebCLMemoryObject memory_object, boolean blocking_read, WebCLRegion region, WebCLEvent[] event_list, boolean generate_event)');
  }
  return this._enqueueReadBufferRect(memory_object, blocking_read, 
      bufferOrigin, hostOrigin, regionArray, buffer_row_pitch, buffer_slice_pitch, 
      host_row_pitch, host_slice_pitch, host_ptr,
      event_list, generate_event);
}

cl.CommandQueue.prototype.enqueueCopyBufferRect=function (memory_object_src, memory_object_dst, 
    blocking_read, 
    srcOrigin, dstOrigin, region, 
    src_row_pitch, src_slice_pitch, 
    dst_row_pitch, dst_slice_pitch,
    event_list, generate_event) {
  if (!(arguments.length >= 10 && 
    typeof memory_object_src === 'object' &&
    typeof memory_object_dst === 'object' &&
    typeof srcOrigin === 'object' && typeof dstOrigin === 'object' &&
    typeof region === 'object' &&
    typeof src_row_pitch === 'number' &&
    typeof src_slice_pitch === 'number' &&
    typeof dst_row_pitch === 'number' &&
    typeof dst_slice_pitch === 'number' &&
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof generate_event === 'undefined' || typeof generate_event === 'boolean'))) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueCopyBufferRect(WebCLMemoryObject memory_object, boolean blocking_write, WebCLRegion region, WebCLEvent[] event_list, boolean generate_event)');
  }
  return this._enqueueCopyBufferRect(memory_object_src, memory_object_dst, 
      blocking_read, 
      srcOrigin, dstOrigin, region, 
      src_row_pitch, src_slice_pitch, 
      dst_row_pitch, dst_slice_pitch,
      event_list, generate_event);
}

cl.CommandQueue.prototype.enqueueWriteImage=function (memory_object, 
    blocking_write, 
    srcOrigin, region, 
    row_pitch, slice_pitch, 
    host_ptr,
    event_list, generate_event) {
  if (!(arguments.length >= 7 && 
    typeof memory_object === 'object' &&
    typeof srcOrigin === 'object' &&
    typeof region === 'object' &&
    typeof row_pitch === 'number' &&
    typeof slice_pitch === 'number' &&
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof generate_event === 'undefined' || typeof generate_event === 'boolean'))) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueWriteImage(WebCLMemoryObject memory_object, boolean blocking_write, int[3] origin, int[3] region, int row_pitch, int slice_pitch, WebCLEvent[] event_list, boolean generate_event)');
  }
  return this._enqueueWriteImage(memory_object, 
      blocking_write, 
      srcOrigin, region, 
      row_pitch, slice_pitch, 
      host_ptr,
      event_list, generate_event);
}

cl.CommandQueue.prototype.enqueueReadImage=function (memory_object, 
    blocking_read, 
    srcOrigin, regionArray, 
    row_pitch, slice_pitch, 
    host_ptr,
    event_list, generate_event) {
  if (!(arguments.length >= 7 && 
    typeof memory_object === 'object' &&
    typeof srcOrigin === 'object' && 
    typeof regionArray === 'object' &&
    typeof row_pitch === 'number' &&
    typeof slice_pitch === 'number' &&
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof generate_event === 'undefined' || typeof generate_event === 'boolean'))) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueReadImage(WebCLMemoryObject memory_object, boolean blocking_write, WebCLRegion region, WebCLEvent[] event_list, boolean generate_event)');
  }
  return this._enqueueReadImage(memory_object, 
      blocking_read, 
      srcOrigin, regionArray, 
      row_pitch, slice_pitch, 
      host_ptr,
      event_list, generate_event);
}

cl.CommandQueue.prototype.enqueueCopyImage=function (memory_object_src, memory_object_dst, 
    srcOrigin, dstOrigin, regionArray, 
    event_list, generate_event) {
  if (!(arguments.length >= 5 && 
    typeof memory_object_src === 'object' &&
    typeof memory_object_dst === 'object' &&
    typeof srcOrigin === 'object' && 
    typeof dstOrigin === 'object' && 
    typeof regionArray === 'object' &&
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof generate_event === 'undefined' || typeof generate_event === 'boolean'))) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueCopyImage(WebCLMemoryObject memory_object_src, WebCLMemoryObject memory_object_dst, boolean blocking_write, WebCLRegion region, WebCLEvent[] event_list, boolean generate_event)');
  }
  return this._enqueueCopyImage(memory_object_src, memory_object_dst, 
      srcOrigin, dstOrigin, regionArray, 
      event_list, generate_event);
}

cl.CommandQueue.prototype.enqueueCopyImageToBuffer=function (memory_object_src, memory_object_dst, 
    srcOrigin, regionArray, dst_offset,
    event_list, generate_event) {
  if (!(arguments.length >= 5 && 
    typeof memory_object_src === 'object' &&
    typeof memory_object_dst === 'object' &&
    typeof srcOrigin === 'object' && 
    typeof regionArray === 'object' && 
    typeof dst_offset === 'number' &&
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof generate_event === 'undefined' || typeof generate_event === 'boolean'))) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueCopyImageToBuffer(WebCLMemoryObject memory_object_src, WebCLMemoryObject memory_object_dst, uint[3] srcOrigin, uint[3] region, uint dst_offset, WebCLEvent[] event_list, boolean generate_event)');
  }
  return this.enqueueCopyImageToBuffer(memory_object_src, memory_object_dst, 
      srcOrigin, regionArray, dst_offset,
      event_list, generate_event);
}

cl.CommandQueue.prototype.enqueueCopyBufferToImage=function (memory_object_src, memory_object_dst, 
    srcoffset, dstOrigin, regionArray,
    event_list, generate_event) {
  if (!(arguments.length >= 5 && 
    typeof memory_object_src === 'object' &&
    typeof memory_object_dst === 'object' &&
    typeof srcOffset === 'number' && 
    typeof dstOrigin === 'object' && 
    typeof regionArray === 'object' && 
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof generate_event === 'undefined' || typeof generate_event === 'boolean'))) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueCopyBufferToImage(WebCLMemoryObject memory_object_src, WebCLMemoryObject memory_object_dst, uint srcOffset, uint[3] dstOrigin, uint[4] region, WebCLEvent[] event_list, boolean generate_event)');
  }
  return this.enqueueCopyBufferToImage(memory_object_src, memory_object_dst, srcOffset, dstOrigin, regionArray, event_list, generate_event);
}

cl.CommandQueue.prototype.enqueueMapBuffer=function (memory_object, 
    blocking, flags, offset, size,
    event_list, generate_event) {
  if (!(arguments.length >= 5 && 
    typeof memory_object === 'object' &&
    (typeof blocking === 'boolean' || typeof blocking === 'number') &&
    typeof flags === 'number' && 
    typeof offset === 'number' && 
    typeof size === 'number' && 
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof generate_event === 'undefined' || typeof generate_event === 'boolean'))) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueMapBuffer(WebCLMemoryObject memory_object, boolean blocking, CLenum flags, uint offset, uint size, WebCLEvent[] event_list, boolean generate_event)');
  }
  return this._enqueueMapBuffer(memory_object, blocking, flags, offset, size, event_list, generate_event);
}

cl.CommandQueue.prototype.enqueueMapImage=function (memory_object, 
    blocking, flags, origin, region,
    event_list, generate_event) {
  if (!(arguments.length >= 5 && 
    typeof memory_object === 'object' &&
    (typeof blocking === 'boolean' || typeof blocking === 'number') &&
    typeof flags === 'number' && 
    typeof origin === 'number' && 
    typeof region === 'object' && 
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof generate_event === 'undefined' || typeof generate_event === 'boolean'))) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueMapImage(WebCLMemoryObject memory_object, boolean blocking, CLenum flags, uint origin, WebCLRegion region, WebCLEvent[] event_list, boolean generate_event)');
  }
  return this._enqueueMapImage(memory_object, blocking, flags, origin, region, event_list, generate_event);
}

cl.CommandQueue.prototype.enqueueUnmapMemObject=function (memory_object, 
    region,
    event_list, generate_event) {
  if (!(arguments.length >= 2 && 
    typeof memory_object === 'object' &&
    typeof region === 'object' && 
    (typeof event_list === 'undefined' || typeof event_list === 'object') &&
    (typeof generate_event === 'undefined' || typeof generate_event === 'boolean'))) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueUnmapMemObject(WebCLMemoryObject memory_object, WebCLMappedRegion region, WebCLEvent[] event_list, boolean generate_event)');
  }
  return this._enqueueUnmapMemObject(memory_object, region, event_list, generate_event);
}

cl.CommandQueue.prototype.enqueueMarker=function () {
  if (!(arguments.length === 0)) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueMarker()');
  }
  return this._enqueueMarker();
}

cl.CommandQueue.prototype.enqueueWaitForEvents=function (event_wait_list) {
  if (!(arguments.length >=0 &&       (typeof event_list === 'undefined' || typeof event_list === 'object') )) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueWaitForEvents(WebCLEvent[] event_wait_list)');
  }
  return this._enqueueWaitForEvents(event_wait_list);
}

cl.CommandQueue.prototype.enqueueBarrier=function () {
  if (!(arguments.length === 0)) {
    throw new TypeError('Expected WebCLCommandQueue.enqueueBarrier()');
  }
  return this._enqueueBarrier();
}

cl.CommandQueue.prototype.flush=function () {
  if (!(arguments.length === 0)) {
    throw new TypeError('Expected WebCLCommandQueue.flush()');
  }
  return this._flush();
}

cl.CommandQueue.prototype.finish=function () {
  if (!(arguments.length === 0)) {
    throw new TypeError('Expected WebCLCommandQueue.finish()');
  }
  return this._finish();
}

//////////////////////////////
//WebCLContext object
//////////////////////////////
cl.Context.prototype.getContextInfo=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLContext.getContextInfo(CLenum param_name)');
  }
  return this._getContextInfo(param_name);
}

cl.Context.prototype.createProgram=function (sources) {
  if (!(arguments.length === 1 && typeof sources === 'string')) {
    throw new TypeError('Expected WebCLContext.createProgram(string sources)');
  }
  return this._createProgram(sources);
}

// TODO
cl.Context.prototype.createProgramWithBinaries=function (devices, binaries) {
  if (!(arguments.length === 2 && typeof devices === 'object' && typeof binaries === 'object')) {
    throw new TypeError('Expected WebCLContext.createProgramWithBinaries(WebCLDevice[] devices, Object[] binaries)');
  }
  return this._createProgramWithBinaries(devices, binaries);
}

cl.Context.prototype.createCommandQueue=function (device, properties) {
  if (!(arguments.length === 2 && typeof device === 'object' && typeof properties === 'number')) {
    throw new TypeError('Expected WebCLContext.createCommandQueue(WebCLDevice device, CLenum properties)');
  }
  return this._createCommandQueue(device, properties);
}

cl.Context.prototype.createBuffer=function (flags, size, host_ptr) {
  if (!(arguments.length >= 2 && typeof flags === 'number' && typeof size === 'number' && 
      (typeof host_ptr === 'undefined' || typeof host_ptr === 'object') )) {
    throw new TypeError('Expected WebCLContext.createBuffer(CLenum flags, int size, optional ArrayBuffer host_ptr)');
  }
  return this._createBuffer(flags, size, host_ptr);
}

cl.Context.prototype.createBufferGL=function (flags, glbuffer) {
  if (!(arguments.length === 2 && typeof flags === 'number' && typeof glbuffer === 'WebGLBuffer')) {
    throw new TypeError('Expected WebCLContext.createBufferGL(CLenum flags, WebGLBuffer glbuffer)');
  }
  return this._createBufferGL(flags, glbuffer);
}

cl.Context.prototype.createImage2D=function (flags, image_format, width, height, row_pitch, host_ptr) {
  if (!(arguments.length >= 5 && typeof flags === 'number' && typeof image_format === 'object' && 
      typeof width === 'number' && typeof height === 'number' && typeof row_pitch === 'number' && 
      (typeof host_ptr === 'undefined' || typeof host_ptr === 'object'))) {
    throw new TypeError('Expected WebCLContext.createImage2D(CLenum flags, cl.ImageFormat format, int width, int height, int row_pitch, optional ArrayBuffer host_ptr)');
  }
  return this._createImage2D(flags, image_format, width, height, row_pitch, host_ptr);
}

cl.Context.prototype.createImage3D=function (flags, image_format, width, height, row_pitch, host_ptr) {
  if (!(arguments.length === 8 && typeof flags === 'number' && typeof image_format === 'number' && 
      typeof width === 'number' && typeof height === 'number' && typeof depth === 'number' && 
      typeof row_pitch === 'number' && typeof slice_pitch === 'number' && typeof host_ptr === 'ArrayBuffer')) {
    throw new TypeError('Expected WebCLContext.createImage3D(CLenum flags, cl.ImageFormat format, int width, int height, int depth, int row_pitch, int slice_pitch, ArrayBuffer host_ptr)');
  }
  return this._createImage3D(flags, image_format, width, height, depth, row_pitch, slice_pitch, host_ptr);
}

cl.Context.prototype.createSampler=function (normalized_coords, addressing_mode, filter_mode) {
  if (!(arguments.length === 3 && 
      (typeof normalized_coords === 'number' || typeof normalized_coords === 'boolean') && 
      typeof addressing_mode === 'number' && 
      typeof filter_mode === 'number')) {
    throw new TypeError('Expected WebCLContext.createSampler(bool normalized_coords, CLenum addressing_mode, CLenum filter_mode)');
  }
  return this._createSampler(normalized_coords, addressing_mode, filter_mode);
}

cl.Context.prototype.createUserEvent=function () {
  if (!(arguments.length === 0)) {
    throw new TypeError('Expected WebCLContext.createUserEvent()');
  }
  return this._createUserEvent();
}

cl.Context.prototype.getSupportedImageFormats=function (flags, image_type) {
  if (!(arguments.length === 2 && typeof flags === 'number' && typeof image_type === 'number')) {
    throw new TypeError('Expected WebCLContext.getSupportedImageFormats(CLenum flags, CLenum image_type)');
  }
  return this._getSupportedImageFormats(flags, image_type);
}

//////////////////////////////
//WebCLDevice object
//////////////////////////////
cl.Device.prototype.getDeviceInfo=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLDevice.getDeviceInfo(CLenum param_name)');
  }
  return this._getDeviceInfo(param_name);
}

cl.Device.prototype.getExtension=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLDevice.getExtension(CLenum param_name)');
  }
  return this._getExtension(param_name);
}

//////////////////////////////
//WebCLEvent object
//////////////////////////////
cl.Event.prototype.getEventInfo=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLEvent.getEventInfo(CLenum param_name)');
  }
  return this._getEventInfo(param_name);
}

cl.Event.prototype.getProfilingInfo=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLEvent.getProfilingInfo(CLenum param_name)');
  }
  return this._getProfilingInfo(param_name);
}

cl.Event.prototype.setUserEventStatus=function (execution_status) {
  if (!(arguments.length === 1 && typeof execution_status === 'number')) {
    throw new TypeError('Expected WebCLEvent.setUserEventStatus(CLenum execution_status)');
  }
  return this._setUserEventStatus(execution_status);
}

//////////////////////////////
//WebCLKernel object
//////////////////////////////
cl.Kernel.prototype.getKernelInfo=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLKernel.getKernelInfo(CLenum param_name)');
  }
  return this._getKernelInfo(param_name);
}

cl.Kernel.prototype.getWorkGroupInfo=function (device, param_name) {
  if (!(arguments.length === 2 && typeof device === 'object' && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLKernel.getWorkGroupInfo(WebCLDevice device, CLenum param_name)');
  }
  return this._getWorkGroupInfo(device, param_name);
}

cl.Kernel.prototype.setArg=function (index, value, type) {
  if (!(arguments.length >= 2 && typeof index === 'number' && 
      (typeof type == 'undefined' || typeof type === 'number') )) {
    throw new TypeError('Expected WebCLKernel.setArg(int index, any value, optional WebCL.types type)');
  }
  return this._setArg(index, value, type);
}

//////////////////////////////
//WebCLMappedRegion object
//////////////////////////////

//static JS_METHOD(getBuffer);

//////////////////////////////
//WebCLMemoryObject object
//////////////////////////////

cl.MemoryObject.prototype.getMemoryObjectInfo=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLMemoryObject.getMemoryObjectInfo(CLenum param_name)');
  }
  return this._getMemoryObjectInfo(param_name);
}

cl.MemoryObject.prototype.getImageInfo=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLMemoryObject.getImageInfo(CLenum param_name)');
  }
  return this._getImageInfo(param_name);
}

cl.MemoryObject.prototype.createSubBuffer=function (flags, type, region) {
  if (!(arguments.length === 3 && typeof flags === 'number' && typeof type === 'number' && typeof region === 'object')) {
    throw new TypeError('Expected WebCLMemoryObject.createSubBuffer(CLenum flags, CLenum type, WebCLRegion region)');
  }
  return this._createSubBuffer(flags, type, region);
}

//////////////////////////////
//WebCLPlatform object
//////////////////////////////
cl.Platform.prototype.getPlatformInfo=function (param_name) {
if (!(arguments.length === 1 && typeof param_name === 'number')) {
  throw new TypeError('Expected WebCLPlatform.getPlatformInfo(CLenum param_name)');
}
return this._getPlatformInfo(param_name);
}

cl.Platform.prototype.getDevices=function (device_type) {
  if (!(arguments.length === 1 && typeof device_type === 'number')) {
    throw new TypeError('Expected WebCLPlatform.getDevices(CLenum device_type)');
  }
  return this._getDevices(device_type);
}

//////////////////////////////
//WebCLProgram object
//////////////////////////////
cl.Program.prototype.getProgramInfo=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLProgram.getProgramInfo(CLenum param_name)');
  }
  return this._getProgramInfo(param_name);
}

cl.Program.prototype.getBuildInfo=function (device, param_name) {
  if (!(arguments.length === 2 && typeof device === 'object' && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLProgram.getBuildInfo(WebCLDevice device, CLenum param_name)');
  }
  return this._getBuildInfo(device, param_name);
}

// TODO add callback
cl.Program.prototype.build=function (devices, options) {
  if (  !(arguments.length === 1 && typeof devices === 'object') &&
        !(arguments.length === 2 && typeof devices === 'object' && typeof options === 'string')) {
    throw new TypeError('Expected WebCLProgram.build(WebCLDevice[] devices, String options)');
  }
  return this._build(devices, options);
}

cl.Program.prototype.createKernel=function (name) {
  if (!(arguments.length === 1 && typeof name === 'string')) {
    throw new TypeError('Expected WebCLProgram.createKernel(String name)');
  }
  return this._createKernel(name);
}

//////////////////////////////
//WebCLSampler object
//////////////////////////////
cl.Sampler.prototype.getSamplerInfo=function (param_name) {
  if (!(arguments.length === 1 && typeof param_name === 'number')) {
    throw new TypeError('Expected WebCLSampler.getSamplerInfo(CLenum param_name)');
  }
  return this._getSamplerInfo(param_name);
}

//////////////////////////////
// OpenGL object
//////////////////////////////
cl.EXTGL.prototype.createFromGLBuffer=function (context, flags, buffer) {
  console.log("buffer instanceof "+require('util').inspect(buffer));
  if (!(arguments.length === 3 && typeof context === 'object' && typeof flags === 'number'
    && typeof buffer ==='object')) {
    throw new TypeError('Expected WebCLGL.createFromGLBuffer(WebCLContext context, CLenum flags, WebGLBuffer buffer)');
  }
  return this._createFromGLBuffer(context, flags, buffer ? buffer._ : 0);
}

cl.EXTGL.prototype.enqueueAcquireGLObjects=function (queue, mem_objects, events, event, generate_event) {
  if (!(arguments.length >= 2 && typeof queue === 'object' && 
      typeof mem_objects === 'object' && 
      (typeof events==='undefined' || typeof events === 'object') &&
      (typeof generate_event === 'undefined' || typeof generate_event === 'boolean')) ) {
    throw new TypeError('Expected WebCLGL.enqueueAcquireGLObjects(WebCLCommandQueue cq, WebCLMemoryObject[] mem_objects, WebCLEvent[] events, WebCLEvent event, boolean generate_event)');
  }
  return this._enqueueAcquireGLObjects(queue, mem_objects, events, generate_event);
}

cl.EXTGL.prototype.enqueueReleaseGLObjects=function (queue, mem_objects, events, generate_event) {
  if (!(arguments.length >= 2 && typeof queue === 'object' && 
      typeof mem_objects === 'object' && 
      (typeof events==='undefined' || typeof events === 'object') &&
      (typeof generate_event === 'undefined' || typeof generate_event === 'boolean')) ) {
    throw new TypeError('Expected WebCLGL.enqueueReleaseGLObjects(WebCLCommandQueue cq, WebCLMemoryObject[] mem_objects, WebCLEvent[] events, WebCLEvent event, boolean generate_event)');
  }
  return this._enqueueReleaseGLObjects(queue, mem_objects, events, generate_event);
}