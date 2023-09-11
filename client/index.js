const child_process = require('child_process');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
}));


let port = process.argv[4] || 8630;
let admin = process.argv[3] || '192.168.0.17';
let time = process.argv[2] || 60;
let status = "online";


if(process.argv[2] == "help"){
    console.log("Usage: index [time] [admin] [port]");
    console.log("time: Time in seconds to lock the computer");
    console.log("admin: IP address of the admin");
    console.log("port: Port to run the server on");
    process.exit();
}


app.get('/', (req, res) => {
    res.send({ status: status, time: time, port: port });
});
app.get('/lock', (req, res) => {
    if (req.socket.remoteAddress.includes(admin)) {
        lock();
        status = "idle";
        res.send({ status: status, time: time, port: port });
    } else {
        res.send({ status: "offline", time: time, port: port });
    }
});
app.post('/lock', (req, res) => {
    status = "online";
    if (time <= 0 && req.socket.remoteAddress.includes(admin)) {
        time = req.body.time;
        timerInterval = setInterval(updateTimer, 1000);
        updateTimer();
        res.send({ status: status, time: time, port: port });
    }
    else {
        if (req.socket.remoteAddress.includes(admin)) {
            res.send({ status: status, time: time, port: port });
        } else {
            res.send({ status: "offline", time: time, port: port });
        }
    }
});
app.get('/close', (req, res) => {
    status = "offline";
    if (req.socket.remoteAddress.includes(admin)) {
        close_app();
        res.send({ status: status, time: time, port: port });
    } else {
        res.send({ status: status, time: time, port: port });
    }
});





function updateTimer() {
    console.log(`Time remaining: ${time} seconds`);
    if (time <= 0) {
        clearInterval(timerInterval);
        lock();
        console.log("Locked");
        status = "idle";
    } else {
        time--;
    }
}
function lock() {
    child_process.execSync('Rundll32.exe user32.dll,LockWorkStation');
}
function close_app() {
    process.exit();
}

let timerInterval = setInterval(updateTimer, 1000);
updateTimer();


app.listen(port, () => {
    console.log(`Server running at ${port} with ${admin}`);
});