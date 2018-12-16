var logicSpawning = {

    spawn: function(availableEnergy) {
        if (isSpawning()) {
            return;
        }
        var harvesterCount = getCreepCount('harvester');
        var builderCount = getCreepCount('builder');
        var upgraderCount = getCreepCount('upgrader');
        var carrierCount = getCreepCount('carrier');
        
        if (needHarvesters(harvesterCount)) {
            console.log('Spawning harvester');
            spawnUnit('harvester', getUnitStrength());
        } else if (needBuilders(builderCount)) {
            console.log('Spawning builder');
            spawnUnit('builder', getUnitStrength());
        } else if (needCarriers(carrierCount)) {
            console.log('Spawning carrier');
            spawnUnit('carrier', getUnitStrength());
        } else if (needUpgraders(upgraderCount)) {
            console.log('Spawning upgrader');
            spawnUnit('upgrader', getUnitStrength());
        }
        
        //console.log('harvester creeps: ' + harvesterCount + '; builder creeps: ' + builderCount + '; upgrader creeps: ' + builderCount);
    }
}

function needHarvesters(harvesterCount) {
    if (Game.spawns['Spawn1'].room.controller.level == 1) {
        return harvesterCount < 2;
    } else {
        return harvesterCount < 3;
    }
}

function needBuilders(builderCount) {
    if (Game.spawns['Spawn1'].room.controller.level == 1) {
        return builderCount < 1;
    } else if (getExtensionCount() < 5) {
        return builderCount < 3;
    } else {
        return builderCount < 2;
    }
}

function needCarriers(carrierCount) {
    return carrierCount < Math.min(getCreepCount('builder') + getCreepCount('upgrader'),
                                   getCreepCount('harvester'));
}

function getUnitStrength() {
    if (Game.spawns['Spawn1'].room.energyCapacityAvailable <= 450) {
        return 1;
    } else if (Game.spawns['Spawn1'].room.energyCapacityAvailable <= 1000) {
        return 2;
    } else {
        return 3;
    }
}

function needUpgraders(upgraderCount) {
    if (getExtensionCount() == 5) {
        return upgraderCount < 3;
    } else if (Game.spawns['Spawn1'].room.controller.level < 2) {
        return upgraderCount < 1;
    } else {
        return upgraderCount < 2;
    }
}

function getExtensionCount() {
    var extensions = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
      filter: {structureType: STRUCTURE_EXTENSION}  
    });
    var extensionCount = 0;
    if (extensions && extensions.size > 0) {
        extensionCount = extensions.size;
    }
    return extensionCount;
}

function isSpawning() {
    return getFirstSpawn().spawning != null;
}

function spawnUnit(type, strength) {
    switch (type) {
        case 'harvester':
            if (!Memory.harvesterNr) {
                Memory.harvesterNr = 0;
            }
            Memory.harvesterNr++;
            if (strength == 1) {
                var body = [WORK, WORK, CARRY, MOVE];
            } else {
                var body = [WORK, WORK, WORK, CARRY, MOVE];
            }
            var newUnitName = spawnSpecifiedUnit(type, body, Memory.harvesterNr);
            if (Game.creeps[newUnitName]) {
                Game.creeps[newUnitName].memory.level = strength;
            }
            break;
        case 'builder':
            if (!Memory.builderNr) {
                Memory.builderNr = '0';
            }
            Memory.builderNr++;
            if (strength == 1) {
                var body = [WORK, CARRY, CARRY, MOVE];
            } else {
                var body = [WORK, WORK, CARRY, CARRY, MOVE];
            }
            var newUnitName = spawnSpecifiedUnit(type, body, Memory.builderNr);
            if (Game.creeps[newUnitName]) {
                Game.creeps[newUnitName].memory.level = strength;
            }
            break;
        case 'upgrader':
            if (!Memory.upgraderNr) {
                Memory.upgraderNr = '0';
            }
            Memory.upgraderNr++;
            if (strength == 1) {
                var body = [WORK, WORK, CARRY, MOVE];
            } else if (strength == 2) {
                var body = [WORK, WORK, WORK, CARRY, MOVE];
            } else {
                var body = [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE];
            }
            var newUnitName = spawnSpecifiedUnit(type, body, Memory.upgraderNr);     
            if (Game.creeps[newUnitName]) {
                Game.creeps[newUnitName].memory.level = strength;
            }
            break;
        case 'carrier':
            if (!Memory.carrierNr) {
                Memory.carrierNr = '0';
            }
            Memory.carrierNr++;
            if (strength == 1) {
                var body = [CARRY, CARRY, MOVE, MOVE];
            } else if (strength == 2) {
                var body = [CARRY, CARRY, MOVE, MOVE, MOVE];
            } else {
                var body = [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
            }
            var newUnitName = spawnSpecifiedUnit(type, body, Memory.carrierNr); 
            if (Game.creeps[newUnitName]) {
                Game.creeps[newUnitName].memory.level = strength;
            }
            break;
        default:
            console.log('BUG DETECTED! Attempting to spawn unknown unit type!');
            break;
    }
}

function spawnSpecifiedUnit(type, body, id) {
    var name = type + id;
    var spawn = getFirstSpawn();
    if (spawn.canCreateCreep(body, name) == OK) {
        console.log('Spawning unit of type: ' + type + ' with body: ' + body);
        var creepName = spawn.createCreep( body, name );
        Memory.creeps[name].role = type;
        return creepName;
    }
}

function getFirstSpawn() {
    for (var spawn in Game.spawns) {
        return Game.spawns[spawn];
    }
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

module.exports = logicSpawning;