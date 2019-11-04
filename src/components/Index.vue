<template>
  <div id="cards-wrap">
    <h1>Задачи</h1>
    <div id="cards">
      <task-form :action="sendForm"/>
      <task-card v-for="(task, id) in paginateTasks" :key="id" :task="task" :id="id"/>
      <moon-loader class="spinner" :loading="showSpinner"/>
    </div>
    <pagination :items="tasks" class="pagination"/>
  </div>
</template>

<script>
import TaskForm from './parts/TaskForm'
import TaskCard from './parts/TaskCard'
import Pagination from './parts/Pagination'
import { mapState, mapActions, mapGetters } from 'vuex'
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'

export default {
  name: 'Index',

  components: { TaskForm, TaskCard, MoonLoader, Pagination },

  data () {
    return {
      showSpinner: true
    }
  },

  methods: {
    ...mapActions('tasks', [
      'addTask'
    ]),
    ...mapActions('pagination', [
      'setCurrentPage'
    ]),

    async sendForm (task) {
      await this.addTask(task)
      if (+this.currentPage !== 1) {
        this.setCurrentPage(1)
        this.$router.push({ name: 'Index Pagination', params: { page: 1 } })
      }
    }
  },

  computed: {
    ...mapState({
      tasks: state => state.tasks.all,
      currentPage: state => state.pagination.currentPage
    }),
    ...mapGetters('pagination', [
      'paginateItems'
    ]),
    currentPage () {
      return this.$route.params.page || 1
    },
    paginateTasks: {
      get: function () {
        return this.paginateItems(this.tasks, this.currentPage)
      },
      set: val => val
    }
  },

  watch: {
    currentPage () {
      this.paginateTasks = this.paginateItems(this.tasks, this.currentPage)
    }
  },

  created () {
    this.$store.dispatch('tasks/getAllTasks').then(() => { this.showSpinner = false })
  }
}
</script>

<style lang="scss" scoped>
#cards-wrap {
  border-radius: 10px;
  background-color: #f1f3fbc4;
  padding: 2em;
  min-height:  80vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    margin: 0 0 1em 0;
  }

  #cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 2em 2em;
    margin-bottom: 3em;
  }

  .pagination {
    margin-top: auto;
  }
}

@media (min-width: 1800px) {
  #cards-wrap {
    width: 110em;
    min-height: 45em;
    margin: 0 auto;
  }
}

@media (max-width: 1600px) {
  #cards-wrap #cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2em 2em;
  }
}

@media (max-width: 1200px) {
  #cards-wrap #cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2em 2em;
  }
}

@media (max-width: 768px) {
  #cards-wrap {
    min-height: auto;
    #cards {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 1em 1em;
    }
  }
}
</style>
