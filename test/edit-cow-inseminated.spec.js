import { mount } from '@vue/test-utils'
import EditCowInseminated from '@/components/edit-cow-inseminated'

describe('EditCowInseminated', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(EditCowInseminated)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
