export interface ShipInterface {
  length: () => number
  life: () => number
  hit: () => number
  isSunk: () => boolean
  token: () => string
}

export class Ship implements ShipInterface {
  #length
  #life
  #isSunk
  #token

  constructor(length: number, token: string) {
    this.#length = length
    this.#life = length
    this.#isSunk = false
    this.#token = token
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

  token() {
    return this.#token
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
