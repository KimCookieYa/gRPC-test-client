/**
 * @fileoverview gRPC-Web generated client stub for ai.sendy.grpc.truckerlocation
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v4.25.3
// source: grpc/helloworld.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.ai = {};
proto.ai.sendy = {};
proto.ai.sendy.grpc = {};
proto.ai.sendy.grpc.truckerlocation = require('./helloworld_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.ai.sendy.grpc.truckerlocation.TruckerLocationServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.ai.sendy.grpc.truckerlocation.TruckerLocationServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ai.sendy.grpc.truckerlocation.TruckerLocationRequest,
 *   !proto.ai.sendy.grpc.truckerlocation.TruckerLocationReply>}
 */
const methodDescriptor_TruckerLocationService_GetTruckerLocations = new grpc.web.MethodDescriptor(
  '/ai.sendy.grpc.truckerlocation.TruckerLocationService/GetTruckerLocations',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.ai.sendy.grpc.truckerlocation.TruckerLocationRequest,
  proto.ai.sendy.grpc.truckerlocation.TruckerLocationReply,
  /**
   * @param {!proto.ai.sendy.grpc.truckerlocation.TruckerLocationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ai.sendy.grpc.truckerlocation.TruckerLocationReply.deserializeBinary
);


/**
 * @param {!proto.ai.sendy.grpc.truckerlocation.TruckerLocationRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.ai.sendy.grpc.truckerlocation.TruckerLocationReply>}
 *     The XHR Node Readable Stream
 */
proto.ai.sendy.grpc.truckerlocation.TruckerLocationServiceClient.prototype.getTruckerLocations =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/ai.sendy.grpc.truckerlocation.TruckerLocationService/GetTruckerLocations',
      request,
      metadata || {},
      methodDescriptor_TruckerLocationService_GetTruckerLocations);
};


/**
 * @param {!proto.ai.sendy.grpc.truckerlocation.TruckerLocationRequest} request The request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.ai.sendy.grpc.truckerlocation.TruckerLocationReply>}
 *     The XHR Node Readable Stream
 */
proto.ai.sendy.grpc.truckerlocation.TruckerLocationServicePromiseClient.prototype.getTruckerLocations =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/ai.sendy.grpc.truckerlocation.TruckerLocationService/GetTruckerLocations',
      request,
      metadata || {},
      methodDescriptor_TruckerLocationService_GetTruckerLocations);
};


module.exports = proto.ai.sendy.grpc.truckerlocation;

