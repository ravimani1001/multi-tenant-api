const express = require("express");
const router = express.Router();
const { registerOrganization } = require("../controllers/org.controller");

router.post("/register", registerOrganization);

module.exports = router;
