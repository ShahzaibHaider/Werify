exports.verifyToken = (req, res, next) => {
      const bearerHeader = req.headers['authorization'];
      if (typeof bearerHeader !== "undefined") {
            bearer = bearerHeader.split(' ');
            bearerToken = bearer[1];
            req.token = bearerToken;
            next();
      } else {
            res.json({ "message": "Forbidden" });
      }
}
exports.secretkey = "talhashahziab";