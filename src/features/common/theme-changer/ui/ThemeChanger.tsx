import React from 'react';
import { useDispatch } from 'react-redux';
import SwitchMelon from 'shared/ui/SwitchMelon/SwitchMelon';
import { enableDarkTheme, disableDarkTheme } from '../model/theme';

const ThemeChanger = () => {
  const dispatch = useDispatch();
  const onChange = (checked: boolean) => {
    if (checked) {
      localStorage.setItem('darkThemeEnabled', 'true');
      dispatch(enableDarkTheme());
    } else {
      localStorage.removeItem('darkThemeEnabled');
      dispatch(disableDarkTheme());
    }
    window.location.reload();
  };
  return (
    <SwitchMelon
      onChange={onChange}
      defaultChecked={!!localStorage.getItem('darkThemeEnabled')}
      unCheckedChildren="☀️"
      checkedChildren="🌑"
    />
  );
};

export default ThemeChanger;
