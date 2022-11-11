import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'My Name',
    url: 'someUrl',
    user: '1234'
  }

  render(
    <Blog
      blog={blog}
      isPersonal={true}
      onLike={() => { }}
      onRemove={() => { }}
    />
  )

  const element = screen.getByText(
    `${blog.title} ${blog.author}`
  )
  expect(element).toBeDefined()
})

test('does not render this', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'My Name',
  }

  render(
    <Blog
      blog={blog}
      isPersonal={true}
      onLike={() => { }}
      onRemove={() => { }}
    />
  )

  const element = screen.queryByText('do not want this thing to be rendered')
  expect(element).toBeNull()
})

test('expanding the blog and check for rendered content', async () => {
  const user = userEvent.setup()
  const mockHandler = jest.fn()

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'My Name',
    url: 'someUrl',
    user: '1234'
  }

  render(
    <Blog
      blog={blog}
      isPersonal={true}
      onLike={mockHandler}
      onRemove={mockHandler}
    />
  )

  let element = screen.queryByText(`${blog.url}`)
  expect(element).toBeNull()

  let button = screen.getByText('view')
  await user.click(button)

  button = screen.getByText('like')
  expect(button).toBeDefined()

  element = screen.queryByText(`${blog.url}`)
  expect(element).toBeDefined()
})

test('expand blog and click on like twice', async () => {
  const user = userEvent.setup()
  const mockHandler = jest.fn()

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'My Name',
    url: 'someUrl',
    user: '1234'
  }

  render(
    <Blog
      blog={blog}
      isPersonal={true}
      onLike={mockHandler}
      onRemove={() => { }}
    />
  )

  let button = screen.getByText('view')
  await user.click(button)

  button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})