/**
 * HMAC ensures computer's move is cryptographically secure and cannot be tampered with. This step helps in proving that the computer did not change its move after the player made theirs, thus ensuring fairness.
 */

import * as crypto from "crypto";

export class HMACGenerator {
  static generateKey(): string {
    return crypto.randomBytes(32).toString("hex"); //Generate a 256 bit key and returns as a hexadecimal string.
  }

  static generateHMAC(key: string, message: string): string { // message => computer move
    return crypto.createHmac("sha3-256", key).update(message).digest("hex"); //generates a sha3 using the key from generateKey, adds msg with the sha3 key then digests to a hexadecimal.
  }
}
