import { AmisRenderer } from '@sa/amis-renderer';

import schemaData from './schema.json';

const FirstChild = () => {
  // const env = {
  //   notify: (type, message) => {
  //     window.$message?.[type](message,3000,);
  //   },
  // }
  return <AmisRenderer schema={schemaData} />;
};

export default FirstChild;
