type Cell = {
  ship: null | string
  hit: boolean
}

type Direction = "horizontal" | "vertical"

type ShipCoordinates = {
  token: string
  coordinates: number[][]
}

type PlacementSucceed = {
  success: true
  coordinates: number[][]
}

type PlacementFailed = {
  success: false
  error: "is out of bounds" | "cell is occupied"
}

type PlacementResult = PlacementSucceed | PlacementFailed

type AttackSuceed = {
  success: true
  coordinates: number[]
}

type AttackFailed = {
  success: false
  error: "is out of bounds" | "cell is empty"
}

type AttackOutput = AttackSuceed | AttackFailed

export interface GameboardInterface {
  getShipCoordinates: (token: string) => number[][] | null
  isVisited: (x: number, y: number) => boolean
  handleShipPlacement: (
    x: number,
    y: number,
    length: number,
    playerToken: string,
    direction: Direction
  ) => PlacementResult
  isAllSunk: () => boolean
  handleAttack: (x: number, y: number) => AttackOutput
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
    return this.#shipCounter === 0
  }

  handleShipPlacement(
    x: number,
    y: number,
    length: number,
    playerToken: string,
    direction: Direction
  ): PlacementResult {
    if (this.#isCellOccupied(x, y)) {
      return {
        success: false,
        error: "cell is occupied",
      }
    }

    if (x + length > this.#size - 1 || y + length > this.#size - 1) {
      return {
        success: false,
        error: "is out of bounds",
      }
    }

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
    return {
      success: true,
      coordinates: currentShipCoordinates.coordinates,
    }
  }

  handleAttack(x: number, y: number): AttackOutput {
    if (x > this.#size - 1 || y > this.#size - 1 || x < 0 || y < 0) {
      return {
        success: false,
        error: "is out of bounds",
      }
    }

    if (this.isVisited(x, y)) {
      return {
        success: false,
        error: "cell is empty",
      }
    }

    if (this.#isCellOccupied(x, y)) {
      this.#gameboard[x][y].hit = true

      return {
        success: true,
        coordinates: [x, y],
      }
    }

    return {
      success: false,
      error: "cell is empty",
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
