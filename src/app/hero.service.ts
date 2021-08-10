import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HeroService {

    constructor(
        private messageService: MessageService,
        private http: HttpClient,
    ) {

    }

    getHeroes(): Observable<any> {
        const apiURL = '/demo/api/hero/getall';
        const heroes = this.http.get<any>(apiURL)
        console.log("get heroes", heroes)
        this.messageLog("fetched heroes");
        return heroes;
    }

    getHero(id: number): Observable<any> {
        const apiURL = `/demo/api/hero?id=${id}`;
        const hero = this.http.get<any>(apiURL);
        this.messageLog(`fetched hero id=${id}`);
        return hero;
    }

    updateHero(hero: Hero): Observable<any> {
        const apiURL = `/demo/api/hero`;
        return this.http.put<any>(apiURL, hero).pipe(tap(_ => this.messageLog(`updated hero id=${hero.id}`)));


    }

    /** POST: add a new hero to the server */
    addHero(hero: Hero): Observable<any> {
        const apiURL = `/demo/api/hero`;
        return this.http.post<any>(apiURL, hero).pipe(
            tap(() => this.messageLog(`added hero name=${hero.name}`))
        );
    }
    deleteHero(id: number): Observable<any> {
        const apiURL = `/demo/api/hero?id=${id}`;
        return this.http.delete<any>(apiURL).pipe(
            tap(() => this.messageLog(`delete hero name=${id}`))
        );
    }



    messageLog(message: string) {
        this.messageService.add(`HeroService:${message}`);
    }
}