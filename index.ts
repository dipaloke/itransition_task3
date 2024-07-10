import * as readline from "readline";
import { GameRules } from "./GameRules";
import { HelpTableGenerator } from "./HelpTable";
import { HMACGenerator } from "./HMACGenerator";
import { MoveValidator } from "./MoveValidator";

const moves = process.argv.slice(2);

try {
  //validate input moves
  MoveValidator.validate(moves);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("An unknown error occurred during move validation.");
  }
  console.error("Usage: ts-node index.ts <move1> <move2> <move3> ...");
  process.exit(1);
}

const gameRules = new GameRules(moves);
const helpTable = new HelpTableGenerator(gameRules, moves);

const key = HMACGenerator.generateKey();
const computerMove = moves[Math.floor(Math.random() * moves.length)];
const hmac = HMACGenerator.generateHMAC(key, computerMove);

console.log("HMAC: " + hmac);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Show the menu of available moves
const showMenu = () => {
  console.log("Available moves: ");
  moves.forEach((move, index) => {
    console.log(`${index + 1} - ${move}`);
  });

  console.log("0 - exit");
  console.log("? - help");
};

//prompt user to enter move

const promptUser = () => {
  rl.question("Enter your move: ", (input) => {
    if (input === "0") {
      console.log("Goodbye!!!");
      rl.close();
      return;
    }

    if (input === "?") {
      console.log(helpTable.generateTable());
      promptUser();
      return;
    }

    const playerIdx = parseInt(input) - 1;
    if (isNaN(playerIdx) || playerIdx < 0 || playerIdx >= moves.length) {
      console.log("Invalid moves. Please choose an available move from below.");
      showMenu();
      promptUser();
      return;
    }

    const playerMove = moves[playerIdx];
    console.log("Your move: " + playerMove);
    console.log("Computer move: " + computerMove);
    console.log(gameRules.determineWinner(playerMove, computerMove));
    console.log("HMAC key: " + key);
    rl.close();
  });
};
showMenu();
promptUser();
