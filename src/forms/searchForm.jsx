import React from 'react';
import { MdClose } from 'react-icons/md';
import { CiSearch } from 'react-icons/ci';

const SearchForm = ({ text, setText, showSearch, setShowSearch }) => {
  return (
    <>
      {showSearch ? (
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => {
              setShowSearch(false);
              setText('');
            }}
          >
            <MdClose />
          </button>
        </div>
      ) : (
        <div>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => setShowSearch(true)}
          >
            <CiSearch /> Search
          </button>
        </div>
      )}
    </>
  );
};

export default SearchForm;