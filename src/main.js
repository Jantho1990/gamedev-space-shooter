import pop from "../pop/index"
const { 
  Game,
  CanvasRenderer,
  Container,
  KeyControls,
  math,
  Sprite,
  Text,
  Texture
} = pop
import game from './GameMaster'
const { scene, w, h } = game

import PlayerShip from './playerShip'

// Game setup
const renderer = new CanvasRenderer(w, h)
document.querySelector("#board").appendChild(renderer.view)

// const controls = new KeyControls()

const textures = {
  background: new Texture("res/img/bkgd1.png"),
  spaceship: new Texture("res/img/spaceship.png"),
  bullet: new Texture("res/img/laser-bullet.png"),
  baddie: new Texture("res/img/ufo.png"),
}

// Make the background
const bg = scene.add(new Sprite(textures.background))

// Make a spaceship.
const ship = scene.add(
  new PlayerShip(
    textures.spaceship,
    120,
    (h / 2 - 43.5)
  )
)
console.log(ship)

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

game.run()