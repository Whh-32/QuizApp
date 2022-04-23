let btnContinue = document.querySelector(".btn-continue");
let quizBox = document.querySelector(".quiz-box");
let quizBoxTest = document.querySelector(".quiz-box-test");
let timer = document.querySelector(".timer");
let optionBox = document.querySelector(".options")
let btnNext = document.querySelector(".next-question");
let numberOfQustion = document.querySelector(".numberQustion");
let scoreJs = document.querySelector(".scoreJs");
let result = document.querySelector(".result")
let pagenum = document.querySelector(".page-number");
let correctAnswer = 0;
let setTimer;



//get qustion after click next
let ask = document.querySelector(".ask");
let answer = document.querySelectorAll(".answer");
let numberQustin = 0;


function qustion() {
    ask.textContent = questions[numberQustin].nember + questions[numberQustin].asks;
    for (let k = 0; k < 4; k++) {
        answer[k].children[1].textContent = questions[numberQustin].options[k];
    }
}


btnContinue.addEventListener('click', () => {
    buttomContinue();
    timerFunction();
    clickAnswer();
    autoAnswer();
    qustion(numberQustin);

});


function buttomContinue() {
    quizBox.style.display = "none"
    quizBoxTest.style.display = "block"

}


function timerFunction() {
    timer.style.width = "0%";
    setTimeout(() => {
        timer.classList.add("activeTimer");
        timer.style.width = "100%"
    }, 0);
}


function autoAnswer() {
    setTimer = setTimeout(() => {
        btnNext.classList.add("activeButtom");
        optionBox.style.pointerEvents = "none";
        for (let i = 0; i < 4; i++) {
            if (answer[i].children[1].textContent == questions[numberQustin].answers) {
                answer[i].classList.add("trueAnswer");
                answer[i].children[2].classList.add("true");
            }
        }

    }, 15000)
}


function clickAnswer() {

    answer.forEach(element => {
        element.addEventListener("click", () => {
            //stop timer when click on option
            let timerWidth = timer.offsetWidth
            timer.style.width = timerWidth + "px";
            clearTimeout(setTimer);                     //for dont qustion number +2 after timer and click


            //check answers true or false
            if (element.children[1].textContent == questions[numberQustin].answers) {
                element.classList.add("trueAnswer");
                element.children[2].classList.add("true");
                optionBox.style.pointerEvents = "none";
                correctAnswer++;

            }

            else {
                element.classList.add("falseAnswer");
                element.children[2].classList.add("false");
                optionBox.style.pointerEvents = "none";

                for (let i = 0; i < 4; i++) {
                    if (answer[i].children[1].textContent == questions[numberQustin].answers) {
                        answer[i].classList.add("trueAnswer");
                        answer[i].children[2].classList.add("true");

                    }
                }
            }

            //active next buttom for next qustion
            btnNext.classList.add("activeButtom");

        });
    });
}


btnNext.addEventListener("click", () => {
    if (numberQustin < questions.length - 1) {
        numberQustin++;
        qustion(numberQustin);
    
        for (let i = 0; i < 4; i++) {
            answer[i].classList.remove("trueAnswer", "falseAnswer");
            answer[i].children[2].classList.remove("true", "false");
        }
    
        optionBox.style.pointerEvents = "all";
        timer.classList.remove("activeTimer");
        pageNumber();
        timerFunction();
        autoAnswer();
        btnNext.classList.remove("activeButtom");
    }

    else {
        let average = questions.length / 2;
        let comment = document.querySelector(".comment");
        console.log(average)

        scoreJs.textContent = correctAnswer;
        numberOfQustion.textContent = questions.length;
        quizBoxTest.style.display = "none";
        result.style.display = "flex";
        if (correctAnswer > average) {
            comment.textContent = "The score is good"
        }
        else {
            comment.textContent = "The score is poor!"
        }
    }

});


let page = 1
function pageNumber() {
    if (page < questions.length) {
        page++;
        pagenum.textContent = page;
    }

}
