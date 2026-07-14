import { useEffect, useState } from 'react';
import API from '../services/api';

import Navbar from '../components/Navbar';
import Stats from '../components/Stats';
import JobChart from '../components/JobChart';
import ResumeUpload from '../components/ResumeUpload';

import { toast } from 'react-toastify';

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState('');

  const [filterStatus, setFilterStatus] =
    useState('All');

  const [editingJobId, setEditingJobId] =
    useState(null);

  const [editForm, setEditForm] = useState({
    company: '',
    role: ''
  });

  const [form, setForm] = useState({
    company: '',
    role: '',
    status: 'Applied'
  });

  const fetchJobs = async () => {
    try {
      const res = await API.get('/jobs');

      setJobs(res.data);
    } catch (err) {
      console.log(err);

      toast.error('Failed to fetch jobs');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const addJob = async (e) => {
    e.preventDefault();

    try {
      await API.post('/jobs', form);

      toast.success(
        'Job added successfully'
      );

      setForm({
        company: '',
        role: '',
        status: 'Applied'
      });

      fetchJobs();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        'Failed to add job'
      );
    }
  };

  const deleteJob = async (id) => {

    try {

      await API.delete(`/jobs/${id}`);

      toast.success('Job deleted');

      fetchJobs();

    } catch {

      toast.error('Delete failed');

    }

  };

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await API.put(`/jobs/${id}`, {
        status
      });

      toast.success(
        'Status updated'
      );

      fetchJobs();

    } catch {

      toast.error(
        'Update failed'
      );

    }

  };

  const startEditing = (job) => {

    setEditingJobId(job._id);

    setEditForm({

      company: job.company,

      role: job.role

    });

  };

  const saveEdit = async (id) => {

    try {

      await API.put(
        `/jobs/${id}`,
        editForm
      );

      toast.success(
        'Job updated'
      );

      setEditingJobId(null);

      fetchJobs();

    } catch {

      toast.error(
        'Edit failed'
      );

    }

  };

  const filteredJobs = jobs.filter(
    (job) => {

      const matchesSearch =
        job.company
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =

        filterStatus === 'All' ||

        job.status === filterStatus;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <Stats jobs={jobs} />

        <ResumeUpload />

        <JobChart jobs={jobs} />

        {/* Add Job */}

        <form
          onSubmit={addJob}
          className="card p-4 shadow mb-4"
        >

          <h4 className="mb-3">

            Add New Job

          </h4>

          <div className="row">

            <div className="col-md-4">

              <input

                className="form-control"

                placeholder="Company Name"

                value={form.company}

                onChange={(e) =>

                  setForm({

                    ...form,

                    company:
                      e.target.value

                  })

                }

                required

              />

            </div>


            <div className="col-md-4">

              <input

                className="form-control"

                placeholder="Job Role"

                value={form.role}

                onChange={(e) =>

                  setForm({

                    ...form,

                    role:
                      e.target.value

                  })

                }

                required

              />

            </div>


            <div className="col-md-3">

              <select

                className="form-control"

                value={form.status}

                onChange={(e) =>

                  setForm({

                    ...form,

                    status:
                      e.target.value

                  })

                }

              >

                <option>
                  Applied
                </option>

                <option>
                  Interview
                </option>

                <option>
                  Rejected
                </option>

                <option>
                  Offer
                </option>

              </select>

            </div>


            <div className="col-md-1">

              <button className="btn btn-primary w-100">

                Add

              </button>

            </div>

          </div>

        </form>


        {/* Search + Filter */}

        <div className="card p-3 shadow mb-4">

          <div className="row">

            <div className="col-md-6">

              <input

                type="text"

                className="form-control"

                placeholder="Search by company"

                value={search}

                onChange={(e) =>

                  setSearch(
                    e.target.value
                  )

                }

              />

            </div>


            <div className="col-md-6">

              <select

                className="form-control"

                value={filterStatus}

                onChange={(e) =>

                  setFilterStatus(
                    e.target.value
                  )

                }

              >

                <option>
                  All
                </option>

                <option>
                  Applied
                </option>

                <option>
                  Interview
                </option>

                <option>
                  Rejected
                </option>

                <option>
                  Offer
                </option>

              </select>

            </div>

          </div>

        </div>


        {/* Jobs */}

        <div className="row">

          {filteredJobs.length === 0 ? (

            <p className="text-center">

              No jobs found

            </p>

          ) : (

            filteredJobs.map((job) => (

              <div
                key={job._id}
                className="col-md-6 mb-3"
              >

                <div className="card shadow-sm p-3">

                  {editingJobId ===
                  job._id ? (

                    <>

                      <input

                        className="form-control mb-2"

                        value={
                          editForm.company
                        }

                        onChange={(e) =>

                          setEditForm({

                            ...editForm,

                            company:
                              e.target.value

                          })

                        }

                      />

                      <input

                        className="form-control mb-2"

                        value={
                          editForm.role
                        }

                        onChange={(e) =>

                          setEditForm({

                            ...editForm,

                            role:
                              e.target.value

                          })

                        }

                      />

                      <button

                        className="btn btn-success"

                        onClick={() =>

                          saveEdit(
                            job._id
                          )

                        }

                      >

                        Save

                      </button>

                    </>

                  ) : (

                    <>

                      <h5>

                        {job.company}

                      </h5>

                      <p>

                        {job.role}

                      </p>

                      <select

                        className="form-control mb-2"

                        value={job.status}

                        onChange={(e) =>

                          updateStatus(

                            job._id,

                            e.target.value

                          )

                        }

                      >

                        <option>Applied</option>

                        <option>Interview</option>

                        <option>Rejected</option>

                        <option>Offer</option>

                      </select>

                      <div className="d-flex gap-2">

                        <button

                          className="btn btn-warning"

                          onClick={() =>

                            startEditing(job)

                          }

                        >

                          Edit

                        </button>

                        <button

                          className="btn btn-danger"

                          onClick={() =>

                            deleteJob(job._id)

                          }

                        >

                          Delete

                        </button>

                      </div>

                    </>

                  )}

                </div>

              </div>

            ))

          )}

        </div>

      </div>
    </>
  );
}

export default Dashboard;