import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { Inject } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataService {
 
  constructor(@Inject(String) private url: string, private http: HttpClient) {}
 
  getAll(): Observable<any> {
    return this.http.get<any>(this.url).pipe(
      map((res) => {
        const user=[];
        for (const key in res) {
             console.log(key)
             user.push({userid:key , ...res[key]})
        }
        return user;
        
      }),
      catchError(this.handleError)
    );
  }
  create(resource: any) {
    return this.http.post(this.url, resource);
  }
  delete(id: string) {
    return this.http.delete(this.url.slice(0,this.url.length-5) + "/"+ id+".json");
  }
  update(data: any, id: string) {
    return this.http.put(this.url.slice(0,this.url.length-5) + "/"+ id+".json", data);
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.status === 400) {
      errorMessage = `An error occurred:${error.error}`;
    } else {
      console.log(error);
      errorMessage += `Backend returned code ${error.status}, body was: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
