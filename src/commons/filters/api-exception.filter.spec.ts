import { ApiExceptionFilter } from './api-exception.filter';

describe('ExceptionFilter', () => {
  it('should be defined', () => {
    expect(new ApiExceptionFilter()).toBeDefined();
  });
});
