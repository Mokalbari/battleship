export type Cell = {
  ship: null | string
  hit: boolean
}

export type Direction = "horizontal" | "vertical"

export type ShipCoordinates = {
  token: string
  coordinates: number[][]
}

export type PlacementSucceed = {
  success: true
  coordinates: number[][]
}

export type PlacementFailed = {
  success: false
  error: "is out of bounds" | "cell is occupied"
}

export type PlacementResult = PlacementSucceed | PlacementFailed

export type AttackSuceed = {
  success: true
  coordinates: number[]
}

export type AttackFailed = {
  success: false
  error: "is out of bounds" | "cell is empty"
}

export type AttackOutput = AttackSuceed | AttackFailed
