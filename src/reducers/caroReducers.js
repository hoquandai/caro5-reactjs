import { combineReducers } from "redux";
import {
  X_NEXT,
  HISTORY,
  WIDTH,
  HEIGHT,
  STEP,
  SORT,
  POSITIONS
} from "../actions/caroActions";

const initialState = {
  xNext: X_NEXT,
  history: []
};

function caroApp(state = initialState, action) {
  switch (action.type) {
    case X_NEXT:
      return { ...state, xNext: action.value };
    case HISTORY:
      return {
        ...state,
        history: [
          ...state.history,
          {
            squares: action.squares
          }
        ]
      };
    case WIDTH:
      return { ...state, width: action.value };
    case HEIGHT:
      return { ...state, heigth: action.value };
    case STEP:
      return { ...state, stepNumber: action.number };
    case SORT:
      return { ...state, sort: action.value };
    case POSITIONS:
      return { ...state, positions: [...state.positions, action.number] };
    default:
      return state;
  }
}

const caro = combineReducers({
  caroApp
});

export default caro;
