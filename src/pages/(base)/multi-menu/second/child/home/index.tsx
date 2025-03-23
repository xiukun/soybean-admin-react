import { AmisRenderer } from '@sa/amis-renderer';

import schemaData from './schema.json';

const SecondChild = () => {
  return <AmisRenderer schema={schemaData} />;
};

export default SecondChild;
