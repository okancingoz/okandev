// This file defines a custom error class for handling application errors in a structured way.
export default class AppError extends Error {
  // This class extends the built-in Error class to create a custom error type
  // that includes additional properties for status code, status, and operational flag.
  public statusCode: number;
  public status: "fail" | "error";
  public isOperational: boolean;

  // The constructor takes a message and a status code, initializing the properties accordingly.
  // It also sets the status based on the status code and captures the stack trace.
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
