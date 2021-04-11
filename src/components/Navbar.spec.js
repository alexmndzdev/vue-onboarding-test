import { shallowMount } from '@vue/test-utils';
import Navbar from './Navbar.vue';

describe('Navbar', () => {
  const wrapper = shallowMount(Navbar);
  const $router = { push: jest.fn() };
  it('Has the required elements', () => {
    const findLogo = wrapper.find('#logo');
    expect(findLogo().exists()).toBe(true);
    expect(findLogo().text()).toBe('Sign in');
    findLogo().trigger('click');
    expect($router.push).toBeCalledWith('/');

    const findRoutes = wrapper.find('#routes');
    expect(findRoutes().exists()).toBe(true);

    const findLogout = wrapper.find('#logout');
    expect(findLogout().exists()).toBe(true);
    expect(findLogout().attributes('src')).toBe('../../assets/logout.png');

    const findSearchBtn = wrapper.find('#search')
    expect(findSearchBtn().exists()).toBe(true);
  });
});
