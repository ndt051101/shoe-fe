import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoading: false,
    positions: [],
    roles: [],
    users: [],
    customers: [],
    allCategory: [],
    posts: [],
    project: [],
    allProduct: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_POSITION_START:
            state.isLoading = true;
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            state.isLoading = false;
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_FAILED:
            state.isLoading = false;
            state.positions = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_START:
            state.isLoading = true;
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            state.isLoading = false;
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_FAILED:
            state.isLoading = false;
            state.roles = [];
            return {
                ...state,
            };

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state,
            };

        case actionTypes.FETCH_ALL_CUSTOMERS_SUCCESS:
            state.customers = action.customers;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_CUSTOMERS_FAILED:
            state.customers = [];
            return {
                ...state,
            };

        case actionTypes.FETCH_ALL_CATEGORY_SUCCESS:
            state.allCategory = action.data;
            return {
                ...state,
            };

        case actionTypes.FETCH_ALL_CATEGORY_FAILED:
            state.allCategory = [];
            return {
                ...state,
            };

        case actionTypes.FETCH_ALL_POSTS_SUCCESS:
            state.posts = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_POSTS_FAILED:
            state.posts = [];
            return {
                ...state,
            };

        case actionTypes.FETCH_ALL_PROJECT_SUCCESS:
            state.project = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_PROJECT_FAILED:
            state.project = [];
            return {
                ...state,
            };

        case actionTypes.FETCH_ALL_PRODUCT_SUCCESS:
            state.allProduct = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_PRODUCT_FAILED:
            state.allProduct = [];
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;
