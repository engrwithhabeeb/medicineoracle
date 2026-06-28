const express = require("express");
const path = require("node:path");

const app = express();

const PORT = undefined; // rename to your prefer port.

app.set("views", path.join(__dirname, "views")); // leave as is unless your ui directory is not views
app.set("view engine", "ejs"); // don't change unless you are using another view engine apart from ejs

const ENGINEER = {
  name: "Habeeb Abdullahi",
  username: "engrwithhabeeb", // on socials worldwide.
  linkedin: "https://linkedin.com/in/engrwithhabeeb"
};

app.get("/", (req, res) => {
  res.render("index", {
    ENGINEER: ENGINEER,
  }); /* rendering view at index.ejs and passing data to it. 
  Feel to change it to what you application needs */
});

app.listen(PORT || 8080 /* free to remove || 8080 after renaming PORT at the top or leave them as fallback */, () => {
  console.log(
    `App starting at ${PORT ? PORT : 8080 /* free to remove the condition ? PORT : 8080 after renaming PORT at the top or leave them as fallback */}`,
  );
});
