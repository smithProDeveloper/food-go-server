import { randomInt } from "crypto";

export function generateCode(length = 8): string {
  const min = 10 ** (length - 1);
  const max = 10 ** length;

  return randomInt(min, max).toString();
}