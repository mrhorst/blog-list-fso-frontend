import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import './index.css'

import { BlogList, BlogForm } from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import User from './components/User'

import LoginForm from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [loggedUser, setLoggedUser] = useState(null)
  const [notificationObj, setNotificationObj] = useState({
    message: null,
    type: null,
  })

  const blogFormRef = useRef()

  async function fetchBlogs() {
    const listblogs = await blogService.getAll()
    setBlogs([...listblogs])
  }

  useEffect(() => {
    getBlogsByUser()
  }, [])

  const getBlogsByUser = () => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setLoggedUser(user)
        blogService.setToken(user.token)
        fetchBlogs()
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleFailedLogin = (e) => {
    setNotificationObj({ message: e.response.data.error, type: 'danger' })
    setTimeout(() => {
      setNotificationObj({ message: null, type: null })
    }, 2000)
  }
  const handleSuccessfulLogin = () => {
    setNotificationObj({
      message: 'Login Successful!',
      type: 'success',
    })
    setTimeout(() => {
      setNotificationObj({ message: null, type: null })
    }, 2000)
  }

  const addBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))
      blogFormRef.current.toggleVisibility()
      fetchBlogs()
    } catch (e) {
      setNotificationObj({ message: e.response.data.message, type: 'danger' })
      setTimeout(() => {
        setNotificationObj({ message: null, type: null })
      }, 2000)
      console.log(e)
    }
  }

  const handleLogout = () => {
    if (loggedUser) {
      window.localStorage.removeItem('loggedBlogUser')
      setLoggedUser(null)
    }
  }

  return (
    <div>
      <Notification
        message={notificationObj.message}
        type={notificationObj.type}
      />
      {loggedUser === null ? (
        <LoginForm
          setUser={getBlogsByUser}
          handleFailedLogin={handleFailedLogin}
          handleSuccessfulLogin={handleSuccessfulLogin}
        />
      ) : (
        <div>
          <User user={loggedUser} onClick={handleLogout} />
          <Togglable ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          <BlogList blogs={blogs} fetchBlogs={fetchBlogs} />
        </div>
      )}
    </div>
  )
}

export default App
