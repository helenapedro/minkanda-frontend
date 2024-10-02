const ContactForm = ({ formData, handleChange }) => {
     return (
          <div className='row mb-4'>
            <div className="col form-outline ">
              <input
                type="text"
                id="phoneNumber"
                className="form-control"
                value={formData.phoneNumber}
                onChange={handleChange}
                name="phoneNumber"
              />
              <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
            </div>

            <div className="col form-outline">
              <input
                type="text"
                id="address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
                name="address"
              />
              <label className="form-label" htmlFor="address">Address</label>
            </div>
          </div>
     );
}

export default ContactForm;