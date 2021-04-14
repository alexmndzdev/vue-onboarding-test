import { shallowMount } from '@vue/test-utils';
import vSelect from 'vue-select';
import flushPromises from 'flush-promises';
import MockAdapter from 'axios-mock-adapter';
import axios from '../axios';
import Album from './Album.vue';

describe('Album', () => {
  it('Has the required elements when is not user selected', async (done) => {
    const wrapper = shallowMount(Album);
    expect(wrapper.findComponent(vSelect).exists()).toBe(true);
    done();
  });

  const data = [
    {
      id: 7,
      email: 'michael.lawson@reqres.in',
      first_name: 'Michael',
      last_name: 'Lawson',
      avatar: 'https://reqres.in/img/faces/7-image.jpg',
      album: [
        'https://www.pivotalgamers.com/wp-content/uploads/2017/12/SteamRandomGame.png',
        'https://www.gamasutra.com/db_area/images/news/2018/Jun/320213/supermario64thumb1.jpg',
        'https://i.ytimg.com/vi/Cg3438Ti_Tg/hqdefault.jpg',
        'https://static.decalgirl.com/assets/artists/random-galaxy-bio.jpg',
        'http://images4.fanpop.com/image/photos/21700000/random-stuff-logo-random-21776032-355-218.png',
      ],
    },
    {
      id: 8,
      email: 'lindsay.ferguson@reqres.in',
      first_name: 'Linda',
      last_name: 'Ferguson',
      avatar: 'https://reqres.in/img/faces/8-image.jpg',
      album: [
        'https://www.pivotalgamers.com/wp-content/uploads/2017/12/SteamRandomGame.png',
        'https://www.gamasutra.com/db_area/images/news/2018/Jun/320213/supermario64thumb1.jpg',
        'https://i.ytimg.com/vi/Cg3438Ti_Tg/hqdefault.jpg',
        'https://static.decalgirl.com/assets/artists/random-galaxy-bio.jpg',
        'http://images4.fanpop.com/image/photos/21700000/random-stuff-logo-random-21776032-355-218.png',
      ],
    },
  ];

  const mockAxiosRE = new MockAdapter(axios.RE);
  mockAxiosRE.onGet('users?page=2').reply(200, {
    data,
  });
  it('Get users correctly', async () => {
    const wrapper = shallowMount(Album);
    await flushPromises();
    expect(wrapper.vm.options.length).toBe(2);
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
    const selectedUser = {
      id: 7,
      email: 'michael.lawson@reqres.in',
      first_name: 'Michael',
      last_name: 'Lawson',
      avatar: 'https://reqres.in/img/faces/7-image.jpg',
      album: [
        'https://www.pivotalgamers.com/wp-content/uploads/2017/12/SteamRandomGame.png',
        'https://www.gamasutra.com/db_area/images/news/2018/Jun/320213/supermario64thumb1.jpg',
        'https://i.ytimg.com/vi/Cg3438Ti_Tg/hqdefault.jpg',
        'https://static.decalgirl.com/assets/artists/random-galaxy-bio.jpg',
        'http://images4.fanpop.com/image/photos/21700000/random-stuff-logo-random-21776032-355-218.png',
      ],
    };
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
