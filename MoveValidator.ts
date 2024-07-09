//class to validate rules and condition for game moves. In the first input moves must be odd and at least 3.


export class MoveValidator {
    static validate(moves: string[]): void {
        if(moves.length < 3 || moves.length % 2 === 0) {
            throw new Error("Moves must be an odd number grater then or equal to 3.")
        }

        //create a set to remove duplicate values
        const uniqueMoves = new Set(moves)

        //if size of the set and the length of original array is not same, then it means there are duplicate value in the original array.
        if(uniqueMoves.size !== moves.length) {
            throw new Error("Moves must be unique! Correct way: rock Spock paper lizard scissors")
        }
    }
}
