import React from "react";

const Thumbnail = props => {
  const { farm, server, id, secret } = props.photo; // destructuring

  return <img src={props.photo} alt={props.photo} />;
};

export default Thumbnail;
