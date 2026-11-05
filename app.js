require("node:process").loadEnvFile();

const express = require("express");
const path = require("node:path");
const globalErrorHandler = require("./middlewares/error_handlers/global");

const app = express();

const PORT = Number(process.env.APP_PORT) || 5757; // rename to your prefer port.

app.set("views", path.join(__dirname, "views")); // leave as is unless your ui directory is not views
app.set("view engine", "ejs"); // don't change unless you are using another view engine apart from ejs

app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

app.use(globalErrorHandler);

app.listen(PORT/* free to remove || 8080 after renaming PORT at the top or leave them as fallback */, () => {
  console.log(
    `App starting at http://localhost:${PORT}`,
  );
});
