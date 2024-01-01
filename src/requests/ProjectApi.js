import axios from 'axios';

const ProjectAPI = {

    getProjects : async (token, callback) => {
        axios.get('/v1/project', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            if(response.status === 200) {
                callback(response.data);
            } else {
                callback([]);
            }
        })
        .catch((e) => {
            console.log('Get projects failed: ' + e);
            callback([]);
        });
    },

    getProjectById : async (token, id, callback) => {
        axios.get('/v1/project/' + id, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            if(response.status === 200) {
                callback(response.data);
            } else {
                callback({});
            }
        })
        .catch((e) => {
            console.log('Get project failed: ' + e);
            callback({});
        });
    },

    postEntry : async (token, id, entry, callback) => {
        axios.post('/v1/project/' + id + '/entry', entry, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            if(response.status === 201) {
                callback(true);
            } else {
                callback(false, 'Unable to add entry: ' + response.data.message);
            }
        })
        .catch((e) => {
            callback(false, 'Unable to add entry: ' + e);
        });
    },

    deleteEntry : async (token, id, entryId, callback) => {
        axios.delete('/v1/project/' + id + '/entry/' + entryId, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            if(response.status === 202) {
                callback(true);
            } else {
                callback(false, 'Unable to delete entry: ' + response.data.message);
            }
        })
        .catch((e) => {
            callback(false, 'Unable to delete entry: '  + e);
        });
    },

    createProject : async (token, project, callback) => {
        axios.post('/v1/project', project, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            if(response.status === 201) {
                callback(true);
            } else {
                callback(false, 'Unable to add project: ' + response.data.message);
            }
        })
        .catch((e) => {
            callback(false, 'Unable to add project: ' + e);
        });
    },

    deleteProject : async (token, projectId, callback) => {
        axios.delete('/v1/project/' + projectId, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {
            if(response.status === 202) {
                callback(true);
            } else {
                callback(false, 'Unable to delete project: ' + response.data.message);
            }
        })
        .catch((e) => {
            callback(false, 'Unable to delete project: ' + e);
        });
    }

}

export default ProjectAPI;
