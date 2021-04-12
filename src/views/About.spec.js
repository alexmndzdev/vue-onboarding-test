import { shallowMount } from '@vue/test-utils';
import About from './About.vue';

describe('About', () => {
  const wrapper = shallowMount(About);
  it('Has the required elements', async () => {
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
});
