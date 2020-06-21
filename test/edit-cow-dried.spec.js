import { mount } from '@vue/test-utils'
import EditCowDried from '@/components/edit-cow-dried'

describe('EditCowDried', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(EditCowDried)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
