import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
  tableBorder: {
    border: "1px solid black",
    borderCollapse: "collapse",
  },
};

function App() {

  const [state, setState] = useState({ id: "", name: "" });
  const [info, setInfo] = useState({ id: "", tag: "", price: "" });
  const [companies, setCompanies] = useState([]);
  const [demands, setDemands] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/companies')
      .then((response) => setCompanies(response.data))
      .catch(error => console.error(error));

    axios.get('http://localhost:3001/api/demands')
      .then((response) => setDemands(response.data))
      .catch(error => console.error(error));
  }, []);

  const addCompany = async () => {
    if (companies.length > 0) {
      const newCompany = { id: companies.length + 1, name: state.name };
      await axios.post('http://localhost:3001/api/companies', newCompany);
      setCompanies([...companies, newCompany]);
      setState({ id: "", name: "" })
    } else {
      const newCompany = { id: 1, name: state.name };
      await axios.post('http://localhost:3001/api/companies', newCompany);
      setCompanies([...companies, newCompany]);
      setState({ id: "", name: "" })
    }
  };

  const updateCompany = async () => {
    let obj = { id: state.id, name: state.name };
    let response = await axios.put(`http://localhost:3001/api/companies/${state.id}`, obj);
    const updatedCompanies = companies.map((company) => company.id === state.id ? response.data : company);
    setCompanies(updatedCompanies);
    setState({ id: "", name: "" });
  };

  const handleEdit = (item) => {
    setState({ ...state, id: item.id, name: item.name })
  };

  const deleteCompany = async (id) => {
    await axios.delete(`http://localhost:3001/api/companies/${id}`);
    setCompanies(companies.filter((company) => company.id !== id));
  };

  const addDemand = async () => {
    if (demands.length > 0) {
      const newDemand = { id: demands.length + 1, tag: info.tag, price: info.price };
      await axios.post('http://localhost:3001/api/demands', newDemand);
      setDemands([...demands, newDemand]);
      setInfo({ id: "", tag: "", price: "" })
    } else {
      const newDemand = { id: 1, tag: info.tag, price: info.price };
      await axios.post('http://localhost:3001/api/demands', newDemand);
      setDemands([...demands, newDemand]);
      setInfo({ id: "", tag: "", price: "" })
    }
  };

  const updateDemand = async () => {
    await axios.put(`http://localhost:3001/api/demands/${info.id}`, info);
    const updatedDemands = demands.map((demand) => demand.id === info.id ? info : demand);
    setDemands(updatedDemands);
    setInfo({ id: "", tag: "", price: "" });
  };

  const handleDemand = (item) => {
    setInfo({ id: item.id, tag: item.tag, price: item.price })
  };

  const deleteDemand = async (id) => {
    await axios.delete(`http://localhost:3001/api/demands/${id}`);
    setDemands(demands.filter((demand) => demand.id !== id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "50rem" }}>
        <h1>Companies</h1>
        <input
          type='text'
          placeholder='Id'
          style={{ marginLeft: "5px" }}
          value={state.id}
          onChange={(e) => setState({ ...state, id: e.target.value })}
        />
        <input
          type='text'
          placeholder='Name'
          style={{ marginLeft: "5px" }}
          value={state.name}
          onChange={(e) => setState({ ...state, name: e.target.value })}
        />
        <button style={{ marginLeft: "5px" }} onClick={addCompany}>Add</button>
        <button style={{ marginLeft: "5px" }} onClick={updateCompany}>Update</button>
        <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <table style={styles.tableBorder}>
            <thead>
              <tr>
                <th style={styles.tableBorder}>Id</th>
                <th style={styles.tableBorder}>Name</th>
                <th style={styles.tableBorder}>Action</th>
              </tr>
            </thead>
            <tbody>
              {companies.length > 0 && companies.map((company) => (
                <tr key={company.id}>
                  <td style={styles.tableBorder}>{!!company && company.id}</td>
                  <td style={styles.tableBorder}>{!!company && company.name}</td>
                  <td style={styles.tableBorder}>
                    <button onClick={() => handleEdit(company)}>EDIT</button>
                    <button style={{ marginLeft: "5px" }} onClick={() => deleteCompany(company.id)}>DELETE</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ width: "50rem" }}>
        <h1>Demands</h1>
        <input
          type='text'
          placeholder='Id'
          style={{ marginLeft: "5px" }}
          value={info.id}
          onChange={(e) => setInfo({ ...info, id: e.target.value })}
        />
        <input
          type='text'
          placeholder='Tag'
          style={{ marginLeft: "5px" }}
          value={info.tag}
          onChange={(e) => setInfo({ ...info, tag: e.target.value })}
        />
        <input
          type='text'
          placeholder='Price'
          style={{ marginLeft: "5px" }}
          value={info.price}
          onChange={(e) => setInfo({ ...info, price: e.target.value })}
        />
        <button style={{ marginLeft: "5px" }} onClick={addDemand}>Add</button>
        <button style={{ marginLeft: "5px" }} onClick={updateDemand}>Update</button>
        <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <table style={styles.tableBorder}>
            <thead>
              <tr>
                <th style={styles.tableBorder}>Id</th>
                <th style={styles.tableBorder}>Tag</th>
                <th style={styles.tableBorder}>Price</th>
                <th style={styles.tableBorder}>Action</th>
              </tr>
            </thead>
            <tbody>
              {demands.length > 0 && demands.map((demand, index) => (
                <tr key={index.toString()}>
                  <td style={styles.tableBorder}>{demand.id}</td>
                  <td style={styles.tableBorder}>{demand.tag}</td>
                  <td style={styles.tableBorder}>{demand.price}</td>
                  <td style={styles.tableBorder}>
                    <button onClick={() => handleDemand(demand)}>EDIT</button>
                    <button style={{ marginLeft: "5px" }} onClick={() => deleteDemand(demand.id)}>DELETE</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};

export default App;
