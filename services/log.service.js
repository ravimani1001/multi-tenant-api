const AuditLog = require("../models/auditLog.model");

async function logAction({ action, description, userId, organizationId, req }) {
  try {
    const log = new AuditLog({
      action,
      description,
      userId,
      organizationId,
      ip: req?.ip || "",
      userAgent: req?.headers["user-agent"] || ""
    });

    await log.save();
    console.log("Action saved in database")
  } catch (err) {
    console.error("Failed to log action:", err.message);
  }
}

module.exports = { logAction };
