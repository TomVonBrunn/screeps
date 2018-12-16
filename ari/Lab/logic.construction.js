var logicConstruction = {
    
    construct: function() {
        var targets = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
        if(!targets.length || targets.length == 0) {
            if (!buildRoad()) {
                createNewExtension();
            }
        }
       console.log(Game.spawns['Spawn1'].pos);
    }
}

function buildRoad() {
    console.log('Attempting to build a road...');
    var sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
    var result = false;
    if (sources.length) {
        var resourcePosition = sources[0].pos;
        var spawnPosition = Game.spawns['Spawn1'].pos;
        console.log('Building road from: ' + spawnPosition + ' to: ' + resourcePosition);
        var path = Game.spawns['Spawn1'].room.findPath(spawnPosition, resourcePosition, {ignoreCreeps: true});
        for (i = 0; i < path.length; i++) {
            if (buildRoadTile(path[i].x, path[i].y)) {
                result = true;
            }
        }
    }
    return result;
}

function buildRoadTile(x, y) {
    var result = Game.spawns['Spawn1'].room.createConstructionSite(x, y, STRUCTURE_ROAD) == OK;
    console.log('Building road tile on coordinates: ' + x + '-' + y + ' result: ' + result);
    return result;
}

function createNewExtension() {
    if (!Memory.extensions) {
        Memory.extensions = 0;
    }
    Memory.extensions++;
    
    var x = Game.spawns['Spawn1'].pos.x - 1;
    var y = Game.spawns['Spawn1'].pos.y;
    var counter = 1;
    var result;
    while(OK != (result = Game.spawns['Spawn1'].room.createConstructionSite(x, y, STRUCTURE_EXTENSION))) {
        console.log('Cannot create a new extension! Reason: ' + result);
        x--;
        if (counter > 10) {
            break; //A very inefficient way of not constructing something
        }
        if (counter > 5) {
            x = Game.spawns['Spawn1'].pos.x - 1;
            y--;
        }
        counter++;
    }
    
    
    console.log('Creating new extension');
}

module.exports = logicConstruction;