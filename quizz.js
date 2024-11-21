
    // Questions and answers
    const questions = [
      {
        question: "Over the last two weeks, how often have you been bothered by little interest or pleasure in doing things?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
      },
      {
        question: "Over the last two weeks, how often have you been feeling down, depressed, or hopeless?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
      },
      {
        question: "Over the last two weeks, how often have you had trouble falling or staying asleep, or sleeping too much?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
      },
      {
        question: "Over the last two weeks, how often have you felt tired or had little energy?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
      },
      {
        question: "Over the last two weeks, how often have you felt bad about yourself – or that you are a failure or have let yourself or your family down?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
      },
      {
        question: "Over the last two weeks, how often have you had trouble concentrating on things, such as reading the newspaper or watching television?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
      },
      {
        question: "Over the last two weeks, how often have you moved or spoken so slowly that other people could have noticed? Or the opposite – being so fidgety or restless that you have been moving around a lot more than usual?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
      },
      {
        question: "Over the last two weeks, how often have you had thoughts that you would be better off dead or of hurting yourself in some way?",
        options: ["Not at all", "Several days", "More than half the days", "Nearly every day"]
      }
    ];

    let currentQuestionIndex = 0;
    let userAnswers = [];
    let selectedQuestions = [];

// begin......
    function startQuiz() {
      const age = document.getElementById('age').value;
      const gender = document.getElementById('gender').value;
      
      if (!age || !gender) {
        alert('Please fill in all fields.');
        return;
      }

    
      document.getElementById('initialForm').style.display = 'none';
      document.getElementById('questionContainer').style.display = 'block';
      document.getElementById('nextButton').style.display = 'inline-block';

      
      selectedQuestions = getRandomQuestions();
      loadQuestion();
    }

    function getRandomQuestions() {
      let randomQuestions = [];
      let selectedIndexes = [];
      
      while (randomQuestions.length < 6) {
        let index = Math.floor(Math.random() * questions.length);
        if (!selectedIndexes.includes(index)) {
          randomQuestions.push(questions[index]);
          selectedIndexes.push(index);
        }
      }
      return randomQuestions;
    }

    function loadQuestion() {
      const questionContainer = document.getElementById('questionContainer');
      const currentQuestion = selectedQuestions[currentQuestionIndex];
      
      questionContainer.innerHTML = '';
      
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');
      questionDiv.innerHTML = `<p>${currentQuestionIndex + 1}. ${currentQuestion.question}</p>`;

      const optionsDiv = document.createElement('div');
      optionsDiv.classList.add('options');

      currentQuestion.options.forEach((option, i) => {
        optionsDiv.innerHTML += `
          <label>
            <input type="radio" name="q${currentQuestionIndex}" value="${i}" onclick="saveAnswer(${i})">
            ${option}
          </label>
        `;
      });

      questionDiv.appendChild(optionsDiv);
      questionContainer.appendChild(questionDiv);
      questionContainer.style.display = 'block';

      document.getElementById('loader').style.display = 'none'; 
    }

    // Saves
    function saveAnswer(answer) {
      userAnswers[currentQuestionIndex] = answer;
    }

    // next ques.
    function nextQuestion() {
      if (userAnswers[currentQuestionIndex] === undefined) {
        alert('Please select an answer.');
        return;
      }

      currentQuestionIndex++;

      if (currentQuestionIndex < selectedQuestions.length) {
        loadQuestion();
      } else {
        showResult();
      }
    }

    // result
    function showResult() {
      const score = userAnswers.reduce((acc, answer) => acc + answer, 0);
      let resultText = '';

      if (score <= 6) {
        resultText = 'You are experiencing minimal to no depression symptoms.';
      } else if (score <= 12) {
        resultText = 'You may be experiencing mild depression symptoms. Consider seeking support.';
      } else if (score <= 18) {
        resultText = 'You may be experiencing moderate depression symptoms. It could be helpful to talk to a professional.';
      } else {
        resultText = 'You may be experiencing severe depression symptoms. It is important to consult with a healthcare provider.';
      }

      document.getElementById('result').innerText = resultText;
      document.getElementById('nextButton').style.display = 'none'; 
    }

    // Load the quizz
    window.onload = function() {
      document.getElementById('initialForm').style.display = 'block';
    };
