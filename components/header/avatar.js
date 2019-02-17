import React from 'react';
import styled from 'react-emotion';

const UserAvatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const Avatar = ({ avatar }) => {
  console.log('avatar', avatar);
  return <UserAvatar src={avatar} />;
};

export default Avatar;
