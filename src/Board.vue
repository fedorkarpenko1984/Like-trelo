<template>

  <div class="flex ">
    <ColumnComponent v-for="column in columns"
                     :key="column.id"
                     @drop="onDrop($event, column.id)"

                     @dragover.prevent
                     @dragenter.prevent

                     :id="column.id"
                     :title="column.title"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import ColumnComponent from "@/components/Column.vue";

export default defineComponent({
  components: { ColumnComponent },

  setup() {
    const store = useStore()

    let columns = computed(() => store.state.columns)


    ///////// Перетаскивание в колонку
    function onDrop(e: DragEvent, columnID: number) {
      if (e.dataTransfer === null) {
        throw new Error('ОБжект равене нулу')
      }

      const cardID = parseInt(e.dataTransfer.getData('cardID'))

      store.commit('cardTransfer', {cardID, columnID})
    }

    return { columns, onDrop }
  }
})
</script>

<style lang="sass" scoped>

</style>