const canvas = document.querySelector('#board canvas')
const ctx = canvas.getContext("2d")
console.log(ctx.canvas)

ctx.strokeStyle = "black"
ctx.fillStyle = "red"

ctx.font = "48px serif"

const {
    width: w,
    height: h
} = canvas

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
    ctx.fillRect(0, 0, w, h)

    ctx.strokeText(Date.now() - start, 20, 80)

    if (Math.random() < 0.01) {
        ctx.strokeText("Game Over!", 160, 180)
        clearInterval(timer)
    } else {
        setTimeout(loop, 1000 / 60)
    }
}
loop()