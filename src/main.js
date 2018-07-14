import pop from "../pop/index"
const { Game, CanvasRenderer, Container, KeyControls, Sprite, Text, Texture } = pop
const game = new Game(640, 320)
const { scene, w, h } = game

// Game setup
const renderer = new CanvasRenderer(w, h)
document.querySelector("#board").appendChild(renderer.view)

const controls = new KeyControls()

const textures = {
  background: new Texture("res/img/bkgd1.png"),
  spaceship: new Texture("res/img/spaceship.png"),
  bullet: new Texture("res/img/laser-bullet.png"),
  baddie: new Texture("res/img/ufo.png")
}

// Make a spaceship.
const ship = scene.add(new Sprite(textures.spaceship))
ship.pos.x = 120
ship.pos.y = h / 2 - 43.5
console.log('y',ship.pos.y)
ship.update = function (dt, t) {
  // Update the player position
  const { pos } = this
  pos.x += controls.x * dt * 200
  pos.y += controls.y * dt * 200
  
  if (pos.x < 0) pos.x = 0
  if (pos.x > w - 73) pos.x = w - 73
  if (pos.y < 0) pos.y = 0
  if (pos.y > h - 87) pos.y = h - 87
  
  // Wobbly ship
  const { scale } = this
  scale.x = Math.abs(Math.sin(t)) + 1
  scale.y = Math.abs(Math.sin(t * 1.33)) + 1
}

