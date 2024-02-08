<template>
  <q-page class="q-ma-xl">
    <q-table title="Todos" :rows="rows" :columns="columns" row-key="name" />
  </q-page>
</template>

<script>
  import {ref} from 'vue';
  import axios from 'axios';

  export default {
    setup() {
      let rows = ref([]);
      let columns = ref([
        {
          name: "title",
          label: "Title",
          align: "left",
          field: "title",
        },
        {
          name: "completed",
          label: "Completed",
          align: "left",
          field: "completed",
        },
      ]);
      return { rows, columns };
    },
  };

  const getTodos = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        rows.value = response.data;
    });
  };
  
  getTodos();
</script>
