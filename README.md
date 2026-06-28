# express-ejs-starter
---
A pre-configured starter repository template for express with ejs projects with useful dependencies available with just "npm install" avoiding the needs to run multiple npm commands for installing.


## List of dependencies available
---
1. ejs
2. express
3. express-ejs-layouts
4. express-validator

## How to use
---
1. Use this repository as a template
- Click the "Use this template" button at the top of the repository
- Create your new repository from it

2. Install dependencies

```
npm install
```

3. Start the server

```
npm start
```

## Benefits
1. This template serves as scaffold for creating new repository with few installation command to run.

2. It helps to write react-like UI layout component in ejs with express-ejs-layout with body acting like outlet/children.

```
index.ejs

<body>
    <h1><%= title %></h1>
    <%- body %>
</body>
```

```
app.js

app.set("layout", "index");
```

3. Very easy to use with almost everything needed setup.

## Contributing
---
Feel free to open issues or submit pull requests if you have improvements or suggestions.