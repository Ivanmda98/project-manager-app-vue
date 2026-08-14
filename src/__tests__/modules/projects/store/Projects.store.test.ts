import type { Project } from '@/modules/projects/interfaces/projects.interface';
import { useProjectsStore } from '@/modules/projects/store/Projects.store';
import { createPinia, setActivePinia } from 'pinia';

import { fakeProjects } from '../../../mocks/fakeProjects.fake';

describe('useProjectStore tests integration', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });
  test('should return default values', () => {
    const {
      addNewTask,
      changeTaskStatus,
      createNewProject,
      projectList,
      projectsCompletion,
      noProjects,
    } = useProjectsStore();

    expect(projectList).toEqual([]);
    expect(projectsCompletion).toEqual([]);
    expect(noProjects).toEqual(true);
    expect(addNewTask).toBeInstanceOf(Function);
    expect(changeTaskStatus).toBeInstanceOf(Function);
    expect(createNewProject).toBeInstanceOf(Function);
  });

  test('add a new project', () => {
    const store = useProjectsStore();
    const projectName = 'New Project';
    store.createNewProject(projectName);

    expect(store.projectList[0]).toEqual({
      id: expect.any(String),
      name: projectName,
      tasks: [],
    });
  });

  test('load projects from localStorage', () => {
    const projectsLocalStorage: Project[] = [
      {
        id: '1',
        name: 'App using vue js',
        tasks: [],
      },
      {
        id: '2',
        name: 'App using react js',
        tasks: [],
      },
    ];

    localStorage.setItem('projects', JSON.stringify(projectsLocalStorage));
    const store = useProjectsStore();

    const [project1, project2] = store.projectList;
    expect(project1).toEqual(projectsLocalStorage[0]);
    expect(project2).toEqual(projectsLocalStorage[1]);
  });

  test('add a new task to a project', () => {
    localStorage.setItem('projects', JSON.stringify(fakeProjects));
    const store = useProjectsStore();

    const [project1] = store.projectList;
    const taskName = 'Task one';
    store.addNewTask(taskName, project1!.id);
    expect(project1!.tasks[0]).toEqual({ id: expect.any(String), name: taskName });
  });

  test('complete a task', () => {
    localStorage.setItem('projects', JSON.stringify(fakeProjects));
    const store = useProjectsStore();

    const [project1] = store.projectList;
    const taskName = 'Task one';
    store.addNewTask(taskName, project1!.id);

    store.changeTaskStatus(project1!.id, project1!.tasks[0]!.id);

    expect(project1!.tasks![0]).toEqual({
      id: expect.any(String),
      name: taskName,
      completeAt: expect.any(Date),
    });
    expect(project1!.tasks[0]!.completeAt).toBeInstanceOf(Date);
  });

  test('should return the project with completion', () => {
    localStorage.setItem('projects', JSON.stringify(fakeProjects));
    const store = useProjectsStore();

    console.log(store.projectsCompletion);

    const [project1, project2, project3] = fakeProjects;
    expect(store.projectsCompletion).toEqual([
      {
        id: project1!.id,
        name: project1!.name,
        taskCount: project1!.tasks.length,
        completion: 0,
      },
      { id: project2!.id, name: project2!.name, taskCount: project2!.tasks.length, completion: 0 },
      {
        id: project3!.id,
        name: project3!.name,
        taskCount: project3!.tasks.length,
        completion: 50,
      },
    ]);
  });
});
