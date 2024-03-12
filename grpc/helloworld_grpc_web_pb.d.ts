import * as grpcWeb from 'grpc-web';

import * as grpc_helloworld_pb from '../grpc/helloworld_pb';


export class EchoServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  echo(
    request: grpc_helloworld_pb.EchoRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: grpc_helloworld_pb.EchoResponse) => void
  ): grpcWeb.ClientReadableStream<grpc_helloworld_pb.EchoResponse>;

}

export class EchoServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  echo(
    request: grpc_helloworld_pb.EchoRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<grpc_helloworld_pb.EchoResponse>;

}

