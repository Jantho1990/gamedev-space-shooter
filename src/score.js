// Add the score game object
const score = new Text("score:", {
  font: "20px sans-serif",
  fill: "#8b8994",
  align: "center"
})
score.pos.x = w / 2
score.pos.y = h - 30
// Game state variables
let scoreAmount = 0
let gameOver = false