"use client";

import {useEffect, useState} from "react";
import {TruckerLocationGrpcServiceClient} from "../../grpc/HelloworldServiceClientPb";
import {TruckerLocationRequest} from "../../grpc/helloworld_pb";

export default function Home() {
  const [rpcClient, setRpcClient] = useState<TruckerLocationGrpcServiceClient>();
  const [rpcRequest, setRpcRequest] = useState<TruckerLocationRequest>();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
   const newRpcClient = new TruckerLocationGrpcServiceClient("http://localhost:8080", null, null);
   setRpcClient(newRpcClient);

   const newRpcRequest = new TruckerLocationRequest();
    const temp = newRpcRequest.getOrderId();
    console.log(temp)
   setRpcRequest(newRpcRequest);
  }, []);

  const onButtonClick = async () => {
    if (!rpcClient || !rpcRequest) {
      return;
    }

    const response = await rpcClient.getTruckerLocations(rpcRequest);
    console.log(response);
  }



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello, World! This is gRPC Test Page.
      <button onClick={onButtonClick}>Send Request</button>
      <p>{message}</p>
    </main>
  )
}
