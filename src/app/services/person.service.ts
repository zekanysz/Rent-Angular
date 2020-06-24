import { Injectable } from '@angular/core';
import { PersonDetails } from '../interfaces/person-details';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private getPersonDetailsByIdUrl = environment.apiUrl + '/Movie/getPersonDetailsById';

  private personDetails$: Observable<PersonDetails>;
  
  constructor(private http: HttpClient) { }

  getPersonDetailsById(id :number) : Observable<PersonDetails>{
    this.personDetails$ = this.http.get<PersonDetails>(this.getPersonDetailsByIdUrl+"/" + id).pipe(shareReplay());
    return this.personDetails$;
  }
}
