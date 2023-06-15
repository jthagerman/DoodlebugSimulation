import styles from "./index.module.css";
import useGameBoard from "@/Hooks/useGameBoard";
import { useState, useEffect } from "react";
import { memo } from "react";
import React from "react";

const Cell = ({ x, y }: { x: number; y: number }) => {
  const { getBoard } = useGameBoard();

  return (
    <div
      key={Math.random()}
      className={styles.cell}
      id={styles[getBoard()[x][y].type]}
    ></div>
  );
};

export default React.memo(Cell);
