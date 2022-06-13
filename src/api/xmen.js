export async function getXmen(page) {
    try{
        const response = await fetch('https://xmenapiheroku.herokuapp.com/api/characters?page=' + page );
        if(!response.ok){
            return _handleError(response.status);
        }
        const data = await response.json();
        return data;
    } catch(error) {
        _throwSpecificError(error);
    }
}

export async function searchDetails(id = 1) {
    try {
        const response = await fetch('https://xmenapiheroku.herokuapp.com/api/characters/' + id);
        if(!response.ok){
            return _handleError(response.status);
        }
        const data = await response.json();
        return data;
    } catch(error) {
        _throwSpecificError(error);
    }
}

export async function searchXmen(name) {
    try {
        const response = await fetch('https://xmenapiheroku.herokuapp.com/api/characters/?name=' + name);
        if(!response.ok) {
            return _handleError(response.status);
        }
        const data = await response.json();
        return data;
    } catch(error) {
        _throwSpecificError(error);
    }
}

function _handleError(status) {
    if(status === 500) {
        throw new ServerError();
    }
    if(status === 404) {
        throw new NotFoundError();
    }
}

function _throwSpecificError(error) {
    if(error instanceof ServerError || error instanceof NotFoundError) {
        throw error;
    }
    throw NetworkError();
}

class NetworkError extends Error {
    constructor() {
        super("Network error");
    }
}

class ServerError extends Error {
    constructor() {
        super("Server error");
    }
}

class NotFoundError extends Error {
    constructor() {
        super("Not found")
    }
}