import * as jspb from 'google-protobuf'



export class TruckerLocationRequest extends jspb.Message {
  getOrderId(): number;
  setOrderId(value: number): TruckerLocationRequest;

  getManagerId(): number;
  setManagerId(value: number): TruckerLocationRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TruckerLocationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TruckerLocationRequest): TruckerLocationRequest.AsObject;
  static serializeBinaryToWriter(message: TruckerLocationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TruckerLocationRequest;
  static deserializeBinaryFromReader(message: TruckerLocationRequest, reader: jspb.BinaryReader): TruckerLocationRequest;
}

export namespace TruckerLocationRequest {
  export type AsObject = {
    orderId: number,
    managerId: number,
  }
}

export class TruckerLocationReply extends jspb.Message {
  getTruckerId(): number;
  setTruckerId(value: number): TruckerLocationReply;

  getPoint(): Point | undefined;
  setPoint(value?: Point): TruckerLocationReply;
  hasPoint(): boolean;
  clearPoint(): TruckerLocationReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TruckerLocationReply.AsObject;
  static toObject(includeInstance: boolean, msg: TruckerLocationReply): TruckerLocationReply.AsObject;
  static serializeBinaryToWriter(message: TruckerLocationReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TruckerLocationReply;
  static deserializeBinaryFromReader(message: TruckerLocationReply, reader: jspb.BinaryReader): TruckerLocationReply;
}

export namespace TruckerLocationReply {
  export type AsObject = {
    truckerId: number,
    point?: Point.AsObject,
  }
}

export class Point extends jspb.Message {
  getLatitude(): number;
  setLatitude(value: number): Point;

  getLongitude(): number;
  setLongitude(value: number): Point;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Point.AsObject;
  static toObject(includeInstance: boolean, msg: Point): Point.AsObject;
  static serializeBinaryToWriter(message: Point, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Point;
  static deserializeBinaryFromReader(message: Point, reader: jspb.BinaryReader): Point;
}

export namespace Point {
  export type AsObject = {
    latitude: number,
    longitude: number,
  }
}

