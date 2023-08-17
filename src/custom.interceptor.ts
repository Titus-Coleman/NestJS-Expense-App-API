import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

export class CustomInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext, 
        handler: CallHandler){

        console.log("This is intercepting the REQUEST")
        console.log({context})

     return handler.handle().pipe(
        map((data) => {
            console.log("This is intercepting the RESPONSE")
            console.log({data})
            return data
        }),
     );  
    }
}