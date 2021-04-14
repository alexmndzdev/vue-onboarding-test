import { shallowMount } from '@vue/test-utils';
import Card from './Card.vue';

describe('Card', () => {
  it('Has the required elements', async () => {
    const wrapper = shallowMount(Card);
    const findPicture = () => wrapper.find('#profile-picture');
    expect(findPicture().exists()).toBe(true);

    const findTitle = () => wrapper.find('#title');
    expect(findTitle().exists()).toBe(true);

    const findDescription = () => wrapper.find('#description');
    expect(findDescription().exists()).toBe(true);
  });
  it('Is getting user correctly', () => {
    const userData = {
      id: 7,
      email: 'michael.lawson@reqres.in',
      first_name: 'Michael',
      last_name: 'Lawson',
      avatar: 'https://reqres.in/img/faces/7-image.jpg',
    };
    const wrapper = shallowMount(Card, {
      propsData: {
        userData,
      },
    });
    const findTitle = () => wrapper.find('#title');
    expect(findTitle().text()).toBe('Michael Lawson');
    const findPicture = () => wrapper.find('#profile-picture');
    expect(findPicture().attributes('src')).toBe(userData.avatar);
  });
});
