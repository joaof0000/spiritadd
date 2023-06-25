// Array to store the questions
const questions = [
    'How much and what did you view?',
    'Describe what happened?',
    'What were the triggers in this situation?',
    'What were the thoughts in your brain?',
    'What permissions, excuses, or justifications did your brain come up with to act on your desire?',
    'Did you allow the urge?',
    'What worked and what didn’t?',
    'Are you experiencing shame? If yes, why?',
    'How can you challenge those shame-producing thoughts?',
    'What will you do next time?',
    'Any observations or thoughts?'
  ];
  
  let currentQuestionIndex = 0;
  const answers = {};
  
  // Function to display the current question
  function displayQuestion() {
    const currentQuestion = document.getElementById(`question-${currentQuestionIndex + 1}`);
    currentQuestion.style.display = 'block';
  }
  
  // Function to hide the current question
  function hideQuestion() {
    const currentQuestion = document.getElementById(`question-${currentQuestionIndex + 1}`);
    currentQuestion.style.display = 'none';
  }
  
  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault();
  
    const answerInput = document.getElementById(`question-${currentQuestionIndex + 1}-input`);
    const answer = answerInput.value;
    answers[currentQuestionIndex] = answer;
  
    answerInput.value = '';
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex === questions.length) {
      displayCollectedResults();
      sendEmail();
    } else {
      hideQuestion();
      displayQuestion();
    }
  }
  
  // Function to display the collected questions and answers
  function displayCollectedResults() {
    const collectedResultsDiv = document.getElementById('collected-results');
    collectedResultsDiv.innerHTML = '';
  
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const answer = answers[i];
  
      const questionResult = document.createElement('div');
      questionResult.innerHTML = `<strong>${question}:</strong> ${answer}`;
  
      collectedResultsDiv.appendChild(questionResult);
    }
  
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.style.display = 'block';
  }
  
  // Function to send email with answers
function sendEmail() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value;
  
    // Configure the email transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your-email@gmail.com',  // Replace with your email address
        pass: 'your-password'          // Replace with your email password
      }
    });
  
    // Compose the email
    const mailOptions = {
      from: 'your-email@gmail.com',     // Replace with your email address
      to: 'joaoifilipe@gmail.com',      // Add your email address here
      subject: 'User-generated Answers',
      text: JSON.stringify(answers, null, 2)
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        alert('Email sent successfully!');
      }
    });
  }
  
  // Populate the questions container
  const questionsContainer = document.getElementById('questions-container');
  questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.id = `question-${index + 1}`;
    questionDiv.className = 'question';
  
    const label = document.createElement('label');
    label.htmlFor = `question-${index + 1}-input`;
    label.textContent = question;
    questionDiv.appendChild(label);
  
    const input = document.createElement('input');
    input.id = `question-${index + 1}-input`;
    input.className = 'answer-input';
    input.type = 'text';
    questionDiv.appendChild(input);
  
    questionsContainer.appendChild(questionDiv);
  });
  
  // Attach form submission handler
  const form = document.getElementById('questionnaire-form');
  form.addEventListener('submit', handleSubmit);
  
  // Display the first question
  displayQuestion();
  