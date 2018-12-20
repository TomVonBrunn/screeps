
var spawnControl = require('control.spawn');

var exportCode = {    
    // RUN parameter = element z Memory.zone[i].rooms    

    run: function(roomName){
        var room = Memory.rooms[roomName];
        var task = room.task;
        this.checkSpawning(room);
        this.runSources(room);

        //check tasks that have been assigned to spawns last turn - assign creeps to masters        
        console.log('Next in que: ' + task.role + ' for ' + task.master + ' with priority ' + task.priority);
        if (task.priority == 0) {
            return;
        }
        
        // offer priorityTask to spawns
        for (let spawn in room.spawns) {
            var response = spawnControl.run(spawn, task);
            switch (response) {
                case true:                    
                    task.priority = spawn; // block task in memory         .....here it rewrites task in memory.sources.source.task
                    break;
                case false:
                    break;            
                default:                    
                    break;
            }
        }
    },
    checkSpawning: function(room){
        var task = room.task;
        let spawn = task.priority;
        if (typeof spawn == 'string') {
            spawn = Game.spawns[spawn];
            if (spawn.spawning) {
                // StructureSpawn.Spawning; can only get name of creep, write to devs and complain
                // https://docs.screeps.com/api/#StructureSpawn-Spawning
                let creepName = spawn.spawning.name;
                let creep = Game.creeps[creepName];
                switch (creep.memory.master[1]) {
                    case 'controller':                
                        room.controller.slaves.push(creep.name);
                        break;
                    case 'spawns':
                        room.spawns[creep.memory.master[0]].slaves.push(creep.name);
                        break;
                    case 'sources':
                        room.sources[creep.memory.master[0]].slaves.push(creep.name);
                        break;
                    default:
                        console.log('WARNING! Could not find master for creep.name ' + creep);
                        break;
                }
            } else {
                console.log('Spawn lacking energy');
            }
        }
    },

    runSources: function(room){
        var sourceControl = require('control.source');
        var task = room.task;
        task.role = 'none';
        task.priority = 0;
        task.master = 'none';
        var sources = room.sources;
        for (let sourceID in sources) {
            var source = sources[sourceID];
            sourceControl.run(source);
            // Creates list of available tasks in memory (sourceIDs with available tasks)
            // remove once reliable
            if (task.priority < source.task[1]){
                task.priority = source.task[1];
                task.role = source.task[0];
                task.master = sourceID;
            }
        }
    },

    // Problém je, že ke spawnování dojde až příští kolo. Co s tím? 
    // Do blokovaného tasku umístit info o spawnu, přiští kolo updatnout zdroje a creepy ve spawnech. 
    // Blokovaný task se uvolní na hned na začátku nového kola a source může předat nový úkol.
    };
    module.exports = exportCode;