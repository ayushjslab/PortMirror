import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  profilePic?: string;
  name: string;
  plan: "free" | "pro";
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    profilePic: { type: String},
    name: { type: String, required: true },
    plan: {
      type: String,
      enum: ["free", "pro"],
      default: "free",
    },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);