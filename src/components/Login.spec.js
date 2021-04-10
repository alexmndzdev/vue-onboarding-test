import { shallowMount } from '@vue/test-utils';
import Login from './Login.vue';

jest.mock('@/lib/api');

describe('LoginPage', () => {
  let wrapper;
  const $router = { push: jest.fn() };
  const findBtnSignIn = () => wrapper.find('#btn-sign-in');
  const findMsgError = () => wrapper.find('.msg-error');
  const findInputUsername = () => wrapper.find('#input-username');
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

      expect(findTitle().exists()).toBe(true);
      expect(findTitle().text()).toBe('Sign In');
      expect(findSubtitle().exists()).toBe(true);
      expect(findSubtitle().text()).toContain('Lorem ipsum');
      expect(findInputUsername().exists()).toBe(true);
      expect(findInputPassword().exists()).toBe(true);
      expect(findBtnSignIn().exists()).toBe(true);
      expect(findBtnSignIn().text()).toBe('Sign In');
      expect(findMsgError().exists()).toBe(false);
    });

    it('Allow to do log in', async () => {
      api.login.mockResolvedValue();
      await fillLoginFieldAndSubmit('Jhon', 'password123');
      expect(api.login).toBeCalled();
      expect($router.push).toBeCalledWith('home');
    });

    describe('It should contain validations', () => {
      const fillLoginFieldAndSubmit = async (username, password) => {
        findInputUsername().setValue(username);
        findInputPassword().setValue(password);
        findBtnSignIn().trigger('click');
        await flushPromises();
      };
      const assertErrorMessage = (message) => {
        expect(findMsgError().exists()).toBe(true);
        expect(findMsgError().text()).toBe(message);
      };

      it('Shows error when username or password is empty', async () => {
        await fillLoginFieldAndSubmit('', 'password123');
        assertErrorMessage('Username is required');

        await fillLoginFieldAndSubmit('Jhon', '');
        assertErrorMessage('Password is required');
      });

      it('Shows error when API hit throws error', async () => {
        api.login.mockRejectedValue();
        await fillLoginFieldAndSubmit('Jhon', 'password123');
        expect(api.login).toBeCalled();
        assertErrorMessage('Login failed');
      });
    });
  });
});
