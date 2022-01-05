// START REQUIRE SECTION
const path = require("path");
const router = require("express").Router();
// END REQUIRE SECTION

// START ROUTER SECTION
router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get("/animals", (req, res) => {
	res.sendFile(path.join(__dirname, "../../public/animals.html"));
});

router.get("/zookeepers", (req, res) => {
	res.sendFile(path.join(__dirname, "../../public/zookeepers.html"));
});

router.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../../public/index.html"));
});

// END ROUTER SECTION

// START EXPORTS SECTION
module.exports = router;
// END EXPORTS SECTION
