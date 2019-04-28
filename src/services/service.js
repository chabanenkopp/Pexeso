class GetFromServer {
    _apiBase = 'http://localhost:8080';

    getData = async url => {
        const res = await fetch(`${this._apiBase}${url}`);
        return await res.json()
    };
    getComments = async () => await this.getData(`/comment/pexeso`);
    getScores = async () => await this.getData(`/scores/pexeso`);
    getAverageRating = async () => await this.getData(`/rating/average/pexeso`);
    getPlayerRating = async name => await this.getData(`/rating/players/pexeso/${name}`)

}

class PostToServer {
    _apiBase = 'http://localhost:8080';

    sendData = async (url, data) => {
        const res = await fetch(`${this._apiBase}${url}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await res.json()
    };

    postComment = async (data) => await this.sendData('/comment', data);
    postScore = async (data) => await this.sendData('/scores', data);
    postRating = async (data) => await this.sendData('/rating', data);
}

export {GetFromServer, PostToServer}