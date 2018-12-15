// var spawnControl = require('control.spawn');
// var sourceControl = require('control.source');
var zoneControl = require('control.zone');

module.exports.loop = function () {
    var t0 = performance.now();
    console.log('_____ CYCLE ' + Game.time + ' _____');
    if (!Memory.timer) {
        Memory.timer = Game.time;
    } else if (Memory.timer == Game.time - 10) {
        Memory.timer = Game.time;
    };

    // RUN ZONES
    var zones = typeof Memory.zones !== 'undefined' ? Memory.zones.length : 0;
    if (zones == 0) { 
        console.log("NO ZONES! Try these:");
        console.log("require('manager').createZone('zoneX'); require('manager').addRoom('sim', 'zoneX')");
    };
    
    for (let i = 0; i < zones; i++) {
        zoneControl.run(i);        
    };

    
    // checkStaff.run(Game.creeps);
    var t1 = performance.now();
    console.log("Cycle performance: " + (t1 - t0) + " milliseconds.")
};
