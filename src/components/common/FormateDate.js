const formatDate = (dateString) => {
     const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
     return new Date(dateString).toLocaleString('en-US', options);
};

export default formatDate;