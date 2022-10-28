import { API_URL } from '../constants';

class MainBoardApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getBoards() {
    return fetch(`${this._baseUrl}/boards`, {
      headers: this._headers
    }).then(this._checkResponse);
  }

  deleteBoard(id) {
    return fetch(`${this._baseUrl}/boards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse);
  }

  getTasks() {
    return fetch(`${this._baseUrl}/tasks`, {
      headers: this._headers
    }).then(this._checkResponse);
  }

  updateBoard(board) {
    return fetch(`${this._baseUrl}/boards/${board.id}`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify(board)
    }).then(this._checkResponse);
  }



  ////подумать над body
  addNewBoard(data) {
    return fetch(`${this._baseUrl}/boards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.boardName,
        columns: [{ name: data.columnsName }]
      })
    }).then(this._checkResponse);
  }
}
export const mainApi = new MainBoardApi({
  baseUrl: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
