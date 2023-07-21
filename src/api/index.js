import axios from "axios";

export const baseURL = "https://haloluxury.azurewebsites.net/api";

export const getProduct = async (req, res) => {
  return await axios
    .get(`${baseURL}/orders/admin/${req}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getBrands = async (req, res) => {
  return await axios
    .get(`${baseURL}/brand`)
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getCategorys = async (req, res) => {
  return await axios
    .get(`${baseURL}/category`)
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getTotals = async (req, res) => {
  return await axios
    .get(`${baseURL}/chart/${req}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getAllProducts = async (req, res) => {
  return await axios
    .get(`${baseURL}/products/user/${req}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getProductDetails = async (req, res) => {
  return await axios
    .get(`${baseURL}/products/${req}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const deleteProduct = async (req, res) => {
  return await axios
    .delete(`${baseURL}/products/${req}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const updateProfile = async (req, res) => {
  return await axios
    .put(`${baseURL}/users/${req.id}`, req.profile)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const changePasswordAPI = async (req, res) => {
  return await axios
    .put(`${baseURL}/users/changepassword/${req.id}`, req.changePassword)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getAllUsers = async (req, res) => {
  return await axios
    .get(`${baseURL}/users/customers`)
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getAllStores = async (req, res) => {
  return await axios
    .get(`${baseURL}/users/stores`)
    .then((response) => {
      return response.data.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const deleteStores = async (req, res) => {
  return await axios
    .delete(`${baseURL}/stores/${req.id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const deleteCustomers = async (req, res) => {
  return await axios
    .delete(`${baseURL}/customers/${req.id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const addNewStore = async (req, res) => {
  return await axios
    .post(`${baseURL}/users/registerv2`, req.values)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response;
    });
};

