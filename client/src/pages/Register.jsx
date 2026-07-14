import { useState } from 'react';

import {

  useNavigate,

  Link

}

from 'react-router-dom';


import {

  toast

}

from 'react-toastify';


import API

from '../services/api';



function Register() {

  const navigate = useNavigate();


  const [form, setForm] = useState({

    name: '',

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

      await API.post(

        '/auth/register',

        form

      );


      toast.success(

        'Registration successful'

      );


      navigate('/');

    }

    catch (err) {

      toast.error(

        err.response?.data?.message ||

        'Registration failed'

      );

    }

  };



  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">

              Register

            </h2>


            <form onSubmit={handleSubmit}>

              <div className="mb-3">

                <input

                  type="text"

                  name="name"

                  className="form-control"

                  placeholder="Name"

                  onChange={handleChange}

                  required

                />

              </div>



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

                className="btn btn-success w-100"

              >

                Register

              </button>

            </form>



            <p className="text-center mt-3">

              Already have an account?

              {' '}

              <Link to="/">

                Login

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Register;