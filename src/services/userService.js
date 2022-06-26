import axios from "../axios";

const handleLogin = (email, password) => {
    return axios.post("/api/auth/admin/signin", { email, password });
};

const getAllUsers = () => {
    return axios.get("/api/auth");
};
const getAllCustomers = (id) => {
    return axios.get(`/api/get-all-customers?id=${id}`);
};

const createNewUserService = (data) => {
    return axios.post("/api/auth/", data);
};

const deleteUserService = (id) => {
    return axios.delete("/api/auth/delete", {
        data: {
            _id: id,
        },
    });
};

const editUserService = (data) => {
    return axios.put("/api/auth/edit", data);
};

const postCustomerBookAppointment = (data) => {
    return axios.post(`/api/customer-book-appointment`, data);
};

const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data);
};

const createNewProduct = (data) => {
    return axios.post(`/api/admin/product`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem('token')
        },
    });
};
const getAllProduct = () => {
    return axios.get(`/api/admin/product`, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    });
};

const getDetailProductById = (id) => {
    return axios.get(`/api/get-detail-product-by-id?id=${id}`);
};
const getProductByTechnologyId = (id) => {
    return axios.get(`/api/get-product-by-technologyid?id=${id}`);
};

const editProductService = (data) => {
    return axios.put("/api/admin/product/edit", data, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem('token')
        },
    });
};

const deleteProductService = (id) => {
    return axios.delete(`/api/admin/product/delete?_id=${ id }`, 
        {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }
    );
};

const createNewProject = (data) => {
    return axios.post(`/api/create-new-project`, data);
};
const getAllProject = () => {
    return axios.get(`/api/get-project`);
};

const editProjectService = (data) => {
    return axios.put("/api/edit-project", data);
};

const deleteProjectService = (id) => {
    return axios.delete("/api/delete-project", {
        data: {
            id: id,
        },
    });
};

const getDetailProjectById = (id) => {
    return axios.get(`/api/get-detail-project-by-id?id=${id}`);
};

const createNewCategory = (data) => {
    return axios.post(`/api/admin/category`, data, 
    {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }
    );
};

const getAllCategory = () => {
    return axios.get(`/api/admin/category`, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    });
};

const editCategoryService = (data) => {
    return axios.put("/api/admin/category/edit", data, 
    {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }
    );
};

const deleteCategoryService = (id) => {
    return axios.delete(`/api/admin/category/delete?_id=${ id }`, 
    {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }
    );
};

const postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data);
};

export {
    handleLogin,
    getAllUsers,
    getAllCustomers,
    createNewUserService,
    deleteUserService,
    editUserService,
    postCustomerBookAppointment,
    postVerifyBookAppointment,
    createNewProduct,
    getAllProduct,
    getDetailProductById,
    getProductByTechnologyId,
    editProductService,
    deleteProductService,
    createNewProject,
    getAllProject,
    editProjectService,
    deleteProjectService,
    getDetailProjectById,
    createNewCategory,
    getAllCategory,
    editCategoryService,
    deleteCategoryService,
    postSendRemedy,
};
