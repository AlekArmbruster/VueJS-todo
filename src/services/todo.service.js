import axios from 'axios';

export default class ApiService {

    saveTodo (itemNameInput) {
      return axios.post(`http://localhost:8000/api/todos/`, {
        name: itemNameInput
      })
    }

	updateTodo (todo) {
		return axios.put(`http://localhost:8000/api/todos/`+todo.id,todo)
	}

	deleteTodo (todo) {
      return axios.delete(`http://localhost:8000/api/todos/`+todo.id,{data:{id:todo.id}})
    }

}

export const apiService = new ApiService()