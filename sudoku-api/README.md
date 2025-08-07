# Run and Test the Backend (sudoku-api)

### First, make sure:

* Your Spring Boot app is **running on port `8080`**.
---

## ✅ Option 1: Test with `curl` (command line)

### 📌 Use this curl command:

```bash
curl -X POST http://localhost:8080/api/solve \
  -H "Content-Type: application/json" \
  -d '{
    "board": [
      [0, 0, 0, 3, 7, 0, 0, 2, 0],
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
### or use this one line command instead.

```bash
curl -X POST http://localhost:8080/api/solve -H "Content-Type: application/json" -d "{\"board\": [[0,0,0,3,7,0,0,2,0],[0,9,0,0,8,5,7,0,0],[3,0,0,9,0,0,0,0,5],[1,0,0,0,0,0,0,8,0],[0,0,0,0,0,0,3,0,0],[0,0,0,0,9,0,0,0,7],[2,0,0,6,0,0,0,0,1],[0,4,8,0,0,0,6,0,0],[0,3,0,0,0,0,0,4,0]]}"
```

If the puzzle is solvable, you should get a response like:

```json
{
  "solvedBoard": [ ...solved array... ],
  "status": "SOLVED"
}
```

If it's invalid:

```json
{
  "solvedBoard": [ ...original board... ],
  "status": "INVALID_PUZZLE"
}
```

---

## ✅ Option 2: Test with Postman (GUI)

### 🔧 Steps:

1. **Open Postman**
2. Select **POST** as the HTTP method.
3. Enter the URL:

   ```
   http://localhost:8080/api/solve
   ```
4. Go to the **Body** tab → Choose **raw** → Select **JSON** from the dropdown.
5. Paste your request body:

```json
{
  "board": [
    [0, 0, 0, 3, 7, 0, 0, 2, 0],
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


6. Hit **Send**.

If everything is wired properly, you’ll see the same JSON response (`solvedBoard` + `status`) in Postman.

---

### 🧪 Troubleshooting Tips:

| Problem             | Possible Fix                                                                      |
| ------------------- | --------------------------------------------------------------------------------- |
| 404 Not Found       | Make sure your Spring Boot app is running and the endpoint is `/api/solve`.       |
| 400 Bad Request     | Likely JSON is malformed or doesn't match `SudokuRequest`. Check for typos.       |
| No response / hangs | Make sure Spring Boot app is actually running on port 8080.                       |
| CORS issue          | Shouldn’t affect curl/Postman, but Angular calls may need correct `@CrossOrigin`. |

---
