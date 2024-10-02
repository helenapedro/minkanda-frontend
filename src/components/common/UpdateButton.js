const UpdateButton = ({ handleSubmit, isLoading }) => (
     <div className="text-center text-lg-start pt-2">
       <button
         type="submit"
         className="btn btn-primary btn-lg"
         disabled={isLoading}
       >
         {isLoading ? 'Saving...' : 'Save Changes'}
       </button>
     </div>
   );
   
export default UpdateButton;