/* eslint-disable guard-for-in */
/* eslint-disable no-constant-binary-expression */
/* eslint-disable valid-typeof */

// import { useAmisStore } from '../store/amis-store';

import { getAntDColorPalette } from './palette';

export function updateAmisTheme(themeColor: string) {
  const colorPalette = getAntDColorPalette(themeColor);
  colorPalette.reverse();
  const theme: { [key: string]: string } = {
    '--borderRadius': '4px',
    '--danger': '#ff4d4f',
    '--info': themeColor,
    '--info-onActive': themeColor,
    '--link-color': themeColor,
    '--primary': themeColor,
    '--success': '#52c41a',
    '--text-color': themeColor,
    '--warning': '#FAAD14'
  };
  let i = 0;
  while (i < 10) {
    theme[`--colors-brand-${i + 1}`] = colorPalette[i];
    i += 1;
  }
  // const theme = useAmisStore(state => state.customThemeVars);
  let varStyleTag = document.getElementById('customAmisThemeVarsId');
  if (!varStyleTag) {
    varStyleTag = document.createElement('style');
    varStyleTag.id = 'customAmisThemeVarsId';
    document.body.appendChild(varStyleTag);
  }

  const vars = [];
  for (const name in theme) {
    const value = theme[name as keyof typeof theme];
    if (typeof value !== undefined && value !== '') {
      vars.push(`${name}: ${value?.replace(/[;<>]*/g, '')};`);
    }
  }

  // bca-disable-line
  varStyleTag.innerHTML = `:root,.AMISCSSWrapper {
        ${[...vars].join('')}
    }`;
}
