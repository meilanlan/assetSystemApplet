import {post} from './config/post.js';

const Login = params => post(`/user/login`, params);

export {
  Login
}