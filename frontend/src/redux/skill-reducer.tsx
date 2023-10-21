import data from "./skill-data"

const INITAL_STATE = {
  collections: data,
}

const skillReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default skillReducer
