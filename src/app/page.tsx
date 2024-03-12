"use client";

import * as grpcWeb from 'grpc-web';
import {useEffect, useState} from "react";
import {TruckerLocationGrpcServiceClient} from "../../grpc/helloworld_grpc_web_pb";
import {TruckerLocationReply, TruckerLocationRequest} from "../../grpc/helloworld_pb";
import * as grpc from "grpc";



export default function Home() {
  const [rpcClient, setRpcClient] = useState<TruckerLocationGrpcServiceClient>();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GRPC_URL) {
      console.error("NEXT_PUBLIC_GRPC_URL is not defined");
      return;
    }
   const newRpcClient = new TruckerLocationGrpcServiceClient(process.env.NEXT_PUBLIC_GRPC_URL, null, null);
   setRpcClient(newRpcClient);

  }, []);

  const onButtonClick = async () => {
    if (!rpcClient) {
      return;
    }
    const newRpcRequest = new TruckerLocationRequest();
    newRpcRequest.setOrderId(1);
    newRpcRequest.setManagerId(2);

    const call = rpcClient.getTruckerLocations(
        newRpcRequest, {} as grpcWeb.Metadata);
    call.on('status', (status: grpcWeb.Status) => {
      if (status.metadata) {
        console.log('Received metadata');
        console.log(status);

      }
    });
    call.on('data', (message: TruckerLocationReply) => {
        console.log('Received message');
        console.log(message.toObject());
        setMessage(JSON.stringify(message.toObject()));
    });
    call.on('end', function() {
      // The server has finished sending
        console.log('Received end');
    });
    call.on('error', function(e) {
      // An error has occurred and the stream has been closed.
        console.log(e);
    });
    console.log(call)
  }



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello, World! This is gRPC Test Page.
      <button onClick={onButtonClick}>Send Request</button>
      <p>{message}</p>
    </main>
  )
}
