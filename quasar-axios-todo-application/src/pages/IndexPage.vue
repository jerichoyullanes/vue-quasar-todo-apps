<template>

  <!-- FORM -->
  <q-form @submit="!selectedRow.id ? addTodo() : updateTodo()"  class="q-ma-md">
    <q-input 
      v-model="form.title" 
      label="Input Field" 
    />
    <q-btn 
      :loading="btnLoadingState"
      type="submit" 
      :label="!selectedRow.id ? 'Submit' : 'Update'" 
      color="primary" 
      class="q-mt-md"
    />
    <q-btn
      :loading="deleteBtnLoadingState"
      v-if="selectedRow.id"
      @click="deleteTodo()"
      class="q-ml-md q-mt-md"
      label="Delete"
      color="negative"
    />
  </q-form>

  <!-- TABLE -->
  <q-page class="q-ma-xl">
    <q-table title="Todos" 
      :rows="rows" 
      :columns="columns" 
      row-key="name" 
      @row-click="onRowClick"
      />
  </q-page>

</template>

<script>
  import {ref} from 'vue';
  import axios from 'axios';

  export default {
    setup() {

      /* TABLE SETUP */
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

      // HTTP Request Function using Axios to fetch data from the API
      const getTodos = () => {
        axios
        .get("https://jsonplaceholder.typicode.com/todos")
        .then((response) => {
          rows.value = response.data;
        });
      };

      getTodos(); // Execute the HTTP Request Function

      /* FORM FUNCTION AND VARIABLES */
      let form = ref({
        userId: 1,
        title: null,
        completed: false,
      });

      // ADD Todo Function
      let btnLoadingState = ref(false);
      const addTodo = () => {
        btnLoadingState.value = true;
        axios
        .post("https://jsonplaceholder.typicode.com/todos", form.value)
        .then((response) => {
          if (response.status === 201) {
            rows.value.unshift(response.data);
            form.value.title = null;
          }
          btnLoadingState.value = false;
        });
      };

      // UPDATE Todo Function
      let selectedRow = ref({});
      const onRowClick = (evt, row) => {
        selectedRow.value = row;
        form.value.title = row.title;
      };
      const updateTodo = () => {
        btnLoadingState.value = true;
        axios
        .put(`https://jsonplaceholder.typicode.com/todos/${selectedRow.value.id}`,
        {
          title: form.value.title,
        })
        .then((response) => {
          if (response.status === 200) {
            let index = rows.value.findIndex((row) => row.id === selectedRow.value.id);
            rows.value[index].title = response.data.title;
            form.value.title = null;
            selectedRow.value = {};
          }
          btnLoadingState.value = false;
        });
      };

      // DELETE Todo Function
      let deleteBtnLoadingState = ref(false);
      const deleteTodo = () => {
        deleteBtnLoadingState.value = true;
        axios
          .delete(`https://jsonplaceholder.typicode.com/todos/${selectedRow.value.id}`)
          .then((response) => {
            if (response.status === 200) {
              rows.value = rows.value.filter((row) => row.id !== selectedRow.value.id);
              form.value.title = null;
            }
            deleteBtnLoadingState.value = false;
          });
      };

      // Return Values
      return {
        rows,
        columns,
        form,
        btnLoadingState,
        addTodo,
        selectedRow,
        onRowClick,
        updateTodo,
        deleteBtnLoadingState,
        deleteTodo,
      };

    },
  };

</script>
