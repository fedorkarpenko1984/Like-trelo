<template>
  <div class="card">

    <div>
      <input type="text" v-model="title" :readonly="readonlyFlag" class="title">

      <div class="flex">

        <img src="../assets/icon-save.png" alt=""
             class="button-edit-delete"
             @click="saveCard"
             v-show="!readonlyFlag">

        <img src="../assets/icon-edit.png" alt=""
             class="button-edit-delete"
             @click="startEdit">

        <img src="../assets/icon-delete.png" alt=""
             class="button-edit-delete" @click="deleteCard">

      </div>
    </div>

    <textarea ref="descriptionDOM" :readonly="readonlyFlag" class="description" v-model="description"></textarea>

  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useStore } from 'vuex';

import CardEdit from '../components/CardEdit.vue';

import { Card } from '../types'

export default defineComponent({
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true
    }
  },

  setup(props) {
    const store = useStore()

    const title = ref(props.card.title)
    const description = ref(props.card.description)

    const descriptionDOM = ref() // Ссылка на DOM элемент для установки фокуса

    const readonlyFlag = ref(true) // Флаг, указывающий на вохможность редактирования
    // Так же когда он true, не показывается иконка сохранения

    // Начать редактирование карточки
    function startEdit() {
      if (readonlyFlag.value) {
        readonlyFlag.value = false
      }
      descriptionDOM.value.focus()
    }

    // Сохранить данные после редактирования
    function saveCard() {
      store.commit('saveCard', {
        id: props.card.id,
        title: title.value,
        description: description.value
      })
      readonlyFlag.value = true
    }

    function deleteCard() {
      store.commit('deleteCard', props.card.id)
    }

    return {
      readonlyFlag, title, description, descriptionDOM,

      startEdit,
      saveCard,
      deleteCard
    }
  }
})

</script>

<style lang="sass" scoped>
.card
  width: 290px
  margin: 0 auto
  margin-top: 1rem
  border: 1px solid lightgray
  border-radius: 3px
  background: aliceblue

.description
  resize: none
  width: 100%
  margin: 0 auto
  box-sizing: border-box
  border: none
  outline: none
  background: rgba(0,0,0,0)
  font-family: Roboto
  &:focus
    border: 1px solid lightgray
    background: beige


</style>