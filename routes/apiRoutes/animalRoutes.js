// START REQUIRE SECTION
const router = require("express").Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require("../../lib/animals");
const { animals } = require("../../data/animals");
// END REQUIRE SECTION

// START GET/POST SECTION

router.get("/animals", (req, res) => {
	let results = animals;
	if (req.query) {
		results = filterByQuery(req.query, results);
	}
	res.json(results);
});

// GET route for the animals. With multiple routes, pay attention to the order
// param route must come *after* GET route
router.get("/animals/:id", (req, res) => {
	const result = findById(req.params.id, animals);
	if (result) {
		res.json(result);
	} else {
		res.send(404);
	}
});

// ??? GET section needs to go at the end?

router.post("/animals", (req, res) => {
	// req.body is where our incoming content will be
	// set id based on what the next index of the array will be
	req.body.id = animals.length.toString();

	// if any data in req.body is incorrect, send 400 error back
	if (!validateAnimal(req.body)) {
		res.status(400).send("The animal is not properly formatted.");
	} else {
		const animal = createNewAnimal(req.body, animals);
		res.json(animal);
	}
});
// END ROUTES

// START EXPORTS
module.exports = router;
// END EXPORTS
