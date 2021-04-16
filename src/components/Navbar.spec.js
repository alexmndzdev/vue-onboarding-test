import { shallowMount } from '@vue/test-utils';
import Navbar from './Navbar.vue';

describe('Navbar', () => {
  const $router = { push: jest.fn() };
  const wrapper = shallowMount(Navbar, {
    mocks: {
      $router,
    },
  });
  const findLogo = () => wrapper.find('#logo');
  const findLogout = () => wrapper.find('#logout');
  it('Has the required elements', async () => {
    expect(findLogo().exists()).toBe(true);
    expect(findLogo().text()).toBe('DONE');

    const findHomeLink = () => wrapper.find('#home-link');
    expect(findHomeLink().exists()).toBe(true);

    const findAlbumLink = () => wrapper.find('#album-link');
    expect(findAlbumLink().exists()).toBe(true);

    const findLogoutIcon = () => wrapper.find('#logout-icon');
    expect(findLogout().exists()).toBe(true);
    expect(findLogoutIcon().classes()).toContain('material-icons');
    expect(findLogout().text()).toBe('logout');

    const findSearchBtn = () => wrapper.find('#search');
    expect(findSearchBtn().exists()).toBe(true);
    expect(findSearchBtn().classes()).toContain('material-icons');
    expect(findSearchBtn().text()).toBe('search');
  });

  it('Click logo to redirect home', async () => {
    await findLogo().trigger('click');
    expect($router.push).toBeCalledWith('/');
  });

  it('Click logout to redirect login', async () => {
    await findLogout().trigger('click');
    expect($router.push).toBeCalledWith('/login');
  });
});
