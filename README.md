# Sudoku Solver – Algorithmic Web Application

<div align="center">

**A High-Performance, Full-Stack Sudoku Solving Platform**

*Solving 9x9 puzzles with elegant recursive backtracking and a responsive Angular user interface*

[Overview](#overview) • [Architecture](#architecture) • [Features](#features) • [Getting Started](#getting-started)

</div>

---

## Overview

**Sudoku Solver** is a comprehensive web application designed to resolve challenging 9x9 Sudoku puzzles with efficiency and precision. The application combines a **Spring Boot REST API** powered by recursive backtracking algorithms with a **modern Angular single-page application (SPA)** that delivers an intuitive, real-time solving experience.

This project demonstrates professional full-stack development practices, emphasizing clean architecture, reactive programming patterns, and algorithmic optimization for constraint satisfaction problems.

---

## Core Capabilities

| Capability | Description |
|---|---|
| **Puzzle Solving** | Resolves standard 9x9 Sudoku puzzles with validated constraints |
| **Real-Time Processing** | Asynchronous HTTP communication with immediate visual feedback |
| **Input Validation** | Client-side and server-side constraints enforcement (rows, columns, 3x3 boxes) |
| **State Management** | RxJS Observables for reactive, responsive state handling |
| **Responsive UI** | Angular standalone components with two-way data binding and dynamic visual feedback |

---

## Technical Architecture

### Backend: Spring Boot REST API

The backend serves as the computational engine, implementing a **recursive backtracking algorithm** optimized for 9x9 constraint satisfaction.

#### Technology Stack
- **Framework:** Spring Boot 3.5.4
- **Language:** Java 17
- **Build Tool:** Maven
- **Dependencies:** Spring Web, Lombok

#### Core Algorithm: Recursive Backtracking

The `SudokuService` employs a depth-first search with constraint validation:

```java
public boolean solve(int[][] board) {
    // Iterate through each cell in the 9x9 matrix
    for (int row = 0; row < 9; row++) {
        for (int col = 0; col < 9; col++) {
            if (board[row][col] == 0) { // Empty cell found
                // Try digits 1–9
                for (int num = 1; num <= 9; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;           // Place digit
                        if (solve(board)) {              // Recurse
                            return true;
                        }
                        board[row][col] = 0;             // Backtrack
                    }
                }
                return false; // No valid digit found
            }
        }
    }
    return true; // Puzzle solved
}
```

**Algorithm Characteristics:**
- **Time Complexity:** O(9^(n)) where n is the number of empty cells; typically exponential but pruned by constraint validation
- **Space Complexity:** O(n) for recursive call stack depth
- **Optimizations:** 
  - Early constraint checking eliminates invalid candidates before recursion
  - Row, column, and 3x3 box validations reduce branching factor
  - Greedy backtracking minimizes computational overhead

The `isSafe()` method validates placement against three Sudoku constraints:
1. **Row Uniqueness:** No duplicate in the current row
2. **Column Uniqueness:** No duplicate in the current column  
3. **3x3 Box Uniqueness:** No duplicate in the 3x3 subgrid

#### REST Endpoint

```
POST /api/solve
Content-Type: application/json

Request Body:
{
  "board": [[0, 0, 3, ...], [...], ...]  // 9x9 array; 0 = empty cell
}

Response (200 OK):
{
  "solvedBoard": [[...], [...], ...],     // Completed 9x9 array
  "status": "SOLVED"                      // or "INVALID_PUZZLE"
}
```

**CORS Configuration:** Enabled for `http://localhost:4200` to allow Angular frontend communication.

---

### Frontend: Angular Single-Page Application

The frontend delivers an interactive, responsive user experience with **real-time validation** and **asynchronous state management** via RxJS.

#### Technology Stack
- **Framework:** Angular 19.0.0 (Standalone Components)
- **Language:** TypeScript 5.6.2
- **HTTP Client:** Angular HttpClient with RxJS Observables
- **Styling:** CSS3 with responsive design
- **State Management:** RxJS Observable patterns

#### User Experience Features

**Two-Way Data Binding:**
```typescript
[(ngModel)]="board[i][j]"  // Real-time input synchronization
```
Users edit cells directly; the component state updates instantaneously.

**Input Constraints:**
- Pattern validation: `pattern="[1-9]"` restricts input to valid Sudoku digits
- Max length: Single character per cell
- Read-only state: Board becomes immutable post-solving

**Dynamic Visual Feedback:**
```html
[ngClass]="{'solved-cell': originalBoard.length > 0 && 
           originalBoard[i][j] === null && board[i][j] !== null}"
```
Solved cells are visually distinguished from pre-filled cells.

#### Service Layer: RxJS Observables

The `SudokuApiService` uses Angular's `HttpClient` for non-blocking asynchronous communication:

```typescript
public solve(board: number[][]): Observable<SudokuResponse> {
    const request = { board: board };
    return this.http.post<SudokuResponse>(this.apiUrl, request);
}
```

**Observable Pattern Benefits:**
- **Non-blocking:** UI remains responsive during server processing
- **Cancellable:** Requests can be unsubscribed if needed
- **Error Handling:** Structured error callbacks for user feedback
- **Type Safety:** Strong typing via TypeScript interfaces

#### Component Integration

The `AppComponent` orchestrates user interactions:

| Method | Responsibility |
|---|---|
| `solvePuzzle()` | Deep-clone board, invoke API via Observable subscription, update UI on resolution |
| `clearBoard()` | Reset 9x9 grid and application state |
| `trackByRow()` / `trackByCol()` | Optimize rendering performance with Angular's `trackBy` |

---

## Project Structure

```
sudoku-app/
├── sudoku-api/                          # Spring Boot REST API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/sudokuapi/
│   │   │   │   ├── SudokuApiApplication.java       # Spring Boot entry point
│   │   │   │   ├── controller/
│   │   │   │   │   └── SudokuController.java       # REST endpoint handler
│   │   │   │   ├── service/
│   │   │   │   │   └── SudokuService.java          # Recursive backtracking logic
│   │   │   │   └── dto/
│   │   │   │       ├── SudokuRequest.java          # API request payload
│   │   │   │       └── SudokuResponse.java         # API response payload
│   │   │   └── resources/
│   │   │       └── application.properties          # Spring configuration
│   │   └── test/
│   │       └── java/com/example/sudokuapi/
│   │           └── SudokuApiApplicationTests.java
│   ├── pom.xml                                      # Maven dependencies & build config
│   └── mvnw / mvnw.cmd                              # Maven wrapper scripts
│
└── sudoku-ui/                           # Angular Single-Page Application
    ├── src/
    │   ├── index.html                               # HTML entry point
    │   ├── main.ts                                  # Angular bootstrap
    │   ├── styles.css                               # Global styles
    │   └── app/
    │       ├── app.component.ts                     # Root component (logic)
    │       ├── app.component.html                   # UI template
    │       ├── app.component.css                    # Component styles
    │       ├── app.module.ts                        # Angular module configuration
    │       └── services/
    │           └── sudoku-api.service.ts            # HTTP client service
    ├── angular.json                                 # Angular CLI configuration
    ├── package.json                                 # Node dependencies
    ├── tsconfig.json                                # TypeScript configuration
    └── README.md
```

---

## Frontend-Backend Interaction Flow

```
┌──────────────────────────────────────────────────────────────┐
│                     ANGULAR FRONTEND                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 1. User enters puzzle values                           │ │
│  │    → Two-way binding updates component.board[][]      │ │
│  │                                                         │ │
│  │ 2. User clicks "Solve Puzzle"                          │ │
│  │    → solvePuzzle() invoked                             │ │
│  │    → Deep clone board to track original state          │ │
│  │    → Convert null → 0 for API transmission             │ │
│  │                                                         │ │
│  │ 3. SudokuApiService.solve(board)                       │ │
│  │    → POST request with Observable                      │ │
│  │    → User sees "Solving..." message                    │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
                             │
                             │ HTTP POST /api/solve
                             │ Content-Type: application/json
                             ↓
┌──────────────────────────────────────────────────────────────┐
│                  SPRING BOOT BACKEND                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 1. SudokuController receives request                   │ │
│  │    → Deserialize JSON to SudokuRequest                 │ │
│  │    → Extract 9x9 board array                           │ │
│  │                                                         │ │
│  │ 2. SudokuService.solve(board)                          │ │
│  │    → Invoke solveSudoku() recursive algorithm          │ │
│  │    → Validate constraints via isSafe()                 │ │
│  │    → Execute backtracking on empty cells              │ │
│  │                                                         │ │
│  │ 3. Generate SudokuResponse                             │ │
│  │    → Populate solvedBoard with completed array         │ │
│  │    → Set status: "SOLVED" or "INVALID_PUZZLE"         │ │
│  │    → Serialize to JSON response                        │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
                             │
                             │ HTTP 200 OK
                             │ { solvedBoard: [...], status: "SOLVED" }
                             ↓
┌──────────────────────────────────────────────────────────────┐
│                     ANGULAR FRONTEND                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 1. Observable subscription resolved                    │ │
│  │    → next() callback invoked with SudokuResponse       │ │
│  │                                                         │ │
│  │ 2. Update component state                              │ │
│  │    → Assign solvedBoard to component.board[][]         │ │
│  │    → Set message to "Puzzle Solved! ✅"               │ │
│  │    → Solved cells highlighted with CSS class           │ │
│  │    → Original empty cells remain visually distinct     │ │
│  │                                                         │ │
│  │ 3. Error handling                                      │ │
│  │    → If error: display "This puzzle is not valid..."  │ │
│  │    → Log error details to console                      │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

---

## Features

### Algorithmic Excellence
✓ **Recursive Backtracking:** Efficient depth-first search with constraint propagation  
✓ **Constraint Validation:** Row, column, and 3x3 box uniqueness checks  
✓ **Optimized Pruning:** Invalid candidates eliminated before recursion  

### User Experience
✓ **Interactive Grid:** Real-time input with visual feedback  
✓ **Two-Way Data Binding:** Instant model-view synchronization  
✓ **Input Validation:** Pattern matching and client-side constraints  
✓ **State Management:** Original vs. solved cell differentiation  
✓ **Clear Messaging:** Success/failure status updates  

### Architecture & Performance
✓ **RESTful Design:** Standard HTTP conventions for API clarity  
✓ **Asynchronous Communication:** Non-blocking Observable patterns  
✓ **CORS Support:** Secure cross-origin communication  
✓ **Type Safety:** TypeScript interfaces and Java data transfer objects  
✓ **Separation of Concerns:** Frontend service layer, backend business logic  

---

## Getting Started

### Prerequisites
- **Java 17+** (for Spring Boot backend)
- **Node.js 18+** (for Angular frontend)
- **Maven 3.6+** (for building Spring Boot application)

### Backend Setup (Spring Boot)

```bash
cd sudoku-api

# Build the application
./mvnw clean package

# Run the application
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080`

**Verify:** Test the endpoint:
```bash
curl -X POST http://localhost:8080/api/solve \
  -H "Content-Type: application/json" \
  -d '{
    "board": [
      [0, 0, 3, 0, 7, 0, 0, 2, 0],
      [0, 9, 0, 0, 8, 5, 7, 0, 0],
      [3, 0, 0, 9, 0, 0, 0, 0, 5],
      [1, 0, 0, 0, 0, 0, 0, 8, 0],
      [0, 0, 0, 0, 0, 0, 3, 0, 0],
      [0, 0, 0, 0, 9, 0, 0, 0, 7],
      [2, 0, 0, 6, 0, 0, 0, 0, 1],
      [0, 4, 8, 0, 0, 0, 6, 0, 0],
      [0, 3, 0, 0, 0, 0, 0, 4, 0]
    ]
  }'
