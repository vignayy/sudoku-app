import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SudokuApiService, SudokuResponse } from './services/sudoku-api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sudoku Solver';
  
  board: (number | null)[][] = [
    [null, null, null, 3, 7, null, null, 2, null],
    [null, 9, null, null, 8, 5, 7, null, null],
    [3, null, null, 9, null, null, null, null, 5],
    [1, null, null, null, null, null, null, 8, null],
    [null, null, null, null, null, null, 3, null, null],
    [null, null, null, null, 9, null, null, null, 7],
    [2, null, null, 6, null, null, null, null, 1],
    [null, 4, 8, null, null, null, 6, null, null],
    [null, 3, null, null, null, null, null, 4, null]
  ];
  
  // To store the board state before solving
  originalBoard: (number | null)[][] = [];

  message: string = '';

  constructor(private sudokuApiService: SudokuApiService) {}

  solvePuzzle(): void {
    this.message = 'Solving...';

    // Create a deep copy of the board before sending it to the solver
    this.originalBoard = this.board.map(row => [...row]);
    
    const puzzle = this.board.map(row => row.map(cell => cell === null || cell === undefined ? 0 : Number(cell)));
    
    this.sudokuApiService.solve(puzzle).subscribe({
      next: (response: SudokuResponse) => {
        this.board = response.solvedBoard;
        this.message = 'Puzzle Solved! ✅';
      },
      error: (err) => {
        console.error(err);
        this.message = 'This puzzle is not valid or has no solution. ❌';
      }
    });
  }
  
  clearBoard(): void {
    this.board = Array(9).fill(null).map(() => Array(9).fill(null));
    this.originalBoard = []; // Also clear the original board copy
    this.message = '';
  }

  // Tracks each row by its index for efficient updates
  trackByRow(index: number, item: any): number {
    return index;
  }

  // Tracks each cell by its index for efficient updates
  trackByCol(index: number, item: any): number {
    return index;
  }
}