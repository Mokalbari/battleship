import type {
  AttackOutput,
  Cell,
  Direction,
  PlacementResult,
} from "../../lib/definitions.ts"
import { Ship } from "../ship/Ship.ts"

export interface GameboardInterface {
  isCellOccupied: (x: number, y: number) => boolean
  isVisited: (x: number, y: number) => boolean
  isAllSunk: () => boolean
  handleShipPlacement: (
    x: number,
    y: number,
    length: number,
    token: string,
    direction: Direction
  ) => PlacementResult
  handleAttack: (x: number, y: number) => AttackOutput
}

export class Gameboard implements GameboardInterface {
  #size: number
  #gameboard: Cell[][]
  #shipCounter: number
  occupiedCell = new Set<number[]>()
  constructor(size: number) {
    this.#size = size
    this.#gameboard = []
    this.#shipCounter = 0
    this.#buildGameboard()
  }

  isCellOccupied(x: number, y: number): boolean {
    return this.occupiedCell.has([x, y])
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
    token: string,
    direction: Direction
  ): PlacementResult {
    // check the edge cases
    if (this.#isOutOfBounds(x, y, length, direction))
      return { success: false, error: "is out of bounds" }

    // loop through the potential new ship location to see if there is a possible collision
    const isHorizontal = direction === "horizontal"
    for (let i = 0; i < length; i++) {
      const newX = isHorizontal ? x + i : x
      const newY = isHorizontal ? y : y + i

      if (this.isCellOccupied(newX, newY)) {
        return { success: false, error: "cell is occupied" }
      }
    }

    const newShip = new Ship(length, token)

    for (let i = 0; i < length; i++) {
      if (isHorizontal) {
        const newX = x + i
        this.#gameboard[newX][y].ship = newShip
        this.occupiedCell.add([newX, y])
      } else {
        const newY = y + 1
        this.#gameboard[x][newY].ship = newShip
        this.occupiedCell.add([x, newY])
      }
    }

    this.#shipCounter++
    return { success: true }
  }

  handleAttack(x: number, y: number): AttackOutput {
    if (this.isVisited(x, y)) {
      return {
        success: false,
        error: "cell is empty",
      }
    }

    if (x > this.#size - 1 || y > this.#size - 1 || x < 0 || y < 0) {
      return {
        success: false,
        error: "is out of bounds",
      }
    }

    if (this.isCellOccupied(x, y)) {
      const currentShip = this.#gameboard[x][y].ship!
      currentShip.hit()
      if (currentShip.isSunk()) {
        this.#shipCounter--
      }
      this.#gameboard[x][y].hit = true

      return { success: true, coordinates: [x, y] }
    }

    return { success: false, error: "cell is empty" }
  }

  #isOutOfBounds(
    x: number,
    y: number,
    length: number,
    direction: Direction
  ): boolean {
    return direction === "horizontal"
      ? x + length > this.#size - 1 || y > this.#size - 1 || x < 0 || y < 0
      : y + length > this.#size - 1 || x > this.#size - 1 || y < 0 || x < 0
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
