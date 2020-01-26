import { reducer as FormReducer } from 'redux-form';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  form: FormReducer,
});

export default reducers;
export type ReduxState = ReturnType<typeof reducers>;
