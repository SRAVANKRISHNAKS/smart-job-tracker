import { useNavigate } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem('token');

    navigate('/');
  };

  return (

    <nav className="navbar navbar-dark bg-dark">

      <div className="container">

        <span className="navbar-brand">

          Smart Job Tracker

        </span>


        <button

          className="btn btn-danger"

          onClick={logout}

        >

          Logout

        </button>

      </div>

    </nav>

  );
}

export default Navbar;