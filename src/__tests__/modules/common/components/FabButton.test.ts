import { shallowMount } from '@vue/test-utils';
import FabButton from '@/modules/common/components/FabButton.vue';

describe('FabButton.vue integration test', () => {
  test('Should render with defaults', async () => {
    const wrapper = shallowMount(FabButton);
    const buttonClasses = ['btn', 'btn-circle', 'btn-secondary', 'fixed', 'bottom-right'];
    expect(wrapper.props().position).toBe('bottom-right');
    expect(wrapper.find('button').classes()).toEqual(buttonClasses);
  });

  test('Should render with top-right class', async () => {
    const wrapper = shallowMount(FabButton, {
      props: {
        position: 'top-right',
      },
    });
    const button = wrapper.find('button');
    expect(button.classes()).toContain('top-right');
  });

  test('Should render slot content inside button', async () => {
    const wrapper = shallowMount(FabButton, {
      slots: {
        default: '<span>Hola</span>',
      },
    });
    const slotContent = wrapper.find('button span');
    expect(slotContent.exists()).toBe(true);
    expect(slotContent.text()).toBe('Hola');
  });
});
