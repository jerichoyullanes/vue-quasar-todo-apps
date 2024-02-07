<script setup>
  import {ref} from 'vue'; // imports the ref function from the Vue library

  let todoList = ref([]) // variable initialization as an empty array that will hold todo items
  let todo = ref(null) 

  // Function to add new row in todo list  
  const addTodo = () => {
    if (validateTodo(todo.value)) { // validate the todo before adding
      let id = todoList.value.length; // Get the current length to assign a unique id
      todoList.value.push ({ // Push a new todo object to the 'todoList' array
        id: ++id,
        todo: todo.value,
        is_done: false
      })
      todo.value = null // Reset the 'todo' variable to null after adding
    }
  }
  
  // Function that checks the entered todo item if already exist to prevent duplication 
  const validateTodo = (new_todo) => {
    let index = todoList.value.findIndex((t) => t.todo === new_todo); 
    if (index !== -1) {
      alert("Todo already exist!");
      return false;
    } else {
      return true;
    }
  }

  // Function that selects the rows of the todo list
  let selectedTodo = ref(null);
  const selectTodo = (row) => {
    selectedTodo.value = row;
    todo.value = row.todo;
  }

  // Function to update the selected todo row 
  const updateTodo = () => {
    if (validateTodo(todo.value)) { // Validate the todo before updating
      let index = todoList.value.findIndex((t) => t.id === selectedTodo.value.id); // Find the index of the selected todo and update its text
      index !== -1 && (todoList.value[index].todo = todo.value);
      todo.value = selectedTodo.value = null; // Reset both 'todo' and 'selectedTodo' variables to null after updating
    }
  }

  // Function for Mark As Done Button
  const markAsDone = (row) => {
    if (confirm(`Are you sure you want to mark ${row.todo} as done?`)) { // Confirm with the user before marking as done
      let index = todoList.value.findIndex((t) => t.id === row.id); // Find the index of the todo and mark it as done
      index !== -1 && (todoList.value[index].is_done = true);
    }
  }

  // Function for removing the selected todo row
  const removeTodo = (row) => {
    if (confirm(`Are you sure you want to delete ${row.todo}?`)) {
      let index = todoList.value.findIndex((t) => t.id === row.id); // Find the index of the todo and remove it from the list
      index !== -1 && todoList.value.splice(index, 1);
    }
  }

</script>

<template>
  <div class="d-flex justify-content-center container">
    <div class="w-75 mt-100">
      <form @submit.prevent="!selectedTodo ? addTodo() : updateTodo()"> <!-- Form for adding or updating a todo -->
        <div class="mb-3 mt-5">
          <label for="todo">What's your todo?</label>
          <div class="d-flex mt-2">
            <input v-model="todo" type="text" class="form-control" id="todo" placeholder="eg. Create todo application"> <!-- Input field for entering the todo text -->
            <button v-if="!selectedTodo" class="btn btn-primary ms-3"><i class="bi bi-plus-circle"></i></button> <!-- Button for adding a new todo -->
            <button v-else="" class="btn btn-primary ms-3"><i class="bi bi-pencil-square"></i></button> <!-- Button for editing an existing todo -->
          </div>
        </div>
      </form>
      <div @click="selectTodo(row)" v-for="row in todoList" :key="row.id" class="toast show mt-2 w-100"> <!-- Displays the list of todos using a Vue loop -->
        <div class="toast-header">
          <!-- Display the todo text with options to mark as done or delete -->
          <strong class="me-auto">{{row.todo}}</strong>
          <button :class="`btn btn-${row.is_done ? 'success' : 'outline-secondary'} btn-sm`" @click.stop="markAsDone(row)"><i class="bi bi-check-lg"></i></button> <!-- Mark as Done Button-->
          <button class="btn btn-danger btn-sm ms-1" @click.stop="removeTodo(row)"><i class="bi bi-trash-fill"></i></button> <!-- Remove Todo Button -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
