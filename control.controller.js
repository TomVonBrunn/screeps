// spawny kontroluji svuj stav, aktualizace tasku, 
// otazka hierarchie: informace dostanou ze zony, nebo si je mohou vyhledat sami?

var exportCode = {   

    run: function(controller) 
    {
        controller.task = this.checkStaff(controller.slaves);
    },
    
        // sub ke kontrole existence sluhu, promazani mrtvych, a vraci ukol, najde-li nedostatek
    checkStaff: function(slaves) 
    {
        const UPGRADER = 1;
    
        var upgrader = 0;
        
        var length = slaves.length?slaves.length:0;
        if (length == 0) {
            return ['upgrader',4];
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
            
        var testGM1 = performance.now();
            this.giveMission(slave); 
            
        var testGM2 = performance.now();
        console.log(slave +  " performance: " + (testGM2 - testGM1) + " ms.")
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
            // console.log(self + ' is bored');
            // var roleUpgrader = require('role.upgrader');
                break;
            case 'basic':
                var basicRole = require('role.basic');
                basicRole.run(slave);
                break;
            default:
                console.log('Creep role defaulted: ' + slave);
        }
        return;
    },
       
        
    };
    module.exports = exportCode;