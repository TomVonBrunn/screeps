var roleBasic = {

    /** @param {Creep} creep **/
    run: function(creep) {
        switch (creep.memory.status.action) {
            case 'basic':
                this.doBasicStuff(creep);
                break;
            case 'upgrade':
                this.upgrade(creep);
                break;
            case 'spawning' :
                if (creep.memory.status.expiration <= Game.time) {
                    creep.memory.status.action = 'basic';
                    creep.memory.status.expiration = 0;
                }
                break;
            default:
                break;
        }
    },
    
    /** @param {Creep} creep **/
    doBasicStuff: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var source = Game.getObjectById(creep.memory.master[0]);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                creep.memory.status.action = 'upgrade';
                this.upgrade(creep);
            }
        }
        return;
    },

    /** @param {Creep} creep **/
    upgrade: function(creep) {
        var status = creep.memory.status;

        if(creep.carry.energy == 0) {
        status.action = 'basic';
        creep.say('🐹');
        return;
        }

        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
        return;
    }
};

module.exports = roleBasic;