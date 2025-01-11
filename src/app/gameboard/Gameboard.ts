type Cell = {
  ship: null | string
  hit: boolean
}

type Direction = "horizontal" | "vertical"

export interface GameboardInterface {
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
  constructor(size: number) {
    this.#size = size
    this.#gameboard = []
    this.#shipCounter = 0
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

    if (direction === "horizontal") {
      for (let i = 0; i < length; i++) {
        this.#gameboard[x + i][y].ship = playerToken
      }
    } else {
      for (let i = 0; i < length; i++) {
        this.#gameboard[x][y + i].ship = playerToken
      }
    }
    this.#shipCounter += 1
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
