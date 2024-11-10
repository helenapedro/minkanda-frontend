import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { isTester } from '../utils/roleUtils';
import { deleteUserAsync } from '../redux/userSlice';
import { Form, Button } from 'react-bootstrap';
import Gender from './Gender';
import NameForm from './NameForm';
import PasswordForm from './PasswordForm';
import ContactForm from './ContactForm';

const UpdateForm = ({ handleSubmit, formData, handleChange, gender, setGender, showPasswordFields, setShowPasswordFields, isLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { userInfo, loading } = useSelector((state) => state.user);
  
  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      await dispatch(deleteUserAsync(userInfo.uid)).unwrap();
      navigate("/");
    }
  };
  

  return (
    <Form onSubmit={handleSubmit}>
      <NameForm formData={formData} handleChange={handleChange} />
      <Form.Group className="mb-4" controlId="birthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          value={formData.birthday}
          onChange={handleChange}
          name="birthday"
        />
      </Form.Group>
      <Gender gender={gender} setGender={setGender} />
      <Form.Group className="mb-4" controlId="email">
        <Form.Label>Your Email</Form.Label>
        <Form.Control
          type="email"
          value={formData.email}
          onChange={handleChange}
          name="email"
          autoComplete="email"
        />
      </Form.Group>
      <ContactForm formData={formData} handleChange={handleChange} />
      <PasswordForm
        formData={formData}
        handleChange={handleChange}
        showPasswordFields={showPasswordFields}
        setShowPasswordFields={setShowPasswordFields}
      />
      <div className="text-center pt-3">
        <Button variant="primary" type="submit" style={{ marginRight: '16px' }} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
        {!isTester(userInfo) && (
          <Button
            variant="outline-danger"
            onClick={handleDeleteAccount}
            style={{ borderWidth: '2px' }}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        )}
      </div>

    </Form>
  );
};

export default UpdateForm;
