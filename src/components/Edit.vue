<template>
  <div id="cards-wrap">
    <div id="edit-header">
      <router-link to="/">
        <a href="#">&lt;&lt; Назад</a>
      </router-link>
      <h1>Редактирование</h1>
      <div class="action-bar">
        <button class="btn btn-danger" @click="deleteConfirm" title="Удалить задачу"><font-awesome-icon icon="trash" /></button>
      </div>
    </div>
    <moon-loader class="spinner" v-if="showSpinner"/>
    <task-form :task="task" :action="sendForm" :taskId="taskId" v-else/>
  </div>
</template>

<script>
import TaskForm from './parts/TaskForm'
import { mapActions } from 'vuex'
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'

export default {
  name: 'Edit',
  components: { TaskForm, MoonLoader },
  methods: {
    async sendForm ({ task, id }) {
      await this.updateTask({ task, id })
      this.$router.push({ name: 'Index' })
    },
    async deleteConfirm () {
      if (confirm('Вы уверены?')) {
        await this.deleteTask(this.taskId)
        this.$router.go(-1)
      }
    },
    ...mapActions('tasks', [
      'updateTask',
      'deleteTask'
    ])
  },
  data () {
    return {
      taskId: this.$route.params.taskId,
      showSpinner: true,
      task: {
        name: null,
        description: null
      }
    }
  },
  async created () {
    await this.$store.dispatch('tasks/getTaskById', this.taskId)
    this.task = Object.assign(this.$store.state.tasks.current)
    this.showSpinner = false
  }
}
</script>

<style lang="scss" scoped>
  #cards-wrap {
    width: 75vw;
    margin: 2em auto 0 auto;

    #edit-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1em;
    }

    input, textarea {
      width: 100%;
      margin: .5em 0;
    }
  }
  @media (min-width:768px) {
    #cards-wrap {
      width: 50vw;
    }
  }
  @media (min-width:1500px) {
    #cards-wrap {
      width: 25vw;
    }
  }
</style>
