import {HttpStatus} from '@nestjs/common';
import {CustomError} from './custom-error.abstract-class';

export class NotFoundError extends CustomError {
    statusCode  = HttpStatus.NOT_FOUND

    constructor(message: string) {
        super('Route not found');

        this.message = message;

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{ message: 'Not found: ' + this.message }];
    }
}
