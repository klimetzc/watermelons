import React, { useEffect } from 'react';

function Landing() {
  useEffect(() => {
    document.title = 'Watermelons';
  }, []);
  return <div>Landing Page</div>;
}

export default Landing;
