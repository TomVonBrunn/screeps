var roleHarvester = require('role.harvester');
var roleBuilderBasic = require('role.basic.builder');
var roleBuilderAdvanced = require('role.advanced.builder');
var roleUpgraderBasic = require('role.basic.upgrader');
var roleUpgraderAdvanced = require('role.advanced.upgrader');
var roleCarrier = require('role.carrier');
var logic = require('logic');


module.exports.loop = function () {

    logic.run();

    for (var name in Game.rooms) {
        //console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy');
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else if (creep.memory.role == 'builder') {
            if (creep.memory.level = 1 && creep.room.controller.level == 1) {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length) {
                    roleBuilderBasic.run(creep);
                } else {
                    roleHarvester.run(creep);
                }
            } else {
                roleBuilderAdvanced.run(creep);
            }
        } else if (creep.memory.role == 'upgrader') {
            //if (creep.memory.level == 1) {
               // roleUpgraderBasic.run(creep);
            //} else {
                roleUpgraderAdvanced.run(creep);
            //}
        } else if (creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
    }
}