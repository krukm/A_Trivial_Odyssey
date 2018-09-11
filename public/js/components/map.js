'use strict';

const map = {
    template: `
    <section class="map__canvas">
        <canvas id="canvas"></canvas>
        <section class="img__container">
            <section class="section__health" id="id__health"></section>
            <section class="story__container"><p class="story">Zeus has followed your journey from the Underworld, across the ocean and your encounters with the Cyclops and Prometheus. “I did not expect you to make it this far. You are still a mere mortal”. A lighting bolt appears in his hand. Zeus is the last thing standing between you and your loved ones!</p></section>
        </section>
            
            
            `,
            
    // 
    // <img id="map__bg" src="/public/img/map.png">
    controller: ["PlayerService", function(PlayerService) {
        
        const vm = this;
        vm.id = "id__health";
        
        PlayerService.updateHealthDisplay(vm.id);

        vm.draw = () => {
        vm.canvas = document.querySelector('canvas');
        vm.gctx = vm.canvas.getContext("2d");
        vm.canvas.width = 800;
        vm.canvas.height = 600;
        vm.offset = 0;
        
            vm.gctx.strokeStyle = "red";
            vm.gctx.setLineDash([5,5]);
            vm.gctx.lineWidth = 5;
            vm.gctx.lineDashOffset = -vm.offset
            vm.gctx.beginPath();
            //Cerebus
            vm.gctx.moveTo(80,470);
            // Hades
            vm.gctx.lineTo(160,365);
            // Sirens
            vm.gctx.lineTo(105,345);
            vm.gctx.lineTo(220,260);
            // Poseidon
            vm.gctx.lineTo(45,260);
            // Athena
            vm.gctx.lineTo(115,195);
            // Achilles
            vm.gctx.lineTo(300,160);
            vm.gctx.lineTo(395,330);
            // Cyclops
            vm.gctx.lineTo(530,540);
            // Promethus
            vm.gctx.lineTo(730,520);
            vm.gctx.lineTo(740,300);
            // Mountain
            vm.gctx.lineTo(720,240);
            // Zeus
            vm.gctx.lineTo(740,55);
            vm.gctx.stroke();
        }   
        function march() {
            vm.offset++;
            if (vm.offset > 16) {
              vm.offset = 0;
            }
            vm.draw();
            setTimeout(march, 20);
          }
          march();
        
        // let background = new Image();
        // background.src = '/public/img/map.png';
        // vm.background.onload = function() {
        //     vm.gctx.drawImage(background, 0, 0);
        // }
        // vm.background.onload();
        // console.log(vm.canvas);
        
    }]
}

angular.module('app').component('map', map);