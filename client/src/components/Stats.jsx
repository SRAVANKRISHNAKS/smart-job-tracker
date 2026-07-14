function Stats({ jobs }) {

  const applied = jobs.filter(

    job => job.status === 'Applied'

  ).length;


  const interview = jobs.filter(

    job => job.status === 'Interview'

  ).length;


  const rejected = jobs.filter(

    job => job.status === 'Rejected'

  ).length;


  const offer = jobs.filter(

    job => job.status === 'Offer'

  ).length;



  return (

    <div className="row mb-4">

      <div className="col-md-3">

        <div className="card p-3 text-center shadow">

          <h5>Total</h5>

          <h3>{jobs.length}</h3>

        </div>

      </div>


      <div className="col-md-3">

        <div className="card p-3 text-center shadow">

          <h5>Applied</h5>

          <h3>{applied}</h3>

        </div>

      </div>


      <div className="col-md-3">

        <div className="card p-3 text-center shadow">

          <h5>Interview</h5>

          <h3>{interview}</h3>

        </div>

      </div>


      <div className="col-md-3">

        <div className="card p-3 text-center shadow">

          <h5>Offers</h5>

          <h3>{offer}</h3>

        </div>

      </div>

    </div>

  );

}

export default Stats;