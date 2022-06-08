import actionTypes from "./actionTypes";
import {
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getAllCategory,
    editCategoryService,
    deleteCategoryService,
    getAllProject,
    editProjectService,
    deleteProjectService,
    getAllProduct,
    editProductService,
    deleteProductService,
} from "../../services/userService";
import { toast } from "react-toastify";

// Create Posts
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (error) {
            dispatch(saveUserFailed());
        }
    };
};

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});

// Fetch All Users
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllUsers();
            console.log("Res:", res.data);
            if (res) {
                dispatch(fetchAllUsersSuccess(res.data.reverse()));
            }
        } catch (error) {
            dispatch(fetchAllUsersFailed());
        }
    };
};

export const fetchAllUsersSuccess = (data) => ({
    type: "FETCH_ALL_USERS_SUCCESS",
    users: data,
});

export const fetchAllUsersFailed = () => ({
    type: "FETCH_ALL_USERS_FAILED",
});

//Delete user
export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            const res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("DELETE A USER SUCCESS!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("DELETE A USER FAILED!");
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            dispatch(deleteUserFailed());
        }
    };
};

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
});

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("UPDATE A USER SUCCESS!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("UPDATE A USER FAILED!");
                dispatch(editUserFailed());
            }
        } catch (error) {
            dispatch(editUserFailed());
        }
    };
};

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
});

export const fetchAllProject = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllProject("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllProjectSuccess(res.data.reverse()));
            } else {
                dispatch(fetchAllProjectFailed());
            }
        } catch (error) {
            dispatch(fetchAllProjectFailed());
        }
    };
};

export const fetchAllProjectSuccess = (data) => ({
    type: "FETCH_ALL_PROJECT_SUCCESS",
    data: data,
});

export const fetchAllProjectFailed = () => ({
    type: "FETCH_ALL_PROJECT_FAILED",
});

export const editAProject = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await editProjectService(data);
            if (res && res.errCode === 0) {
                toast.success("UPDATE A PROJECT SUCCESS!");
                dispatch(editProjectSuccess());
                dispatch(fetchAllProject());
            } else {
                toast.error("UPDATE A PROJECT FAILED!");
                dispatch(editProjectFailed());
            }
        } catch (error) {
            dispatch(editProjectFailed());
        }
    };
};

export const editProjectSuccess = () => ({
    type: actionTypes.EDIT_PROJECT_SUCCESS,
});

export const editProjectFailed = () => ({
    type: actionTypes.EDIT_PROJECT_FAILED,
});

export const deleteAProject = (userId) => {
    return async (dispatch, getState) => {
        try {
            const res = await deleteProjectService(userId);
            if (res && res.errCode === 0) {
                toast.success("DELETE A PROJECT SUCCESS!");
                dispatch(deleteProjectSuccess());
                dispatch(fetchAllProject());
            } else {
                toast.error("DELETE A PROJECT FAILED!");
                dispatch(deleteProjectFailed());
            }
        } catch (error) {
            dispatch(deleteProjectFailed());
        }
    };
};

export const deleteProjectSuccess = () => ({
    type: actionTypes.DELETE_PROJECT_SUCCESS,
});

export const deleteProjectFailed = () => ({
    type: actionTypes.DELETE_PROJECT_FAILED,
});

export const fetchAllCategory = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllCategory();
            if (res) {
                dispatch(fetchAllCategorySuccess(res.reverse()));
            } else {
                dispatch(fetchAllCategoryFailed());
            }
        } catch (error) {
            dispatch(fetchAllCategoryFailed());
        }
    };
};

export const fetchAllCategorySuccess = (data) => ({
    type: "FETCH_ALL_CATEGORY_SUCCESS",
    data: data,
});

export const fetchAllCategoryFailed = () => ({
    type: "FETCH_ALL_CATEGORY_FAILED",
});

export const editACategory = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await editCategoryService(data);
            if (res && res.errCode === 0) {
                toast.success("UPDATE A CATEGORY SUCCESS!");
                dispatch(editCategorySuccess());
                dispatch(fetchAllCategory());
            } else {
                toast.error("UPDATE A CATEGORY FAILED!");
                dispatch(editCategoryFailed());
            }
        } catch (error) {
            dispatch(editCategoryFailed());
        }
    };
};

export const editCategorySuccess = () => ({
    type: actionTypes.EDIT_CATEGORY_SUCCESS,
});

export const editCategoryFailed = () => ({
    type: actionTypes.EDIT_CATEGORY_FAILED,
});

export const deleteACategory = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await deleteCategoryService(id);
            if (res && res.errCode === 0) {
                toast.success("DELETE A CATEGORY SUCCESS!");
                dispatch(deleteCategorySuccess());
                dispatch(fetchAllCategory());
            } else {
                toast.error("DELETE A CATEGORY FAILED!");
                dispatch(deleteCategoryFailed());
            }
        } catch (error) {
            dispatch(deleteCategoryFailed());
        }
    };
};

export const deleteCategorySuccess = () => ({
    type: actionTypes.DELETE_CATEGORY_SUCCESS,
});

export const deleteCategoryFailed = () => ({
    type: actionTypes.DELETE_CATEGORY_FAILED,
});

export const fetchAllProduct = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllProduct();
            if (res && res.errCode === 0) {
                dispatch(fetchAllProductSuccess(res.data.reverse()));
            } else {
                dispatch(fetchAllProductFailed());
            }
        } catch (error) {
            dispatch(fetchAllProductFailed());
        }
    };
};

export const fetchAllProductSuccess = (data) => ({
    type: "FETCH_ALL_PRODUCT_SUCCESS",
    data: data,
});

export const fetchAllProductFailed = () => ({
    type: "FETCH_ALL_PRODUCT_FAILED",
});

export const editAProduct = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await editProductService(data);
            if (res && res.errCode === 0) {
                toast.success("UPDATE A PRODUCT SUCCESS!");
                dispatch(editProductSuccess());
                dispatch(fetchAllProduct());
            } else {
                toast.error("UPDATE A PRODUCT FAILED!");
                dispatch(editProductFailed());
            }
        } catch (error) {
            dispatch(editProductFailed());
        }
    };
};

export const editProductSuccess = () => ({
    type: actionTypes.EDIT_PRODUCT_SUCCESS,
});

export const editProductFailed = () => ({
    type: actionTypes.EDIT_PRODUCT_FAILED,
});

export const deleteAProduct = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await deleteProductService(id);
            if (res && res.errCode === 0) {
                toast.success("DELETE A PRODUCT SUCCESS!");
                dispatch(deleteProductSuccess());
                dispatch(fetchAllProduct());
            } else {
                toast.error("DELETE A PRODUCT FAILED!");
                dispatch(deleteProductFailed());
            }
        } catch (error) {
            dispatch(deleteProductFailed());
        }
    };
};

export const deleteProductSuccess = () => ({
    type: actionTypes.DELETE_PRODUCT_SUCCESS,
});

export const deleteProductFailed = () => ({
    type: actionTypes.DELETE_PRODUCT_FAILED,
});
