import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  TYPES,
  INITIAL_DOODLEBUGS,
  INITIAL_ANTS,
} from "./settings";
import { Doodlebug, Ant } from "./organism";
import { organismType } from "./organisms.types";

export class Board {
  width: number;
  height: number;
  area: number;
  board: any[];
  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
    this.area = height * width;
    this.board = this.populate();
  }

  toString() {
    this.board.forEach((row) => {
      console.log(
        row.reduce((prev: string, next: organismType) => {
          prev += " " + next.toString() || " ";
          return prev;
        }, "")
      );
    });
  }

  checkForEmptyCell(x: number, y: number) {
    return this.board[x][y] === " ";
  }

  checkForFreeSpots() {
    const freeSpaces: { x: number; y: number }[] = [];
    this.board.forEach((row: organismType[], x: number) => {
      row.forEach((cell, y: number) => {
        if (!cell.type) freeSpaces.push({ x: x, y: y });
      });
    });
    return freeSpaces;
  }

  getTotalOrganism(type: "predator" | "prey") {
    return this.board.flat().reduce((prev, next) => {
      if (next.type === type) {
        return [...prev, next];
      } else return prev;
    }, []).length;
  }

  updateCell(x: number, y: number, item: organismType | " ") {
    this.board[x][y] = item;
  }

  getCell(x: number, y: number) {
    return this.board[x][y];
  }

  clearCell(x: number, y: number) {
    this.board[x][y] = " ";
  }

  populate() {
    let board = new Array(BOARD_HEIGHT);
    for (let i = 0; i < board.length; i++) {
      board[i] = new Array(BOARD_WIDTH).fill(" ");
    }

    if (this.area < INITIAL_ANTS + INITIAL_DOODLEBUGS) {
      throw "INITIAL POPULATION EXCEEDS BOARD SIZE";
    } else {
      let openSpaces = new Array(BOARD_HEIGHT)
        .fill("")
        .map((row, rowIdx) => {
          return new Array(BOARD_WIDTH).fill(" ").map((cell, cellIdx) => {
            return { x: rowIdx, y: cellIdx };
          });
        })
        .flat()
        .sort((a, b) => 0.5 - Math.random());

      for (let i = 0; i < INITIAL_ANTS; i++) {
        let position = openSpaces[openSpaces.length - 1];
        board[position.x][position.y] = new Ant(position.x, position.y);
        openSpaces.pop();
      }

      for (let i = 0; i < INITIAL_DOODLEBUGS; i++) {
        let position = openSpaces[openSpaces.length - 1];
        board[position.x][position.y] = new Doodlebug(position.x, position.y);
        openSpaces.pop();
      }
    }

    return board;
  }

  getTypePositiionsArray(type: "predator" | "prey") {
    return this.board.flat().reduce((prev, next) => {
      if (next.type === TYPES[type]) {
        return [...prev, next];
      } else return prev;
    }, []);
  }

  getAllOrganisms() {
    return this.board.flat().reduce((prev, next) => {
      if (next.type) {
        return [...prev, next];
      } else return prev;
    }, []);
  }

  getEmptyNeighborCell(organism: organismType): any {
    let neighbor = organism.neighborCells
      .sort((a, b) => 0.5 - Math.random())
      .find((cell) => {
        if (this.checkForEmptyCell(cell.x, cell.y)) return cell;
      });
    return neighbor;
  }

  movePredator() {
    let predators = this.getTypePositiionsArray(TYPES.predator);

    predators.forEach((predator: organismType) => {
      predator.calculateNeighbors();
      let neighbors = predator.neighborCells.sort(
        (a, b) => 0.5 - Math.random()
      );
      let prey = neighbors.find((cell) => {
        if (this.getCell(cell.x, cell.y).type === TYPES.prey) {
          return cell;
        }
      });

      if (prey) {
        this.updateCell(predator.x, predator.y, " ");
        predator.move(prey.x, prey.y);
        this.updateCell(prey.x, prey.y, predator);
        predator.eat();
      } else {
        let adjacentCell = this.getEmptyNeighborCell(predator);

        if (adjacentCell) {
          this.clearCell(predator.x, predator.y);
          predator.move(adjacentCell.x, adjacentCell.y);
          this.updateCell(adjacentCell.x, adjacentCell.y, predator);
        }
      }
    });
  }

  movePrey() {
    let prey = this.getTypePositiionsArray(TYPES.prey);
    prey.forEach((prey: organismType) => {
      prey.calculateNeighbors();

      let adjacentCell = this.getEmptyNeighborCell(prey);
      if (adjacentCell) {
        this.clearCell(prey.x, prey.y);
        prey.move(adjacentCell.x, adjacentCell.y);
        this.updateCell(adjacentCell.x, adjacentCell.y, prey);
      }
    });
  }

  moveOrganisms() {
    this.movePredator();
    this.movePrey();
  }

  checkIfFreeSpace(organism: organismType) {
    return organism.neighborCells.find((neighbor) => {
      if (this.board[neighbor.x][neighbor.y] === " ") return true;
    });
  }

  breedOrganisms() {
    let organisms = this.getAllOrganisms();
    organisms.forEach((organism: organismType) => {
      if (organism.steps >= organism.breedRate) {
        let adjacentCell = this.getEmptyNeighborCell(organism);
        if (adjacentCell && adjacentCell.x && adjacentCell.y) {
          this.updateCell(
            adjacentCell.x,
            adjacentCell.y,
            //  @ts-ignore
            organism.type === TYPES.predator
              ? new Doodlebug(adjacentCell.x, adjacentCell.y)
              : new Ant(adjacentCell.x, adjacentCell.y)
          );
          organism.breed();
        }
      }
    });
  }

  checkHunger() {
    let predators = this.getTypePositiionsArray(TYPES.predator);
    predators.forEach((predator: organismType) => {
      if (predator.hunger >= predator.maxHunger) {
        this.clearCell(predator.x, predator.y);
      }
    });
  }

  returnBoard() {
    return this.board;
  }

  tick() {
    this.moveOrganisms();
    this.breedOrganisms();
    this.checkHunger();
  }
}

let b = new Board(BOARD_HEIGHT, BOARD_WIDTH);
