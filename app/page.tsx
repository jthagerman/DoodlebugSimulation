"use client";
import styles from "./page.module.css";
import useGameBoard from "@/Hooks/useGameBoard";
import BoardComponent from "@/Components/Board";
import { useState } from "react";

export default function Home() {
  const { tick, resetGame, getAntsCount, getDoodlebugsCount } = useGameBoard();
  let [interval, createInterval]: any = useState(() => null);
  return (
    <main className={styles.main}>
      <div className={styles.boardHeader}>
        <h1>Doodlebug Ant Simulation</h1>
        <button
          className={styles.playButton}
          onClick={() => {
            if (!interval) {
              createInterval(() => setInterval(() => tick(), 100));
            } else {
              clearInterval(interval);
              createInterval(null);
            }
          }}
        >
          {interval ? "Stop" : "Play"}
        </button>
        <button
          className={styles.playButton}
          onClick={() => {
            clearInterval(interval);
            createInterval(null);
            resetGame();
          }}
        >
          Restart
        </button>
        <button
          className={styles.playButton}
          onClick={() => {
            clearInterval(interval);
            createInterval(null);
            tick();
          }}
        >
          Tick
        </button>
        <BoardComponent />
        <div>
          <div>Doodlebugs: {getDoodlebugsCount()}</div>
          <div>Ants: {getAntsCount()}</div>
        </div>
      </div>
    </main>
  );
}
