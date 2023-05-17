import { useState, useEffect, useCallback } from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImportAttendance from "./ImportAttendance";

function Attendance() {
  const [data, setData] = useState([]);

  const handleChange = useCallback((newData) => {
    setData(newData);
 }, []);

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
    <div className="row d-flex justify-content-center mt-3">
        <div className="col-md-6">
            <ImportAttendance  handleChange={handleChange} />

            <h3 className='mb-4 mt-5'>Attendance Report</h3>
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
                        data.map((element, index) => {
                        return <tr key={index}>
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
