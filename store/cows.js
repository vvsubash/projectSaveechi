// eslint-disable-next-line no-unused-vars
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { firestoreAction } from 'vuexfire'
export const state = () => ({
  cows: []
})

export const getters = {
  getterValue: (state) => {
    return state.value
  }
}

export const mutations = {}

export const actions = {
  getCows: firestoreAction(({ rootState, bindFirestoreRef }) => {
    bindFirestoreRef(
      'cows',
      firebase.firestore().collection(`users/${rootState.user.uid}/cows`)
    )
  })
}
