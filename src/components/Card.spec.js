import { shallowMount } from '@vue/test-utils';
import Card from './Card.vue';

describe('Card', () => {
  const wrapper = shallowMount(Card);
  it('Has the required elements', async () => {
    const findPicture = () => wrapper.find('#profile-picture');
    expect(findPicture().exists()).toBe(true);

    const findTitle = () => wrapper.find('#title');
    expect(findTitle().exists()).toBe(true);

    const findDescription = () => wrapper.find('#description');
    expect(findDescription().exists()).toBe(true);
  });
});
