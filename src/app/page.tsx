"use client";

import * as grpcWeb from 'grpc-web';
import {useEffect, useState} from "react";
import {EchoServiceClient} from "../../grpc/helloworld_grpc_web_pb";
import {EchoRequest, EchoResponse} from "../../grpc/helloworld_pb";


export default function Home() {
  const [rpcClient, setRpcClient] = useState<EchoServiceClient>();
  const [rpcRequest, setRpcRequest] = useState<EchoRequest>();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GRPC_URL) {
      console.error("NEXT_PUBLIC_GRPC_URL is not defined");
      return;
    }
   const newRpcClient = new EchoServiceClient(process.env.NEXT_PUBLIC_GRPC_URL, null, null);
   setRpcClient(newRpcClient);

   const newRpcRequest = new EchoRequest();
    newRpcRequest.setMessage('asdfasdfasdf')

   setRpcRequest(newRpcRequest);
  }, []);

  const onButtonClick = async () => {
    if (!rpcClient || !rpcRequest) {
      return;
    }

    const call = rpcClient.echo(
        rpcRequest, {}
        ,
        (err: grpcWeb.RpcError, response: EchoResponse) => {
          if (err) {
            if (err.code !== grpcWeb.StatusCode.OK) {
              console.error(
                  'Error code: ' + err.code + ' "' + err.message + '"');
            }
          } else {
            console.error(
                'Error code');
          }

        });
    call.on('status', (status: grpcWeb.Status) => {
      if (status.metadata) {
        console.log('Received metadata');
        console.log(status.metadata);
      }
    });
  }



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello, World! This is gRPC Test Page.
      <button onClick={onButtonClick}>Send Request</button>
      <p>{message}</p>
    </main>
  )
}
