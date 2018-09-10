'use strict';

function PlayerService () {
    const vm = this;
    vm.playerHealth = 3;

    vm.getPlayerHealth = () => {
        return vm.playerHealth;
    }

    vm.setPlayerHealth = (value) => {
        vm.playerHealth = value;
    }

    vm.resetPlayer = () => {
        vm.playerHealth = 3;
    }

    vm.updateHealthDisplay = (id) => {
        document.getElementById(id).innerHTML = "";
        for (let i = 0; i < vm.playerHealth; i++) {
            document.getElementById(id).insertAdjacentHTML('afterbegin', '<img class="img__heart" src="/public/img/heart.png"></img>');
        }
    }
}

angular.module('app').service('PlayerService', PlayerService);