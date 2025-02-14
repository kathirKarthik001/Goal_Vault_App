import axios from "axios";

const API_URL = process.env.REACT_APP_API_URI_GOAL;

// CREATE a goal
const create = async (goalData, token) => {
  let config = { 
    headers: {                                                  // headers
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goalData, config);

  return response.data;
};

// GET all goal
const get = async (token) => {
    const config = { 
      headers: {                                                  // headers
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.get(API_URL, config);
  
    return response.data;
  };



// DELETE all goal
const Delete = async (goalID , token) => {
  const config = { 
    headers: {                                                  // headers
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + goalID, config);

  return response.data;
};

const goalService = {
  create,
  get,
  Delete
};

export default goalService;