const Organization = require("../models/organization.model");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { logAction } = require("../services/log.service");

const registerOrganization = async (req, res) => {
  try {
    const { name, email, password, organizationName } = req.body;

    if (!name || !email || !password || !organizationName) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if org exists
    const existingOrg = await Organization.findOne({ name: organizationName });
    if (existingOrg) {
      return res.status(400).json({ message: "Organization already exists." });
    }

    // Create organization
    const newOrg = await Organization.create({ name: organizationName });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const adminUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      organizationId: newOrg._id
    });

    // Log the action
    await logAction({
      action: "ORGANIZATION_CREATED",
      description: `Org "${organizationName}" created by ${email}`,
      userId: adminUser._id,
      organizationId: newOrg._id,
      req
    });

    await logAction({
      action: "ADMIN_USER_CREATED",
      description: `Admin account "${email}" created for org "${organizationName}"`,
      userId: adminUser._id,
      organizationId: newOrg._id,
      req
    });

    res.status(201).json({ message: "Organization and admin created successfully." , adminInfo : {id : adminUser._id, name : adminUser.name, email : adminUser.email} });
  } catch (err) {
    console.error("Error in org registration:", err.message);
    res.status(500).json({ message: "Server error", error : err.message });
  }
};

module.exports = { registerOrganization };
