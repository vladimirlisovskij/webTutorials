function sum(n1, n2) {
    return parseInt(n1) + parseInt(n2);
}

function isValidTime(hour, minute) {
    return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
}

let curTime = 0;

function addTime(hour, minute, second) {
    curTime += second + minute * 60 + hour * 3600;
    curTime %= 86400;
    let resHour = Math.floor(curTime / 3600);
    let resMinute = Math.floor((curTime % 3600) / 60);
    return resHour + ":" + resMinute;
}

// alert(sum("123", 1));
// alert(isValidTime(25, 61))
// alert(addTime(23, 59, 60));
