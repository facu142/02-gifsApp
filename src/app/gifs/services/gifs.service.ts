import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchGIFResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apyKey: string = 'oohQ5izopuIERdF5fOwiShmc4h33tHzc';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [] ;
    

  }

  buscarGifs(query: string = '') {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    this.http.get<SearchGIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=oohQ5izopuIERdF5fOwiShmc4h33tHzc&q=${query}&limit=10`)
      .subscribe((resp: SearchGIFResponse) => {
        console.log(resp);
        this.resultados = resp.data;
      })


    console.log(this._historial);

  }

}
