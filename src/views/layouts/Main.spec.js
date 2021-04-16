import { shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import MockAdapter from 'axios-mock-adapter';
import Main from './Main.vue';
import Navbar from '../../components/Navbar.vue';
import Card from '../../components/Card.vue';
import axios from '../../axios';
import db from '../../../db.json';

describe('Main layout', () => {
  const selectedUser = {
    indexDB: 0,
    id: db.users[0].id,
  };
  beforeEach(() => {
    const mockAxiosRE = new MockAdapter(axios.RE);
    mockAxiosRE.onGet('users?page=2').reply(200, {
      data: db.users,
    });
  });
  it('Has the required elements', async () => {
    const wrapper = shallowMount(Main);
    await flushPromises();
    expect(wrapper.findComponent(Navbar).exists()).toBe(true);
    expect(wrapper.findComponent(Card).exists()).toBe(true);
    expect(wrapper.find('#side-menu').exists()).toBe(true);
  });

  it('Get users correctly', async () => {
    const wrapper = shallowMount(Main);
    await flushPromises();
    expect(wrapper.vm.users.length).toBe(db.users.length);
  });

  describe('Sidebar', () => {
    const mockAxiosTC = new MockAdapter(axios.TC);
    const postFromUserSelected = db.posts.filter((post) => post.user_id === selectedUser.id);
    mockAxiosTC.onGet(`posts?user_id=${selectedUser.id}`).reply(200, [...postFromUserSelected]);
    it('Get posts correctly', async () => {
      const wrapper = shallowMount(Main);
      await flushPromises();
      const card = wrapper.findAllComponents(Card).at(selectedUser.indexDB);
      card.trigger('click.native');
      const countPost = postFromUserSelected.length;
      await flushPromises();
      expect(wrapper.vm.userPosts.length).toBe(countPost);
    });

    it('Has the required elements', async () => {
      const wrapper = shallowMount(Main);
      await flushPromises();
      expect(wrapper.find('#side-menu').isVisible()).toBe(true);
    });
  });
});
