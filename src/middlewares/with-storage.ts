let storage;

export const setStorage = (s) => (storage = s);

export const withStorage = (req, res, next) => {
  if (storage) {
    req.storage = storage;
    next();
  } else {
    res.status(503).send("Storage service is not available.");
  }
};
