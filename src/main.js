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
const game = new Game(640, 320)
const { scene, w, h } = game

// Game setup
const renderer = new CanvasRenderer(w, h)
document.querySelector("#board").appendChild(renderer.view)

const controls = new KeyControls()

const textures = {
  background: new Texture("res/img/bg.png"),
  spaceship: new Texture("res/img/spaceship2.png"),
  bullet: new Texture("res/img/laser-bullet.png"),
  baddie: new Texture("res/img/ufo.png"),
  building: new Texture("res/img/building.png"),
  crosshair: new Texture("res/img/crosshair.png")
}

// Make the background
const bg = scene.add(new Sprite(textures.background))

// Make a spaceship.
const ship = scene.add(new Sprite(textures.spaceship))
ship.pos.x = 120
ship.pos.y = h / 2 - 43.5
console.log('y',ship.pos.y)
ship.update = function (dt, t) {
  // Update the player position
  const { pos } = this
  pos.x += 200 * dt
  pos.y = Math.sin(t * 15) * 500 * dt + h / 2

  // Wraparound the screen
  if (ship.pos.x > w) {
    ship.pos.x = -32;
  }
  
  // Wobbly ship
  const { scale } = this
  scale.x = Math.abs(Math.sin(t)) + 1
  scale.y = Math.abs(Math.sin(t * 1.33)) + 1
}

// Make buildings
const buildings = scene.add(new Container())
const makeRandom = (b, x) => {
  // Place the building at x position, with random scale.
  b.scale.x = math.randf(1, 3)
  b.scale.y = math.randf(1, 3)
  b.pos.x = x
  b.pos.y = h - b.scale.y * 64
}
for (let x = 0; x < 10; x++) {
  const b = buildings.add(new Sprite(textures.building))
  makeRandom(b, math.rand(w))
}

const flipped = Math.random() < 0.5
ship.scale.x = flipped ? -1 : 1
ship.anchor.x = flipped ? 32 : 0
console.log(flipped)

function makeCrosshair(pos) {
  const c = scene.add(new Sprite(textures.crosshair))
  c.pos = pos
  c.anchor = { x: -16, y: -16 } // Center the crosshair
}

// Default anchor point, default scale
const ship1 = scene.add(new Sprite(textures.spaceship))
ship1.pos = { x: 200, y: 150 }
ship1.anchor = { x: 0, y: 0 }
makeCrosshair(ship1.pos)

// Anchor to center, default scale
const ship2 = scene.add(new Sprite(textures.spaceship))
ship2.pos = { x: 300, y: 150 }
ship2.anchor = { x: -16, y: -16 }
makeCrosshair(ship2.pos)

// Anchor to middle on y, "width for x, invert horizontal scale
// This is how you "flip in place".
const ship3 = scene.add(new Sprite(textures.spaceship))
ship3.pos = { x: 400, y: 150 }
ship3.anchor = { x: 32, y: -16 }
ship3.scale.x = -1
makeCrosshair(ship3.pos)

// Spinning ships
const ships = scene.add(new Container());
ships.pos.x = 80;
ships.pos.y = h / 2 - 16;

for (let i = 0; i < 10; i++) {
  const rship = ships.add(new Sprite(textures.spaceship))
  rship.pivot = { x: 16, y: 16 }
  rship.pos.x = i * 48
}

game.run((dt, t) => {
  buildings.map(b => {
    b.pos.x -= 100 * dt
    if (b.pos.x < -80) {
      makeRandom(b, w)
    }
  })
  const rps = Math.PI * 2 * dt
  ships.map((s, i) => {
    s.rotation += i * rps
  })
})