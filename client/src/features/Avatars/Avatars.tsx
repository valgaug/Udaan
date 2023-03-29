import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import avatar from '../../utils/avatar';

import './Avatars.css';
import { Grid } from '@mui/material';

type Props = {
  valChecked?: string;
  handleChange: React.ChangeEvent<HTMLInputElement>;
};

function Avatars({ valChecked, handleChange }: Props) {
  const user = useSelector((state: RootState) => state.users);
  const [availableAvatars, setAvailableAvatars] = useState({});

  useEffect(() => {
    console.log(avatar);
    console.log(user);

    const userRole = user.student ? 'student' : 'teacher';
    setAvailableAvatars(avatar[userRole]);
  }, [user]);

  useEffect(() => console.log(availableAvatars));

  return (
    <div className="CustomRadioGroup">
      <Grid
        container
        rowSpacing={1}
        columnSpacing={2}
        justifyContent="center"
      >
        {Object.values(availableAvatars).map((val, index) => {
          return (
            <Grid
              key={val.avatar}
              item
            >
              <div className="CustomRadioGroup__item">
                <label>
                  <input
                    type="radio"
                    name="avatar"
                    value={val.avatar}
                    onChange={handleChange}
                    checked={valChecked === val.avatar}
                  />
                  <div className="label__inner">
                    <img
                      src={val.image}
                      alt={`Avatar ${index}`}
                    />
                  </div>
                </label>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Avatars;
