import {
  ANT_BREED_RATE,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  TYPES,
  ANT_SYMBOL,
  DOODLEBUG_SYMBOL,
  DOODLEBUG_MAX_HUNGER,
  DOODLEBUG_BREED_RATE,
} from "./settings";

class Organism {
  x: number;
  y: number;
  symbol: string;
  breedRate: number;
  type: "predator" | "prey";
  maxHunger: number;
  steps: number;
  neighborCells: { x: number; y: number }[];
  hunger: number;

  constructor(
    x: number,
    y: number,
    symbol: string,
    breedRate: number,
    type: "predator" | "prey",
    maxHunger: number
  ) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
    this.steps = 1;
    this.breedRate = breedRate;
    this.neighborCells = this.calculateNeighborCells();
    this.type = type;
    this.hunger = 0;
    this.maxHunger = maxHunger;
  }

  calculateNeighborCells() {
    let nearbycells = [];
    if (this.x - 1 >= 0 && this.y - 1 >= 0) {
      nearbycells.push({ x: this.x - 1, y: this.y - 1 });
    }
    if (this.x - 1 >= 0) {
      nearbycells.push({ x: this.x - 1, y: this.y });
    }
    if (this.x - 1 >= 0 && this.y + 1 < BOARD_HEIGHT) {
      nearbycells.push({ x: this.x - 1, y: this.y + 1 });
    }
    if (this.y - 1 >= 0) {
      nearbycells.push({ x: this.x, y: this.y - 1 });
    }
    if (this.y + 1 < BOARD_HEIGHT) {
      nearbycells.push({ x: this.x, y: this.y + 1 });
    }
    if (this.x + 1 < BOARD_WIDTH && this.y - 1 >= 0) {
      nearbycells.push({ x: this.x + 1, y: this.y - 1 });
    }
    if (this.x + 1 < BOARD_WIDTH) {
      nearbycells.push({ x: this.x + 1, y: this.y });
    }
    if (this.x + 1 < BOARD_WIDTH && this.y + 1 < BOARD_HEIGHT) {
      nearbycells.push({ x: this.x + 1, y: this.y + 1 });
    }

    return nearbycells;
  }

  breed() {
    this.steps = 1;
  }

  eat() {
    this.hunger = 1;
  }

  move(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.steps = this.steps + 1;
    this.neighborCells = this.calculateNeighborCells();
    this.hunger = this.hunger + 1;
  }

  calculateNeighbors() {
    this.neighborCells = this.calculateNeighborCells();
  }

  toString() {
    return this.symbol;
  }
}

export class Ant extends Organism {
  constructor(x: number, y: number) {
    super(x, y, ANT_SYMBOL, ANT_BREED_RATE, TYPES.prey, Infinity);
  }
}

export class Doodlebug extends Organism {
  constructor(x: number, y: number) {
    super(
      x,
      y,
      DOODLEBUG_SYMBOL,
      DOODLEBUG_BREED_RATE,
      TYPES.predator,
      DOODLEBUG_MAX_HUNGER
    );
  }
}
