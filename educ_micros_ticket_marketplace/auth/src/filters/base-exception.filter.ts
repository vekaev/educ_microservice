import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import {CustomError} from '../errors';
// import {NotFoundError} from "../errors/not-found.error";

@Catch()
export default class BaseExceptionFilter<T extends Error> implements ExceptionFilter {
  catch(err, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();

    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() })
    }

    // // Same as app.all('*')
    // if (err instanceof NotFoundException) {
    //     const error = new NotFoundError(err.message)
    //     res.status(error.statusCode).send({ errors: error.serializeErrors() })
    // }
    console.log(err)

    res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).send({ errors: [{ message: err.message }] });
  }
}