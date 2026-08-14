import TopMenu from '@/modules/common/components/TopMenu.vue';
import AsideMenu from '@/modules/projects/components/AsideMenu.vue';
import ProjectsLayout from '@/modules/projects/layouts/ProjectsLayout.vue';
import { shallowMount, VueWrapper } from '@vue/test-utils';

describe('ProjectsLayout.vue tests integration', () => {
  let wrapper: VueWrapper;
  beforeEach(() => {
    wrapper = shallowMount(ProjectsLayout, {
      global: {
        stubs: {
          RouterView: true,
        },
      },
    });
  });

  test('should render properly', () => {
    expect(wrapper.findComponent(TopMenu).exists()).toBe(true);
    expect(wrapper.findComponent(AsideMenu).exists()).toBe(true);
    expect(wrapper.find('router-view-stub').exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
