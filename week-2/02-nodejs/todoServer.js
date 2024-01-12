/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const todos = [];

// const todolist = [
//   {
//     todo1: {
//       name: "haioresta",
//       id: "1",
//     },
//   },
//   {
//     todo2: {
//       name: "second",
//       id: "2",
//     },
//   },
//   {
//     todo3: {
//       name: "third",
//       id: "3",
//     },
//   },
// ];
// console.log(todolist[1].todo1);

app.use(bodyParser.json());

app.get("/todos", (req, res) => {
  // for (let i = 0; i < todolist.length; i++) {
  //   todolist[i];
  // }
  // res.status(200).json(todolist);
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  const todoid = todos.find(function (a) {
    a.id === parseInt(id);
  });
  if (!todoid) {
    res.status(404).json({
      msg: "Not found",
    });
  } else {
    res.json(todoid);
  }

  // for (let i = 0; i < todolist.length; i++) {
  //   if (!todolist[i].id) {
  //     res.status(404).json({
  //       msg: "Not found",
  //     });
  //   } else {
  //     res.status(200).json(todolist[i]);
  //   }
  // }
});

app.post("/todos", function () {
  const newTodo = {
    title: req.body.title,
    id: Math.floor(Math.random() * 10000000),
    description: req.body.description,
  };
  todos(push(newTodo));
  res.status(201).json(newTodo);
});

app.put("/todos/:id", function () {
  const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));
});

app.delete("/todos/:id");

// app.listen(3000);

module.exports = app;
