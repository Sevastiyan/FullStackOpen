import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableRow, TableCell, TableHead } from '@mui/material'

const UserList = () => {
  const { blogs, users } = useSelector((state) => {
    return state
  })

  console.log('User Object: ', users)

  const reduceBlogs = (user) => {
    return blogs.filter((blog) => blog.user.id === user.id).length
  }

  return (
    <div>
      <h2>Users</h2>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Number of blogs</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </TableCell>
              <TableCell>{reduceBlogs(user)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default UserList
