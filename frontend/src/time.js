export const getTimeRemaining = (e) => {
    const total =
        Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor(
        (total / 1000 / 60) % 60
    );
    const hours = Math.floor(
        (total / 1000 / 60 / 60) % 24
    );
    return {
        total,
        // hours,
        minutes,
        seconds,
    };
};

export const startTimer = (e, setTimer, handleNext, ref) => {
    let { total, minutes, seconds } =
        getTimeRemaining(e);
    if (total >= 0) {
        // update the timer
        // check if less than 10 then we need to
        // add '0' at the beginning of the variable
        setTimer(            
            (minutes > 9
                ? minutes
                : "0" + minutes) +
            ":" +
            (seconds > 9 ? seconds : "0" + seconds)
        );
    }    
};

export const clearTimer = (e, setTimer, ref, handleNext) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("00:10");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (ref.current) clearInterval(ref.current);
    const id = setInterval(() => {
        startTimer(e, setTimer, handleNext, ref);

        let { total, minutes, seconds } =
        getTimeRemaining(e);
        // if(minutes == 0 && seconds == 0){
        //     console.log("times up, handleNext");
        //     clearInterval(ref.current);
        //     handleNext();
        // }
        if (total <= 0) {  // Ensures `handleNext` is called only once
            console.log("Times up, calling handleNext...");
            clearInterval(id); 
            if (ref.current) ref.current = null;  // Reset ref to avoid double calls
            handleNext();
        }
    }, 1000);
    ref.current = id;
};

export const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
};