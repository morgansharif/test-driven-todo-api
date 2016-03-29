// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

var idValAssign = 3;


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
  console.log("You've hit the GET /api/todos/search' endpoint");
  queryVal = req.query.q;
  console.log(queryVal);
  var response = [];
  todos.forEach(
    function(todo){
      console.log(todo);
      if (todo.task.includes(queryVal)){
        console.log(' includes '+ queryVal);
        response.push(todo);
      }
    }
  );
  res.json({todos: response});

});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
  res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
  //example response:
  //  { task: 'Create random task name #function random() { [native code] }',
  // description: 'Pick a random number, e.g. function random() { [native code] }' }
  newTodo = req.body;
  // newTodo._id = todos.length + 1;
  idValAssign ++;
  newTodo._id = idValAssign;
  todos.push(newTodo);
  res.send(newTodo);

});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
  var idVal = parseInt(req.params.id);
  var response;
  todos.forEach(
    function(todo){
      if (todo._id === idVal){
        response = todo;
      }
    }
  );
  res.json(response);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
  var idVal = parseInt(req.params.id);
  var newTodo = req.body;
  // console.log('idVal= ', idVal);
  // console.log('newTodo= ', newTodo);

  var response;
  todos.forEach(
    function(todo){
      if (todo._id === idVal){
        todo.task = newTodo.task;
        todo.description = newTodo.description;
        response = todo;
      }
    }
  );
  res.json(response);

});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
   var idVal = parseInt(req.params.id);
   var response;
   todos.forEach(
     function(todo, index){
       if (todo._id === idVal){
        todos.splice(index, 1);
        response = todo;
       }
     }
   );
  res.json(todos);

});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
