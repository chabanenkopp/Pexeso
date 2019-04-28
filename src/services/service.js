export default class GetFromServer {
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
    async sendData(data) {
        const rawResponse = await fetch("http://localhost:8080/results", {
            method: "POST",
            mode: "no-cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data)
        });
        return rawResponse.json()
    }

    async postAndGetResp(data) {
        this.sendData(data)
    }
}

export {GetFromServer, PostToServer}

const getFrom = new GetFromServer();

getFrom.getComments().then(comments => console.log(comments));
getFrom.getScores().then(scores => console.log(scores));
getFrom.getAverageRating().then(rating => console.log(rating));
getFrom.getPlayerRating('testPlayer2').then(rating => console.log(rating));
