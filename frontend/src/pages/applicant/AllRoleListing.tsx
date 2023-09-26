import React, { useEffect } from 'react';

const AllRoleListing: React.FC = () => {
  const endpointUrl = `http://localhost:5000/api/listings?page=1&size=10`;

  useEffect(() => {
    fetch(endpointUrl)
      .then(response => response.json())
      .then(data => console.log(data));
  }, []); // Provide an empty dependency array to run the effect only once when the component mounts

  return (
    <div>
      {/* JSX content for your component here */}
    </div>
  );
}

export default AllRoleListing;
