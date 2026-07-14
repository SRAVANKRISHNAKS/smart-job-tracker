import {

  PieChart,

  Pie,

  Tooltip,

  Legend,

  Cell

}

from 'recharts';


function JobChart({ jobs }) {

  const data = [

    {

      name: 'Applied',

      value: jobs.filter(

        j => j.status === 'Applied'

      ).length

    },

    {

      name: 'Interview',

      value: jobs.filter(

        j => j.status === 'Interview'

      ).length

    },

    {

      name: 'Rejected',

      value: jobs.filter(

        j => j.status === 'Rejected'

      ).length

    },

    {

      name: 'Offer',

      value: jobs.filter(

        j => j.status === 'Offer'

      ).length

    }

  ];


  const COLORS = [

    '#0d6efd',

    '#ffc107',

    '#dc3545',

    '#198754'

  ];


  return (

    <div className="card shadow p-4 mb-4">

      <h4 className="text-center">

        Job Analytics

      </h4>


      <div className="d-flex justify-content-center">

        <PieChart

          width={400}

          height={300}

        >

          <Pie

            data={data}

            dataKey="value"

            outerRadius={100}

            label

          >

            {

              data.map(

                (entry, index) => (

                <Cell

                  key={index}

                  fill={

                    COLORS[index]

                  }

                />

              ))

            }

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </div>

    </div>

  );

}

export default JobChart;