import { shallowMount } from '@vue/test-utils';
import Navbar from './Navbar.vue';

describe('Navbar', () => {
  const wrapper = shallowMount(Navbar);
  const $router = { push: jest.fn() };
  it('Has the required elements', async () => {
    const findLogo = () => wrapper.find('#logo');
    expect(findLogo().exists()).toBe(true);
    expect(findLogo().text()).toBe('DONE');
    // await findLogo().trigger('click');
    // expect($router.push).toBeCalledWith('/');

    const findRoutes = () => wrapper.find('#routes');
    expect(findRoutes().exists()).toBe(true);

    const findLogout = () => wrapper.find('#logout');
    const findLogoutIcon = () => wrapper.find('#logout-icon');
    expect(findLogout().exists()).toBe(true);
    expect(findLogoutIcon().classes()).toContain('material-icons');
    expect(findLogout().text()).toBe('logout');

    const findSearchBtn = () => wrapper.find('#search');
    expect(findSearchBtn().exists()).toBe(true);
    expect(findSearchBtn().classes()).toContain('material-icons');
    expect(findSearchBtn().text()).toBe('search');
  });
});
