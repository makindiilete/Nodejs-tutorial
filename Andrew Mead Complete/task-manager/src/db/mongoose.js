const mongoose = require("mongoose");
const dotEnv = require("dotenv");
// const mongoose = require("mongoose");
// const dotEnv = require("dotenv");
dotEnv.config();

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    //ds facilitates mongoose-mongodb connection so we can quickly access d data we want to access.
    useCreateIndex: true,
    //  correcting findAndModify deprecation warning
    useFindAndModify: false
  },
  () => console.log(`Connected To Database @ ${process.env.MONGODB_URL}`)
);
