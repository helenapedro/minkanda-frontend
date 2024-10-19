import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import { selectPageSize, setPageSize } from '../redux/settingsSlice';

const Settings = () => {
  const pageSize = useSelector(selectPageSize);
  const dispatch = useDispatch();

  const handlePageSizeChange = (e) => {
    dispatch(setPageSize(Number(e.target.value)));
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <Form.Group controlId="pageSize" className="mb-3">
        <Form.Label>Notes per page:</Form.Label>
        <Form.Select value={pageSize} onChange={handlePageSizeChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </Form.Select>
      </Form.Group>
    </div>
  );
};

export default Settings;
