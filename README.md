# gRPC 테스트 클라이언트

# Get Started

```bash
$ npm install
$ npm run dev
```

# Proto 파일 컴파일

following [grpc/grpc-web](https://github.com/grpc/grpc-web/?tab=readme-ov-file#quick-start) docs

1. download `protoc` binary
2. download `protoc-gen-grpc-web` plugin
3. compile `helloworld.proto`

```bash
$ wget -O example.tar.gz https://github.com/grpc/grpc-web/?tab=readme-ov-file
$ tar -xvf example.tar.gz
$ sudo mv protobuf-[버전] /usr/local/bin/
$ npm install -g protoc-gen-grpc-web
$ protoc -I=. helloworld.proto --js_out=import_style=commonjs:. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.
```