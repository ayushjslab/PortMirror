import mongoose, { Document, Schema } from "mongoose";

export interface ITunnelSession extends Document {
  tunnelId: mongoose.Types.ObjectId;
  isConnected: boolean;
  lastSeen: Date;
  ipAddress?: string;
}

const TunnelSessionSchema = new Schema<ITunnelSession>(
  {
    tunnelId: { type: Schema.Types.ObjectId, ref: "Tunnel", required: true },
    isConnected: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now },
    ipAddress: { type: String },
  },
  { timestamps: true }
);

export const TunnelSession =
  mongoose.models.TunnelSession ||
  mongoose.model<ITunnelSession>(
    "TunnelSession",
    TunnelSessionSchema
  );