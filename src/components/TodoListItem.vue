<template>
      <tr>
        <td v-if="edit" :class="{'priority': todo.priority}" v-on:click="openEditForm">{{todo.name}}</td>
        <td v-else>
            <input type = "text" v-model = "todo.name"/>
            <button class="btn btn-success" v-on:click="updateToDo">Save</button>
        </td>
        <td>{{isItDone(todo)}}</td>
        <td>
          <button class="btn btn-success" @click="$emit('priority', todo)">Priority</button>
          <button v-if="todo.done" class="btn btn-info" @click="$emit('done', todo)">Undone</button>
          <button v-else class="btn btn-info" @click="$emit('done', todo)">Done</button>
          <button class="btn btn-danger" @click="$emit('remove', todo)">Delete</button>
        </td>
      </tr>
</template>

<script>
import { apiService } from '../services/todo.service'

export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      edit:true
    }
  },
  methods: {
     isItDone : function(todo) {
        if (todo.done) {
          return 'Done';
        } else {
          return 'Undone';
        }
     },
     openEditForm : function() {
        this.edit = false;
     },
     updateToDo : function() {
        this.edit = true;
        this.saveToDB
     },
     saveToDB : function() {
        apiService.updateTodo(this.todo)
          .then(response => {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error);
          });
     }
  },
}

</script>

<style scoped>
.priority {
  font-weight: bold;
}
</style>