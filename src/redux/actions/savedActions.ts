import { Article } from '../reducers/ReducersTypes';
import { SAVE_ARTICLE, DELETE_ARTICLE, SUBSCRIBE, UNSUBSCRIBE } from '../constants';
import { ActionTypes } from './ActionTypes';

const toggleSave = (id: string): void => {
    
}


const saveArticle = (article: Article): ActionTypes => {
  return {
    type: SAVE_ARTICLE,
    payload: article,
  };
};

const deleteArticle = (id: string): ActionTypes => {
  return {
    type: DELETE_ARTICLE,
    id,
  };
};

const subscribe = (name: string): ActionTypes => {
  return {
    type: SUBSCRIBE,
    name,
  };
};

const unsubscribe = (name: string): ActionTypes => {
  return {
    type: UNSUBSCRIBE,
    name,
  };
};
