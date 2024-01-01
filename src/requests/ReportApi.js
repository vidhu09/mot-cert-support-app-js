import axios from "axios";

export const ReportAPI = {

    getChartData : async (token, callback) => {
        axios.get('/v1/report', {
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
            console.log('Get chart data failed: ' + e);
            callback(null);
        });
    }
}

export default ReportAPI;