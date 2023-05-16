import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

function Attendance() {
  const [data, setData] = useState([]);

  const URL = 'http://backend-test.test/api';

  const getApiData = async () => {
    const response = await fetch(`${URL}/attendance`)
      .then((response) => response.json());

    setData(response);
  }

  const workingHours = (checkin, checkout) => {
    if(checkin && checkout) {
      checkin = new Date(checkin);
      checkout = new Date(checkout);
  
      let hours  = Math.abs(checkin - checkout) / 36e5;

      return hours.toFixed(1);
    }

    return 'N/A';
  }

  useEffect(() => {  
      getApiData()
  }, []);

  return (
    <div className="row d-flex justify-content-center mt-5">
        <div className="col-md-6">
            <h3 className='mb-4'>Attendance Report</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Checkin</th>
                    <th>Checkout</th>
                    <th>Total Working Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(element => {
                        return <tr>
                            <td>{element.id}</td>
                            <td>{element.employee.name}</td>
                            <td>{element.checkin ? element.checkin : 'N/A'}</td>
                            <td>{element.checkout ? element.checkout : 'N/A'}</td>
                            <td className="text-center">{workingHours(element.checkin, element.checkout)}</td>
                        </tr>
                        })
                    }
                </tbody>
            </Table>
        </div>
    </div>
   
  );
}

export default Attendance;
