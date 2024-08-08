import { useEffect, useState } from 'react';
import styles from './TicTacToe.module.css';
import { Modal } from '../Modal/Modal';

import type { Board, Line } from './TicTacToe.d';

const line: Line = {
  display: 'none',
  rotate: '0deg',
  margin_top: '0px',
  margin_left: '0px',
};

export function TicTacToe() {
  const [turn, setTurn] = useState<'X' | 'O' | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [round, setRound] = useState<number>(1);
  const [board, setBoard] = useState<Board>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  // Define quem será o primeiro a jogar.
  useEffect(() => {
    if (round === 1) {
      const randomNumber: number = Math.round(Math.random());

      if (randomNumber === 0) {
        return setTurn('X');
      }

      return setTurn('O');
    }
  }, [round]);

  // Verifica se houve um vencedor.
  const handlePlayeWin = (): void => {
    if (board[0][0] === turn && board[0][1] === turn && board[0][2] === turn) {
      line.margin_top = '-25rem';
      line.display = 'block';
      setWinner(`Vitória do jogador: ${turn}`);
      return;
    }

    if (board[1][0] === turn && board[1][1] === turn && board[1][2] === turn) {
      line.display = 'block';
      setWinner(`Vitória do jogador: ${turn}`);
      return;
    }

    if (board[2][0] === turn && board[2][1] === turn && board[2][2] === turn) {
      line.margin_top = '25rem';
      line.display = 'block';
      setWinner(`Vitória do jogador: ${turn}`);
      return;
    }

    if (board[0][0] === turn && board[1][0] === turn && board[2][0] === turn) {
      line.margin_left = '-25rem';
      line.rotate = '90deg';
      line.display = 'block';
      setWinner(`Vitória do jogador: ${turn}`);
      return;
    }

    if (board[0][1] === turn && board[1][1] === turn && board[2][1] === turn) {
      line.rotate = '90deg';
      line.display = 'block';
      setWinner(`Vitória do jogador: ${turn}`);
      return;
    }

    if (board[0][2] === turn && board[1][2] === turn && board[2][2] === turn) {
      line.margin_left = '25rem';
      line.rotate = '90deg';
      line.display = 'block';
      setWinner(`Vitória do jogador: ${turn}`);
      return;
    }

    if (board[0][0] === turn && board[1][1] === turn && board[2][2] === turn) {
      line.rotate = '45deg';
      line.display = 'block';
      setWinner(`Vitória do jogador: ${turn}`);
      return;
    }

    if (board[0][2] === turn && board[1][1] === turn && board[2][0] === turn) {
      line.rotate = '-45deg';
      line.display = 'block';
      setWinner(`Vitória do jogador: ${turn}`);
      return;
    }

    if (round === 9) {
      setWinner('Jogo empatado!');
    }
  };

  // Lida com as jogadas no tabuleiro.
  const handleBoard = (row: number, index: number): void => {
    if (board[row][index]) {
      alert('Campo indisponível!');
      return;
    }

    setBoard((prev) => {
      const newState: Board = prev;

      newState[row][index] = turn;

      if (round >= 5) {
        handlePlayeWin();
      }

      return [...newState];
    });

    setTurn((prev) => (prev === 'X' ? 'O' : 'X'));

    setRound((prev) => prev + 1);
  };

  // Reinicia o jogo.
  const restartGame = (): void => {
    setBoard([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);

    setRound(1);

    if (winner) {
      setWinner(null);
    }

    line.display = 'none';
    line.rotate = '0deg';
    line.margin_top = '0px';
    line.margin_left = '0px';
  };

  return (
    <div className={styles.container}>
      <div>
        <header className={styles.header}>
          <div>
            <p>Round: {round}</p>
            <p>Vez do: {turn}</p>
          </div>

          <button type="button" className={styles.button} onClick={restartGame}>
            Reiniciar
          </button>
        </header>

        <main className={styles.board}>
          <button className={styles.square} onClick={() => handleBoard(0, 0)}>
            {board[0][0] || <span className={styles.turn}>{turn}</span>}
          </button>
          <div className={styles.square} onClick={() => handleBoard(0, 1)}>
            {board[0][1] || <span className={styles.turn}>{turn}</span>}
          </div>
          <div className={styles.square} onClick={() => handleBoard(0, 2)}>
            {board[0][2] || <span className={styles.turn}>{turn}</span>}
          </div>
          <div className={styles.square} onClick={() => handleBoard(1, 0)}>
            {board[1][0] || <span className={styles.turn}>{turn}</span>}
          </div>
          <div className={styles.square} onClick={() => handleBoard(1, 1)}>
            {board[1][1] || <span className={styles.turn}>{turn}</span>}
          </div>
          <div className={styles.square} onClick={() => handleBoard(1, 2)}>
            {board[1][2] || <span className={styles.turn}>{turn}</span>}
          </div>
          <div className={styles.square} onClick={() => handleBoard(2, 0)}>
            {board[2][0] || <span className={styles.turn}>{turn}</span>}
          </div>
          <div className={styles.square} onClick={() => handleBoard(2, 1)}>
            {board[2][1] || <span className={styles.turn}>{turn}</span>}
          </div>
          <div className={styles.square} onClick={() => handleBoard(2, 2)}>
            {board[2][2] || <span className={styles.turn}>{turn}</span>}
          </div>

          <span
            className={styles.line}
            style={{
              transform: `translate(-50%, -50%) rotate(${line.rotate})`,
              display: line.display,
              marginTop: line.margin_top,
              marginLeft: line.margin_left,
            }}
          />
        </main>
      </div>

      {winner && <Modal text={winner} restartGame={restartGame} />}
    </div>
  );
}
