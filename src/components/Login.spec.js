import { shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import MockAdapter from 'axios-mock-adapter';
import axios from '../axios';
import Login from './Login.vue';

describe('LoginPage', () => {
  let wrapper;
  const $router = { push: jest.fn() };
  const findBtnSignIn = () => wrapper.find('#btn-sign-in');
  const findEmailError = () => wrapper.find('#email-error');
  const findPasswordError = () => wrapper.find('#password-error');
  const findInputEmail = () => wrapper.find('#input-email');
  const findInputPassword = () => wrapper.find('#input-password');

  beforeEach(() => {
    wrapper = shallowMount(Login, {
      mocks: { $router },
    });
  });

  describe('Login Page', () => {
    it('Has the required elements', () => {
      const findTitle = () => wrapper.find('#title');
      const findSubtitle = () => wrapper.find('#subtitle');
      const resetPass = () => wrapper.find('a#reset-password');

      expect(findTitle().exists()).toBe(true);
      expect(findTitle().text()).toBe('Sign in');
      expect(findSubtitle().exists()).toBe(true);
      expect(findSubtitle().text()).toContain('Lorem ipsum');
      expect(findInputEmail().exists()).toBe(true);
      expect(findInputPassword().exists()).toBe(true);
      expect(findBtnSignIn().exists()).toBe(true);
      expect(findBtnSignIn().text()).toBe('Sign in');
      expect(resetPass().exists()).toBe(true);
      expect(resetPass().text()).toBe('Forgot your password?');
      expect(findEmailError().exists()).toBe(false);
      expect(findPasswordError().exists()).toBe(false);
    });

    const fillLoginFieldAndSubmit = async (email, pass) => {
      findInputEmail().setValue(email);
      findInputPassword().setValue(pass);
      findBtnSignIn().trigger('click');
      await flushPromises();
    };

    const mockAxiosRE = new MockAdapter(axios.RE);
    const data = {
      token: 'QpwL5tke4Pnpja7X4',
    };
    mockAxiosRE.onGet('login').reply(200, {
      data,
    });
    it('Allow to do log in', async () => {
      await fillLoginFieldAndSubmit('eve.holt@reqres.in', 'cityslicka');
      expect($router.push).toBeCalledWith('home');
    });

    describe('It should contain validations', () => {
      it('Shows error when email or password is empty', async () => {
        await fillLoginFieldAndSubmit('', 'password123');
        expect(findEmailError().exists()).toBe(true);
        expect(findEmailError().text()).toBe('Email is required');

        await fillLoginFieldAndSubmit('Jhon', '');
        expect(findPasswordError().exists()).toBe(true);
        expect(findPasswordError().text()).toBe('Password is required');
      });
    });
  });
});
