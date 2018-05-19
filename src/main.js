import pop from "../pop/index"
const { CanvasRenderer, Container } = pop

// Game setup
const w = 640
const h = 300
const renderer = new CanvasRenderer(w, h)
document.querySelector("#board").appendChild(renderer.view)

const scene = new Container()

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