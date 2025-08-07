package com.example.sudokuapi.dto;

import lombok.Data;

@Data
public class SudokuResponse {
    private int[][] solvedBoard;
    private String status;
}