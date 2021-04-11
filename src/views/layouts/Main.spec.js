import { shallowMount } from '@vue/test-utils';
import Main from './Main.vue';
import Navbar from '../../components/Navbar.vue';

describe('Main layout', () => {
  const wrapper = shallowMount(Main);
  it('Has the required elements', () => {
    expect(wrapper.findComponent(Navbar).exists()).toBe(true);
  });
});
