const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');

module.exports.loop = function () {

  // var tower = Game.getObjectById('9467fe3518b6a2744d7b0c71');
  // if (tower) {
  //   var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
  //     filter: (structure) => structure.hits < structure.hitsMax
  //   });
  //   if (closestDamagedStructure) {
  //     tower.repair(closestDamagedStructure);
  //   }

  //   var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  //   if (closestHostile) {
  //     tower.attack(closestHostile);
  //   }
  // }

  const creepCount = {harvester: 0, upgrader: 0, builder: 0};
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
      creepCount.harvester += 1;
    }
    if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
      creepCount.upgrader += 1;
    }
    if (creep.memory.role == 'builder') {
      roleHarvester.run(creep);
      creepCount.builder += 1;
    }
  };
  let h = 3 - creepCount.harvester;
  while (h > 0) {
    Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE], `Harvester${h}`, { role: 'harvester' } );
    h -= 1;
  }
  let u = 3 - creepCount.upgrader;
  while (u > 0) {
    Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE], `Upgrader${u}`, { role: 'upgrader' } );
    u -= 1;
  }
  let b = 3 - creepCount.builder;
  while (b > 0) {
    Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE], `Builder1${b}`, { role: 'builder' } );
    b -= 1;
  }
  console.log('creepCount: ', creepCount.harvester);
}