<template>
  <ul class="pagination" v-if="pages.length > 1">
    <li class="page-item">
      <a href="" v-if="currentPage != 1" @click.prevent="goToPage(currentPage - 1)"> Назад </a>
    </li>
    <li class="page-item">
      <a href="" :class="{ active: pageNumber == currentPage }" v-for="(pageNumber, id) in pages.slice((currentPage == 1) ? 0 : currentPage - 2, currentPage + 3)" :key="id" @click.prevent="goToPage(pageNumber)">
        {{ pageNumber }}
      </a>
    </li>
    <li class="page-item">
      <a href="" v-if="currentPage < pages.length" @click.prevent="goToPage(currentPage + 1)"> Вперед </a>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Pagination',

  data () {
    return {
      showSpinner: true
    }
  },

  props: ['items'],

  methods: {
    goToPage (page) {
      if (+this.currentPage !== page) {
        this.setCurrentPage(page)
        this.$router.push({ name: 'Index Pagination', params: { page: page } })
      }
    },
    ...mapActions('pagination', [
      'setPages',
      'setCurrentPage'
    ])
  },

  computed: {
    ...mapState({
      pages: state => state.pagination.pages,
      currentPage: state => state.pagination.currentPage
    })
  },

  watch: {
    items () {
      this.setPages({ items: this.items })
    }
  },

  created () {
    let page = this.$route.params.page || 1
    if (page) {
      this.setCurrentPage(page)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  margin: 2.5em auto;

  a {
    transition: all 0.2s linear;
    border-radius: .6em;
    padding: .8em 1.3em;
    margin: 0 1em;
    font-size: 1.2em;

    &.selected, &:hover, &:active, &.active {
      color: #fff;
      background-color: #3498db;
    }
  }
}

@media (max-width: 768px) {
  .pagination {
    margin: 1.5em auto;

    a {
      padding: .7em 1em;
      margin: 0 .2em;
      font-size: 1em;
    }
  }
}
</style>
