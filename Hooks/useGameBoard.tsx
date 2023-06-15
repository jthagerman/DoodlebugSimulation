"use client";
//@ts-ignore-check
import React, { useState, useContext } from "react";
import { Board } from "@/app/Simulation/board";
import { BOARD_HEIGHT, BOARD_WIDTH } from "@/app/Simulation/settings";

const initialGame = new Board(BOARD_HEIGHT, BOARD_WIDTH);

const initialState = {
  game: initialGame,
  board: initialGame.returnBoard(),
};

const GameBoardContext = React.createContext(initialState);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameState, setGameState] = useState(() => initialState);

  return (
    //@ts-ignore
    <GameBoardContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameBoardContext.Provider>
  );
};

export default function useGameBoard() {
  //@ts-ignore
  const { gameState, setGameState } = useContext(GameBoardContext);

  const resetGame = () =>
    setGameState(() => {
      let newBoard = new Board(BOARD_HEIGHT, BOARD_WIDTH);
      return { game: newBoard, board: newBoard.returnBoard() };
    });
  const getBoard = () => gameState.game.returnBoard();
  const getDoodlebugsCount = () => gameState.game.getTotalOrganism("predator");
  const getAntsCount = () => gameState.game.getTotalOrganism("prey");
  const tick = () => {
    gameState.game.tick();
    let copy = gameState;
    setGameState(() => {
      return { game: copy.game, board: copy.game.returnBoard() };
    });
  };

  return {
    gameState,
    resetGame,
    getBoard,
    getDoodlebugsCount,
    getAntsCount,

    tick,
  };
}
