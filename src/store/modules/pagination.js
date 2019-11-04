const state = {
  currentPage: 1,
  pages: [],
  perPage: 9
}

const getters = {
  paginateItems (state) {
    return function (items, currentPage) {
      let from = (currentPage * state.perPage) - state.perPage
      let to = (currentPage * state.perPage)

      let slicedItems = Object.fromEntries(Object.entries(items).slice(from, to))
      if (Object.keys(slicedItems).length) {
        return slicedItems
      }
    }
  }
}

const actions = {
  setPages ({ state, rootState, commit }, { items } = {}) {
    if (!items) return false

    commit('RESET_PAGES')
    let numberOfPages = Math.ceil(Object.keys(items).length / state.perPage)

    for (let index = 1; index <= numberOfPages; index++) {
      commit('SET_PAGE', index)
    }
  },

  setCurrentPage ({ state, rootState, commit }, page) {
    commit('SET_CURRENT_PAGE', page)
  }
}

const mutations = {
  RESET_PAGES (state) {
    state.pages = []
  },
  SET_PAGE (state, index) {
    state.pages.push(index)
  },
  SET_CURRENT_PAGE (state, page) {
    state.currentPage = page
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
