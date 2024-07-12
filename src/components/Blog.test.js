import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { BlogList } from './Blog'
import fetchBlogs from '../App'

test('renders content', () => {
  const blogs = [
    {
      title: 'Test Title',
      author: 'Test Author',
      url: 'Test URL',
    },
  ]

  render(<BlogList blogs={blogs} fetchBlogs={fetchBlogs} />)
  const element = screen.getByText('Test Title -- by Test Author')
  expect(element).toBeDefined()
})
