import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const { blogs, users } = useSelector((state) => {
    return state
  })

  console.log('User Object: ', users)

  const reduceBlogs = (user) => {
    return blogs.filter((blog) => blog.user.id === user.id).length
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>User</th>
            <th>Number of blogs</th>
          </tr>

          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{reduceBlogs(user)}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
