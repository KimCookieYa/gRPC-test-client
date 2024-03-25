import * as grpcWeb from 'grpc-web';

import * as grpc_helloworld_pb from '../grpc/helloworld_pb'; // proto import: "grpc/helloworld.proto"

export class TruckerLocationServiceClient {
    constructor(
        hostname: string,
        credentials?: null | { [index: string]: string },
        options?: null | { [index: string]: any }
    );

    getTruckerLocations(
        request: grpc_helloworld_pb.TruckerLocationRequest,
        metadata?: grpcWeb.Metadata
    ): grpcWeb.ClientReadableStream<grpc_helloworld_pb.TruckerLocationReply>;

    getTruckerLocationsInArea(
        request: grpc_helloworld_pb.TruckerLocationInAreaRequest,
        metadata?: grpcWeb.Metadata
    ): grpcWeb.ClientReadableStream<grpc_helloworld_pb.TruckerLocationInAreaReply>;
}

export class TruckerLocationServicePromiseClient {
    constructor(
        hostname: string,
        credentials?: null | { [index: string]: string },
        options?: null | { [index: string]: any }
    );

    getTruckerLocations(
        request: grpc_helloworld_pb.TruckerLocationRequest,
        metadata?: grpcWeb.Metadata
    ): grpcWeb.ClientReadableStream<grpc_helloworld_pb.TruckerLocationReply>;

    getTruckerLocationsInArea(
        request: grpc_helloworld_pb.TruckerLocationInAreaRequest,
        metadata?: grpcWeb.Metadata
    ): grpcWeb.ClientReadableStream<grpc_helloworld_pb.TruckerLocationInAreaReply>;
}
