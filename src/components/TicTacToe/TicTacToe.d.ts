type GameElements = 'X' | 'O' | null;
export type Board = GameElements[][];

export type Line = {
  display: 'none' | 'block';
  rotate: '0deg' | '45deg' | '-45deg' | '90deg';
  margin_top: '0px' | '25rem' | '-25rem';
  margin_left: '0px' | '25rem' | '-25rem';
};
