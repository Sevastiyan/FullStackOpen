import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from '../components/BlogForm'
import userEvent from '@testing-library/user-event'

test('fill out a new form', async () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />) 

  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')

  const saveButton = screen.getByText('Create')

  await userEvent.type(title, 'Some Title')
  await userEvent.type(author, 'My Name')
  await userEvent.type(url, 'someUrl')

  await userEvent.click(saveButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Some Title')
  expect(createBlog.mock.calls[0][0].author).toBe('My Name')
  expect(createBlog.mock.calls[0][0].url).toBe('someUrl')
})
