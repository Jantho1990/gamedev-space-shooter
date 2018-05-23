import pop from "../pop/index"
const { CanvasRenderer, Container, KeyControls, Sprite, Texture } = pop

// Game setup
const w = 640
const h = 300
const renderer = new CanvasRenderer(w, h)
document.querySelector("#board").appendChild(renderer.view)

const scene = new Container()
const controls = new KeyControls()

const textures = {
  background: new Texture("res/img/bkgd1.png"),
  spaceship: new Texture("res/img/spaceship.png"),
  bullet: new Texture("res/img/laser-bullet.png"),
  baddie: new Texture("res/img/ufo.png")
}

// Make a spaceship.
const ship = new Sprite(textures.spaceship)
ship.pos.x = 120
ship.pos.y = h / 2 - 43.5
console.log(ship.pos.y)
ship.update = function (dt, t) {
    // Update the player position
    const { pos } = this
    pos.x += controls.x * dt * 200
    pos.y += controls.y * dt * 200
    
    if (pos.x < 0) pos.x = 0
    if (pos.x > w - 73) pos.x = w - 73
    if (pos.y < 0) pos.y = 0
    if (pos.y > h - 87) pos.y = h - 87
}

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

// Add everything to the scene container
scene.add(new Sprite(textures.background))
scene.add(ship)
scene.add(bullets)
scene.add(baddies)

// Time variables
let dt = 0
let last = 0

function loop (ms) {
    requestAnimationFrame(loop)

    const t = ms / 1000
    dt = t - last
    last = t

    // Game logic code

    // Fire bullets
    if (controls.action && t - lastShot > 0.15) {
      lastShot = t
      let offset = {x: 46, y: 39 } // half ship height - half bullet height
      fireBullet(ship.pos.x + offset.x, ship.pos.y + offset.y)
    }

    // Kill offscreen bullets
    bullets.children.forEach(bullet => {
      if (bullet.pos.x >= w + 20) {
        bullet.dead = true
      }
    })

    // Spawn bad guys
    if (t - lastSpawn > spawnSpeed) {
      lastSpawn = t
      const speed = -50 - (Math.random() * Math.random() * 100)
      const position = Math.random() * (h -24)
      spawnBaddie(w, position, speed)

      // Accelerating for the next spawn
      spawnSpeed = spawnSpeed < 0.05 ? 0.6 : spawnSpeed * 0.97 + 0.001
    }

    // Kill offscreen baddies
    baddies.children.forEach(baddie => {
      if (baddie.pos.x <= 0 - 25) {
        baddie.dead = true
      }
    })

    scene.update(dt, t)
    renderer.render(scene)
}
requestAnimationFrame(loop)