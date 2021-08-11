<template>
  <div class="column">
    <div class="flex space-between">
      <div>
        <input type="text"
               class="title"
               ref="input"
               v-model="columnTitle"
               :readonly="!save">

        <img v-show="save"
             src="../assets/icon-save.png"
             class="button-edit-delete" alt=""
             @click="saveTitle">

      </div>
      <div>
        <img src="../assets/icon-edit.png"
             class="button-edit-delete" alt=""
             @click="startEdit">


        <img src="../assets/icon-delete.png"
             class="button-edit-delete" alt=""
             @click="deleteColumn">
      </div>
    </div>

    <button class="btn primary" @click="addCard">Добавить карточку</button>

    <CardComponent v-for="card in cardList"
                   :key="card.id"
                   @dragstart="onDragStart($event, card)"
                   draggable="true"
                   :card="card"/>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

import { Card } from '../types'

import CardComponent from "@/components/Card.vue";

export default defineComponent({
  components: { CardComponent },
  props: {
    id: {
      type: Number,
      required: true
    },

    title: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const store = useStore()

    let columnTitle = ref(props.title)  // заголовок
    let save = ref(false) // флаг, по которому показываем иконку сохранения и убираем readonly с title
    const input = ref() // ссылка на DOM-элемент для установки фокуса

    let cardList = computed(() => store.state.cards.filter((card:Card) => card.columnID === props.id))

    // Добавление карточки в колонку
    function addCard() {
      store.commit('addCard', props.id)
    }

    // Начать редактирование заголовка колонки. Проявляем кнопку сохранить и фокусируем на инпуте
    function startEdit() {
      if (!save.value) {
        save.value = true
      }
      input.value.focus()
    }

    // Сохранить title
    function saveTitle() {
      store.commit('saveTitle', {id: props.id, title: columnTitle})
      save.value = !save.value
    }

    // удалить колонку
    function deleteColumn() {
      store.commit('deleteColumn', props.id)
    }

    ////////////////// Перетаскивание карточек
    function onDragStart(e: DragEvent, card: Card) {
      if (e.dataTransfer === null) {
        throw new Error('ОБжект равене нулу')
      }
      e.dataTransfer.dropEffect = 'move';
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('cardID', card.id.toString());
    }



    return {
      props, input, columnTitle, save,
      cardList,

      onDragStart,

      addCard,
      startEdit,
      saveTitle,
      deleteColumn
    }

  }


})
</script>

<style lang="sass" scoped>
.column
  min-width: 300px
  max-width: 300px
  min-height: 200px
  border: 1px solid lightgray
  border-radius: 5px
  background: lemonchiffon
  margin: 0.5rem
  padding: 0.5rem


</style>