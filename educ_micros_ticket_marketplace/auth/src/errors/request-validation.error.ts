import { HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { CustomError } from './custom-error.abstract-class';

export class RequestValidationError extends CustomError {
    statusCode = HttpStatus.BAD_REQUEST;

    constructor(private errors: ValidationError[]) {
        super('Invalid request parameters')

        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors() {
        return this.errors.map(({ constraints, property: field}) => {
            const [message] = Object.values(constraints);
            return {message, field}
        });
    }
}