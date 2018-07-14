// Bullets
const bullets = new Container()
function fireBullet(x, y) {
  const bullet = new Sprite(textures.bullet)
  bullet.pos.x = x
  bullet.pos.y = y
  bullet.update = function(dt) {
    this.pos.x += 400 * dt
  }
  bullets.add(bullet)
}
// Game state variables
let lastShot = 0