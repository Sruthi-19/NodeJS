import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/testSample");

const practiceSchema = mongoose.model("testSampleCollection", {
  name: String,
  age: Number,
});

const user1 = new practiceSchema({ name: "Hema", age: 41 });
user1.save().then(() => console.log("Record created"));
