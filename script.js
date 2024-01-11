function addQuestion() {
        const newQuestionInput = document.getElementById('newQuestion');
        const newContextInput = document.getElementById('newContext');

        const questionText = newQuestionInput.value;
        const contextQuestionText = newContextInput.value;

        if (questionText.trim() === '') {
            alert('Please enter a question before adding.');
            return;
        }

        const questionList = document.getElementById('questionList');
        const newQuestion = document.createElement('div');
        newQuestion.innerHTML = `
            <div class="mb-2 py-2" style="background-color: #f2f2f2;padding: 10px;border-radius: 1vw;">
                <span><strong>Question:</strong> ${questionText}</span>
                <div><strong>Context:</strong> ${contextQuestionText}</div>
                <button type="button" class="btn btn-warning btn-sm ml-2" onclick="editQuestion(this)">Edit</button>
                <button type="button" class="btn btn-danger btn-sm ml-2" onclick="deleteQuestion(this)">Delete</button>
            </div>
        `;
        questionList.appendChild(newQuestion);

        newQuestionInput.value = ''; // Clear the input fields
        newContextInput.value = '';

        newQuestionInput.focus(); // Move the cursor back to the first input
    }

    function saveQuestions() {
        const questionList = document.getElementById('questionList');
        const questionsArray = [];

        questionList.querySelectorAll('span').forEach(question => {
            const context = question.nextElementSibling.textContent.replace('Context: ', '').trim();
            questionsArray.push(`${question.textContent}\nContext: ${context}`);
        });

        const questionsText = questionsArray.join('\n');
        console.log('Questions Text:', questionsText);

        // Create a Blob containing the questions
        const blob = new Blob([questionsText], { type: 'text/plain' });

        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'questions.txt';

        // Append the link to the body
        document.body.appendChild(downloadLink);

        // Click the link programmatically
        downloadLink.click();

        // Remove the link from the DOM after a short delay
        setTimeout(() => {
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(blob);
        }, 100);
    }

    function editQuestion(button) {
        const questionDiv = button.parentNode;
        const questionText = questionDiv.querySelector('span');
        const contextQuestionText = questionDiv.querySelector('div');

        const updatedQuestion = prompt('Edit the question:', questionText.textContent);
        if (updatedQuestion !== null) {
            questionText.textContent = updatedQuestion;
            const updatedContext = prompt('Edit the context question:', contextQuestionText.textContent.replace('Context: ', '').trim());
            contextQuestionText.textContent = `Context: ${updatedContext}`;
        }
    }

    function deleteQuestion(button) {
        const questionDiv = button.parentNode;
        questionDiv.parentNode.removeChild(questionDiv);
    }

    document.getElementById('newQuestion').addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            addQuestion();
        }
    });

    document.getElementById('newContext').addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            addQuestion();
        }
    });