var exportCode = {
    
    // room = Memory.rooms[roomName]; 
run: function(spawn, task) {
    var Spawn = Game.spawns[spawn];

    if (!Spawn.spawning) {
        let canSpawn = this.spawnCreep(task, spawn, true);
        if (canSpawn != true) {
             return false;           
        }
        this.spawnCreep(task, spawn);
        return true;  
    } 
    return null;
},

spawnCreep: function(task, spawn, dry = false){
    let master = [task.master, this.getMasterType(task.master)];

    switch (task.role) {
        case 'basic':
            Game.spawns[spawn].spawnCreep([WORK, CARRY, MOVE], 'Basic' + Game.time, {
                dryRun : dry,
                memory: {
                    status: 'spawning',
                    role: 'basic',
                    master: master,
                }
            });                
            break;
        case 'harvester':
            Game.spawns[spawn].spawnCreep([WORK, CARRY, MOVE], 'Harvester' + Game.time, {
                dryRun : dry,
                memory: {
                    status: 'spawning',
                    role: 'harvester',
                    master: master,
                }
            });                
            break;
    
        default:
        console.log('spawnCreep switch defaulted');
            break;
    }

    return true;
},

getMasterType: function(masterID){
    let type = Game.structures[masterID];        
    if (typeof type == 'undefined') {
        return 'sources';
    } else {            
        type = type.structureType;
        switch (type) {
            case 'controller':
                return 'controller';
            case 'spawn':
                return 'spawns';
            default:
                console.log('Couldnt define master type');
                break;
        }
    }
    // depends on how  to locate masters in the room memory
    // spawn and controler are structures, sources are not

}



// ZVAZIT
// v zavislosti na roli a stavu creepa vyhodnoti spravny cil pro akci, kterou ma creep v pameti
//
// getTarget(creep) {
//     switch (creep.memory.role) {
//         case 'carrier':
//             switch (creep.memory.mission) {
//                 case 'load':
//                     creep.memory.target = getPosition(getCreepById(creep.memory.load));
//                     break;
//                 case 'drop':
//                     containers = room.getStructures;
//                     // to do: order by range
//                     for (var i in containers) {
//                         if ((containers[i].maxEnergy - containers[i].energy) >= creep.Energy) {
//                             creep.memory.target = getPosition(containers[barrel]);
//                             break;
//                         }
//                     }
//                     console.log('creep couldnt empty itself - no empty containers found');                    
//                     break;
//                 default:
//                     console.log('carrier has trouble with its mission. Default drop initiated');
//             }
//             break;
//         default:
//         console.log('role missing in getTarget');
//     }
// }

};
module.exports = exportCode;
