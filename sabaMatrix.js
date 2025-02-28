function twoArrayAndPhrase(n, m, matrix) {
    let count = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (matrix[i][j] === 's') {
                // Check horizontal (left to right)
                if (j + 3 < m && matrix[i][j + 1] === 'a' && matrix[i][j + 2] === 'b' && matrix[i][j + 3] === 'a') {
                    count++;
                }
                // Check vertical (top to bottom)
                if (i + 3 < n && matrix[i + 1][j] === 'a' && matrix[i + 2][j] === 'b' && matrix[i + 3][j] === 'a') {
                    count++;
                }
                // Check diagonal (down-right)
                if (i + 3 < n && j + 3 < m && matrix[i + 1][j + 1] === 'a' && matrix[i + 2][j + 2] === 'b' && matrix[i + 3][j + 3] === 'a') {
                    count++;
                }
                // Check diagonal (down-left)
                if (i + 3 < n && j - 3 >= 0 && matrix[i + 1][j - 1] === 'a' && matrix[i + 2][j - 2] === 'b' && matrix[i + 3][j - 3] === 'a') {
                    count++;
                }
                // Check diagonal (top-right to bottom-left)
                if (i - 3 >= 0 && j + 3 < m && matrix[i - 1][j + 1] === 'a' && matrix[i - 2][j + 2] === 'b' && matrix[i - 3][j + 3] === 'a') {
                    count++;
                }
            }
        }
    }
    return count;
}