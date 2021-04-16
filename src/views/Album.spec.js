import { shallowMount } from '@vue/test-utils';
import vSelect from 'vue-select';
import flushPromises from 'flush-promises';
import MockAdapter from 'axios-mock-adapter';
import axios from '../axios';
import Album from './Album.vue';
import db from '../../db.json';

describe('Album', () => {
  it('Has the required elements when is not user selected', async (done) => {
    const wrapper = shallowMount(Album);
    expect(wrapper.findComponent(vSelect).exists()).toBe(true);
    done();
  });

  const mockAxiosRE = new MockAdapter(axios.RE);
  mockAxiosRE.onGet('users?page=2').reply(200, {
    data: db.users,
  });
  it('Get users correctly', async () => {
    const wrapper = shallowMount(Album);
    await flushPromises();
    expect(wrapper.vm.options.length).toBe(db.users.length);
  });

  describe('When an user is selected', () => {
    it('Has the required elements when is user selected', async () => {
      const wrapper = shallowMount(Album);
      await wrapper.setData({
        isUserSelected: true,
      });
      const findTitle = () => wrapper.find('#title');
      expect(findTitle().exists()).toBe(true);

      const findSubtitle = () => wrapper.find('#subtitle');
      expect(findSubtitle().exists()).toBe(true);

      const findUserIcon = () => wrapper.find('#user-icon');
      expect(findUserIcon().exists()).toBe(true);
      expect(findUserIcon().classes()).toContain('material-icons');
      expect(findUserIcon().text()).toBe('person_outline');

      const findFileIcon = () => wrapper.find('#file-icon');
      expect(findFileIcon().exists()).toBe(true);
      expect(findFileIcon().classes()).toContain('material-icons');
      expect(findFileIcon().text()).toBe('note_add');

      const findAlbum = () => wrapper.find('#album');
      expect(findAlbum().exists()).toBe(true);
    });

    const mockAxiosTC = new MockAdapter(axios.TC);
    const selectedUser = db.users[0];
    mockAxiosTC.onGet(`users/${selectedUser.id}`).reply(200, {
      ...selectedUser,
    });
    it('Get users correctly', async () => {
      const wrapper = shallowMount(Album);
      wrapper.setData({
        selectedUser,
      });
      await flushPromises();
      expect(wrapper.vm.images.length).toBe(5);
    });
  });
});
