setInterval(() => {

    let date = new Date()
    let hTime = date.getHours();
    let mTime = date.getMinutes();
    let sTime = date.getSeconds();

    let hRotation = ((30*hTime) + (mTime/2))
    let mRotation = 6*mTime
    let sRotation = 6*sTime

    hour.style.transform = `rotate(${hRotation}deg)`
    minute.style.transform = `rotate(${mRotation}deg)`
    second.style.transform = `rotate(${sRotation}deg)`
    
}, 1000);