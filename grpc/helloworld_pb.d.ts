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

export class TruckerLocationInAreaRequest extends jspb.Message {
  getLeftTop(): Point | undefined;
  setLeftTop(value?: Point): TruckerLocationInAreaRequest;
  hasLeftTop(): boolean;
  clearLeftTop(): TruckerLocationInAreaRequest;

  getRightBottom(): Point | undefined;
  setRightBottom(value?: Point): TruckerLocationInAreaRequest;
  hasRightBottom(): boolean;
  clearRightBottom(): TruckerLocationInAreaRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TruckerLocationInAreaRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TruckerLocationInAreaRequest): TruckerLocationInAreaRequest.AsObject;
  static serializeBinaryToWriter(message: TruckerLocationInAreaRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TruckerLocationInAreaRequest;
  static deserializeBinaryFromReader(message: TruckerLocationInAreaRequest, reader: jspb.BinaryReader): TruckerLocationInAreaRequest;
}

export namespace TruckerLocationInAreaRequest {
  export type AsObject = {
    leftTop?: Point.AsObject,
    rightBottom?: Point.AsObject,
  }
}

export class TruckerLocationInAreaReply extends jspb.Message {
  getTruckerId(): number;
  setTruckerId(value: number): TruckerLocationInAreaReply;

  getOwnerName(): string;
  setOwnerName(value: string): TruckerLocationInAreaReply;

  getBizName(): string;
  setBizName(value: string): TruckerLocationInAreaReply;

  getPoint(): Point | undefined;
  setPoint(value?: Point): TruckerLocationInAreaReply;
  hasPoint(): boolean;
  clearPoint(): TruckerLocationInAreaReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TruckerLocationInAreaReply.AsObject;
  static toObject(includeInstance: boolean, msg: TruckerLocationInAreaReply): TruckerLocationInAreaReply.AsObject;
  static serializeBinaryToWriter(message: TruckerLocationInAreaReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TruckerLocationInAreaReply;
  static deserializeBinaryFromReader(message: TruckerLocationInAreaReply, reader: jspb.BinaryReader): TruckerLocationInAreaReply;
}

export namespace TruckerLocationInAreaReply {
  export type AsObject = {
    truckerId: number,
    ownerName: string,
    bizName: string,
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

