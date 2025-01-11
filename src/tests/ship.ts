import { expect } from "jsr:@std/expect"
import { beforeEach, describe, it } from "jsr:@std/testing/bdd"
import { Ship, ShipInterface } from "../app/ship/Ship.ts"

describe("ship", () => {
  let ship: ShipInterface

  beforeEach(() => {
    ship = new Ship(4)
  })

  it("returns the length of 4", () => {
    expect(ship.length()).toBe(4)
  })

  it("returns a life of 4", () => {
    expect(ship.life()).toBe(4)
  })

  it("decrements life", () => {
    ship.hit()
    expect(ship.life()).toBe(3)

    ship.hit()
    ship.hit()
    expect(ship.life()).toBe(1)
  })

  it("doesn't decrement life below 0", () => {
    ship.hit()
    ship.hit()
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.life()).toBe(0)
  })

  it("returns false when the ship has life and isnt sunk", () => {
    ship.hit()
    expect(ship.isSunk()).toBeFalsy()
  })

  it("returns true when the ship doesnt have life", () => {
    ship.hit()
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.isSunk()).toBeTruthy()
  })
})
