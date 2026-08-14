import { createTestingPinia } from '@pinia/testing';
import AsideMenu from '@/modules/projects/components/AsideMenu.vue';
import { mount, RouterLinkStub, shallowMount } from '@vue/test-utils';
import { useProjectsStore } from '@/modules/projects/store/Projects.store';
import { fakeProjects } from '../../mocks/fakeProjects.fake';

describe('AsideMenu.vue tests integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should render without projects', () => {
    const wrapper = shallowMount(AsideMenu, {
      global: {
        stubs: ['RouterLink'],
        plugins: [createTestingPinia()],
      },
    });
    const store = useProjectsStore();
    const element = wrapper.find('aside p');
    expect(store.projectList).toEqual([]);
    expect(element.text()).toBe('There are no projects');
  });

  test('should render wit projects', () => {
    localStorage.setItem('projects', JSON.stringify(fakeProjects));

    //Se nececita montar el componente despues del setItem de localStorage
    const wrapper = shallowMount(AsideMenu, {
      global: {
        stubs: ['RouterLink'],
        plugins: [createTestingPinia()],
      },
    });
    const store = useProjectsStore();
    const [project1] = store.projectList;

    expect(project1).toEqual({
      id: fakeProjects[0]!.id,
      name: fakeProjects[0]!.name,
      tasks: fakeProjects[0]!.tasks,
    });
    expect(wrapper.find('aside ul.menu').exists()).toBe(true);
  });

  test('should render projects with tasks', () => {
    localStorage.setItem('projects', JSON.stringify([fakeProjects[2]]));

    const wrapper = mount(AsideMenu, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
        plugins: [createTestingPinia()],
      },
    });

    const links = wrapper.findAllComponents(RouterLinkStub);

    expect(links).toHaveLength(3);
    expect(links[0]!.text()).toBe(fakeProjects[2]!.name);
    expect(links[0]!.props('to')).toBe(`/project/${fakeProjects[2]!.id}`);
    expect(wrapper.text()).toContain(fakeProjects[2]!.name);

    fakeProjects[2]!.tasks.forEach((task) => {
      expect(wrapper.text()).toContain(task.name);
    });
  });

  test('should render projects with tasks', () => {
    localStorage.setItem('projects', JSON.stringify([fakeProjects[2]]));

    const wrapper = mount(AsideMenu, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
        plugins: [createTestingPinia()],
      },
    });

    const links = wrapper.findAllComponents(RouterLinkStub);

    expect(links).toHaveLength(3);
    expect(links[0]!.text()).toBe(fakeProjects[2]!.name);
    expect(links[0]!.props('to')).toBe(`/project/${fakeProjects[2]!.id}`);
    expect(wrapper.text()).toContain(fakeProjects[2]!.name);

    fakeProjects[2]!.tasks.forEach((task) => {
      expect(wrapper.text()).toContain(task.name);
    });
  });

  test('should render projects without tasks', () => {
    localStorage.setItem('projects', JSON.stringify([fakeProjects[0]]));

    const wrapper = mount(AsideMenu, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
        plugins: [createTestingPinia()],
      },
    });

    const links = wrapper.findAllComponents(RouterLinkStub);

    expect(links).toHaveLength(1);
    expect(links[0]!.text()).toBe(fakeProjects[0]!.name);
    expect(links[0]!.props('to')).toBe(`/project/${fakeProjects[0]!.id}`);
    expect(wrapper.text()).toContain(fakeProjects[0]!.name);
  });
});
