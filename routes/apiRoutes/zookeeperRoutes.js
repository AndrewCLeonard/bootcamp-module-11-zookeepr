// START REQUIRE SECTION
const router = require("express").Router();
const {
    filterByQuery,
    findById, 
    createNewZookeeper,
    validateZookeeper,
} = require("../../lib/zookeepers");
const { zookeepers } = require("../../data/zookeepers.json")
// END REQUIRE SECTION

// START ROUTES SECTION

router.get("/aniamls", (req, res) => {
    let results = zookeepers;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// GET route for the zookeepers. param routes must come *after* GET routes
router.get("/zookeepers/:id", (req, res) => {
    const result = findById(req.params.id, zookeepers);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post("/zookeepers", (req, res) => {
    req.body.id = zookeepers.length.toString();

    if (!validateZookeeper(req.body)) {
        res.status(400).send("THe zookeeper is not properly formatted.");
    } else {
        const zookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(zookeeper);
    }
});
// END ROUTES SECTION

// START EXPORTS
module.exports = router;
// END EXPORTS

