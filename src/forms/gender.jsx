import React from "react";

const gender =( {gender, setGender}) => {
     return (
          <div className="col-md-6 mb-4">
               <i className="fas fa-venus-mars fa-lg me-3 fa-fw"></i>
               <h6 class="mb-2 pb-1">Gender: </h6>
               <div className="form-check form-check-inline">
                    <input 
                         class="form-check-input" 
                         type="radio" 
                         name="inlineRadioOptions" 
                         id="femaleGender"
                         value={gender} checked
                         onChange={(e) => setGender(e.target.value)}
                         required
                    />
                    <label className="form-check-label" htmlFor="femaleGender">Female</label>
               </div>
               <div className="form-check form-check-inline">
                    <input 
                         className="form-check-input" 
                         type="radio" 
                         name="inlineRadioOptions" 
                         id="maleGender"
                         value={gender} checked
                         onChange={(e) => setGender(e.target.value)}
                         required
                    />
                    <label className="form-check-label" htmlFor="maleGender">Male</label>
               </div>
               <div className="form-check form-check-inline">
                    <input 
                         className="form-check-input" 
                         type="radio" 
                         name="inlineRadioOptions" 
                         id="otherGender"
                         value={gender} checked
                         onChange={(e) => setGender(e.target.value)}
                         required
                    />
                    <label className="form-check-label" htmlFor="otherGender">Other</label>
               </div>
          </div> 
          
     );
}

export default gender;