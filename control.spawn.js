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
    var name = task.role + '_mk' + task.mark + ' #' + Game.time;
    var bodyParts = this.getBodyParts(task.role, task.mark);    
    var master = [task.master, this.getMasterType(task.master)];
    var expiration = Game.time + (bodyParts.length*3);
    
    Game.spawns[spawn].spawnCreep(bodyParts, name, {
        dryRun : dry,
        memory: {
            status: {action: 'spawning', expiration: expiration, destination: null,},
            role: task.role,
            master: master,
        }
    });
    return true;
},

getBodyParts: function(role, mark){
    switch (role) {
        case 'basic':
            switch (mark) {
                case 1:
                    return [WORK, CARRY, MOVE];
                // default:
                // console.log('This shouldnt happen: ' + role + ' mk ' + mark);
                //     break;
            }
            break;
        case 'harvester':
            switch (mark) {
                case 1:
                    return false;
                case 2:
                    return [WORK, CARRY, MOVE];
                case 3:
                    return [WORK, CARRY, MOVE];
                // default:
                // console.log('This shouldnt happen: ' + role + ' mk ' + mark);
                //     break;
            }
            break;
        case 'hauler':
            switch (mark) {
                case 1:
                    return [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
                // default:
                // console.log('This shouldnt happen: ' + role + ' mk ' + mark);
                //     break;
            }
            break;
    }
    console.log('This shouldnt happen: ' + role + ' mk ' + mark);
    return false;
},

getMasterType: function(masterID){
    let structure = Game.structures[masterID];
    if (structure === undefined) {
        return 'sources';
    } else {            
        let type = structure.structureType;
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
