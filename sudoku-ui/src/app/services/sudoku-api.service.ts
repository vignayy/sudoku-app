import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define an interface for strong typing of the response
export interface SudokuResponse {
  solvedBoard: number[][];
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class SudokuApiService {
  private apiUrl = 'http://localhost:8080/api/solve'; // Your Spring Boot API endpoint

  constructor(private http: HttpClient) { }

  public solve(board: number[][]): Observable<SudokuResponse> {
    const request = { board: board };
    return this.http.post<SudokuResponse>(this.apiUrl, request);
  }
}