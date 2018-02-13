<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type = "text" v-model = "itemNameInput"/>
    <button class="btn btn-success" v-on:click = "addItem">Add Item</button>
    <br><br>

    <table class="table table-striped">
      <thead>
        <tr>
          <th class="text-center">Item</th>
          <th class="text-center">Done</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <TodoListItem
            v-for="todo in todos"
            :todo="todo"
            @remove="deleteTodo"
            @done="finished"
            @priority="priority"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import TodoListItem from './TodoListItem.vue'
import axios from 'axios';
import { apiService } from '../services/todo.service'


export default {
  name: 'TodoList',
  components: {
    TodoListItem
  },
  data () {
    return {
      msg: 'To-Do Cheklist App',
      itemNameInput:"",
      todos:[],
      tempItem:""
    }
  },
  methods :{
     addItem : function() {
        apiService.saveTodo(this.itemNameInput)
          .then(response => {
            if (response.status === 201) {
              this.todos.push(response.data);
            }
          })
          .catch(function (error) {
            console.log(error);
          });        
        this.itemNameInput = ""
     },
     finished : function(todo) {
        todo.done = !todo.done;
        apiService.updateTodo(todo)
          .then(function (response) {
              console.log(response);
            })
          .catch(function (error) {
            console.log(error);
          });        
     },
     priority : function(todo) {
        todo.priority = !todo.priority;

        if (!todo.priority) {
          apiService.updateTodo(todo)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });          

        } else {
          apiService.updateTodo(todo)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });          
        }
     },
     deleteTodo : function(todo) {
      apiService.deleteTodo(todo)
        .then(response => {
          if (response.status === 204) {
            this.removeFromTodos(todo);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
     },

     //UTILITY MEDHODS
     removeFromTodos : function(todo) {
      var index = this.todos.indexOf(todo);
          if (index > -1) {
              this.todos.splice(index, 1);
          }
     },
  
  },
  // Dovlacimo todo-ove prilikom kreiranja komponente
  created() {
      axios.get('http://localhost:8000/api/todos/')
        .then(response => {
          console.log(response.data);
          this.todos = response.data
        })
        .catch(function (error) {
          console.log(error);
        })
     }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.priority {
  font-weight: bold;
}
</style>
