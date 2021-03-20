import Firestore from "@google-cloud/firestore";
import path from "path";
import { setDatabase } from "../middlewares/with-database";

const dev = process.env.NODE_ENV == "dev";
const projectId = process.env.GCP_PROJECT_ID;

export const initDatabase = () => {
  if (dev) {
    setDatabase(
      // @ts-ignore
      new Firestore({
        projectId,
        keyFilename: path.join(__dirname, "./../config/serviceAccount.json"),
        timestampsInSnapshots: true,
      })
    );
  } else {
    setDatabase(
      // @ts-ignore
      new Firestore({
        projectId,
        timestampsInSnapshots: true,
      })
    );
  }
  console.log("\x1b[32m", "Database: live.");
};
