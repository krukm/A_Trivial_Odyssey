'use strict';

const victory = {
    template: `
    <section class="section__victory">
        <h1 class="h1__winner">YOU WIN!!!</h1>
        <section class="section__wide-scroll">
            <p class="p__credits" id="id__credits"></p>   
        </section>
        <button class="button__play-again" type="button" ng-click="$ctrl.resetGame();">PLAY AGAIN?</button>
    </section>
    `,
    controller: ['$location', 'PlayerService', function($location, PlayerService) {
        const vm = this;
        vm.i = 0;
        vm.speed = 40;

        vm.resetGame = () => {
            PlayerService.resetPlayer();
            $location.path('/intro');
        }

        vm.storyText = "You've completed your quest! The gods stood no chance before your awesome might. You delight in your family's reunion, and look to the horizon...";

        vm.typeWriter = () => {
            if (vm.i < vm.storyText.length) {
                document.getElementById("id__credits").innerHTML += vm.storyText.charAt(vm.i);
                vm.i++;
                setTimeout(vm.typeWriter, vm.speed);
            }
        }

        vm.typeWriter();
    }]
}

angular.module('app').component('victory', victory);