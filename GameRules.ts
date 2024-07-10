/**
 * Here we determine the winner of the game based on the moves made by the player and the computer.
 *
 * rules:
 * If the player's move index is equal to the computer's move index, it's a draw.
 * If the computer's move index is within the next half moves after the player's move index, the computer wins. Otherwise, the player wins.
 * Each move can beat half of the other moves and lose to the other half, maintaining fairness in the game.
 */

export class GameRules {
  private moves: string[];

  constructor(moves: string[]) {
    // takes a list of moves and stores it so we can access indices later
    this.moves = moves;
  }

  //Determining winner
  determineWinner(playerMove: string, computerMove: string): string {
    const playerIndex = this.moves.indexOf(playerMove);
    const computerIndex = this.moves.indexOf(computerMove);

    const half = Math.floor(this.moves.length / 2); // to determine the range of winning and loosing moves

    if (playerIndex === computerIndex) {
      return "It's a draw!";
    }

    if (
      //Computer's index is within half the moves after player's index
      (computerIndex > playerIndex && computerIndex <= playerIndex + half) ||
      //Wrap-around case in cyclic manner
      (computerIndex < playerIndex &&
        computerIndex + this.moves.length <= playerIndex + half)
    ) {
      return "Computer wins!";
    }
    return "You win!";
  }
}
