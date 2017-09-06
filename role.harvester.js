var roleHarvester = {

  /** @param {Creep} creep **/
  run: function (creep) {
    if (creep.carry.energy < creep.carryCapacity) {
      var sources = creep.room.find(FIND_SOURCES);
      // console.log('creep.pos(): ', creep.pos.x);
      let nearestSourceDistance = null;
      let nearestSource = null;
      sources.forEach(
        (source) => {
          const distance = Math.sqrt(Math.pow(creep.pos.x - source.pos.x, 2) + Math.pow(creep.pos.y - source.pos.y, 2))
          if (nearestSourceDistance === null || nearestSourceDistance > distance) {
            nearestSourceDistance = distance;
            nearestSource = source;
          };
          if (creep.name === 'Harvester1') {
            console.log(`${source.pos.x} ${source.pos.y} distance: ${distance}`);
            console.log(`nearestSource: ${nearestSource.pos.x} ${nearestSource.pos.y}`);
          }
        });
      creep.moveTo(nearestSource, { visualizePathStyle: { stroke: '#ffaa00' } });
    }
    else {
      console.log('creep.carry.energy > creep.carryCapacity');
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
      });
      console.log(`targets.length: ${targets.length}`);
      if (targets.length > 0) {
        targets.forEach(
          (target) => {
            console.log('target: ', target);
          })
        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
      }
    }
  }
};

module.exports = roleHarvester;
