import { AmisRenderer } from '@sa/amis-renderer';
import { memo, useEffect, useState } from 'react';

import { ThemeContext } from '@/features/theme/themeContext';
import { amisApi } from '@/service/api/amis.api';

const AmisTemplatePage = () => {
  const { themeScheme } = useContext(ThemeContext);
  const [schemaData, setSchemaData] = useState(null);
  const [theme, setTheme] = useState(themeScheme === 'dark' ? 'dark' : 'antd');

  useEffect(() => {
    const fetchSchema = async () => {
      const data = await amisApi.fetchGetAmisBigScreenSchema();
      setSchemaData(data as any);
    };
    fetchSchema();
  }, []);

  useEffect(() => {
    setTheme(themeScheme === 'dark' ? 'dark' : 'antd');
  }, [themeScheme]);

  if (!schemaData) return null;

  return (
    <AmisRenderer
      props={{ theme }}
      schema={schemaData}
    />
  );
};

export default memo(AmisTemplatePage);
