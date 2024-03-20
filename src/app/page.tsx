"use client";

import * as grpcWeb from 'grpc-web';
import {useEffect, useState} from "react";
import {TruckerLocationServiceClient} from "../../grpc/helloworld_grpc_web_pb";
import {TruckerLocationReply, TruckerLocationRequest} from "../../grpc/helloworld_pb";
import axios from "axios";

export default function Home() {
  const [rpcClient, setRpcClient] = useState<TruckerLocationServiceClient>();
  const [message, setMessage] = useState<string>();
  const [orderId, setOrderId] = useState<number>(Number(process.env.NEXT_PUBLIC_ORDER_ID )|| 1)
    const [jwtToken, setJwtToken] = useState<string>();

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GRPC_URL) {
      console.error("NEXT_PUBLIC_GRPC_URL is not defined");
      return;
    }
   const newRpcClient = new TruckerLocationServiceClient(process.env.NEXT_PUBLIC_GRPC_URL, null, null);
   setRpcClient(newRpcClient);
  }, []);

  const onButtonClick = async () => {
    if (!rpcClient) {
      return;
    }

    try {
        const res = await axios.get('https://spring2024be.sendy.ngrok.io/generate/token', {
            params: {
                orderId: orderId
            }
        })
        if (res?.data) {
            console.log(res)
            setJwtToken(res.data);
        } else {
            throw new Error('Failed to get JWT token');
        }
    } catch (e) {
        console.error(e);
        return;
    }

    const newRpcRequest = new TruckerLocationRequest();
    newRpcRequest.setOrderId(orderId);
    newRpcRequest.setManagerId(2);

    const call = rpcClient.getTruckerLocations(
        newRpcRequest, {
            'Authorization': jwtToken
        } as grpcWeb.Metadata
    );
    call.on('status', (status: grpcWeb.Status) => {
      if (status.metadata) {
        console.log('Received metadata');
        console.log(status);
      }
      console.log(`Received status: ${status.code} - ${status.details}`);
      console.log(status)
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
        console.error(e);
    });

  }

  return (
    <main className="flex flex-col min-h-screen flex-col items-center justify-between p-24">
      Hello, World! This is gRPC Test Page.
      <button onClick={onButtonClick}>Send Request</button>
      <p>{message}</p>
        <p>order ID: {orderId}</p>
        <p>jwt token: {jwtToken}</p>
    </main>
  )
}
