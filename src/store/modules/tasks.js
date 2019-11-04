import Vue from 'vue'
import db from '@/../config/db'

const state = {
  all: {},
  current: {}
}

const getters = {}

const actions = {
  addTask ({ dispatch }, { task }) {
    db.collection('tasks').add({
      name: task.name,
      description: task.description,
      createdAt: new Date(),
      isDone: false
    })

    dispatch('getAllTasks')
  },

  updateTask ({ commit, dispatch }, {task, id}) {
    db.collection('tasks').doc(id).update(task)

    commit('UPDATE_TASK', {task, id})
  },

  deleteTask ({ commit }, id) {
    db.collection('tasks').doc(id).delete()

    commit('UNSET_TASK', id)
  },

  async getTaskById ({ commit, state }, id) {
    let snapshot = await db.collection('tasks').doc(id).get()
    if (snapshot.exists) {
      commit('SET_TASK', snapshot.data())
    } else {
      console.log('Запись не найдена!')
    }
  },

  async getAllTasks ({ commit }) {
    let tasks = await db.collection('tasks').orderBy('createdAt', 'asc').get()
    tasks.forEach(task => commit('SET_TASKS', { task }))
  }
}

const mutations = {
  SET_TASK (state, task) {
    state.current = Object.assign(state.current, task)
  },
  SET_TASKS (state, { task }) {
    state.all = { [task.id]: task.data(), ...state.all }
  },
  UPDATE_TASK (state, { task, id }) {
    for (let prop in task) {
      state.all[id][prop] = task[prop]
    }
  },
  UNSET_TASK (state, id) {
    Vue.delete(state.all, id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
