<template>
      <tr>
        <td :class="{'prioritet': todo.prioritet}">{{todo.nazivStavke}}</td>
        <td>{{daLiJeUradjeno(todo)}}</td>
        <td>
          <!-- <button class="btn btn-success" v-on:click = "prioritet(todo)">Prioritet</button> -->
          <button class="btn btn-success" @click="$emit('priority', todo)">Prioritet</button>
          <!-- <button class="btn btn-info" v-on:click = "uradjeno(todo)">Uradjeno</button> -->
          <button class="btn btn-info" @click="$emit('done', todo)">Uradjeno</button>
          <!-- <button class="btn btn-warning" v-on:click = "izmeni(todo)">Izmeni</button> -->
          <button class="btn btn-warning" @click="$emit('change', todo)">Izmeni</button>
          <!-- <button class="btn btn-danger" v-on:click = "obrisi(todo)">Obrisi</button> -->
          <button class="btn btn-danger" @click="$emit('remove', todo)">Obrisi</button>
        </td>
      </tr>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
     daLiJeUradjeno : function(todo) {
        if (todo.uradjeno) {
          return 'DA';
        } else {
          return 'NE';
        }
     },
  }
  
}
</script>

<style scoped>
.prioritet {
  font-weight: bold;
}
</style>