export function toggleThemeMode(mode: 'dark' | 'light') {
  // 启用/禁用 amis css主题 并刷新amis页面才能正常显示主题
  // const val = mode ? 'dark' : 'light';
  [].slice.call(document.querySelectorAll('link[title]')).forEach((item: any) => {
    const theme = item.getAttribute('title');
    item.disabled = theme !== mode;
  });
  switch (mode) {
    case 'light':
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      document.body.classList.add('antd');
      document.body.setAttribute('data-theme', mode);
      break;
    case 'dark':
      document.body.setAttribute('data-theme', mode);
      document.documentElement.classList.add('dark');
      document.body.classList.remove('antd');
      document.body.classList.add('dark');
      break;
    default:
      // eslint-disable-next-line no-console
      console.warn(`Unknown theme: ${val}`);
  }
}
