var roleCarrier = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.donating) {
            if(creep.carry.energy == 0) {
                creep.memory.donating = null;
                creep.memory.targetBuilding = null;
                creep.memory.target = null;
            }
        }
	    if(creep.carry.energy < creep.carryCapacity && !creep.memory.donating) {
	        creep.memory.target = null;
	        creep.memory.targetBuilding = null;
	        var harvesters = getCreeps('harvester');
	        if (harvesters) {
    	        for (i=0; i < harvesters.length; i++) {
    	            var harvester = Game.creeps[harvesters[i]];
    	            if (harvester.carry.energy >= 5) {
    	                creep.say('Give me!');
    	                if (harvester.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    	                    creep.moveTo(harvester, {visualizePathStyle: {stroke: '#ff00aa'}});
    	                }
    	            }
    	        }
	        }
        } else {
            if (!creep.memory.target && !creep.memory.targetBuilding) {
                console.log('carrier searching for target...');
                if (!donateToSpawning(creep)) {
                    if (!donateToBuilder(creep)) {
                        donateToUpgrader(creep);
                    }
                }
            } else if (creep.memory.target) {
                var target = Game.creeps[creep.memory.target];
                console.log('target: ' + target)
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ff00aa'}});
                } else {
                    creep.memory.target = null;
                }
            } else if (creep.memory.targetBuilding) {
                console.log('bop');
                var targetBuilding = Game.getObjectById(creep.memory.targetBuilding);
                
                console.log('targetBuilding: ' + targetBuilding)
                if (creep.transfer(targetBuilding, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetBuilding, {visualizePathStyle: {stroke: '#ff00aa'}});
                } else {
                    creep.memory.targetBuilding = null;
                }                
            }
        }
	}
};

function donateToSpawning(creep) {
    var targets = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
        filter: (target) => {
            return (target.structureType == STRUCTURE_SPAWN || target.structureType == STRUCTURE_EXTENSION) 
                && target.energy < target.energyCapacity;
        }
        
    });
    if (targets.length > 0) {
        creep.memory.donating = true;
        creep.memory.targetBuilding = targets[0].id;
        console.log('carrier donating to spawning building');
        return true;
    } else {
        console.log('carrier: spawns are full');
        return false;
    }
}

function donateToBuilder(creep) {
    if (getCreepCount('builder') == 0) {
        return;
    }
    var builders = getCreeps('builder');
    for (i=0; i < builders.length; i++) {
        var builder = Game.creeps[builders[i]];
        if (builder.carry.energy <= builder.carryCapacity - 20) {
            creep.say('Have some!');
            creep.memory.target = builder.name;
            creep.memory.donating = true;
            creep.moveTo(builder, {visualizePathStyle: {stroke: '#ff00aa'}});
            return true;
        }
    }
    return false;
}

function donateToUpgrader(creep) {
    if (getCreepCount('upgrader') == 0) {
        return;
    }
    var upgraders = getCreeps('upgrader');
    for (i=0; i < upgraders.length; i++) {
        var upgrader = Game.creeps[upgraders[i]];
        if (upgrader.carry.energy <= upgrader.carryCapacity - 20) {
            creep.say('Have some!');
            creep.memory.target = upgrader.name;
            creep.memory.donating = true;
            creep.moveTo(upgrader, {visualizePathStyle: {stroke: '#ff00aa'}});
            return true;
        }
    }
    return false;
}

function getCreeps(type) {
    var creeps = [getCreepCount(type)];
    var counter = 0;
    for (var creep in Game.creeps) {
        if (Memory.creeps[creep].role == type) {
            creeps[counter] = creep;
            counter++;
        }
    }
    return creeps;
}

function getCreepCount(type) {
    var count = 0;
    for (var creep in Game.creeps) {
        if (Memory.creeps[creep].role == type) {
            count++;
        }
    }
    return count;
}


module.exports = roleCarrier;