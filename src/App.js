import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function App() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/users')
    .then(res => {
      setColumns(Object.keys(res.data[0]));
      setRecords(res.data);
    })
  }, [])

  function handleSubmit(id) {
    const confirm = window.confirm("Do you want to delete")
    if (confirm) {
      axios.delete('http://localhost:3000/users/'+id)
      .then(res => {
        alert("record has been deleted");
        navigate('/')
      }).catch(err => console.log(err))
    }
  }

  return (
    <div className='Container mt-5'>
          <div className="text-end">
            <Link to='/create' className='btn btn-primary' >Add +</Link>
          </div>
          <table className="table">
            <thead>
              <tr>
                {columns.map((c, i) => (
                  <th scope="col" key={i}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((d, i) => (
                <tr key={i}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.email}</td>
                  <td>
                    <Link to={`/update/${d.id}`} className='btn btn-sm btn-success'>Update</Link>
                    <button onClick={e => handleSubmit(d.id)} className='btn btn-sm ms-1 btn-danger'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
  );
}

export default App;
