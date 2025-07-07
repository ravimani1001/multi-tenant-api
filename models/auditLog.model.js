const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    ip: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: false } // we use our own timestamp field
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
