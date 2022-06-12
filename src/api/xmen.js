export async function getXmen() {
    try{
        const response = await fetch('https://xmenapiheroku.herokuapp.com/api/characters');
        if(!response.ok){
            throw new NetworkError();
        }
        const data = await response.json();
        return data;
    } catch(error) {
        throw error
    }
}

class NetworkError extends Error {
    constructor() {
        super("Network error");
    }
}