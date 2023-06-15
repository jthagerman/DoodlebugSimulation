export type organismType = {
  x: number;
  y: number;
  symbol: string;
  breedRate: number;
  type: "predator" | "pray";
  maxHunger: number;
  steps: number;
  neighborCells: { x: number; y: number }[];
  calculateNeighbors: () => {};
  hunger: number;
  breed: () => {};
  move: (x: number, y: number) => {};
  eat: () => {};
};
