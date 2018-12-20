var roomControl = require('control.room');

var exportCode = {

// RUN zone receives Memory.zones[i]
run: function(zoneID){
    var zone = Memory.zones[zoneID];

    zone.rooms.forEach(room => {
        roomControl.run(room);

    });
},

};
module.exports = exportCode;