/**
 * A table to show which moves win against which other moves. This table will be displayed when the user selects the "help" option. The table will help the user understand the game rules visually.
 *
 * add row to table logic:
 * For each move in the list, a new row is created.
 * The row starts with the move itself.
 * For each move, it compares against all other moves.
 * If the move is the same as the opponent's move, it adds 'Draw' to the row.
 * If the move beats the opponent's move (player wins), it adds 'Win' to the row.
 * If the move loses to the opponent's move (computer wins), it adds 'Lose' to the row.
 */

import { GameRules } from "./GameRules";

const Table = require("cli-table3");

export class helpTableGenerator {
  private gameRules: GameRules;
  private moves: string[];

  constructor(gameRules: GameRules, moves: string[]) {
    this.gameRules = gameRules;
    this.moves = moves;
  }


  generateTable(): string {
    //create new table with column headers
    const table = new Table({
      head: ["v PC\\User >", ...this.moves], //1st column header. Indicates user moves are horizontally displayed and computer moves are vertically
    });

    //Iterate over each move to create table
    this.moves.forEach((move, index) => {
      const row: string[] = [move];
      //compare current move against other moves
      this.moves.forEach((opponentMove) => {
        if (move === opponentMove) {
          row.push("Draw");
        } else {
          const result = this.gameRules.determineWinner(move, opponentMove);
          if (result === "Computer wins!") {
            row.push("Lose");
          } else if (result === "You win!") {
            row.push("Win");
          }
        }
      });
      //add row
      table.push(row);
    });
    return table.toString();
  }
}
