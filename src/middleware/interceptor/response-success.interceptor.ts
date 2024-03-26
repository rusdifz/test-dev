import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
  
@Injectable()
export class ResponseInput implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    return next.handle().pipe(
      map(async response => {

        let code = response && response == 'ok' ? true : false
        let meta:any = Meta(code, 'INPUT')

        context.switchToHttp().getResponse().status(meta.code)

        return {
          status: meta.msg,
          description: response
        }       

      })
    )
  }
}

export class ResponseNonPagination implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> { 
    return next.handle().pipe(
      map(async response => {
        
        let code = false

        if(response){
          let cekArray = Array.isArray(response)
          if(cekArray){
            code = response.length === 0 ? false : true
          }else{
            code = Object.keys(response).length === 0 ? false : true
          }
        }

        const meta = Meta(code, 'GET')
        
        context.switchToHttp().getResponse().status(meta.code)
        
        return {
          status: meta.msg,
          item: response
        }
      })
    )
  }
}

function Meta(information: boolean, method: string) {
  if(method == "GET"){
    return {
      code: information ? 200 : 404,
      msg: information ? "Success" : "Data Not Found"
    }  
  }
  return {
    code: information ? 201 : 400,
    msg: information ? "success" : "failed"
  }

  
}