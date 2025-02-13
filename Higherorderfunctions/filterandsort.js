function processStudents(students) {
    return students
      .filter(ele => ele.marks > 60)
      .sort((a, b) => b.marks - a.marks)
      .map(ele=> ele.name)
  }
  
  let students = [
    { name: "Alice", marks: 58 },
    { name: "Bob", marks: 85 },
    { name: "Charlie", marks: 92 },
    { name: "David", marks: 45 }
  ]
  
  let processedNames = processStudents(students)
  console.log(processedNames)