import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createTask } from '../services/task.service'

const CreateTaskPage = (props) => {
  // state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const navigate = useNavigate()

  const onCreateTask = async () => {
    if (title.length === 0) {
      alert('set title')
    } else if (description.length === 0) {
      alert('set description')
    } else {
      const result = await createTask(title, description)
      if (result) {
        // redirect to task list
        navigate('/task-list')
      } else {
        alert('invalid username or password')
      }
    }
  }

  return (
    <div>
      <h1 className="header">Create Task</h1>
      <div className="form">
        <div class="mb-3">
          <label class="form-label">Title</label>
          <input
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            type="text"
            class="form-control"
          />{' '}
        </div>

        <div class="mb-3">
          <label class="form-label">Description</label>
          <textarea
            onChange={(e) => {
              setDescription(e.target.value)
            }}
            rows={5}
            type="password"
            class="form-control"
          ></textarea>
        </div>

        <div class="mb-3">
          <button onClick={onCreateTask} className="btn btn-success">
            Save
          </button>
          <Link
            to="/task-list"
            style={{ marginLeft: '10px' }}
            className="btn btn-danger"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CreateTaskPage
