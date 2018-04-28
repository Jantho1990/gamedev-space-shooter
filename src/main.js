import KeyControls from "../lib/KeyControls"
import MouseControls from "../lib/MouseControls"

const canvas = document.querySelector('#board canvas')
const ctx = canvas.getContext("2d")
console.log(ctx.canvas)

ctx.strokeStyle = "#FFF"

const {
    width: w,
    height: h
} = canvas

// Game setup
let dt = 0
let last = 0

let x = w / 2
let y = h / 2
let color = 0

let bw = 50
let bh = 50

const controls = new KeyControls()
const mouse = new MouseControls(canvas)

function loop (ms) {
    requestAnimationFrame(loop)
    
    const t = ms / 1000 // convert to seconds
    dt = t - last
    last = t
    
    
    // Game logic
    /* ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, w, h)
    ctx.strokeText(`Frame length: ${(dt * 1000).toFixed(2)} ms`, 70, 50)
    ctx.strokeText(`Total time: ${t.toFixed(2)}`, 70, 90) */

    x = mouse.pos.x
    y = mouse.pos.y
    if (controls.action) {
        color += 10
        if (color > 360) {
            color -= 360
        }
    }

    bw >= 1 ? bw += controls.x : bw = 1
    bh >= 1 ? bh += -(controls.y) : bh = 1

    // draw the rectangle
    if (mouse.isDown) {
        ctx.fillStyle = `hsl(${color}, 50%, 50%)`
        ctx.fillRect(x, y, bw, bh)
    }
    mouse.update()
}
requestAnimationFrame(loop)