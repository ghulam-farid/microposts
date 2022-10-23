/*
 * @version: 3.0.0
 * @author: Ghulam Farid
 * @description: HTTP Library for making HTTP requests
 * @license: MIT
 */

class HTTP {
  async get(url) {
    const response = await fetch(url);
    return this.checkResponse(response);
  }
  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return this.checkResponse(response);
  }
  async put(url, data) {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return this.checkResponse(response);
  }
  async delete(url) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    return this.checkResponse(response);
  }
  checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(
        `Error : ${response.status} ${response.statusText}`
      );
    }
  }
}

export const http = new HTTP();
