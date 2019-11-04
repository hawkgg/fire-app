<template>
  <form id="taskForm" @submit.prevent="action({task, id: taskId})">
      <input v-model="task.name" placeholder="Напишите название задачи" required/>
      <textarea rows="4" v-model="task.description" placeholder="Описание задачи"></textarea>
      <input type="submit" class="btn btn-success" value="Сохранить"/>
  </form>
</template>

<script>

export default {
  name: 'TaskForm',
  props: {
    'task': {
      default () {
        return {
          name: '',
          description: '',
          isDone: false
        }
      },
      type: Object
    },
    'action': {
      type: Function
    },
    'taskId': {
      default: '',
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
#taskForm {
  text-align: left;
  margin: 0 .3em .3em .3em;

  textarea, input {
    width: 100%;
    margin: 5px 0;
  }

  input {
    &[type="submit"], &[type="checkbox"] {
      width: auto;
    }
  }

  .submitBtn {
    margin-top: 5px;
  }

  input:first-of-type {
    margin-top: 0;
  }
}

@media (max-width: 768px) {
  input[type="submit"] {
      width: 100% !important;
  }
  #taskForm {
    textarea {
      display: none;
    }
  }
}
</style>
