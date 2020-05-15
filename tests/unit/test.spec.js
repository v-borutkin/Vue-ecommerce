import cart from '@/components/Cart/CartItem'
import { shallowMount } from '@vue/test-utils'
const expect = require('expect')

describe('Проверяем кликабельность', () => {
  it('Проверяем наличие кнопок "плюс" и "минус" у товара', () => {
    const Wrapper = shallowMount(cart, {
      propsData: {
        item: {
          good: {
            id: 1
          }
        }
      }
    })
    const plus = Wrapper.find('.plus')
    const minus = Wrapper.find('.minus')
    expect(plus.attributes('type')).toBe('button')
    expect(minus.attributes('type')).toBe('button')
    Wrapper.destroy()
  })

  it('Проверяем клик "plus"', () => {
    const Wrapper = shallowMount(cart, {
      propsData: {
        item: {
          good: {
            id: 1
          }
        }
      }
    })
    const plus = Wrapper.find('.plus')
    plus.trigger('click')
    expect(Wrapper.emitted('plus')).toBeTruthy()
    Wrapper.destroy()
  })

  it('Проверяем клик "minus"', () => {
    const Wrapper = shallowMount(cart, {
      propsData: {
        item: {
          good: {
            id: 1
          }
        }
      }
    })
    const minus = Wrapper.find('.minus')
    minus.trigger('click')
    expect(Wrapper.emitted('minus')).toBeTruthy()
    Wrapper.destroy()
  })

  it('Проверяем клик "delete"', () => {
    const Wrapper = shallowMount(cart, {
      propsData: {
        item: {
          good: {
            id: 1
          }
        }
      }
    })
    const del = Wrapper.find('.bi-trash')
    del.trigger('click')
    expect(Wrapper.emitted('delete')).toBeTruthy()
    Wrapper.destroy()
  })
})
