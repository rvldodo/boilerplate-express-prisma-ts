class ErrorHandler extends Error {
  public errorCode: number;
  public statusCode: number;

  constructor(erroCode: number, message: string, statusCode: number) {
    super(message);
    this.errorCode = erroCode;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, ErrorHandler.prototype);
  }
}

export default ErrorHandler;
