import axios from 'axios'
import { settings } from '../config'

export const getTasks = async (status = '') => {
  const url = settings.server + `/task?status=${status}`
  const token = sessionStorage['token']
  let response
  try {
    response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    response = response.data
  } catch (ex) {
    console.log(ex)
  }

  return response
}

export const createTask = async (title, description) => {
  const url = settings.server + '/task/'
  const token = sessionStorage['token']
  let response
  try {
    response = await axios.post(
      url,
      {
        title,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    response = response.data
  } catch (ex) {
    console.log(ex)
  }

  return response
}

export const changeTaskStatus = async (id, status) => {
  const url = settings.server + `/task/${id}/${status}`
  const token = sessionStorage['token']
  let response
  try {
    response = await axios.patch(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    response = response.data
  } catch (ex) {
    console.log(ex)
  }

  return response
}
