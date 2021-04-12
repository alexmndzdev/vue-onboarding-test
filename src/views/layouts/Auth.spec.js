import { shallowMount } from '@vue/test-utils';
import Auth from './Auth.vue';

describe('Auth layout', () => {
  const wrapper = shallowMount(Auth);
  it('Has the required elements', () => {
    expect(wrapper.html()).toContain('auth');
  });
});
