import { Redis } from "iovalkey";

export const cacheValkey = new Redis(6379, "localhost");
