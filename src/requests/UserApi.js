import axios from "axios";

export const UserAPI = {

    getUsers : async (token, callback) => {
        axios.get('/v1/user', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            if(response.status === 200) {
                callback(response.data);
            } else {
                callback(null);
            }
        })
        .catch((e) => {
            console.log('Get users failed: ' + e);
            callback(null);
        });
    },

    createUser : async (token, user, callback) => {
        axios.post('/v1/user', user, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            if(response.status === 201) {
                callback(true);
            } else {
                callback(false, response.data);
            }
        })
        .catch((e) => {
            callback(false, 'Create user failed: ' + e);
        });
    },

    deleteUser : async (token, userId, callback) => {
        axios.delete('/v1/user/' + userId, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            if(response.status === 202) {
                callback(true);
            } else {
                callback(false, response.data);
            }
        })
        .catch((e) => {
            callback(false, 'Delete user failed: ' + e);
        });
    },

    getProfile : async (token, id, callback) => {
        axios.get('/v1/user/' + id, {
            headers : {
                Authorization : 'Bearer ' + token
            }
        })
        .then((response) => {
            if(response.status === 200) {
                callback(response.data);
            } else {
                callback(null);
            }
        })
        .catch((e) => {
            console.log('Get profile failed: ' + e);
            callback(null);
        });
    },

    updateProfile : async (token, id, profileDetails, callback) => {
        axios.put('/v1/user/' + id, profileDetails, {
            headers : {
                Authorization : 'Bearer ' + token
            }
        })
        .then((response) => {
            if(response.status === 202) {
                callback(true);
            } else {
                callback(false, response.data);
            }
        })
        .catch((e) => {
            callback(false, 'Update profile failed: ' + e);
        });
    }

}

export default UserAPI;
