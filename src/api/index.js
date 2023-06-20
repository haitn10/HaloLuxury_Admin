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

