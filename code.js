MicroModal.init();
let xVaiO = "x";
let uzvarasIespējas = [
    [0, 1, 2], // 1.rinda
    [3, 4, 5], // 2.rinda
    [6, 7, 8], // 3.rinda
    [0, 3, 6], // 1.kolonna
    [1, 4, 7], // 2.kolonna
    [2, 5, 8], // 3.kolonna
    [0, 4, 8], // 1.diagonāle
    [2, 4, 6], // 2.diagonāle
];

function sautKonfeti() {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
}

function parbauditUzvaru() {
    uzvarasIespējas.forEach((iespēja, kartasNumurs) => {
        let x = 0;
        let o = 0;
        iespēja.forEach((index) => {
            if (document.querySelectorAll(".poga")[index].innerText === "x") {
                x++; // palielina x par 1
            } else if (document.querySelectorAll(".poga")[index].innerText === "O") {
                o++; // palielina o par 1
            }
        });
        if (x === 3) {
            //alert("Uzvarēja X");
            document.querySelector('.uzvaretajs').innerText = 'X';
            MicroModal.show('modal-1');
            sautKonfeti();

        }
        else if (o === 3) {
            document.querySelector('.uzvaretajs').innerText = 'O';
            MicroModal.show('modal-1');
            sautKonfeti()
        }
        if (x === 3 || o === 3) {
            document.querySelector(".linijas").style.display = "block";
            document.querySelectorAll(".linijas line")[
                kartasNumurs
            ].style.display = "block";
        }
    });
}

function datoraGajiens() {
    let brivieLauki = [];
    document.querySelectorAll('.poga').forEach((poga, index) => {

        if (poga.innerHTML === '&nbsp;') {
            brivieLauki.push(index);
        }
    })
    const nejaushLauks = Math.floor(Math.random() * brivieLauki.length);
    const randomGajiens = brivieLauki[nejaushLauks];
    const randomPoga = document.querySelectorAll('.poga')[randomGajiens];           
    randomPoga.innerText = xVaiO;
    randomPoga.disabled = true;

    if (xVaiO === "x") {
        xVaiO = "O";
    } else {
        xVaiO = "x";
    }
    parbauditUzvaru();

}


const pogas = document.querySelectorAll(".poga");
console.log(pogas);
pogas.forEach((poga) => {
    poga.addEventListener("click", () => {
        poga.innerText = xVaiO;
        poga.disabled = true;
        if (xVaiO === "x") {
            xVaiO = "O";
            datoraGajiens();
        } else {
            xVaiO = "x";
        }
        parbauditUzvaru();
    });
});