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
        var zone = require('specials').getZoneName();
        var room = '';
        for (const spawn in Game.spawns) {
            if (room == '') {
                room = Game.spawns[spawn].room.name;
            }
        }
        console.log("NO ZONES! Try this:");
        console.log("require('console.manager').createZone('" + zone + "'); require('console.manager').addRoom('" + room + "', '" + zone + "')");
    };
    
    for (let i = 0; i < zones; i++) {
        zoneControl.run(i);        
    };

    
    // checkStaff.run(Game.creeps);
    var t1 = performance.now();
    console.log("Cycle performance: " + Game.cpu.getUsed() + " CPU in " + (t1 - t0) + " ms.")
};
