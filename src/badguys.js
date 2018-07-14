// Bad guys
const baddies = new Container()
function spawnBaddie(x, y, speed) {
  const baddie = new Sprite(textures.baddie)
  baddie.pos.x = x
  baddie.pos.y = y
  baddie.update = function(dt) {
    this.pos.x += speed * dt
  }
  baddies.add(baddie)
}
// Game state variables
let lastSpawn = 0
let spawnSpeed = 1.0