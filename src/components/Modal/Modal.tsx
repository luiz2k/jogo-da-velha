import styles from './Modal.module.css';

import { ModalProps } from './Modal.d';

export function Modal({ text, restartGame }: ModalProps) {
  return (
    <div className={styles.container}>
      <article className={styles.modal}>
        <h1 className={styles.text}>{text}</h1>

        <button className={styles.button} onClick={restartGame}>
          OK
        </button>
      </article>
    </div>
  );
}
