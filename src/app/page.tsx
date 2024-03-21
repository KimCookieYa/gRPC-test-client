'use client';

import * as grpcWeb from 'grpc-web';
import { FormEvent, useEffect, useState } from 'react';
import { TruckerLocationServiceClient } from '../../grpc/helloworld_grpc_web_pb';
import { TruckerLocationReply, TruckerLocationRequest } from '../../grpc/helloworld_pb';
import axios from 'axios';

export default function Home() {
  const [rpcClient, setRpcClient] = useState<TruckerLocationServiceClient>();
  const [message, setMessage] = useState<string>();
  const [orderId, setOrderId] = useState<number>(0);
  const [jwtToken, setJwtToken] = useState<string>();

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GRPC_URL) {
      console.error('NEXT_PUBLIC_GRPC_URL is not defined');
      return;
    }
    const newRpcClient = new TruckerLocationServiceClient(process.env.NEXT_PUBLIC_GRPC_URL, null, null);
    setRpcClient(newRpcClient);
  }, []);

  const onButtonClick = async (e: FormEvent) => {
    e.preventDefault();
    if (!rpcClient) {
      return;
    }

    try {
      const res = await axios.get('https://spring2024be.sendy.ngrok.io/generate/token', {
        params: {
          orderId: orderId
        }
      });
      if (res?.data) {
        console.log(res);
        setJwtToken(res.data);
      } else {
        throw new Error('Failed to get JWT token');
      }
    } catch (e) {
      console.error(e);
      setMessage(JSON.stringify(e));
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
      console.log(status);
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
  };

  return (
    <main className="flex flex-col gap-y-12 min-h-screen items-center justify-between p-24">
      <p>Hello, World! This is gRPC Test Page.</p>
      <form className={'flex'} onSubmit={onButtonClick}>
        <label>Order ID</label>
        <input type="number" value={orderId} onChange={(e) => setOrderId(Number(e.target.value))} />
        <button>Send Request</button>
      </form>
      <p className={'text-red-500'}>message: {message}</p>
      <p>jwt token: {jwtToken}</p>
    </main>
  );
}
