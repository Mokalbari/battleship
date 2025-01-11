import { expect } from "jsr:@std/expect/expect"
import { beforeEach, describe, it } from "jsr:@std/testing/bdd"
import { Gameboard, GameboardInterface } from "../app/gameboard/Gameboard.ts"

describe("gameboard basic implementation", () => {
  let gameboard: GameboardInterface
  beforeEach(() => {
    gameboard = new Gameboard(10)
  })

  it("returns truthy when a ship is successfully placed", () => {
    const placement = gameboard.handleShipPlacement(0, 0, 4, "A", "horizontal")
    expect(placement.result).toBeTruthy()
  })

  it("returns the coordinates of a newly placed ship", () => {
    const placement = gameboard.handleShipPlacement(0, 0, 4, "A", "horizontal")
    if (placement.result) {
      expect(placement.coordinates).toEqual([
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ])
    }
  })
})
