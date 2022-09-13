const express = require("express");
const { animals } = require("./data/animals");

const PORT = process.env.PORT || 3001;
const app = express();

function filterByQuery(query, animalsArray) {
	let personalityTraitsArray = [];
	let filteredResults = animalsArray;

	// search type: personality
	if (query.personalityTraits) {
		console.log("personality query");
		console.log(query.personalityTraits);
		if (typeof query.personalityTraits === "string") {
			personalityTraitsArray = [query.personalityTraits];
			console.log("it's a string");
			console.log(personalityTraitsArray);
		} else {
			personalityTraitsArray = query.personalityTraits;
			console.log("it's an array");
			console.log(personalityTraitsArray);
		}
		console.log("filtered results");
		personalityTraitsArray.forEach((trait) => {
			filteredResults = filteredResults.filter((animal) => animal.personalityTraits.indexOf(trait) !== -1);
		});
	}

	// search type: diet

	if (query.diet) {
		console.log("diet query");
		filteredResults = filteredResults.filter((animal) => animal.diet === query.diet);
		console.log(filteredResults);
	}

	// search type: species

	if (query.species) {
		console.log("species query");
		filteredResults = filteredResults.filter((animal) => animal.species === query.species);
		console.log(filteredResults);
	}

	// search type: name

	if (query.name) {
		console.log("name query");
		filteredResults = filteredResults.filter((animal) => animal.name === query.name);
		console.log(filteredResults);
	}
	console.log(filteredResults);
	return filteredResults;
}

function findById(id, animalsArray) {
	const result = animalsArray.filter((animal) => animal.id === id)[0];
	return result;
}

app.get("/api/animals", (req, res) => {
	let results = animals;
	if (req.query) {
		results = filterByQuery(req.query, results);
	}
	res.json(results);
});

app.get("/api/animals/:id", (req, res) => {
	const result = findById(req.params.id, animals);
	if (result) {
		res.json(result);
	} else {
		res.send(404);
	}
});

app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});
