'use client';

import * as grpcWeb from 'grpc-web';
import { FormEvent, useEffect, useState } from 'react';
import { TruckerLocationServiceClient } from '../../grpc/helloworld_grpc_web_pb';
import {
    Point,
    TruckerLocationInAreaRequest,
    TruckerLocationReply,
    TruckerLocationRequest,
} from '../../grpc/helloworld_pb';
import axios from 'axios';

export default function Home() {
    const [rpcClient, setRpcClient] = useState<TruckerLocationServiceClient>();
    const [message1, setMessage1] = useState<string>();
    const [message2, setMessage2] = useState<string>();
    const [orderId, setOrderId] = useState<number>(0);
    const [jwtToken, setJwtToken] = useState<string>();
    const [stream, setStream] =
        useState<grpcWeb.ClientReadableStream<TruckerLocationReply>>();

    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_GRPC_URL) {
            console.error('NEXT_PUBLIC_GRPC_URL is not defined');
            return;
        }
        const newRpcClient = new TruckerLocationServiceClient(
            process.env.NEXT_PUBLIC_GRPC_URL,
            null,
            null
        );
        setRpcClient(newRpcClient);
    }, []);

    const getDriverManage = async (e: FormEvent) => {
        e.preventDefault();
        if (!rpcClient) {
            return;
        }

        if (stream) {
            stream.cancel();
        }

        try {
            const res = await axios.get(
                process.env.NEXT_PUBLIC_JWT_TOKEN_URL +
                    '/generate/area-monitoring-token'
            );
            if (res?.data) {
                console.log(res);
                setJwtToken(res.data);
            } else {
                throw new Error(
                    'Failed to get JWT token for driver monitoring'
                );
            }
        } catch (e) {
            console.error(e);
            setMessage2(JSON.stringify(e));
            return;
        }

        const newRpcRequest = new TruckerLocationInAreaRequest();
        newRpcRequest.setLeftTop(
            new Point().setLatitude(37.5).setLongitude(127.0)
        );
        newRpcRequest.setRightBottom(
            new Point().setLatitude(37.4).setLongitude(127.1)
        );

        const call = rpcClient.getTruckerLocationsInArea(newRpcRequest);
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
            setMessage1(JSON.stringify(message.toObject()));
        });
        call.on('end', function () {
            // The server has finished sending
            console.log('Received end');
        });
        call.on('error', function (e) {
            // An error has occurred and the stream has been closed.
            console.error(e);
        });
        setStream(call);
    };

    const getOrderManage = async (e: FormEvent) => {
        e.preventDefault();
        if (!rpcClient) {
            return;
        }

        if (stream) {
            stream.cancel();
        }

        try {
            const res = await axios.get(
                process.env.NEXT_PUBLIC_JWT_TOKEN_URL + '/generate/token',
                {
                    params: {
                        orderId: orderId,
                    },
                }
            );
            if (res?.data) {
                console.log(res);
                setJwtToken(res.data);
            } else {
                throw new Error('Failed to get JWT token for order monitoring');
            }
        } catch (e) {
            console.error(e);
            setMessage2(JSON.stringify(e));
            return;
        }

        const newRpcRequest = new TruckerLocationRequest();

        const call = rpcClient.getTruckerLocations(newRpcRequest, {
            Authorization: jwtToken,
        } as grpcWeb.Metadata);
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
            setMessage2(JSON.stringify(message.toObject()));
        });
        call.on('end', function () {
            // The server has finished sending
            console.log('Received end');
        });
        call.on('error', function (e) {
            // An error has occurred and the stream has been closed.
            console.error(e);
        });
        setStream(call);
    };

    const onCancleStream = () => {
        if (stream) {
            console.log('stream cancel');
            stream.cancel();
        } else {
            console.log('stream is not exist');
        }
    };

    useEffect(() => {
        const handleBeforeUnload = (event: Event) => {
            console.log('페이지를 떠나기 전에 실행할 함수');
            event.preventDefault();
            onCancleStream();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <main className="flex flex-col gap-y-12 min-h-screen items-center justify-between p-24">
            <p>Hello, World! This is gRPC 드라이버 관리 Test Section.</p>
            <form className={'flex'} onSubmit={getDriverManage}>
                <button>Send Request</button>
            </form>
            <p className={'text-red-500'}>message: {message1}</p>
            <br />
            <br />
            <br />
            <p>Hello, World! This is gRPC 운송 관리 Test Section.</p>
            <form className={'flex'} onSubmit={getOrderManage}>
                <label>Order ID</label>
                <input
                    type="number"
                    value={orderId}
                    onChange={(e) => setOrderId(Number(e.target.value))}
                />
                <button>Send Request</button>
            </form>
            <p>jwt token: {jwtToken}</p>
            <p className={'text-red-500'}>message: {message2}</p>
            <button onClick={onCancleStream}>Cancle Stream</button>
        </main>
    );
}
