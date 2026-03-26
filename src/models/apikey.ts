import mongoose, { Document, Schema } from "mongoose";

export interface IApiKey extends Document {
  userId: mongoose.Types.ObjectId;
  key: string;
}

const ApiKeySchema = new Schema<IApiKey>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    key: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const ApiKey =
  mongoose.models.ApiKey ||
  mongoose.model<IApiKey>("ApiKey", ApiKeySchema);