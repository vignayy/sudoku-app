package com.example.sudokuapi.dto;

import lombok.Data;

@Data
public class SudokuRequest {
    private int[][] board;
}