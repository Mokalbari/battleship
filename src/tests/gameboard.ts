import { expect } from "jsr:@std/expect/expect"
import { beforeEach, describe, it } from "jsr:@std/testing/bdd"
import { Gameboard, GameboardInterface } from "../app/gameboard/Gameboard.ts"

describe("gameboard basic implementation", () => {
  let gameboard: GameboardInterface
  beforeEach(() => {
    gameboard = new Gameboard(10)
  })

  it("places ship horizontally", () => {
    gameboard.handleShipPlacement(0, 0, 4, "A", "horizontal")
    expect(gameboard.getShipCoordinates("A")).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ])
  })

  it("places ship vertically", () => {
    gameboard.handleShipPlacement(0, 0, 3, "B", "vertical")
    expect(gameboard.getShipCoordinates("B")).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
    ])
  })
})
