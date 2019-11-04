<template>
  <article class="taskCard">
    <div class="card-header">
      <p class="task-title h2">{{ task.name }}</p>
      <div class="action-bar">
        <input class="task-check" :id="'checkbox-' + id" type="checkbox" :checked="task.isDone" @click="syncDone(!task.isDone, id)"><label :for="'checkbox-' + id" class="btn btn-check" title="Пометить выполненной"></label>
        <router-link :to="{ name: 'Edit', params: { taskId: id }}" class="btn btn-edit" title="Редактировать задачу">
          <font-awesome-icon :icon="['fas', 'pencil-alt']" />
        </router-link><!--
     --><button class="btn btn-close" @click="deleteTask(id)" title="Удалить задачу"><font-awesome-icon icon="times" /></button>
      </div>
    </div>
    <p class="task-description">{{ task.description }}</p>
  </article>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TaskCard',
  props: [
    'task',
    'id'
  ],
  methods: {
    ...mapActions('tasks', [
      'deleteTask',
      'updateTask'
    ]),
    syncDone (isDone, id) {
      this.updateTask({ task: { isDone }, id })
    }
  }
}
</script>

<style lang="scss">
article.taskCard {
  border: 1px solid black;
  min-height: 14em;
  border-radius: 5px;
  border: 1px solid $shadowColor;
  text-align: left;
  color: #172b4d;

  .card-header {
    display: flex;
    justify-content: space-between;

    .task-title {
      margin: 0.5em;
    }

    .action-bar {
      display: flex;
      flex-wrap: nowrap;

      .btn {
        cursor: pointer;
        background: none;
        border-radius: 15%;
        box-shadow: none;
        color: #42526e;
        font-weight: 600;
        font-size: 1rem;
        width: 2.5em;
        height: 2.5em;
        padding: unset;
        transition: .15s linear;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          background: rgba(9, 30, 66, 0.04);
        }

        &:active {
          position: static;
        }
      }
    }
  }

  .task-description {
    margin-left: 0.7em;
  }
}

@media (max-width: 768px) {
  article.taskCard {
    min-height: auto;

    .card-header {
      align-items: center;
    }

    .task-description {
      display: none;
    }

    .task-title {
      margin-bottom: 0;
    }
  }
}
</style>
