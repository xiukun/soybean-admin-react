import { AmisRenderer } from '@sa/amis-renderer';

import schemaData from './schema.json';

const FirstChild = () => {
  return <AmisRenderer schema={schemaData} />;
};

export default FirstChild;
