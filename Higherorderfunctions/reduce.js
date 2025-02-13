

function countAndSortCategories(categories) {
    let categoryCounts = categories.reduce((acc, curr) => {
      if(acc[curr])
      {
        acc[curr]++
      }
      else
      {
        acc[curr]=1
      }
      return acc
    }, {})
  
    let sortedCategories = Object.entries(categoryCounts)
      .sort(([, countA], [, countB]) => countB - countA)
    let result =Object.assign({}, ...sortedCategories.map(([key, value]) => ({ [key]: value })))
      
  
    return result
  }
   let categories=["electronics", "clothing", "electronics",
   "toys", "clothing", "toys", "toys"]
   let result=countAndSortCategories(categories)
   console.log(result)