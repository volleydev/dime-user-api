import { Storage } from "@google-cloud/storage";
import path from "path";

import { setStorage } from "../middlewares/with-storage";

const dev = process.env.NODE_ENV == "dev";

export const initStorage = () => {
  try {
    const storage = dev
      ? new Storage({
          keyFilename: path.join(__dirname, "./../config/serviceAccount.json"),
        })
      : new Storage();
    setStorage(storage);
    console.log("\x1b[32m", "Storage: live.");
  } catch (error) {
    console.log("\x1b[31m", "Storage: down.");
    console.error(error);
  }
};
