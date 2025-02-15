function checkElement(arr, element)
{
    if(arr.includes(element))
    {
        return true
    }
    else
    {
        return false
    }
}
let result =checkElement([10, 20, 30, 40], 20)
console.log(result)