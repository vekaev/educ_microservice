import { RequestValidationError } from "../errors";
import { ValidationError } from "class-validator";

export const exceptionFactory = (errors: ValidationError[]) => new RequestValidationError(errors);
