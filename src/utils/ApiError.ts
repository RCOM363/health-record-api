export class ApiError extends Error {
  public statusCode: number;

  constructor(statusCode = 500, message: string) {
    super(message);
    this.statusCode = statusCode;

    // Maintains proper stack trace in V8
    Error.captureStackTrace(this, this.constructor);
  }
}
