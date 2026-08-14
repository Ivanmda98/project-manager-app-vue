const useSpy = vi.fn();
const mountSpy = vi.fn();

vi.mock('vue', async (importOriginal) => {
  const currentVue = await importOriginal<typeof import('vue')>();
  return {
    ...currentVue,
    createApp: vi.fn().mockReturnValue({
      use: useSpy,
      mount: mountSpy,
    }),
  };
});

vi.mock('pinia', async (importOriginal) => {
  const currentPinia = await importOriginal<typeof import('pinia')>();
  return {
    ...currentPinia,
    createPinia: vi.fn().mockReturnValue('pinia'),
  };
});

vi.mock('@/router', () => ({
  default: 'router',
}));

vi.mock('./assets/main.css', () => ({}));

describe('main.ts integration test', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    document.body.innerHTML = "<div id='app'></div>";
  });

  test('should be configured with pinia and router', async () => {
    const vueModule = await import('vue');
    await import('@/main');
    expect(vueModule.createApp).toHaveBeenCalled();
    expect(mountSpy).toHaveBeenCalledWith('#app');
    expect(useSpy).toHaveBeenCalledWith('pinia');
    expect(useSpy).toHaveBeenCalledWith('router');
  });
});
