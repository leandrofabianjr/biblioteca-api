import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

interface ServiceExceptionContext {
  message?: string;
  errors?: ValidationError[];
  status?: HttpStatus;
}

export class ServiceException extends HttpException {
  constructor(context: ServiceExceptionContext) {
    super(context, 400);
  }
}
