'use strict';

const map = {
    template: `
    <section class="map__canvas">
        <canvas id="canvas"></canvas>
        <section class="img__container">
            <section class="section__health" id="id__health">
                <player-health></player-health>
            </section>
            <section class="story__container">
                <p id="story" class="story"></p>
                <button ng-if="$ctrl.fightButton" ng-click="$ctrl.fight()" class="fight">fight!</button>
            </section>
        </section>
    </section>
    <section class="bottom__map--nav">
        <section>
            <button class="button__instructions" ng-click="$ctrl.instructions()">INSTRUCTIONS</button>
            <button class="button__info" ng-click="$ctrl.info()">CHARACTER BIO'S</button>
            <button class="button__intro" ng-click="$ctrl.intro()">INTRO</button>
        </section>
        <button class="skip__button" ng-click="$ctrl.skip()">SKIP</button>
    </section>   
    `,

    controller: ["PlayerService", "EnemyService", "$location", "$timeout", "$interval", function(PlayerService, EnemyService, $location, $timeout, $interval) {

        const vm = this;
        vm.id = "id__health";
        vm.i = 0;
        vm.speed = 60;
        vm.fightButton = false;
        vm.canvas = document.querySelector('canvas');
        vm.canvas.width = 800;
        vm.canvas.height = 600;
        vm.gctx = vm.canvas.getContext("2d");
        

        vm.fight = () => {
            $location.url("/battle-ground");
        }

        vm.intro = () => {
            $location.url("/intro");
        }

        vm.instructions = () => {
            $location.url('/instructions');
        }

        vm.info = () => {
            $location.url('/characters');
        }
        
        vm.skip = () => {
            vm.fightButton = true;
            vm.speed = 0;
        }
        
        vm.draw = (startX, startY, endX, endY) => {
            vm.amount = 0;
            $interval(function() {
                vm.amount += 0.01; // change to alter duration
                if (vm.amount > 1) vm.amount = 1;
                vm.gctx.clearRect(0, 0, vm.canvas.width, vm.canvas.height);
                vm.gctx.strokeStyle = "red";
                vm.gctx.setLineDash([5, 5]);
                vm.gctx.lineWidth = 5;
                vm.gctx.moveTo(startX, startY);
                vm.gctx.lineTo(startX + (endX - startX) * vm.amount, startY + (endY - startY) * vm.amount);
                vm.gctx.stroke();
            }, vm.speed);
        }

        switch (PlayerService.battles) {
            case 0:
                vm.storyText = EnemyService.cerberus;
                break;
            case 1:
                vm.storyText = EnemyService.hades;
                vm.draw(80, 470, 160, 365);
                break;
            case 2:
                vm.storyText = EnemyService.sirens;
                vm.gctx.moveTo(80, 470);
                vm.gctx.lineTo(160, 365);
                vm.gctx.stroke();
                vm.draw(160, 365, 220, 260);
                break;
            case 3:
                vm.storyText = EnemyService.poseidon;
                vm.gctx.moveTo(80, 470);
                vm.gctx.lineTo(160, 365);
                vm.gctx.lineTo(220, 260);
                vm.gctx.stroke();
                vm.draw(220, 260, 45, 260);
                break;
            case 4:
                vm.storyText = EnemyService.achilles;
                vm.gctx.moveTo(80, 470);
                vm.gctx.lineTo(160, 365);
                vm.gctx.lineTo(220, 260);
                vm.gctx.lineTo(45, 260);
                vm.gctx.stroke();
                vm.draw(45, 260, 115, 195);
                break;
            case 5:
                vm.storyText = EnemyService.polyphemus;
                vm.gctx.moveTo(80, 470);
                vm.gctx.lineTo(160, 365);
                vm.gctx.lineTo(220, 260);
                vm.gctx.lineTo(45, 260);
                vm.gctx.lineTo(115, 195);
                vm.gctx.stroke();
                vm.draw(115, 195, 395, 330);
                break;
            case 6:
                vm.storyText = EnemyService.prometheus;
                vm.gctx.moveTo(80, 470);
                vm.gctx.lineTo(160, 365);
                vm.gctx.lineTo(220, 260);
                vm.gctx.lineTo(45, 260);
                vm.gctx.lineTo(115, 195);
                vm.gctx.lineTo(395, 330);
                vm.gctx.stroke();
                vm.draw(395, 330, 530, 540);
                break;
            case 7:
                vm.storyText = EnemyService.hercules;
                vm.gctx.moveTo(80, 470);
                vm.gctx.lineTo(160, 365);
                vm.gctx.lineTo(220, 260);
                vm.gctx.lineTo(45, 260);
                vm.gctx.lineTo(115, 195);
                vm.gctx.lineTo(395, 330);
                vm.gctx.lineTo(530, 540);
                vm.gctx.stroke();
                vm.draw(530, 540, 740, 300);
                break;
            case 8:
                vm.storyText = EnemyService.zeus;
                vm.gctx.moveTo(80, 470);
                vm.gctx.lineTo(160, 365);
                vm.gctx.lineTo(220, 260);
                vm.gctx.lineTo(45, 260);
                vm.gctx.lineTo(115, 195);
                vm.gctx.lineTo(395, 330);
                vm.gctx.lineTo(530, 540);
                vm.gctx.lineTo(740, 300);
                vm.gctx.stroke();
                vm.draw(740, 300, 720, 240);
                break;
        }

        vm.typeWriter = () => {
            if (vm.i < vm.storyText.length) {
                document.getElementById("story").innerHTML += vm.storyText.charAt(vm.i);
                vm.i++;
                $timeout(vm.typeWriter, vm.speed);
            } else {
                vm.fightButton = true;
            }
        }

        vm.typeWriter();

        // vm.gctx.strokeStyle = "red";
        //     vm.gctx.setLineDash([5, 5]);
        //     vm.gctx.lineWidth = 5;
        //     vm.gctx.lineDashOffset = -vm.offset
        //     vm.gctx.beginPath();
        //     //Cerebus
        //     vm.gctx.moveTo(80, 470);
        //     // Hades
        //     vm.gctx.lineTo(160, 365);
        //     // Sirens
        //     vm.gctx.lineTo(105, 345);
        //     vm.gctx.lineTo(220, 260);
        //     // Poseidon
        //     vm.gctx.lineTo(45, 260);
        //     // Athena
        //     vm.gctx.lineTo(115, 195);
        //     // Achilles
        //     vm.gctx.lineTo(300, 160);
        //     vm.gctx.lineTo(395, 330);
        //     // Cyclops
        //     vm.gctx.lineTo(530, 540);
        //     // Promethus
        //     vm.gctx.lineTo(730, 520);
        //     vm.gctx.lineTo(740, 300);
        //     // Mountain
        //     vm.gctx.lineTo(720, 240);
        //     // Zeus
        //     vm.gctx.lineTo(740, 55);
        //     vm.gctx.stroke();
    }]
}

angular.module('app').component('map', map);