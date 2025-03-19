function findLongestWordLengths(sentences) {
    if (!Array.isArray(sentences)) {
      return "Input must be an array of sentences."
    }
  
    return sentences.map(sentence => {
      if (typeof sentence !== 'string') {
        return "Invalid sentence: Not a string."
      }
  
      let words = sentence.split(' ')
      if (words.length === 0) {
        return 0 // Or handle empty sentences as needed
      }
  
      return words.reduce((maxLength, word) => {
        return Math.max(maxLength, word.length)
      }, 0)
    })
  }
  
  let sentences = [
    "I am the lion",
    "king of jungle",
    "I usually eat"
  ]
  
  let longestLengths = findLongestWordLengths(sentences);
  console.log(longestLengths); // Output: [ 4, 6, 7 ]