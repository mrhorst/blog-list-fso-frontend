import * as React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'
import Button from './Button'

const Blog = ({ blog, fetchBlogs }) => {
  const [showDetails, setShowDetails] = useState(null)
  const [likes, setLikes] = useState(blog.likes)

  const toggleDetails = (blogId) => {
    setShowDetails(showDetails === blogId ? null : blogId)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const likesBlog = (blog) => {
    setLikes(likes + 1)
    blogService.updateLikes({ ...blog, likes })
  }

  const deleteBlog = async (blog) => {
    if (
      window.confirm(
        `Are you sure you want to delete the blog '${blog.title}'?`
      )
    ) {
      await blogService.deleteBlog(blog)
      fetchBlogs()
    } else {
      console.log('canceled')
    }
  }

  return (
    <div key={blog.id} style={blogStyle}>
      <p>
        <Button
          onClick={() => {
            toggleDetails(blog.id)
          }}
        >
          {showDetails === blog.id ? 'Hide' : 'View'}
        </Button>
        &nbsp; {blog.title} -- by {blog.author}
      </p>

      {showDetails === blog.id && (
        <div>
          <p>
            Likes: {likes}
            <Button
              onClick={() => {
                likesBlog(blog)
              }}
            >
              Like!
            </Button>
            <br></br>
            URL: {blog.url}
            <br></br>Created by User: {blog.user.username}
          </p>
          <Button onClick={() => deleteBlog(blog)} color="danger">
            Delete
          </Button>
        </div>
      )}
    </div>
  )
}

export const BlogList = ({ blogs, fetchBlogs }) => {
  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} fetchBlogs={fetchBlogs} />
      ))}
    </div>
  )
}

export const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const addBlog = (e) => {
    e.preventDefault()
    try {
      createBlog({
        ...newBlog,
      })
      setNewBlog({ title: '', author: '', url: '' })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <form>
        <div>
          Title
          <input
            type="text"
            id="title"
            value={newBlog.title}
            name="Title"
            onChange={(e) => {
              setNewBlog({ ...newBlog, title: e.target.value })
            }}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            id="author"
            value={newBlog.author}
            name="Author"
            onChange={(e) => {
              setNewBlog({ ...newBlog, author: e.target.value })
            }}
          />
        </div>
        <div>
          URL
          <input
            type="text"
            id="URL"
            value={newBlog.url}
            name="blogURL"
            onChange={(e) => {
              setNewBlog({ ...newBlog, url: e.target.value })
            }}
          />
        </div>
        <Button color="success" onClick={addBlog}>
          Publish
        </Button>
      </form>
    </div>
  )
}
