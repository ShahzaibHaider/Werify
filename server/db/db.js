const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/werify", (error) => {
      if (!error) {
            console.log("Database Connected")
      } else {
            console.log("Error");
      }
});

module.exports = mongoose;