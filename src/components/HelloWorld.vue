<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type = "text" v-model = "stavka" placeholder = "unetiste stavku" />
    <button class="btn btn-success" v-on:click = "dodajStavku">Dodaj</button>
    <br><br>

    <table class="table table-striped">
      <thead>
        <tr>
          <th class="text-center">Stavka</th>
          <th class="text-center">Uradjeno</th>
          <th class="text-center">Akcija</th>
        </tr>
      </thead>
      <tbody>
        <TodoListItem
            v-for="todo in todos"
            :todo="todo"
            @remove="obrisi"
            @change="izmeni"
            @done="uradjeno"
            @priority="prioritet"
        />
      </tbody>
    </table>

  </div>
</template>

<script>
import TodoListItem from './TodoListItem.vue'

export default {
  name: 'HelloWorld',
  components: {
    TodoListItem
  },
  data () {
    return {
      msg: 'To-Do Cheklist App',
      stavka:"",
      todos:[{nazivStavke:"Mleko",uradjeno:false,prioritet:false}, 
      {nazivStavke:"Hleb",uradjeno:false,prioritet:false}, 
      {nazivStavke:"Pavlaka",uradjeno:false,prioritet:false}, 
      {nazivStavke:"Margarin",uradjeno:false,prioritet:false}],
      izmeniBoolean:false,
      tempStavka:""
    }
  },
  methods :{
     dodajStavku : function() {
      if (this.izmeniBoolean) {
        this.izmeniPostojecuStavku();
      } else {
        this.dodajNovuStavkuUListu();
      }
     },
     obrisi : function(todo) {
        this.obrisiIzTodoListe(todo);
     },
     izmeni : function(todo) {
        this.stavka = todo.nazivStavke;
        this.tempStavka = todo;
        this.izmeniBoolean = true;
     },
     uradjeno : function(todo) {
        todo.uradjeno = true;
        this.dodajNaPoslednjeMestoUListi(todo);
        this.obrisiIzTodoListe(todo);
     },
     prioritet : function(todo) {
        todo.prioritet = !todo.prioritet;

        if (!todo.prioritet) {
          this.obrisiIzTodoListe(todo);
          his.dodajNaPoslednjeMestoUListi(todo);

        } else {
          this.obrisiIzTodoListe(todo);
          this.dodajNaPrvoMestoUListi(todo);
        }
     },
     // POMOCNE METODE
     dodajNovuStavkuUListu : function() {
      var novaStavka = {nazivStavke:this.stavka,uradjeno:false}
      this.dodajNaPoslednjeMestoUListi(novaStavka);
      this.stavka = ""
     },
     izmeniPostojecuStavku : function() {
      var index = this.todos.indexOf(this.tempStavka);
      var izmenjenaStavka = {nazivStavke:this.stavka,uradjeno:false}
      this.todos.splice(index, 1, izmenjenaStavka);
      this.stavka = ""
      this.izmeniBoolean = false;
     },
     obrisiIzTodoListe : function(todo) {
      var index = this.todos.indexOf(todo);
          if (index > -1) {
              this.todos.splice(index, 1);
          }
     },
     dodajNaPoslednjeMestoUListi : function(todo) {
      this.todos.push(todo);
     },
     dodajNaPrvoMestoUListi : function(todo) {
      this.todos.splice(0, 0, todo);
     }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.prioritet {
  font-weight: bold;
}
</style>
