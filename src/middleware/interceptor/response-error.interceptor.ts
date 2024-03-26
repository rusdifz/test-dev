import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { httpStatus } from '../../common/const/http-status.const';
  import { ErrorData } from '../../common/interfaces/error-data.interface';
import { statusError } from '../helpers/http.helpers';
  
  @Catch()
  export class ResponseErrorInterceptor implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        // assign request & response context
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse<Response>();
  
        // assign message from thrown exception
        let message = exception.message;
        
        // get status code from thrown exception if stated when throwing, or ISE if not stated
        let status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
  
        // error message string for response error_data & error object
        let errorMessage = '';
  
        // error object for thrown error_data
        let messageObject: ErrorData[];
  
        try {
            // if message is JSON stringified, parse it back to JS object
            messageObject = JSON.parse(message);
        } catch (error) {
            // if message is string, set default value for message object
            messageObject = [
                {
                    info: '',
                    message: '',
                },
            ];
        }
  
        // error object for response error_data
        const error_data: ErrorData[] = [];
  
        // map array error_data
        for (const itemError of messageObject) {
            console.log('iten', itemError);
            
            // if message was not JS object, use thrown message
            errorMessage =
                itemError.message == '' ? message : itemError.message;
  
            // push to error_data array
            error_data.push({
                info: itemError.info ?? '',
                message: errorMessage,
            });
        }
  
        // log error
        console.error(exception);
  
        // set meta message
        let metaMsg: string = httpStatus[status];
        if (status == 500) {
            errorMessage = message;
            metaMsg = 'Something went wrong. Please try again.';
        }
  
        // build response
        const responseBody = statusError(status, metaMsg, { errorMessage, errorData: error_data })
        // const responseBody = {
        //     meta: {
        //         code: status,
        //         msg: metaMsg,
        //     },
        //     data: null,
        //     error: errorMessage,
        //     error_data: error_data,
        // };

        response.status(status).json(responseBody);
    }
  }
  