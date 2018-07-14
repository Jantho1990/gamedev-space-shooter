// Game Over
function doGameOver() {
  const gameOverMessage = new Text("Game Over", {
    font: "30pt sans-serif",
    fill: "#8B8994",
    align: "center"
  })
  gameOverMessage.pos.x = w / 2
  gameOverMessage.pos.y = 120
  scene.add(gameOverMessage)
  scene.remove(ship)
  gameOver = true
}