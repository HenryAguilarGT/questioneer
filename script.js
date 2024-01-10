function addQuestion() {
        const newQuestionInput = document.getElementById('newQuestion');
        const questionText = newQuestionInput.value;

        if (questionText.trim() === '') {
            alert('Please enter a question before adding.');
            return;
        }

        const questionList = document.getElementById('questionList');
        const newQuestion = document.createElement('div');
        newQuestion.innerHTML = `
            <div class="mb-2">
                <span>${questionText}</span>
                <button type="button" class="btn btn-warning btn-sm ml-2" onclick="editQuestion(this)">Edit</button>
                <button type="button" class="btn btn-danger btn-sm ml-2" onclick="deleteQuestion(this)">Delete</button>
            </div>
        `;
        questionList.appendChild(newQuestion);

        newQuestionInput.value = ''; // Clear the input field
    }

    function saveQuestions() {
        const form = document.getElementById('questionForm');
        const formData = new FormData(form);
        const questionsArray = [];

        formData.getAll('question[]').forEach(question => {
            questionsArray.push(question);
        });

        const questionsText = questionsArray.join('\n');
        alert('Questions:\n' + questionsText);
    }

    function editQuestion(button) {
        const questionDiv = button.parentNode;
        const questionText = questionDiv.querySelector('span');

        const updatedQuestion = prompt('Edit the question:', questionText.textContent);
        if (updatedQuestion !== null) {
            questionText.textContent = updatedQuestion;
        }
    }

    function deleteQuestion(button) {
        const questionDiv = button.parentNode;
        questionDiv.parentNode.removeChild(questionDiv);
    }

    document.getElementById('newQuestion').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addQuestion();
        }
    });