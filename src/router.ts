// import { imageUpload } from "./routes/upload-image";

// import { withAuthentication } from "./middlewares/with-authentication";
// import { withStorage } from "./middlewares/with-storage";
// import { withDatabase } from "./middlewares/with-database";

export const router = (app) => {
  app.get("/", (req, res) => {
    res.send("Hello world!");
  });

  // app.post("/upload/image", withStorage, withDatabase, imageUpload);
};
