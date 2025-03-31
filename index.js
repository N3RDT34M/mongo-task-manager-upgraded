const express = require('express');
const tasksRouter = require('./routers/TasksRouter');
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const { create } = require('express-handlebars');
const axios = require('axios');

mongoose.connect("mongodb://127.0.0.1:27017/taskmanager").then(() => {
    console.log("Successfully connected to MongoDB.")
})

const app = express();
const port = 3000;

app.use(bodyParser.json());

// --- FRONT END:

const hbs = create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

app.use("/static", express.static("static"));

app.get("/dashboard", async function (request, response) {
    try {
        const tasksResponse = await axios.get('http://localhost:3000/API/tasks');
        const tasks = tasksResponse.data;
        response.render("index", { tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        response.status(500).send("Error fetching tasks");
    }
});

app.get("/dashboard/showTask/:id", async function (request, response) {
  try {
    const taskId = request.params.id;
    const taskResponse = await axios.get(
      `http://localhost:3000/API/tasks/${taskId}`
    );
    const task = taskResponse.data;
    response.render("viewsingle", { task });
  } catch (error) {
    console.error("Error fetching task:", error);
    response.status(500).send("Error fetching task");
  }
});

// -/- FRONT END

const api_router = new express.Router();
api_router.use('/tasks', tasksRouter);

app.use('/API', api_router);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});