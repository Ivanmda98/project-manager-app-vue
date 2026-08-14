import { fakeProjects } from '@/__tests__/mocks/fakeProjects.fake';
import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import { useProjectsStore } from '@/modules/projects/store/Projects.store';
import ProjectsView from '@/modules/projects/views/ProjectsView.vue';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

describe('ProjectsView.vue tests integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  test('should render properly when there are not projects', async () => {
    localStorage.setItem('projects', JSON.stringify([]));

    const wrapper = mount(ProjectsView, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    const store = useProjectsStore();
    expect(store.noProjects).toBe(true);
    expect(wrapper.find('[role="alert"]').exists()).toBe(true);
    expect(wrapper.find('[role="alert"]').text()).toBe('There are not projects!');
    expect(wrapper.findComponent(InputModal).exists()).toBe(true);
    expect(wrapper.findComponent(InputModal).props('open')).toBe(false);
  });

  test('should render properly when there are projects', async () => {
    localStorage.setItem('projects', JSON.stringify(fakeProjects));

    const wrapper = mount(ProjectsView, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    const store = useProjectsStore();
    const trElements = wrapper.findAll('tbody tr');
    const progress = wrapper.findAll('progress');

    expect(store.noProjects).toBe(false);
    expect(wrapper.find('.table').exists()).toBe(true);
    expect(trElements.length).toBe(fakeProjects.length);

    fakeProjects.forEach((element, index) => {
      const row = trElements[index];
      expect(row?.text()).toContain(element.name);
    });
    expect(progress[2]?.attributes('value')).toBe(
      store.projectsCompletion[2]?.completion.toString(),
    );
  });

  test('Click on FabButton', async () => {
    localStorage.setItem('projects', JSON.stringify(fakeProjects));

    const wrapper = mount(ProjectsView);

    const fabButton = wrapper.findComponent(FabButton);

    expect(wrapper.findComponent(InputModal).props('open')).toBe(false);
    fabButton.vm.$emit('addNewProject');
    await nextTick();
    expect(wrapper.findComponent(InputModal).props('open')).toBe(true);
  });

  test('Cancel add a new project action', async () => {
    localStorage.setItem('projects', JSON.stringify(fakeProjects));

    const wrapper = mount(ProjectsView);

    const fabButton = wrapper.findComponent(FabButton);
    const inputModal = wrapper.findComponent(InputModal);

    expect(inputModal.props('open')).toBe(false);
    fabButton.vm.$emit('addNewProject');
    await nextTick();
    expect(inputModal.props('open')).toBe(true);
    inputModal.vm.$emit('close');
    await nextTick();
    expect(inputModal.props('open')).toBe(false);
  });

  test('add a new project action', async () => {
    localStorage.setItem('projects', JSON.stringify([]));

    const wrapper = mount(ProjectsView, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    const store = useProjectsStore();

    const fabButton = wrapper.findComponent(FabButton);
    const inputModal = wrapper.findComponent(InputModal);

    fabButton.vm.$emit('addNewProject');
    await nextTick();
    inputModal.vm.$emit('value', 'Crear administrador de tareas en vue');
    await nextTick();

    expect(store.createNewProject).toHaveBeenCalledOnce();
  });
});
