import CustomModal from '@/modules/common/components/CustomModal.vue';
import { mount } from '@vue/test-utils';

describe('CustomModal.vue integration test', () => {
  test('Should render with default state', () => {
    const wrapper = mount(CustomModal, {
      props: {
        open: false,
      },
    });
    expect(wrapper.find('.modal').attributes('open')).toBeUndefined();
  });

  test('Should render with header, main and footer slots', async () => {
    const wrapper = mount(CustomModal, {
      props: {
        open: false,
      },
      slots: {
        modalHeader: '<span>Modal Header</span>',
        modalMain: '<span>Modal Main</span>',
        modalFooter: '<span>Modal Footer</span>',
      },
    });
    const headerContent = wrapper.find('header span');
    const mainContent = wrapper.find('main span');
    const footerContent = wrapper.find('footer span');

    expect(headerContent.exists()).toBe(true);
    expect(mainContent.exists()).toBe(true);
    expect(footerContent.exists()).toBe(true);
  });

  test('Open and close dialog when open prop changes', async () => {
    const wrapper = mount(CustomModal, {
      props: {
        open: true,
      },
    });
    const modal = wrapper.find('.modal');
    expect(modal.attributes('open')).toBeDefined();

    await wrapper.setProps({ open: false });

    expect(modal.attributes('open')).toBeUndefined();
  });
});
