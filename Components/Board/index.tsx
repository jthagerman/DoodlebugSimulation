"use client";
import { BOARD_HEIGHT, BOARD_WIDTH } from "@/app/Simulation/settings";
import styles from "./index.module.css";
import Cell from "./cell";
import React from "react";

function BoardComponent() {
  return (
    <div suppressHydrationWarning>
      <div className={styles.gameBorder}>
        {[...Array(BOARD_HEIGHT)].map((row: any[], x: number) => {
          return (
            <div className={styles.row} key={`${x}`}>
              {[...Array(BOARD_WIDTH)].map((cell, y) => {
                return <Cell x={x} y={y} key={`${x},${y}`} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(BoardComponent);
