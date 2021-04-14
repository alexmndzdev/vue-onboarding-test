import { shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import MockAdapter from 'axios-mock-adapter';
import Main from './Main.vue';
import Navbar from '../../components/Navbar.vue';
import Card from '../../components/Card.vue';
import axios from '../../axios';

describe('Main layout', () => {
  const data = [
    {
      id: 7,
      email: 'michael.lawson@reqres.in',
      first_name: 'Michael',
      last_name: 'Lawson',
      avatar: 'https://reqres.in/img/faces/7-image.jpg',
    },
    {
      id: 8,
      email: 'lindsay.ferguson@reqres.in',
      first_name: 'Lindsay',
      last_name: 'Ferguson',
      avatar: 'https://reqres.in/img/faces/8-image.jpg',
    },
    {
      id: 9,
      email: 'tobias.funke@reqres.in',
      first_name: 'Tobias',
      last_name: 'Funke',
      avatar: 'https://reqres.in/img/faces/9-image.jpg',
    },
  ];
  const mockAxiosRE = new MockAdapter(axios.RE);
  mockAxiosRE.onGet('users').reply(200, {
    data,
  });
  it('Has the required elements', async () => {
    const wrapper = shallowMount(Main);
    await flushPromises();
    expect(wrapper.findComponent(Navbar).exists()).toBe(true);
    expect(wrapper.findComponent(Card).exists()).toBe(true);
  });

  it('Get users correctly', async () => {
    const wrapper = shallowMount(Main);
    await flushPromises();
    expect(wrapper.vm.users.length).toBe(3);
  });
});
