const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const fs = require("fs");
const path = require("path");
const express = require("express");
const { animals } = require("./data/animals");

// ??? instead of using `import express from 'express';' we're using this version to avoid using modern js?
const res = require("express/lib/response");
const PORT = process.env.PORT || 3001;
const app = express();

// END SERVE FRONT-END RESOURCES SECTION

// ??? I'm just typing stuff with no understanding of how it works
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// START SERVE FRONT-END RESOURCES SECTION
// ??? Why won't it load if the css folder is in the public folder, but not in the assets folder? Because that's where the stylesheet in index.html is pointing? line 10?
app.use(express.static("public"));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
	console.log(`API server now on port ${PORT}!`);
});

// END GET/POST SECTION
