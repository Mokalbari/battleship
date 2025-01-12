import { expect } from "jsr:@std/expect/expect"
import { beforeEach, describe, it } from "jsr:@std/testing/bdd"
import { Gameboard } from "../app/gameboard/Gameboard.ts"

describe("gameboard implementation", () => {
  let gameboard: Gameboard
  beforeEach(() => {
    gameboard = new Gameboard(10)

    gameboard.handleShipPlacement(0, 0, 4, "A", "horizontal")
    gameboard.handleAttack(7, 7)
    gameboard.handleAttack(3, 0)
  })

  it("returns false if a cell is not occupied", () => {
    expect(gameboard.isCellOccupied(4, 2)).toBeFalsy()
  })

  it("returns true if a cell is occupied", () => {
    expect(gameboard.isCellOccupied(2, 0)).toBeTruthy()
  })

  it("returns true if a cell has been attacked", () => {
    expect(gameboard.isVisited(3, 0)).toBeTruthy()
  })

  it("returns false if a cell have not been visited", () => {
    expect(gameboard.isVisited(5, 5)).toBeFalsy()
  })

  it("isAllSunk returns false if a ship is still present on the board", () => {
    expect(gameboard.isAllSunk()).toBeFalsy()
  })

  it("isAllSunk returns true if there's no ship left on the board", () => {
    gameboard.handleAttack(0, 0)
    gameboard.handleAttack(1, 0)
    gameboard.handleAttack(2, 0)

    expect(gameboard.isAllSunk()).toBeTruthy()
  })
})

describe("handleShipPlacement", () => {
  let gameboard: Gameboard

  beforeEach(() => {
    gameboard = new Gameboard(10)
  })

  it("places a ship horizontally successfully", () => {
    const result = gameboard.handleShipPlacement(0, 0, 4, "A", "horizontal")
    expect(result.success).toBeTruthy()
    // Vérifie que les cellules sont bien occupées
    expect(gameboard.isCellOccupied(0, 0)).toBeTruthy()
    expect(gameboard.isCellOccupied(1, 0)).toBeTruthy()
    expect(gameboard.isCellOccupied(2, 0)).toBeTruthy()
    expect(gameboard.isCellOccupied(3, 0)).toBeTruthy()
  })

  it("places a ship vertically successfully", () => {
    const result = gameboard.handleShipPlacement(0, 0, 3, "B", "vertical")
    expect(result.success).toBeTruthy()
    expect(gameboard.isCellOccupied(0, 0)).toBeTruthy()
    expect(gameboard.isCellOccupied(0, 1)).toBeTruthy()
    expect(gameboard.isCellOccupied(0, 2)).toBeTruthy()
  })

  it("prevents ship placement when overlapping with existing ship", () => {
    gameboard.handleShipPlacement(0, 0, 4, "A", "horizontal")
    const result = gameboard.handleShipPlacement(0, 0, 3, "B", "vertical")
    expect(result.success).toBeFalsy()
    if (!result.success) expect(result.error).toBe("cell is occupied")
  })

  describe("out of bounds placements", () => {
    it("prevents horizontal placement that would extend beyond right edge", () => {
      const result = gameboard.handleShipPlacement(8, 0, 4, "A", "horizontal")
      expect(result.success).toBeFalsy()
      if (!result.success) expect(result.error).toBe("is out of bounds")
    })

    it("prevents vertical placement that would extend beyond bottom edge", () => {
      const result = gameboard.handleShipPlacement(0, 8, 4, "A", "vertical")
      expect(result.success).toBeFalsy()
      if (!result.success) expect(result.error).toBe("is out of bounds")
    })

    it("prevents placement with negative coordinates", () => {
      const result = gameboard.handleShipPlacement(-1, 0, 4, "A", "horizontal")
      expect(result.success).toBeFalsy()
      if (!result.success) expect(result.error).toBe("is out of bounds")
    })
  })

  it("allows placing multiple ships when not overlapping", () => {
    const result1 = gameboard.handleShipPlacement(0, 0, 3, "A", "horizontal")
    const result2 = gameboard.handleShipPlacement(0, 2, 3, "B", "horizontal")

    expect(result1.success).toBeTruthy()
    expect(result2.success).toBeTruthy()
  })
})
