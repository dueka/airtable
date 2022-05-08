export const GET_STUDENT = "get student";
const SET_STUDENT = "set student";
const REMOVE_STUDENT = "remove student";

export const getStudent = () => ({ type: GET_STUDENT });

export const setStudent = (student: any) => ({ type: SET_STUDENT, student });

export const removeStudent = () => ({ type: REMOVE_STUDENT });

const initialState = {
 student: undefined,
  };
  

  const studentReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case SET_STUDENT:
        return { ...state, ...action.student };
      case REMOVE_STUDENT:
        return { ...state, student: undefined };
      default:
        return state;
    }
  };
  

export default studentReducer;