```

### Frontend Setup (Angular)

```bash
cd sudoku-ui

# Install dependencies
npm install

# Start the development server
npm start
```

The application will open at `http://localhost:4200`

**Available Commands:**
- `npm start` – Start development server
- `npm run build` – Production build
- `npm test` – Run unit tests

---

## Technical Specifications

### Backend Dependencies
| Dependency | Version | Purpose |
|---|---|---|
| Spring Boot Starter Web | 3.5.4 | REST API framework |
| Lombok | Latest | Reduce boilerplate annotations |
| Spring Boot Starter Test | 3.5.4 | Testing framework |

### Frontend Dependencies
| Dependency | Version | Purpose |
|---|---|---|
| @angular/core | 19.0.0 | Core Angular framework |
| @angular/common | 19.0.0 | Common utilities and directives |
| @angular/forms | 19.0.0 | Form handling and two-way binding |
| @angular/platform-browser | 19.0.0 | DOM rendering |
| rxjs | 7.8.0 | Reactive programming library |
| TypeScript | 5.6.2 | Type-safe JavaScript |

---

## Algorithm Deep Dive: Recursive Backtracking Efficiency

The Sudoku solver uses a **backtracking algorithm** that explores the solution space systematically while pruning invalid branches:

### Execution Steps

1. **Find Empty Cell:** Iterate through the 9x9 board seeking unfilled cells (value = 0)
2. **Try Candidates:** For each empty cell, attempt digits 1–9
3. **Validate Constraints:** Before placement, verify the digit doesn't violate Sudoku rules
4. **Recurse:** If valid, place the digit and recursively solve the remainder
5. **Backtrack:** If recursion fails, reset the cell (0) and try the next candidate
6. **Success:** When all cells are filled and constraints satisfied, return `true`

