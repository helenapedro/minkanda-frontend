import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const ReturnButton = ({ url }) => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(url);
  };

  return (
    <Button onClick={handleReturn} variant="outline-primary">
      <FontAwesomeIcon icon={faArrowLeft} />
    </Button>
  );
};

export default ReturnButton;
