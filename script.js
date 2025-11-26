document.addEventListener("DOMContentLoaded", () => {

    
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');

    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');

    const btnPrev = document.querySelector("#prev");
    const btnNext = document.querySelector("#next");
    const btnSend = document.querySelector("#send");

   
    const required = { btnOpenModal, modalBlock, closeModal, questionTitle, formAnswers, btnPrev, btnNext, btnSend };
    for (const [key, el] of Object.entries(required)) {
        if (!el) {
            console.error(`Не знайдено елемент id="${key}". Перевір HTML.`);
        }
    }

    
    if (typeof questions === "undefined") {
        console.error('Масив "questions" не знайдено! Підключи questions.js перед script.js');
        return;
    }

    let numberQuestion = 0;

   
    btnOpenModal.addEventListener("click", () => {
        modalBlock.classList.add("d-block");
        renderQuestion();
        updateButtons();
    });

    closeModal.addEventListener("click", () => {
        modalBlock.classList.remove("d-block");
    });

    btnPrev.addEventListener("click", () => {
        if (numberQuestion > 0) {
            numberQuestion--;
            renderQuestion();
            updateButtons();
        }
    });

    btnNext.addEventListener("click", () => {
        if (numberQuestion < questions.length - 1) {
            numberQuestion++;
            renderQuestion();
            updateButtons();
        }
    });

    btnSend.addEventListener("click", () => {
        alert("Ваш бургер готов!");
        modalBlock.classList.remove("d-block");
    });

    
    function renderQuestion() {

        if (!questions.length) {
            questionTitle.textContent = "Питання відсутні";
            formAnswers.innerHTML = "";
            return;
        }

        const current = questions[numberQuestion];

        questionTitle.textContent = current.question;
        formAnswers.innerHTML = "";

        const type = current.type === "checkbox" ? "checkbox" : "radio";
        const name = "answer_" + numberQuestion;

        current.answers.forEach((answer, i) => {
            const id = `answer${numberQuestion}_${i}`;

            formAnswers.innerHTML += `
                <div class="answers-item d-flex flex-column p-2">
                    <input 
                        type="${type}" 
                        id="${id}" 
                        name="${type === "radio" ? name : id}" 
                        class="d-none"
                        value="${answer.title}"
                    >
                    <label for="${id}" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src="${answer.url}" alt="${answer.title}">
                        <span>${answer.title}</span>
                    </label>
                </div>
            `;
        });
    }

    function updateButtons() {

        btnPrev.classList.toggle("d-none", numberQuestion === 0);
        btnNext.classList.toggle("d-none", numberQuestion === questions.length - 1);
        btnSend.classList.toggle("d-none", numberQuestion !== questions.length - 1);
    }

});