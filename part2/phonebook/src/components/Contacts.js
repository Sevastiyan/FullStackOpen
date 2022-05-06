import React from 'react'

const Contacts = ({ contacts, handler }) => {
    return (
      <table>
        <tbody>
          {contacts.map((contact) => (
                  <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.number}</td>
                  <td>
                  <button onClick={() => handler(contact.id) }>Remove</button>
                  </td> 
                </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
export default Contacts
