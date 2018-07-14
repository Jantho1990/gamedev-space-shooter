import pop from '../pop/index'
const { Container, KeyControls, Sprite } = pop
import game from './GameMaster'
const { scene, w, h } = game

class PlayerShip extends Sprite {
  constructor(texture, startX, startY, update) {
    super(texture)
    this.controls = new KeyControls()
    this.pos.x = startX
    this.pos.y = startY
    this.bullets = new Container()
    // this.update = this.update.bind(this)
  }

  shouldFireBullets(t) {
    if (!gameOver && this.controls.action && t - lastShot > 0.15) {
      lastShot = t
      let offset = {x: 46, y: 39 } // half ship height - half bullet height
      fireBullet(ship.pos.x + offset.x, ship.pos.y + offset.y)
    }
  }

  // const bullets = new Container()

  fireBullet(x, y) {
    const bullet = new Sprite(textures.bullet)
    bullet.pos.x = x
    bullet.pos.y = y
    bullet.update = function (dt) {
      this.pos.x += 400 * dt
    }
    bullets.add(bullet)
  }

  update (dt, t) {
    const { pos } = this
    pos.x += this.controls.x * dt * 200
    pos.y += this.controls.y * dt * 200

    if (pos.x < 0) pos.x = 0
    if (pos.x > w - 73) pos.x = w - 73
    if (pos.y < 0) pos.y = 0
    if (pos.y > h - 87) pos.y = h - 87
  }
}

export default PlayerShip