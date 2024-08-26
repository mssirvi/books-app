import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from 'src/logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly loggerService: LoggerService) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception instanceof HttpException ? exception.getStatus() : 500;

        const logMessage = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: (exception as any).stack || 'Internal server error',
        };

        this.loggerService.log(logMessage);

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: (exception as any).message || 'Internal server error',
        });
    }
}
