import { environment } from '../../environments/environment';

export const API_ROUTES = {
    // USERS MODULE
    'GET_USERS': `${environment.apiBaseUrl}/users`,
    'GET_USER_BY_ID': (user_id) => `${environment.apiBaseUrl}/users/${user_id}`,
    'DELETE_USER_BY_ID': (user_id) => `${environment.apiBaseUrl}/users/${user_id}`,
    'CREATE_USER': `${environment.apiBaseUrl}/users`,
    'UPDATE_USER': `${environment.apiBaseUrl}/users`,
};
