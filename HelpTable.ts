import { GameRules } from "./GameRules";

const Table = require("cli-table3");

export class HelpTableGenerator {
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
