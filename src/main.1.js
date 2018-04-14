const canvas = document.querySelector('#board canvas')
const ctx = canvas.getContext("2d")
console.log(ctx.canvas)

ctx.strokeStyle = "black"
ctx.fillStyle = "red"

const {
    width: w,
    height: h
} = canvas

// Rectangle
function rectangle () {
    ctx.fillRect(300, 200, 50, 50)
    ctx.strokeRect(300, 200, 50, 50)
}

// Circle
function circle () {
    ctx.beginPath()
    ctx.arc(325, 170, 25, 0, Math.PI * 2, false)
    ctx.fill()
    ctx.stroke()
}

// Starfield

function starfield () {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, w, h)
    let x, y, radius
    for (let i = 0; i < 550; i++) {
        let hue = Math.random() * 360
        let sat = Math.random() * 5
        let light = Math.random() * 75 + 25
        ctx.fillStyle = `hsl(${hue}, ${sat}%, ${light}%)`
    
        x = Math.random() * w
        y = Math.random() * h
        radius = Math.random() * 3
    
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2, false)
        ctx.fill()
    }
}
starfield()

// Text
ctx.fillStyle = "#FFF"
ctx.fillRect(0, 0, w, h)

ctx.font = "50pt courier"
const center = w / 2
ctx.textAlign = "center"
ctx.fillStyle = "#AF111C"

ctx.strokeText("strokes the word", center, h - 50)

for (let i = 0; i < 11; i++) {
    ctx.fillText(`if you're in the game ${i}`, center, i * 40)
}
ctx.strokeText("strokes the word", center, h - 30)

// Image
let img = new Image()
img.src = "res/img/kerrigan.png"
// img.addEventListener('load', draw, false)

function draw() {
    console.log('drew some stuff')
    for (let i = 0; i < 10; i += 52) {
        const x = Math.random() * w - 50
        const y = Math.random() * h - 100
        const scale = i * 0.1
        ctx.drawImage(img, x, y, 500 * scale, 500 * scale)
    }
}

// Skipped the snowflakes, the effects it taught are in the demo above (scaling).

// Cropping
ctx.fillStyle = "#000"
ctx.fillRect(0, 0, w, h)
starfield()

img = new Image()
img.src = "res/img/kerrigan.png"
// img.addEventListener('load', drawCropped, false)

function drawCropped() {
    ctx.drawImage(img, 500, 500)

    // cropped
    for (let i = 0; i < 10; i++) {
        ctx.drawImage(
            img,
            // source
            0, 0, 500, 500,
            // destination location
            i * 10, i * 10,
            // destination scale
            i * 0.2 * 170, i * 0.2 * 170
        )
    }
}

// Transformations
ctx.fillRect(0, 0, w, h)
function drawTransformations () {
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * w
        const y = Math.random() * h
        ctx.fillRect(x, y, 50, 50)
    }
}

ctx.fillStyle = "black"
drawTransformations()
ctx.save()
ctx.fillStyle = "red"
drawTransformations()
ctx.restore()
drawTransformations()

// Ring
ctx.save()
ctx.fillRect(0, 0, w, h)
ctx.translate(w / 2, h / 2) // move the context to the center of the canvas
for (let ring = 1; ring < 28; ring++) {
    ctx.fillStyle = `hsl(${ring * 25}, 90%, 50%)`
    for (let dots = 0; dots < ring * 6; dots++) {
        ctx.rotate((Math.PI * 2) / (ring * 6))
        ctx.beginPath()
        ctx.arc(0, ring * 15, 7, 0, Math.PI * 2, true)
        ctx.fill()
    }
}
ctx.restore()

// GlobalAlpha
function drawCircles() {
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * w
        const y = Math.random() * h
        ctx.beginPath()
        ctx.arc(x, y, 30, 0, Math.PI * 2, false)
        ctx.fill()
    }
}

ctx.save()
ctx.fillStyle = "skyblue"
ctx.fillRect(0, 0, w, h)
ctx.save()
ctx.globalAlpha = 0.3
ctx.fillStyle = "blue"
drawCircles()
ctx.fillStyle = "orange"
drawCircles()
ctx.fillStyle = "green"
drawCircles()
ctx.restore()
console.log('restored')
ctx.fillStyle = "lemonchiffon"
drawCircles()

ctx.restore()

// globalCompositeOperation
// ...there's lots of these, see the book

// Draw a company logo
// ctx.setTransform(1, 0, 0, 1, 0, 0)
ctx.clearRect(0, 0, w, h)
// ctx.fillRect(0, 0, w, h)
ctx.translate((w / 2), (h / 2))
// starfield()
// ctx.translate(w / 2, h / 4)
// ctx.textAlign = "center"
ctx.font = "bold 70pt monospace"
ctx.fillStyle = "black"
ctx.fillText("MOM", 13, 60)
ctx.fillText("POP", 13, 118)

ctx.globalCompositeOperation = "source-atop"

for (let i = 0; i < 6; i++) {
    ctx.fillStyle = `hsl(${i * (250 / 6)}, 90%, 55%)`
    ctx.fillRect(0, i * 20, 200, 20)
}

ctx.fillStyle = "#999"
ctx.globalCompositeOperation = "destination-over"
ctx.fillText("MOM", 13, 62)
ctx.fillText("POP", 13, 120)
ctx.font = "30pt monospace"

ctx.globalCompositeOperation = "source-over"
"games".split("").forEach((ch, i) => {
    ctx.fillText(ch, (i * 37) + 12, 145)
})