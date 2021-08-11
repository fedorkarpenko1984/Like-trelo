import { createStore } from 'vuex'

import { Column, Card } from '../types'

export default createStore({
  state: {

    // Mock - данные

    columns: [
      {
        id: 0,
        title: 'Надо выполнить'
      },
      {
        id: 1,
        title: 'Текущие'
      },
      {
        id: 2,
        title: 'Выполненные'
      }
    ] as Column[],

    cards: [
      {
        id: 0,
        title: 'Карточка',
        columnID: 0
      },

      {
        id: 1,
        title: 'Карточка',
        description: 'Какое-то описание',
        columnID: 1
      },
      {
        id: 3,
        title: 'Карточка',
        description: 'Какое-то еще описание чуть длиннее',
        columnID: 1
      },

      {
        id: 4,
        title: 'Например, задача',
        description: 'Поход за хлебом, например',
        columnID: 2
      },

    ] as Card[]
  },


  mutations: {

    ///////////////////// Операции с колонками

    // Добавляем колонку
    addColumn(state, payload) {
      state.columns.push(payload)
    },

    //Сохраняем заголовок для колонки
    saveTitle(state, payload) {
      // найдем индекс в массиве колонок по id
      const index = state.columns.findIndex(column => column.id === payload.id)

      state.columns[index].title = payload.title // и заменим
    },

    // Удаление колонки
    deleteColumn(state, payload) {
      const index = state.columns.findIndex(column => column.id === payload) // Находим индекс по id
      state.columns.splice(index, 1) // Удаляем колонку

           // Удаляем принадлежащие колонке карточка из массива карточек
      state.cards = state.cards.filter(card => card.columnID !== payload)
    },


    //////////////////// Операции с карточками

    // Добавление карточки в колонку
    addCard(state, payload) {
      const newID = state.cards[state.cards.length - 1].id + 1
      const newCard = {id: newID, title: 'Карточка', columnID: payload} as Card
      state.cards.push(newCard)
    },

    // Удаление карточек
    deleteCard(state, payload) {
      const index = state.cards.findIndex(card => card.id === payload)
      state.cards.splice(index, 1)
    },

    // Сохранение карточки после редактирования
    saveCard(state, payload) {
      const index = state.cards.findIndex(card => card.id === payload.id)
      console.log(index)

      state.cards[index].title = payload.title
      state.cards[index].description = payload.description
    },


    /////////// Перенос карточки из колонки в колонку
    cardTransfer(state, payload) {
      state.cards = state.cards.map(card => {
        if (card.id === payload.cardID) {
          card.columnID = payload.columnID
        }
        return card
      })
    }

  },


  actions: {
  },
  modules: {
  }
})
