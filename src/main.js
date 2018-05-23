import pop from "../pop/index"
const { CanvasRenderer, Container, KeyControls, Sprite, Texture } = pop

function fireBullet(x, y) {
  const bullet = new Sprite(textures.bullet)
  bullet.pos.x = x
  bullet.pos.y = y
  bullet.update = function(dt) {
    this.pos.x += 400 * dt
  }
  bullets.add(bullet)
}

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
    bullet: new Texture("res/img/laser-bullet.png")
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

// Add everything to the scene container
scene.add(new Sprite(textures.background))
scene.add(ship)
scene.add(bullets)

// Game state variables
let lastShot = 0

// Time variables
let dt = 0
let last = 0

function loop (ms) {
    requestAnimationFrame(loop)

    const t = ms / 1000
    dt = t - last
    last = t

    // Game logic code
    if (controls.action && t - lastShot > 0.15) {
      lastShot = t
      let offset = {x: 46, y: 39 } // half ship height - half bullet height
      fireBullet(ship.pos.x + offset.x, ship.pos.y + offset.y)
    }
    bullets.children.forEach(bullet => {
      if (bullet.pos.x >= w + 20) {
        bullet.dead = true
      }
    })

    scene.update(dt, t)
    renderer.render(scene)
}
requestAnimationFrame(loop)