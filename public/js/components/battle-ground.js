'use strict';

const battleGround = {
    template: `
    <section ng-hide="$ctrl.gameOver" class="section__health" id="id__health"></section>
    <section class="timer">
        <p id="timer">{{ $ctrl.counter }} seconds left</p>
    </section>
    <section class="question__container">
        <section ng-show="$ctrl.gameOver" class="section__game-over">Game Over</section>
        <img class="img__battle-ground__back-ground" src="./img/island.png">
        <section ng-if="$ctrl.answered === false">
            <p class="trivia__question"> {{ $ctrl.quizQuestion }} </p>
            <section class="answers"> 
                <div ng-repeat="answer in $ctrl.answers" ng-class="{'answered': $ctrl.answered}" >
                <button ng-value="answer" ng-click="$ctrl.userChooseAnswer(answer)" ng-class="answer === $ctrl.correctAnswer ? 'correct' : 'incorrect'">
                    {{ answer }}
                </button>
                </div>
            </section>
        </section>
        <section class="text_container" ng-if="$ctrl.answered === true">
            <p class="answer_text">{{ $ctrl.answerText }}</p>
            <button ng-hide="$ctrl.gameOver" class="next_question_button" ng-click="$ctrl.nextQuestion()">{{ $ctrl.button }}</button>
        </section>
    </section>
    `,

    controller: ["TriviaService", "PlayerService", "$location", "$timeout", "$interval", function(TriviaService, PlayerService, $location, $timeout, $interval) {
        const vm = this;
        vm.id = "id__health";
        vm.gameOver = false;
        vm.answerCounter = 0;
        vm.correctAnswers = 0;
        vm.incorrectAnswers = 0;
        vm.answered = false;
        vm.button = "Next Question";
        vm.counter = PlayerService.counter;
        vm.counter = 30;

        PlayerService.updateHealthDisplay(vm.id);

        vm.countDown = () => {
            vm.counter--;
        }

        vm.timer = () => {
            if (vm.counter > 0) {
                $interval(vm.countDown, 1000);
            }    
        } 
        
        

        vm.getNextQuestion = () => {
            if (PlayerService.battles < 3) {
                TriviaService.getEasyQuestions().then((response) => {
                    vm.getQuestions(response);
                });
            } else if (PlayerService.battles >= 3 && PlayerService.battles < 6) {
                TriviaService.getMediumQuestions().then((response) => {
                    vm.getQuestions(response);
                });
            } else if (PlayerService.battles >= 6) {
                TriviaService.getHardQuestions().then((response) => {
                    vm.getQuestions(response);
                });
            }
        }
        vm.getNextQuestion();
        
        vm.getQuestions = (response) => {
            vm.questions = response.results;
            vm.randomIndex = Math.floor(Math.random() * vm.questions.length);
            vm.correctAnswer = response.results[vm.randomIndex].correct_answer;
            console.log(vm.correctAnswer);
            console.log(PlayerService.battles);
            vm.quizQuestion = response.results[vm.randomIndex].question;
            vm.answers = response.results[vm.randomIndex].incorrect_answers;
            vm.answers.push(response.results[vm.randomIndex].correct_answer);
            vm.answers.sort(function(a, b) { return 0.5 - Math.random() });
        }

        vm.userChooseAnswer = (hit) => {

            vm.answered = true;
            vm.answerCounter += 1;
            if (hit === vm.correctAnswer) {
                vm.answerText = "You answered correctly Great job!";
                vm.correctAnswers++;
                
                if (vm.correctAnswers === 2) {
                    PlayerService.setPlayerHealth(PlayerService.playerHealth += 1);
                }
                
                
            } else {
                vm.answerText = "You answered the question wrong! Try again!";
                vm.incorrectAnswers++;
                if (vm.incorrectAnswers === 2) {
                    PlayerService.setPlayerHealth(PlayerService.playerHealth -= 1);
                }
                if (PlayerService.playerHealth === 0) {
                    vm.gameOver = true;
                    
                    $timeout(() => {
                        PlayerService.resetPlayer();
                        $location.path('/intro');
                    }, 5000);
                }
            }
            if (vm.answerCounter === 2) {
                vm.button = "Continue Story"
                PlayerService.battles += 1;
                if (PlayerService.battles > 8) {
                    $location.path("/victory");
                }
            }
        }

        vm.nextQuestion = () => {
            vm.answered = false;
            vm.getNextQuestion();
            if (vm.answerCounter === 2) {
                $location.path("/map");
            }
        }
    }]
};


angular.module('app').component('battleGround', battleGround);