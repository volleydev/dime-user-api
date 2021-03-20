let database;

export const setDatabase = (d: any) => (database = d);

export const withDatabase = (req, res, next) => {
  if (database) {
    req.database = database;
    next();
  } else {
    res.status(503).send("Storage service is not available.");
  }
};
