import {HttpStatus} from "@nestjs/common";
import { CustomError } from './custom-error.abstract-class';

const reasonMessage = 'Error connecting to database'

export class DatabaseConnectionError extends CustomError {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    reason = reasonMessage;

    constructor() {
        super(reasonMessage);

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors() {
        return [{ message: this.reason }]
    }
}