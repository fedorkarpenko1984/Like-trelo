<template>
  <header class="header flex space-between">
      <h2>ТРЕЛО</h2>
      <button class="btn" @click="addColumn">Добавить колонку</button>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from "vuex";

import { Column } from '../types'

export default defineComponent({

  setup() {
    const store = useStore()

    function addColumn() {
      const columns: Column[] = store.state.columns
      const lastColumn: Column = columns[columns.length - 1]

      const newColumn = {
        id: lastColumn.id + 1,
        title: 'Новая колонка'
      } as Column

      store.commit('addColumn', newColumn)
    }



    return {
      addColumn
    }
  }
})
</script>

<style lang="sass" scoped>
.header
  min-height: 80px

.search-box
  padding: 0.5rem
  margin: 0.5rem
  background: aliceblue
  border: aquamarine
  border-radius: 5px
</style>