### Time Complexity Analysis

- **Worst Case:** O(9^(n)) where n = number of empty cells
- **Average Case:** Significantly reduced by constraint elimination
- **Practical Performance:** Most puzzles solve in milliseconds due to:
  - Early constraint checking
  - Aggressive backtracking
  - Minimal branching factor per cell

### Why This Approach Works

Standard Sudoku has the property of **constraint propagation**: each placement eliminates multiple candidates from related cells. The recursive backtracking algorithm leverages this by:
- Validating placement before recursing (saves unnecessary exploration)
- Terminating immediately upon finding a valid solution
- Returning `false` when no candidates exist (triggers backtrack)

---

## API Reference

### POST /api/solve

Solves a provided Sudoku puzzle using recursive backtracking.

**Request:**
```json
{
  "board": [
    [0, 0, 3, 0, 7, 0, 0, 2, 0],
    [0, 9, 0, 0, 8, 5, 7, 0, 0],
    [3, 0, 0, 9, 0, 0, 0, 0, 5],
    [1, 0, 0, 0, 0, 0, 0, 8, 0],
    [0, 0, 0, 0, 0, 0, 3, 0, 0],
    [0, 0, 0, 0, 9, 0, 0, 0, 7],
    [2, 0, 0, 6, 0, 0, 0, 0, 1],
    [0, 4, 8, 0, 0, 0, 6, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 4, 0]
  ]
}
```

