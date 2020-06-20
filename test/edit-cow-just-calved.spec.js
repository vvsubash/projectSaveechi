import { mount } from '@vue/test-utils'
import EditCowJustCalved from '@/components/edit-cow-just-calved'

describe('EditCowJustCalved', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(EditCowJustCalved)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
