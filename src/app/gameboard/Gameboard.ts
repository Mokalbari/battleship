type Cell = {
  ship: null | string
  hit: boolean
}

type Direction = "horizontal" | "vertical"

type ShipCoordinates = {
  token: string
  coordinates: number[][]
}

export interface GameboardInterface {
  getShipCoordinates: (token: string) => number[][] | null
  isVisited: (x: number, y: number) => boolean
  handleShipPlacement: (
    x: number,
    y: number,
    length: number,
    playerToken: string,
    direction: Direction
  ) => void
  isAllSunk: () => boolean
}

export class Gameboard implements GameboardInterface {
  #size
  #gameboard: Cell[][]
  #shipCounter
  shipCoordinates: ShipCoordinates[]
  constructor(size: number) {
    this.#size = size
    this.#gameboard = []
    this.shipCoordinates = []
    this.#shipCounter = this.shipCoordinates.length
    this.#buildGameboard()
  }

  isVisited(x: number, y: number) {
    return this.#gameboard[x][y].hit
  }

  isAllSunk() {
    return this.#shipCounter === 0 ? true : false
  }

  handleShipPlacement(
    x: number,
    y: number,
    length: number,
    playerToken: string,
    direction: Direction
  ) {
    if (this.#isCellOccupied(x, y)) return

    const currentShipCoordinates: ShipCoordinates = {
      token: playerToken,
      coordinates: [],
    }

    if (direction === "horizontal") {
      for (let i = 0; i < length; i++) {
        this.#gameboard[x + i][y].ship = playerToken
        currentShipCoordinates.coordinates.push([x + i, y])
      }
    } else {
      for (let i = 0; i < length; i++) {
        this.#gameboard[x][y + i].ship = playerToken
        currentShipCoordinates.coordinates.push([x, y + i])
      }
    }

    this.shipCoordinates.push(currentShipCoordinates)
  }

  handleAttack(x: number, y: number) {
    if (this.isVisited(x, y)) return

    if (this.#isCellOccupied(x, y)) {
      // todo
      return
    }
  }

  getShipCoordinates(token: string) {
    for (let i = 0; i < this.shipCoordinates.length; i++) {
      if (this.shipCoordinates[i].token === token) {
        return this.shipCoordinates[i].coordinates
      }
    }
    return null
  }

  #isCellOccupied(x: number, y: number) {
    if (this.#gameboard[x][y].ship) {
      return true
    }

    return false
  }

  #buildGameboard() {
    for (let i = 0; i < this.#size; i++) {
      const rows: Cell[] = []

      for (let j = 0; j < this.#size; j++) {
        rows.push({ ship: null, hit: false })
      }
      this.#gameboard.push(rows)
    }
  }
}
