import React, { useState } from "react";  
import { read, utils } from 'xlsx';

function ImportAttendance({ handleChange }) {
    const [data, setData] = useState([]);  
    const URL = 'http://backend-test.test/api';


    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;
                console.log(wb.Sheets[sheets[0]])
                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setData(rows)
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }

    const saveData = async () => {
        console.log(data)

        const response = await fetch(`${URL}/import-attendance`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        .then((response) => response.json());
        handleChange(response);
    }
       

  return (
    <div>
        <h3 className='mb-3'>Import Attendance from CSV/XLSX</h3>
        <div className="row">
            <div className="col-md-10">
                <input type="file" className="form-control" accept=".xslv, .csv" onChange={handleImport} />
            </div>
            <div className="col-md-2">
                <button className="btn btn-outline-primary" onClick={saveData}>Submit</button>
            </div>
        </div>
    </div>
  );
}

export default ImportAttendance;
