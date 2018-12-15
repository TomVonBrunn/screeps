// spawny kontroluji svuj stav, aktualizace tasku, 
// otazka hierarchie: informace dostanou ze zony, nebo si je mohou vyhledat sami?

var exportCode = {   

run: function(source) 
{
    var sitrep = this.checkStaff(source.slaves); // vraci tásky
    source.task = sitrep;
},

    // sub ke kontrole existence sluhu, promazani mrtvych, a vraci ukol, najde-li nedostatek
checkStaff: function(slaves) 
{
    const HARVESTER = 1;
    // const COURIER = 2;

    var harvester = 0;
    var courier = 0;
    
    var length = slaves.length?slaves.length:0;
    if (length == 0) {
        return ['basic',3];
    }
    
    for (let i = 0; i < length; i++) {
        let slave = Game.creeps[slaves[i]];
        if (!slave) {
            source.memory.slaves.splice(i, 1);
            i--;
            continue;
        } else {
            switch (slave.memory.role) {
                case 'harvester':
                    harvester++;
                    break;                    
                case 'courier':
                    courier++;
                    break;
            }
        }
        // po filtrovani a zapocitani udeli misi
        this.giveMission(slave); 
    }
    
    if (harvester < HARVESTER) {
        return ['harvester', 2];
    }
    // if (courier < COURIER) {
    //     return 'courier';
    // }
    return ['none', 0];
},

giveMission: function(slave) { 
    switch (slave.memory.role) {

        case 'harvester':
            var harvesterRole = require('role.harvester');
            harvesterRole.run(slave);
            // roleHarvester.run(slave);

            // if (!slave.memory.inposition) {
            //     var pathToTarget = findPathToTarget(game.getSourceById(sourceID));
            //     if (pathToTarget.distance = 1) {
            //         slave.memory.inposition = 1;
            //     } else {
            //     slave.move.pathToTarget;
            //     }
            // }
            // if () {   
            //     slave.mine(game.getSourceById(sourceID))
            // }
            break;
        case 'carrier':
            // var roleHarvester = require('role.carrier');

            // if (transfer_error) { //    !distance(position(self), memory.mission) = 1 { // mozna radsi kontrolovat transfer error
            //     moveTo(slave.memory.target);
            // } else {
            //     switch (memory.mission) {
            //         case 'load': 
            //             slave.memory.target = getTarget(slave); // if target is the same, transfer happens
            //             if (!transfer_error) {
            //                 transfer;
            //             }
            //         }
            //     }
            break;
        case 'courier':
            // if (transfer_error) { //    !distance(position(self), memory.mission) = 1 { // mozna radsi kontrolovat transfer error
            //     moveTo(target);
            // } else {
            //     switch (memory.mission) {
            //         case 'load': 
            //             target = getTarget(memory.mission, self.energy); // if target is the same, transfer happens
            //             if (!transfer_error) {
            //                 transfer;
            //             }
            //     }
            // }
            break;
        case 'builder':
            break;
        case 'upgrader':
        // var roleUpgrader = require('role.upgrader');
            break;
        case 'basic':
            var basicRole = require('role.basic');
            basicRole.run(slave);
            break;
        default:
            console.log(self + ' is bored');
    }
    return;
},
        // function getTarget(slave) {
        //     switch (slave.memory.role) {
        //         case 'carrier':
        //             switch (slave.memory.mission) {
        //                 case 'load':
        //                     slave.memory.target = getPosition(getslaveById(slave.memory.load));
        //                     break;
        //                 case 'drop':
        //                     containers = room.getStructures;
        //                     // to do: order by range
        //                     for (var i in containers) {
        //                         if ((containers[i].maxEnergy - containers[i].energy) >= slave.Energy) {
        //                             slave.memory.target = getPosition(containers[barrel]);
        //                             break;
        //                         }
        //                     }
        //                     console.log('slave couldnt empty itself - no empty containers found');                    
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