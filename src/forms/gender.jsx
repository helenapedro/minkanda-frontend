const Gender = ({ gender, setGender }) => {
  return (
    <div className="col mb-4">
      <i className="fas fa-venus-mars fa-lg me-3 fa-fw"></i>
      <h6 className="mb-2 pb-1">Gender: </h6>
      
      <div className="form-check form-check-inline">
        <input 
          className="form-check-input" 
          type="radio" 
          name="gender" 
          id="femaleGender"
          value="Female"
          checked={gender === "Female"}
          onChange={() => setGender("Female")}
        />
        <label className="form-check-label" htmlFor="femaleGender">Female</label>
      </div>
      
      <div className="form-check form-check-inline">
        <input 
          className="form-check-input" 
          type="radio" 
          name="gender" 
          id="maleGender"
          value="Male"
          checked={gender === "Male"}
          onChange={() => setGender("Male")}
        />
        <label className="form-check-label" htmlFor="maleGender">Male</label>
      </div>
      
      <div className="form-check form-check-inline">
        <input 
          className="form-check-input" 
          type="radio" 
          name="gender" 
          id="otherGender"
          value="Other"
          checked={gender === "Other"}
          onChange={() => setGender("Other")}
        />
        <label className="form-check-label" htmlFor="otherGender">Other</label>
      </div>
      
      <div className="form-check form-check-inline">
        <input 
          className="form-check-input" 
          type="radio" 
          name="gender" 
          id="preferNotSay"
          value="Prefer Not to Say"
          checked={gender === "Prefer Not to Say"}
          onChange={() => setGender("Prefer Not to Say")}
        />
        <label className="form-check-label" htmlFor="preferNotSay">Prefer Not to Say</label>
      </div>
    </div>
  );
};

export default Gender;
