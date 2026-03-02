export type LocalFile = {
  uri: string;
  name: string;
  mimeType: string;
  size: number;
};

export type FileTransferState = "idle" | "loading" | "success" | "error";

export type FileTransferErrorCode =
  | "USER_CANCELLED"
  | "NETWORK"
  | "TIMEOUT"
  | "FILE_TOO_LARGE"
  | "UNSUPPORTED_TYPE"
  | "WRITE_FAILED"
  | "UNKNOWN";

export type FileTransferError = {
  code: FileTransferErrorCode;
  message: string;
};
