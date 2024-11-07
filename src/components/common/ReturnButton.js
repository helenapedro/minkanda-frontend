import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';

const ReturnButton = ({ url }) => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(url);
  };

  return (
    <Button onClick={handleReturn} variant="outline-light" className="btn-sm p-1">
      <FontAwesomeIcon icon={faArrowLeft} />
    </Button>
  );
};

export default ReturnButton;
