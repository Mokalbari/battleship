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
    expect(placement.success).toBeTruthy()
  })

  it("returns the coordinates of a newly placed ship", () => {
    const placement = gameboard.handleShipPlacement(0, 0, 4, "A", "horizontal")
    if (placement.success) {
      expect(placement.coordinates).toEqual([
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ])
    }
  })

  it("cannot go out of bounds in horizontal axis and returns the error", () => {
    const placement = gameboard.handleShipPlacement(8, 0, 4, "A", "horizontal")
    expect(placement.success).toBeFalsy()
    if (!placement.success) expect(placement.error).toBe("is out of bounds")
  })

  it("cannot go out of bounds in vertical axis and returns the error", () => {
    const placement = gameboard.handleShipPlacement(4, 7, 4, "A", "vertical")
    expect(placement.success).toBeFalsy()
    if (!placement.success) expect(placement.error).toBe("is out of bounds")
  })
})
