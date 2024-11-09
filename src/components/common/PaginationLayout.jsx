import React from 'react';
import { Pagination, Form, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import paginationStyles from '../../styles/pagination.module.css';

const PaginationLayout = ({ 
  page, totalPages, 
  handlePreviousPage, handleNextPage, 
  pageSize, handlePageSizeChange 
}) => {
  return (
    <Col>
      <Row className="justify-content-center mb-3">
        <Col xs="auto">
          <Pagination className={paginationStyles.pagination}>
            <Pagination.Prev onClick={handlePreviousPage} disabled={page === 0}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </Pagination.Prev>
            <Pagination.Item active>{page + 1}</Pagination.Item>
            <Pagination.Next onClick={handleNextPage} disabled={page === totalPages - 1}>
              <FontAwesomeIcon icon={faChevronRight} />
            </Pagination.Next>
          </Pagination>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Form.Group controlId="pageSize" className="d-flex align-items-center">
            {/* <Form.Label className="me-2 mb-0">Notes per page:</Form.Label> */}
            {/* <Form.Select value={pageSize} onChange={handlePageSizeChange}>
              <option value="5">6</option>
              <option value="10">12</option>
              <option value="15">16</option>
              <option value="20">22</option>
            </Form.Select> */}
          </Form.Group>
        </Col>
      </Row>
    </Col>
  );
};

export default PaginationLayout;
