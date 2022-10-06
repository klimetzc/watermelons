import React, { useEffect } from 'react';

function Landing() {
  useEffect(() => {
    document.title = 'Watermelons';
  }, []);
  return <div>Landing Page NETLIFY DEVELOP</div>;
}

export default Landing;
