import { shallowMount } from '@vue/test-utils';
import Main from './Main.vue';
import Navbar from '../../components/Navbar.vue';
import Card from '../../components/Card.vue';
import axios from '../../axios';

describe('Main layout', () => {
  it('Has the required elements', () => {
    const wrapper = shallowMount(Main);
    expect(wrapper.findComponent(Navbar).exists()).toBe(true);
    expect(wrapper.findComponent(Card).exists()).toBe(true);
  });
  const $axios = { get: jest.fn() };
  it('Is getting users correctly', () => {
    const wrapper = shallowMount(Main, { mocks: $axios });
    expect($axios.get).toBeCalledWith('users');

    const response = {
        "page": 2,
        "per_page": 6,
        "total": 12,
        "total_pages": 2,
        "data": [
            {
                "id": 7,
                "email": "michael.lawson@reqres.in",
                "first_name": "Michael",
                "last_name": "Lawson",
                "avatar": "https://reqres.in/img/faces/7-image.jpg"
            },
            {
                "id": 8,
                "email": "lindsay.ferguson@reqres.in",
                "first_name": "Lindsay",
                "last_name": "Ferguson",
                "avatar": "https://reqres.in/img/faces/8-image.jpg"
            },
            {
                "id": 9,
                "email": "tobias.funke@reqres.in",
                "first_name": "Tobias",
                "last_name": "Funke",
                "avatar": "https://reqres.in/img/faces/9-image.jpg"
            },
        ],
        "support": {
            "url": "https://reqres.in/#support-heading",
            "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
        }
    }
    $axios.get.mockReturnValueOnce(response)
    const findFirstCardTitle = () => wrapper.find('.card:first-child > #title')
    expect(findFirstCardTitle.text()).toBe('Michael Lawson');

});
