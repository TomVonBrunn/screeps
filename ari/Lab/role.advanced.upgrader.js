var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.carry.energy == 0) {
            //Wait for supply
            return;
        }

        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
        
	}
};

module.exports = roleUpgrader;