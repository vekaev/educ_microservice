import BaseExceptionFilterClass from './base-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { ClassProvider } from "@nestjs/common/interfaces/modules/provider.interface";

const BaseExceptionFilter: ClassProvider = {
    provide: APP_FILTER,
    useClass: BaseExceptionFilterClass
};

export {
    BaseExceptionFilter
}
