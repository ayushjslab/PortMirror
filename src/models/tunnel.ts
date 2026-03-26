import mongoose, { Document, Schema } from "mongoose";

export interface ITunnel extends Document {
  userId: mongoose.Types.ObjectId;
  token: string; // used in CLI
  subdomain: string;
  localPort: number;
  status: "active" | "inactive";
  createdAt: Date;
}

const TunnelSchema = new Schema<ITunnel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true, unique: true },
    subdomain: { type: String, required: true, unique: true },
    localPort: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
  },
  { timestamps: true }
);

export const Tunnel =
  mongoose.models.Tunnel ||
  mongoose.model<ITunnel>("Tunnel", TunnelSchema);