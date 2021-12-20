import {post} from './config/post.js';

const indexAPI = params => post(`/map/index`, params);

export {
  indexAPI
}