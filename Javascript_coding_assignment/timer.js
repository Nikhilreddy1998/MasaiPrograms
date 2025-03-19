function timer(start,stop)
{
    let count=0
    console.log("timeinsec",count)
    setTimeout(() => {
        let display=setInterval(() => {
            count++
            console.log("timeinsec",count*3)
            if(count===stop)
            {
                clearInterval(display)
                console.log("finished")
            }

            
        }, 3000);
        
    }, start);
}

timer(1000,20)