**Response (200 OK):**
```json
{
  "solvedBoard": [
    [5, 6, 3, 1, 7, 4, 9, 2, 8],
    [4, 9, 1, 2, 8, 5, 7, 3, 6],
    [3, 7, 2, 9, 6, 8, 1, 5, 4],
    [1, 5, 9, 3, 4, 2, 5, 8, 3],
    [7, 8, 4, 5, 1, 6, 3, 9, 2],
    [6, 2, 5, 8, 9, 3, 4, 1, 7],
    [2, 1, 7, 6, 5, 9, 8, 3, 1],
    [9, 4, 8, 7, 3, 1, 6, 2, 5],
    [8, 3, 6, 4, 2, 7, 5, 4, 9]
  ],
  "status": "SOLVED"
}
```

**Response (400 Bad Request):**
```json
{
  "solvedBoard": [...],
  "status": "INVALID_PUZZLE"
}
```

---

## Development Workflow

### Building the Backend
```bash
cd sudoku-api
./mvnw clean package          # Compile, test, package
./mvnw spring-boot:run        # Run application
```

### Building the Frontend
```bash
cd sudoku-ui
npm install                   # Install dependencies
npm start                     # Development server with hot reload
npm run build                 # Optimized production build
```

### Running Both Concurrently

Open two terminal windows:

**Terminal 1 – Backend:**
```bash
cd sudoku-api && ./mvnw spring-boot:run
```

**Terminal 2 – Frontend:**
```bash
cd sudoku-ui && npm start
```

Navigate to `http://localhost:4200` and enter a Sudoku puzzle to test.

---

## Author

**Vignay Bandari**

---

<div align="center">

**Built with ❤️ for Sudoku enthusiasts and algorithm learners.**

</div>
