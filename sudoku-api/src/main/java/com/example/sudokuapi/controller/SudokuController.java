package com.example.sudokuapi.controller;

import com.example.sudokuapi.dto.SudokuRequest;
import com.example.sudokuapi.dto.SudokuResponse;
import com.example.sudokuapi.service.SudokuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Allows requests from your Angular app
public class SudokuController {

    private final SudokuService sudokuService;

    @Autowired
    public SudokuController(SudokuService sudokuService) {
        this.sudokuService = sudokuService;
    }

    @PostMapping("/solve")
    public ResponseEntity<SudokuResponse> solveSudoku(@RequestBody SudokuRequest request) {
        int[][] board = request.getBoard();
        SudokuResponse response = new SudokuResponse();

        if (sudokuService.solve(board)) {
            response.setSolvedBoard(board);
            response.setStatus("SOLVED");
            return ResponseEntity.ok(response);
        } else {
            response.setSolvedBoard(request.getBoard()); // Return original board on failure
            response.setStatus("INVALID_PUZZLE");
            return ResponseEntity.badRequest().body(response);
        }
    }
}