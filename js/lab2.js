//--------------------------------------------task 1----------------------------------

// change blocks' content 4 and 5
function task1() {
    let content4 = document.getElementById("content4");
    let content5 = document.getElementById("content5");
    let temp = content4.innerHTML;
    content4.innerHTML = content5.innerHTML;
    content5.innerHTML = temp;
}


//--------------------------------------------task 2----------------------------------
// calculate ellipse area
// output in block 3
function task2() {
    let block3 = document.getElementById("block3");
    let r1 = prompt("Введіть перший радіус овала: r1 = ", "0");
    let r2 = prompt("Введіть другий радіус овала: r2 = ", "0");
    let s = Math.PI * r1 * r2;
    let result = `<b>Площа овала </b>з радіусами ${r1} та ${r2} дорівнює ${s.toFixed(2)}`;
    let el = document.getElementById("resultTask2");
    if (el == null) {
        el = document.createElement("div");
        el.id = "resultTask2";
        el.setAttribute("class", "output");
        el.innerHTML = result;
        block3.appendChild(el);
    } else {
        el.innerHTML = result;
    }
}

//--------------------------------------------task 3----------------------------------
function task3CountWords() {
    let inputStr = document.getElementById("input-text3").value;
    let count = inputStr.trim().split(/\s+/).length;
    document.cookie = `countWords=${count}`;
    document.cookie = `textTask3=${inputStr}`;
    alert(`Введений текст складається з ${count} слів`);
}

function afterLoad() {
    task3ReadCookies();
    task4ReadStorage();
}

function task3ReadCookies() {
    let obj = document.getElementById('form3');
    let countWords = getCookie('countWords');
    let strText3 = getCookie('textTask3');
    if (countWords === undefined) {
        obj.style.display = "block"; // show element
    } else {
        obj.style.display = "none"; // hide element
        dialogClearCookies(strText3, countWords);
        document.getElementById("input-text3").value = "";  // or  =strText3
        window.location.reload(); 	                                 // update
    }
}

function dialogClearCookies(strText, count) {
    let r = confirm(`В cookies strText3, countWords збережено текст та інформацію про кількість слів у тексті\ncountWords = ${count} (слів)\nОчистити cookies?`);
    if (r === true) {
        document.cookie = "countWords=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
        document.cookie = "strText3=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    } else {
        dialogClearCookies(strText, count);
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

//--------------------------------------------task 4----------------------------------
function task4() {
    let c3 = document.getElementById('checkblock3').checked;
    let c4 = document.getElementById('checkblock4').checked;
    let c5 = document.getElementById('checkblock5').checked;
    changeStyle(c3, c4, c5);
    localStorage.setItem("stor3", c3);
    localStorage.setItem("stor4", c4);
    localStorage.setItem("stor5", c5);
}

function changeStyle(c3, c4, c5) {
    if (c3) {
        document.getElementById("block3").style.textAlign = "left";
    } else {
        document.getElementById("block3").style.textAlign = "center";
    }
    if (c4) {
        document.getElementById("block4").style.textAlign = "left";
    } else {
        document.getElementById("block4").style.textAlign = "center";
    }
    if (c5) {
        document.getElementById("block5").style.textAlign = "left";
    } else {
        document.getElementById("block5").style.textAlign = "center";
    }
}

function task4ReadStorage() {
    let s3 = localStorage.getItem('stor3') === 'true';
    let s4 = localStorage.getItem('stor4') === 'true';
    let s5 = localStorage.getItem('stor5') === 'true';

    document.getElementById('checkblock3').checked = s3;
    document.getElementById('checkblock4').checked = s4;
    document.getElementById('checkblock5').checked = s5;
    changeStyle(s3, s4, s5);
}


//--------------------------------------------task 5----------------------------------
function selectBlock() {
    let sel = document.getElementById('select3');
    addTextArea(sel.selectedIndex);
    sel.value = 0;		// встановити селектор на 0 елемент для повторного визову одного й того ж блоку
}

function addTextArea(blockNumber) {
    let wr = document.getElementById("wrapper" + blockNumber)
    let btRest = document.getElementById("btnRestore" + blockNumber)
    if (wr != null) {
        wr.style.display = "block"
        btRest.style.display = "none"
    } else {
        let block = document.getElementById("block" + blockNumber);
        let htmlValue = block.innerHTML;
        let wraper = document.createElement("div");
        let input = document.createElement("textarea");
        let btnSave = document.createElement("button");
        let btnRestore = document.createElement("button");
        wraper.class = "wrapper";
        wraper.id = "wrapper" + blockNumber;
        input.name = "aname" + blockNumber;
        input.id = "input" + blockNumber;
        input.maxLength = 5000;
        input.rows = 10;
        input.value = htmlValue;
        btnSave.id = "btnSave" + blockNumber;
        btnSave.innerText = "Save block" + blockNumber;
        btnRestore.id = "btnRestore" + blockNumber;
        btnRestore.innerText = "Restore block" + blockNumber;

        btnSave.onclick = function () {
            block.innerHTML = input.value;
            block.style.fontStyle = "italic";
            localStorage.setItem("htmlText" + blockNumber, htmlValue);
            block.appendChild(btnRestore);
        };

        btnRestore.onclick = function () {
            block.innerHTML = localStorage.getItem("htmlText" + blockNumber);
            block.style.fontStyle = "normal";
        };

        wraper.appendChild(input); //appendChild
        block.appendChild(wraper);
        block.appendChild(btnSave);
    }
}