import React, { useEffect } from 'react';

const Landing = () => {
  useEffect(() => {
    document.title = 'Watermelons';
  }, []);
  return <div>Landing Page NETLIFY DEVELOP</div>;
};

export default Landing;
