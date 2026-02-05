let matrix=[
    [1,2,3],
    [4,5,6],
    [7,8,9]
]
//pattern in matrix,printing all boundary elements
// function boundary(matrix){
// for(let i=0;i<matrix.length;i++){
//     for(let j=0;j<matrix[i].length;j++){
//         if(i==0||j==0||i==matrix.length-1||j==matrix[i].length-1){
//             console.log(matrix[i][j])
//         }
//     }
// }
// }
// boundary(matrix)

//q2)print all diagonal elements

function diagonal(matrix){
    for(let i=0;i<matrix.length;i++){
        for(let j=0;j<matrix[i].length;j++){
            if(i==j){
                console.log(matrix[i][j])
            }
        }
    }
}
diagonal(matrix)