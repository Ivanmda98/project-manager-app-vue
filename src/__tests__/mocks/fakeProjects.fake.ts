import type { Project } from '../../modules/projects/interfaces/projects.interface';
export const fakeProjects: Project[] = [
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
  {
    id: '3',
    name: 'App using angular js',
    tasks: [
      {
        id: 'task1',
        name: 'Task one',
      },
      {
        id: 'task2',
        name: 'Task two',
        completeAt: new Date(),
      },
    ],
  },
];
