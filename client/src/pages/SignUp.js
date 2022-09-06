import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export function SignUp() {
    const navigate = useNavigate()
    const [formDetails, setFormDetails] = useState({
      name: null,
      email: null,
      password: null,
    });
    if (localStorage.getItem('user')) {
        return navigate('/home')
    }
    const handleChange = (e) => {
        setFormDetails({
            ...formDetails,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        const res = await axios.post('/api/user').body(formDetails)
        if (res.status === 201) {
            localStorage.setItem('token', res.text)
            const response = await axios.get('/api/auth', { headers: { 'x-auth-token': res.text } })
            if (res.status === 200) {
                localStorage.setItem('user', response.body)
                return navigate('/home')
            }
        }
        else {
            alert(res.body.errors[0].msg)
        }
        e.preventDefault()
    }
    return (
      <form>
        <label for="name">Name</label>
            <input type="text" id="name" value={formDetails.name} onChange={handleChange}></input>
        <label for="email">Email</label>
        <input type="email" id="email" value={formDetails.email} onChange={handleChange}></input>
        <label for="password">Password</label>
        <input type="password" id="password" value={formDetails.password} onChange={handleChange}></input>
        <input type='submit' onClick={handleSubmit}>submit</input>
      </form>
    );
}