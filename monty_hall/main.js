var doors = [document.getElementById('door1'), document.getElementById('door2'), document.getElementById('door3')];

var contentBehind = [0, 0, 0];
var userData = [0, 0, 0];
var recordData = [0, 0, 0, 0, 0, 0, 0, 0];
var canPlay = true;

var stayButton = document.getElementById('stay');
var switchButton = document.getElementById('switch');

var winsBox = document.getElementById("wins");
var lossBox = document.getElementById("losses");
var ratioBox = document.getElementById("ratio");

var closed_door = "closed_door.png";
var goat_door = "goat_door.png";
var car_door = "car_door1.png";

function setUp() {

    for (i = 0; i < doors.length; i++) {
        doors[i].src = closed_door;
        doors[i].setAttribute("style", "border: solid rgb(0,0,0) 5px; border-radius: 10px;");
    }

    contentBehind = [0, 0, 0];
    userData = [0, 0, 0];
    recordData = [recordData[0], 0, 0, 0, 0, 0, recordData[6], recordData[7]];

    var rand = Math.floor(Math.random() * 100) + 1;

    if (rand <= 33) {
        contentBehind[0] = 1;
    }
    if (rand > 33 && rand < 67) {
        contentBehind[1] = 1;
    }
    if (rand >= 67) {
        contentBehind[2] = 1;
    }

    stayButton.className = "btn btn-primary disabled";
    switchButton.className = "btn btn-danger disabled";
    canPlay = false;
}

function chooseDoor(door) {
    for (i = 0; i < 3; i++) {
        if (userData[i] == .5) {
            return;
        }
    }
    recordData[1] = door + 1
    userData[door] = 1;
    doors[door].setAttribute("style", "border: solid blue 5px; border-radius: 10px;");

    revealDoor();

    stayButton.className = "btn btn-primary";
    switchButton.className = "btn btn-danger";
    canPlay = true;
}


function revealDoor() {
    if (areArraysEqual(contentBehind, userData)) {
        var rand = Math.floor(Math.random() * 2) + 1;
        var i = 0;

        for (i = 0; i < 3; i++) {
            if (contentBehind[i] == 0) {
                rand--;
            }

            if (rand == 0) {
                doors[i].src = goat_door;
                userData[i] = .5;
                recordData[3] = i + 1;
                break
            }
        }
    } else {
        for (i = 0; i < 3; i++) {
            if (contentBehind[i] == userData[i]) {
                doors[i].src = goat_door;
                userData[i] = .5;
                recordData[3] = i + 1;
                break
            }
        }
    }
}

function areArraysEqual(a, b) {
    if (a.length != b.length) {
        return false;
    }
    for (i = 0; i < a.length; i++) {
        if (a[i] != b[i]) {
            return false;
        }
    }
    return true;
}

function change(ahhh) {
    if (!canPlay) {
        return;
    }
    if (ahhh) {
        recordData[4] = 1;
        for (i = 0; i < 3; i++) {
            if (userData[i] == 0) {
                doors[i].setAttribute("style", "border: solid blue 5px; border-radius: 10px;");
                userData[i] = 1;
                recordData[2] = i + 1;
            } else if (userData[i] == 1) {
                doors[i].setAttribute("style", "border: solid rgb(0,0,0) 5px; border-radius: 10px;");
                userData[i] = 0;
            }
        }
    } else {
        recordData[2] = recordData[1];
    }
    for (i = 0; i < 3; i++) {
        if (contentBehind[i] == 0) {
            doors[i].src = goat_door;
        } else {
            doors[i].src = car_door;
        }
    }
    recordData[0] = recordData[0] + 1;

    stayButton.className = "btn btn-primary disabled";
    switchButton.className = "btn btn-danger disabled";
    canPlay = false;

    updateTable();
}

function updateTable() {
    var row = table.insertRow(1);

    if (recordData[4] == 1) {
        var changed = "Switch";
    } else {
        var changed = "Stayed"
    }
    var result = "Loss";
    for (i = 0; i < 3; i++) {
        if (contentBehind[i] == 1) {
            recordData[5] = i + 1;
        }
        if (contentBehind[i] == userData[i] && userData[i] == 1) {
            result = "Win";
            recordData[6]++;
        }


    }

    if (result == "Loss") {
        recordData[7]++;
    }
    row.insertCell(0).textContent = recordData[0];
    row.insertCell(1).textContent = recordData[1];
    row.insertCell(2).textContent = recordData[2];
    row.insertCell(3).textContent = recordData[3];
    row.insertCell(4).textContent = changed;
    row.insertCell(5).textContent = recordData[5];
    row.insertCell(6).textContent = result;

    if(document.getElementById("table").getElementsByTagName("tr").length === 102) {
        document.getElementById("table").deleteRow(101);
    }

    winsBox.textContent = "Wins: " + recordData[6];
    lossBox.textContent = "Losses: " + recordData[7];
    ratioBox.textContent = "Ratio: " + Math.round(recordData[6] * 100 / (recordData[6] + recordData[7])) + "%";
}

setUp()

function runSim() {
    var choice;
    var bool;

    if (document.getElementById("randomChoice").checked) {
        choice = 0;
    } else if (document.getElementById("stayChoice").checked) {
        choice = 1;
    } else if (document.getElementById("switchChoice").checked) {
        choice = 2;
    }

    if (choice == 1) {
        bool = false;
    } else {
        bool = true;
    }

    var plays = document.getElementById("numberChoice").value;

    var i = 0;
    while (i < plays) {
        i++;
        setUp();
        chooseDoor(Math.floor(Math.random() * 3));
        if (choice == 0) {
            if (Math.random() < .5) {
                bool = true;
            } else {
                bool = false;
            }
        }
        change(bool);
    }
}
