import { useState } from 'react';

import { useNavigate, Link }
from 'react-router-dom';

import { toast }
from 'react-toastify';

import API
from '../services/api';


function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    email: '',

    password: ''

  });



  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
      e.target.value

    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(

        '/auth/login',

        form

      );


      localStorage.setItem(

        'token',

        res.data.token

      );


      toast.success(

        'Login successful'

      );


      navigate('/dashboard');

    }

    catch (err) {

      toast.error(

        err.response?.data?.message ||

        'Login failed'

      );

    }

  };



  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">

              Login

            </h2>


            <form onSubmit={handleSubmit}>

              <div className="mb-3">

                <input

                  type="email"

                  name="email"

                  className="form-control"

                  placeholder="Email"

                  onChange={handleChange}

                  required

                />

              </div>



              <div className="mb-3">

                <input

                  type="password"

                  name="password"

                  className="form-control"

                  placeholder="Password"

                  onChange={handleChange}

                  required

                />

              </div>


              <button

                className="btn btn-primary w-100"

              >

                Login

              </button>

            </form>


            <p className="text-center mt-3">

              New user?

              {' '}

              <Link to="/register">

                Register

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Login;