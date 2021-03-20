import admin from "firebase-admin";

export const withAuthentication = async (req, res, next) =>
  admin
    .auth()
    .verifyIdToken(req.headers.authorization || "")
    .then(async (decodedToken) => {
      const now = Number(
        String(Date.now()).substr(0, String(decodedToken.exp).length)
      );
      const expired = decodedToken.exp < now;
      if (expired) {
        res.status(401).send({ msg: "Id Token expired.", code: 1 });
      } else {
        const uid = decodedToken.uid;
        req.userId = uid;
        next();
      }
    })
    .catch(function (error) {
      console.log(error);
      res.status(404).send(error);
    });
