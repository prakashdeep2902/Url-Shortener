import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    UserName: {
      type: String,
      require: true,
    },
    UserMobileNo: {
      type: Number,
      require: true,
      unique: true,
    },
    UserEmail: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("User", UserSchema);

export default Users;
