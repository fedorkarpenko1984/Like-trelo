<template>
  <div class="pad-1">
    <Header />
    <Board />
  </div>
</template>

<script lang="ts">
import Board from "@/Board.vue";
import Header from "@/components/Header.vue";

import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: { Header, Board },
  setup() {
    const store = useStore()



  }
})
</script>

<style scoped>

</style>