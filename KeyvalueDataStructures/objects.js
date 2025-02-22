function fun(arr)
{
    let map = {};
    let n = arr.length;
    for (let i = 0; i < n; i++)
    {
        let element = arr[i];
        if (map[element])
        {
            map[element] += 1;
        }
        else
        {
            map[element] = 1;
        }
    }
    for (let key in map)
    {
        console.log(key, map[key]);
    }
}
fun([1,1,2,2,4,3,1,3,2,1])