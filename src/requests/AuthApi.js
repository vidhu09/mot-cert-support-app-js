import axios from 'axios';

export const AuthAPI = {

    sendLogin : async (email, password, callback) => {
        axios.post('/v1/auth/login', { email, password })
        .then((response) => {
            if(response.status === 200) {
                callback(response.data);
            } else {
                callback(null);
            }
        })
        .catch((e) => {
            console.log('Login failed: ' + e);
            callback(null);
        });
    },

    validateToken : async (token, callback) => {
        axios.post('/v1/auth/validate', { token })
        .then((response) => {
            if(response.status === 200) {
                return callback(true);
            } else {
                return callback(false);
            }
        })
        .catch(() => {
            return callback(false);
        });
    },

    logout : async (token, callback) => {
        axios.post('/v1/auth/logout', { token })
        .then((response) => {
            if(response.status === 202) {
                return callback(true);
            } else {
                return callback(false);
            }
        })
        .catch(() => {
            return callback(false);
        });
    }

}

export default AuthAPI;