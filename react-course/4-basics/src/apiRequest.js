async function apiRequest(url = '', options = null, errMsg = null) {
    try {
        const response = await fetch(url, options);
        if(!response.ok) throw Error('Please reload the app');
    } catch(err) {
        errMsg = err.message;
    } finally {
        return errMsg;
    }
}

async function myApiRequest(url, showErr, method, data = null) {
    try {
        const options = { method };
        if(data) {
            options.headers = { 'Content-Type': 'application/json' };
            options.body = JSON.stringify(data);
        }
        const response = await fetch(url, options);
        if(!response.ok) throw Error('Please reload the app');
    } catch(err) {
        showErr(err.message);
    }
}

//export default apiRequest;
export default myApiRequest;