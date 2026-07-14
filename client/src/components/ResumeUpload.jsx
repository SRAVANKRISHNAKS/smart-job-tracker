import {

  useState

}

from 'react';

import {

  toast

}

from 'react-toastify';


import API

from '../services/api';



function ResumeUpload() {

  const [file, setFile] =

    useState(null);


  const uploadResume =

  async (e) => {

    e.preventDefault();


    const formData =

      new FormData();


    formData.append(

      'resume',

      file

    );


    try {

      await API.post(

        '/resume',

        formData

      );


      toast.success(

        'Resume uploaded'

      );

    }

    catch {

      toast.error(

        'Upload failed'

      );

    }

  };



  return (

    <div className="card shadow p-4 mb-4">

      <h4>

        Upload Resume

      </h4>


      <form

        onSubmit={uploadResume}

      >

        <input

          type="file"

          className="form-control mb-3"

          onChange={(e) =>

            setFile(

              e.target.files[0]

            )

          }

        />


        <button

          className="btn btn-success"

        >

          Upload

        </button>

      </form>

    </div>

  );

}


export default ResumeUpload;