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
    const [message1List, setMessage1List] = useState<string[]>([]);
    const [message2List, setMessage2List] = useState<string[]>([]);
    const [orderId, setOrderId] = useState<number>(576668);
    const [jwtToken1, setJwtToken1] = useState<string>();
    const [jwtToken2, setJwtToken2] = useState<string>();
    const [stream, setStream] =
        useState<grpcWeb.ClientReadableStream<TruckerLocationReply>>();
    const [toggle, setToggle] = useState<boolean>(false);

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
        console.log('드라이버 관리 요청');
        if (stream) {
            stream.cancel();
        }

        let tempJwtToken;
        try {
            const res = await axios.get(
                process.env.NEXT_PUBLIC_JWT_TOKEN_URL +
                    '/generate/area-monitoring-token'
            );
            if (res?.data) {
                tempJwtToken = res.data;
                setJwtToken1(res.data);
            } else {
                throw new Error(
                    'Failed to get JWT token for driver monitoring'
                );
            }
        } catch (e) {
            console.error(e);
            setMessage1List((prev) => [...prev, JSON.stringify(e)]);
            return;
        }

        const newRpcRequest = new TruckerLocationInAreaRequest();
        newRpcRequest.setLeftTop(
            new Point().setLatitude(37.5).setLongitude(127.0)
        );
        newRpcRequest.setRightBottom(
            new Point().setLatitude(37.4).setLongitude(127.1)
        );

        const call = rpcClient.getTruckerLocationsInArea(newRpcRequest, {
            Authorization: toggle ? tempJwtToken : undefined,
        } as grpcWeb.Metadata);
        call.on('metadata', (metadata) => {
            console.log('Received metadata');
            console.log(metadata);
        });
        call.on('status', (status: grpcWeb.Status) => {
            console.log(`Received status: ${status.code} - ${status.details}`);
            console.log(status);
        });
        call.on('data', (message: TruckerLocationReply) => {
            console.log('Received message');
            console.log(message.toObject());
            setMessage1List((prev) => [
                ...prev,
                JSON.stringify(message.toObject()),
            ]);
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
        console.log('운송 관리 요청');
        if (stream) {
            stream.cancel();
        }

        let tempJwtToken;
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
                tempJwtToken = res.data;
                setJwtToken2(res.data);
            } else {
                throw new Error('Failed to get JWT token for order monitoring');
            }
        } catch (e) {
            console.error(e);
            setMessage2List((prev) => [...prev, JSON.stringify(e)]);
            return;
        }

        const newRpcRequest = new TruckerLocationRequest();

        const call = rpcClient.getTruckerLocations(newRpcRequest, {
            Authorization: toggle ? tempJwtToken : undefined,
        } as grpcWeb.Metadata);
        call.on('status', (status: grpcWeb.Status) => {
            console.log(`Received status: ${status.code} - ${status.details}`);
            console.log(status);
        });
        call.on('data', (message: TruckerLocationReply) => {
            console.log('Received message');
            console.log(message.toObject());
            setMessage2List((prev) => [
                ...prev,
                JSON.stringify(message.toObject()),
            ]);
        });
        call.on('end', function () {
            // The server has finished sending
            console.log('Received end');
        });
        call.on('error', function (e) {
            // An error has occurred and the stream has been closed.
            console.error(e);
        });
        call.on('metadata', (metadata: grpcWeb.Metadata) => {
            console.log('Received metadata');
            console.log(metadata);
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
        <main className="flex flex-col gap-y-4 min-h-screen items-center justify-between p-8 h-full bg-slate-300">
            <h1 className={'text-2xl'}>드라이버관리</h1>
            <form className={'flex'} onSubmit={getDriverManage}>
                <button className={'p-2 border rounded-2xl bg-white'}>
                    Send Request
                </button>
            </form>
            <p className={'text-blue-500 w-full'}>jwt token: {jwtToken1}</p>
            <div
                className={
                    'w-full h-[200px] overflow-y-scroll border-2 bg-slate-200'
                }
            >
                {message1List.map((message, index) => (
                    <p key={index} className={'text-red-500'}>
                        message: {message}
                    </p>
                ))}
            </div>
            <br />
            <hr className={'w-full h-1 bg-black'} />
            <br />
            <h1 className={'text-2xl'}>운송관리</h1>
            <button
                onClick={() => setToggle((prev) => !prev)}
                className={'p-2 border-1 bg-amber-200 rounded-3xl'}
            >
                jwt 넣기: {toggle ? 'True' : 'False'}
            </button>

            <form className={'flex'} onSubmit={getOrderManage}>
                <label>Order ID</label>
                <input
                    type="number"
                    value={orderId}
                    onChange={(e) => setOrderId(Number(e.target.value))}
                />
                <button className={'p-2 border rounded-2xl bg-white'}>
                    Send Request
                </button>
            </form>
            <p className={'text-blue-500 w-full flex text-wrap'}>
                jwt token: {jwtToken2}
            </p>
            <div
                className={
                    'w-full h-[200px] flex flex-col overflow-y-scroll border-2 bg-slate-200'
                }
            >
                {message2List.map((message, index) => (
                    <p key={index} className={'text-red-500'}>
                        {message}
                    </p>
                ))}
            </div>
            <br />
            <br />
            <button onClick={onCancleStream}>Cancle Stream</button>
        </main>
    );
}
