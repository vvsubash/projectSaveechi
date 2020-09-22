// eslint-disable-next-line no-unused-vars
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
export const state = () => ({
  cows: []
})

export const getters = {
  getterValue: (state) => {
    return state.value
  }
}

export const mutations = {
  ...vuexfireMutations
}

export const actions = {
  getCows: firestoreAction(({ rootState, bindFirestoreRef }) => {
    bindFirestoreRef(
      'cowsList',
      firebase.firestore().collection(`users/${rootState.user.uid}/cows`)
    )
  })
}
