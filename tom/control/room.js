var sourceControl = require('control.source');
var spawnControl = require('control.spawn');

var exportCode = {    
    // RUN parameter = element z Memory.zone[i].rooms
    run: function(roomName){
        var room = Memory.rooms[roomName];
        var tasks = room.tasks;
        var sources = room.sources;
        var priorityTask = ['none', 0];

        //check tasks that have been assigned to spawns last turn - assign creeps to masters
        for (let task in tasks) {
            let spawn = tasks[task][1];
            if (typeof spawn == 'string') {
                spawn = Game.spawns[spawn];
                if (spawn.spawning) {
                    let creepName = spawn.spawning.name;
                    let creep = Game.creeps[creepName];
                    let master = Game.getObjectById(creep.memory.master);
                    switch (master.structureType) {
                        case 'controller':                
                            room.controller.slaves.push(creep.name);
                            break;
                        case 'spawn':
                            room.spawns[master.name].slaves.push(creep.name);
                            break;
                        case undefined:
                            room.sources[task].slaves.push(creep.name);
                            break;
                        default:
                            console.log('WARNING! Could not find master for creep.name ' + creep);
                            break;
                    }
                } else {
                    console.log('Spawn lacking energy');
                }
            tasks[task] = ['none', 0];  
            }
        }

        for (let sourceID in sources) {
            var source = sources[sourceID];
            sourceControl.run(source);
            let sourceTaskPriority = source.task[1];

            // Creates list of available tasks in memory (sourceIDs with available tasks)
            // remove once reliable
                tasks[sourceID] = source.task;
                if (priorityTask[1] < sourceTaskPriority){                    
                priorityTask = [sourceID, sourceTaskPriority];
                }
        }
        console.log('Next in que: ' + tasks[priorityTask[0]] + ' for ' + priorityTask[0]);
        if (priorityTask[1] == 0) {
            return;
        }
        
        // offer priorityTask to spawns
        for (let spawn in room.spawns) {
            var response = spawnControl.run(spawn, priorityTask[0]);
            switch (response) {
                case true:                    
                    room.tasks[priorityTask[0]][1] = spawn; // block task in memory         .....here it rewrites task in memory.sources.source.task
                    break;
                case false:
                    break;            
                default:                    
                    break;
            }
        }
    },

    // Problém je, že ke spawnování dojde až příští kolo. Co s tím? 
    // Do blokovaného tasku umístit info o spawnu, přiští kolo updatnout zdroje a creepy ve spawnech. 
    // Blokovaný task se uvolní na hned na začátku nového kola a source může předat nový úkol.
    };
    module.exports = exportCode;