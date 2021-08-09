import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {


  handleError(error: any): void {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      console.log('SX-Error HttpErrorResponse: ', error);
    } else {
      console.log('SX-Error :', error);
    }

  }
}
