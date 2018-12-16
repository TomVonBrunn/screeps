var logicSpawning = require('logic.spawning');
var logicConstruction = require('logic.construction');

var logic = {
    run: function() {
        if (enoughEnergy()) {
            logicSpawning.spawn(getAvailableEnergy());
        }
        logicConstruction.construct();
    }
}

function enoughEnergy() {
    var energyCapacity = Game.spawns['Spawn1'].room.energyCapacityAvailable;
    if (energyCapacity >= 450) {
        return fullEnergy();
    } else {
        return getAvailableEnergy() >= energyCapacity * 0.65;
    }
}

//Remark: Calculated only for single spawn!
function fullEnergy() {
    var room = getFirstRoom();
    var energyAvailable = getAvailableEnergy();
    var energyCapacity = Game.spawns['Spawn1'].room.energyCapacityAvailable;
    if (energyAvailable > energyCapacity) {
        console.log('BUG DETECTED! Energy higher than maximum capacity!');
    } else {
        //console.log('Energy available: ' + energyAvailable + '/' + energyCapacity);
    }
    return energyAvailable == energyCapacity;
}

function getAvailableEnergy() {
    return getFirstRoom().energyAvailable;
}

function getFirstRoom() {
    for (var name in Game.rooms) { 
        return Game.rooms[name];
    }
}

module.exports = logic;