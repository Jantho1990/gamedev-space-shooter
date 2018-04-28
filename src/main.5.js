const canvas = document.querySelector('#board canvas')
const ctx = canvas.getContext("2d")
console.log(ctx.canvas)

ctx.strokeStyle = "#000"

const {
    width: w,
    height: h
} = canvas

ctx.globalAlpha = 0.02


const start = Date.now()
/* const timer = setInterval(() => {
    ctx.fillRect(0, 0, w, h)

    ctx.strokeText(Date.now() - start, 20, 80)

    if (Math.random() < 0.01) {
        ctx.strokeText("Game Over!", 160, 180)
        clearInterval(timer)
    }
}, 1000 / 60) */

function loop () {
    requestAnimationFrame(loop)    
    ctx.save()
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = "#FFF"
    ctx.globalAlpha = 1

    const x = Math.random() * w
    const y = Math.random() * h
    const radius = Math.random() * 20

    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
}
requestAnimationFrame(loop)