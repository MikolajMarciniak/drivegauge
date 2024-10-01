In car box should collect data constantly and buffer locally.
Bulk upload of data whenever possible to backend.

Possibly something like this API

```protobuf
service ODB {
  rpc UploadData (DataRequest) returns (DataResponse) {}
}

message DataRequest {
  repeated DataMessage messages = 1;
}

message DataMessage {
  string id = 1; // For deduplication
  google.protobuf.Timestamp timestamp = 2;
  oneof data {
    SpeeData speed = 3;
    // etc...
  }
}

message SpeedData {
  int64 speed_kmh = 1;
}

message DataResponse {}
```

Service probably authenticated via mutulal TLS.