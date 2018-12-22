var exportCode = {
 
createZone: function(_zone)
{
    if (!Memory.zones) {
        Memory.zones = [];
    }
    for (let i = 0; i < Memory.zones.length; i++) {
        if (Memory.zones[i].name == _zone) {
            return console.log("Create zone error: Zone " + _zone + " already exists");                
        }
    }
    let newZone = { name: _zone, rooms: Array(), room_objects: Array(),};
        Memory.zones.push(newZone);
        return console.log("Create zone success: Zone " + _zone + " created");
},

// DONE
deleteZone: function(_zone)
{
    for (let i = 0; i < Memory.zones.length; i++) {
        if (Memory.zones[i].name == _zone) {
            Memory.zones.splice(i, 1);
            return console.log("Delete zone success: Zone " + _zone + " removed.");            
        }
    }
    console.log("Delete Zone ERROR: Zone " + _zone + " not found.");
    return this.listZones();
},

// DONE
listZones: function()
{
    let zones = "List of existing zones:"
    for (let i = 0; i < Memory.zones.length; i++) {
        zones += " " + Memory.zones[i].name;        
    }
    return zones;
},

//DONE
addRoom: function(_roomID, _zone, force = 0, exclusive = 0) // IN: object ID, zone name, 
{
    
    var zoneID = this.getZoneID(_zone);
    // var object = Game.getObjectById(_objectID);
    var roomName = Game.rooms[_roomID]?_roomID:Game.getObjectById(_roomID).room.name;

    if (!roomName) {
        console.log('ERROR ADD ROOM; enter room name or object ID');
        return false;
    }
    if (zoneID === false) {
        console.log('ERROR addRoom; Zone not found');
        return false;
    }
    if (Memory.zones[zoneID].rooms.includes(roomName) && !(force == 1 && exclusive == 1)) {
        console.log('INFO addRoom: room ' + roomName + ' already registered in zone ' + _zone);
        return false;
    }

    var roomAdded = this.addRoom_step1(roomName, zoneID, force, exclusive);
    if (roomAdded) {
        this.setRoomMemory(roomName);
    }
    return console.log("SUCCESS Room added, memory set. Go get'em!");
},

// ADDS ROOM OR NOT; Exclusive turned on by default = room in 1 zone max
addRoom_step1: function(room, zoneID, force = 0, exclusive = 1)
{
    var registeredUnder = [];
    var registeredUnderNames = [];
    for (let i in Memory.zones) {        
        if (Memory.zones[i].rooms.includes(room)) {
            registeredUnder.push(i);
            registeredUnderNames.push(Memory.zones[i].name);
        }
    }

    if (registeredUnder.length > 0) {    
        if (force != 1) {
            console.log('ERROR addRoom: Room already registered under different zones: ' + registeredUnderNames);
            console.log('Add parameters "force" and "exclusive" for other options');
            return false;             
        } else {
            if (exclusive == 1) {
                // remove room registration from all zones that have it
                for (let i = 0; i < registeredUnder.length; i++) {
                    let index = registeredUnder[i];
                    let position = Memory.zones[index].rooms.indexOf(roomName);
                    Memory.zones[index].rooms.splice(position, 1);
                }
                    
                Memory.zones[zoneID].rooms.push(room);
                console.log('SUCCESS addRoom: room registered now only under this zone. Removed from ' + registeredUnderNames);
                return true;
            } else {         
                Memory.zones[zoneID].rooms.push(room);
                registeredUnderNames.push(Memory.zones[zoneID].name);
                console.log('SUCCESS addRoom; room now registered in this and other zones:' + registeredUnderNames);
                return true;
            }
        }
    } else {
        Memory.zones[zoneID].rooms.push(room);
        return true;
    }
},

// SETS ROOM MEMORY
setRoomMemory: function(roomName)
{
    if (typeof Memory.rooms[roomName] !== 'undefined') {
        console.log("%cAddRoom CODE ALERT; Room memory already existed. It got rewritten. Check it out.", "color:yellow")
    }

    Memory.rooms[roomName] = {
        controller: {
            id: Game.rooms[roomName].controller.id,
            slaves: [],
            task: {},
        },
        spawns: {}, // reset
        sources: {},
        task: {},  // FEATURE ROOM.TASKS        
    };

    Game.rooms[roomName].find(FIND_MY_STRUCTURES,{filter: (s) => s.structureType == STRUCTURE_SPAWN}).forEach(spawn => {
        Memory.rooms[roomName].spawns[spawn.name] = {
            task: null,
        };
    })
    
    let sources = Game.rooms[roomName].find(FIND_SOURCES);
    let x = 1;
    sources.forEach(source => {
        Memory.rooms[roomName].sources[source.id] = {
            name: roomName + '_energy_' + x,
            slaves: [],
            task: null,
        };
        x++;
    });
},

// REMOVE ROOM from all zones by default, clears memory
removeRoom: function(_roomID, _zone = 1)
{
    var roomName = Game.rooms[_roomID]?_roomID:Game.getObjectById(_roomID).room.name;
    switch (_zone) {
        case 1:
        var registeredUnder = [];
            for (let i in Memory.zones) {
                if (Memory.zones[i].rooms.includes(roomName)) {
                    registeredUnder.push(Memory.zones[i].name);
                    let position = Memory.zones[i].rooms.indexOf(roomName);
                    Memory.zones[i].rooms.splice(position, 1);
                }
            }   
            console.log("SUCCESS remove room:Room " + roomName + " unregistered from all zones: " + registeredUnder);
             // getObjectById(roomName).memory.zone = null; // hierarchie
            break;
        case 0:
            console.log('Remove Room Error: please specify which zone should drop the room, or type 1 to remove from all zones');
            break;    
        default:
            let zoneID = this.getZoneID(_zone);
            let position = Memory.zones[zoneID].rooms.indexOf(roomName);
            Memory.zones[zoneID].rooms.splice(position, 1);
            console.log("SUCCESS remove room: room: " + roomName + " removed from zone: " + _zone);
            // getObjectById(roomName).memory.zone = null; // hierarchie
            break;
    }
    this.removeRoomMemory(roomName);
},

removeRoomMemory: function(roomName)
{
    if (Memory.rooms[roomName]) {
        delete Memory.rooms[roomName];
    }
},

// Return index in memory.zones[index] belonging to the zone name passed
getZoneID: function(_zone)
{
    for (let i = 0; i < Memory.zones.length; i++) {
        if (Memory.zones[i].name == _zone) {
            return i;          
        }
    }
    console.log("ERROR: Zone " + _zone + " not found.");
    return false;
},

getRoomsByZone: function(_zone)
{
    for (let i = 0; i < Memory.zones.length; i++) {
        if (Memory.zones[i].name == _zone) {
            return memory.zones[i].rooms;          
        }
    }
    return console.log("ERROR: Zone " + _zone + " not found.");  
},

// room name or  room object ID
getSpawnsByRoom: function(_room)
{
    var room = Game.rooms[_room]?_room:Game.getObjectById(_roomID).room.name;
    if (!room) {
        console.log("ERROR fetching room by ID;");
        return false;
    }
    return room.spawns;
},

getSpawnsByZone: function(_zone)
{
    var rooms = this.getRoomsByZone(_zone);
    var spawns = [];
    for (let r = 0; r < rooms.length; r++) {
        spawns.concat(this.getSpawnsByRoom(rooms[r]));
    }        
    return spawns; 
},

};
module.exports = exportCode;
