// Function Constructor

// // let john = {
// //   name: 'John',
// //   yearOfBirth: 1990,
// //   job: 'teacher',
// // }

// let Person = function(name, yearOfBirth, job) {
//   this.name = name;
//   this.yearOfBirth = yearOfBirth;
//   this.job = job;
// }

// Person.prototype.calculateAge = function() {
//   return 2018 - this.yearOfBirth;
// }

// let john = new Person('John', 1990, 'teacher');  //instantiation

// console.log(john.calculateAge()) ;

// let jane = new Person('Jane', 1996, 'designer');
// let mark = new Person('Mane', 1987, 'retired');

//=====================================================
//  Object.create

function Question (question, options, correctAnswer) {
  this.question = question;
  this.options = options;
  this.correctAnswer = correctAnswer;
}

let question1 = new Question('What is the most famous programming language in the world?', ['Python', 'JS', "Ruby"], 1);

let question2 = new Question('which JS framework is the best?', ['React', 'Vue', "Angular"], 0);

let questions = [question1, question2];

Question.prototype.game = function() {
  console.log(this.question);

  for(let i = 0; i < this.options.length; i++) {
    console.log(`${i}: `, this.options[i]);
  }

}

Question.prototype.checkAnswer = function(answer) {
  if(Number(answer) === this.correctAnswer) {
    console.log('Correct Answer!');
  } else {
    console.log('Wrong answer', ` Correct answer was ${this.correctAnswer}`);
  }
}

function game() {
  
  let randomNumber = Math.floor(Math.random() * questions.length);

  
  questions[randomNumber].game();  
  
  let answer = prompt(questions[randomNumber].question);


  console.log(`You answered: ${answer}`);

  questions[randomNumber].checkAnswer(answer);

  game();
}

game();
