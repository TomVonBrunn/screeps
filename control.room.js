
var spawnControl = require('control.spawn');

var exportCode = {
    run: function(roomName){
        var room = Memory.rooms[roomName];
        var task = room.task;
        this.checkSpawning(room);
        this.runSources(room);
        this.runController(room);

        console.log('Next in que: ' + task.role + ' for ' + task.master + ' with priority ' + task.priority);
        if (task.priority == 0) {
            return;
        }
        for (let spawn in room.spawns) {
            var response = spawnControl.run(spawn, task);
            switch (response) {
                case true:                    
                    task.priority = spawn;
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
                console.log('Spawn lacking energy for required task');
            }
        }
    },

    runSources: function(room){
        var sourceControl = require('control.source');
        var task = room.task;
        task.role = 'none';
        task.priority = 0;
        task.master = 'none';
        task.mark = Game.getObjectById(room.controller.id).level;
        var sources = room.sources;
        for (let sourceID in sources) {
            var source = sources[sourceID];
            sourceControl.run(source);
            if (task.priority < source.task[1]){
                task.priority = source.task[1];
                task.role = source.task[0];
                task.master = sourceID;
            }
        }
    },

    runController: function(room){
        var controllerControl = require('control.controller');
        var task = room.task;
        var controller = room.controller;
        controllerControl.run(controller);
        if (task.priority < controller.task[1]){
            task.priority = controller.task[1];
            task.role = controller.task[0];
            task.master = controller.id;
        }
    },
};
module.exports = exportCode;