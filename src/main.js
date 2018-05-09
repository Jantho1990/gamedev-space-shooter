import pop from "../pop/index"
const { CanvasRenderer, Container, Sprite, Text, Texture } = pop

// Game setup
const w = 640
const h = 480
const renderer = new CanvasRenderer(w, h)
document.querySelector("#board").appendChild(renderer.view)

const scene = new Container()

const texture = new Texture('res/img/spaceship.png')

for (let i = 0; i < 50; i++) {
    const speed = {
        x: Math.random() * 150 + 50,
        y: Math.random() * 150 + 50,
    }
    const ship = new Sprite(texture)
    ship.pos.x = Math.random() * w
    ship.pos.y = Math.random() * h
    ship.update = function (dt) {
        this.pos.x += speed.x * dt
        this.pos.y += speed.y * dt
        if (this.pos.x > w) {
            // console.log('ping!', this.pos, w, h, this.pos.x > w)
            this.pos.x = -(this.texture.img.width)
        }
        if (this.pos.y > h) {
            this.pos.y = -(this.texture.img.height)
        }
    }
    scene.add(ship)
}

const message = new Text("The Renderer!", {
    font: "40pt sans-serif",
    fill: "#AF111C",
    align: "center"
})
message.pos.x =  w / 2
console.log(typeof message.pos.x, 'hh')
message.pos.y = h / 2
message.update = function (dt) {
    // console.log(typeof this.pos.x, typeof (100 * dt), typeof dt, 'sh')
    this.pos.x = Math.round(this.pos.x -  (100 * dt), 0)
    // console.log(this.pos.x - (100 * dt))
    // console.log(this.pos.x)
    if (this.pos.x < -420) {
        this.pos.x = w
    }
}
scene.add(message)

console.log(scene.children)

let dt = 0
let last = 0

function loop (ms) {
    requestAnimationFrame(loop)

    const t = ms / 1000
    dt = t - last
    last = t

    scene.update(dt, t)
    renderer.render(scene)
}
requestAnimationFrame(loop)