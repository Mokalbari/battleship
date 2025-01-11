export interface ShipInterface {
  length: () => number
  life: () => number
  hit: () => number
  isSunk: () => boolean
}

export class Ship implements ShipInterface {
  #length
  #life
  #isSunk

  constructor(length: number) {
    this.#length = length
    this.#life = length
    this.#isSunk = false
  }

  length() {
    return this.#length
  }

  life() {
    return this.#life
  }

  isSunk() {
    return this.#isSunk
  }

  hit() {
    if (this.#life) {
      --this.#life
      this.updateShipStatus()
    }
    return this.#life
  }

  private isShipPlayable() {
    if (!this.#life) {
      return false
    }
    return true
  }

  private updateShipStatus() {
    if (this.isShipPlayable()) return

    this.#isSunk = true
  }
}
