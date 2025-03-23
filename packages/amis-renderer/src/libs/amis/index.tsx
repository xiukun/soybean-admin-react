import { render } from 'amis';

import defaultEnv from '../utils/env';
// import { useLocation, useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/display-name
const AmisRenderer = ({ env, locals, props, schema }: any) => {
  // const navigate = useNavigate();
  // const location = useLocation();

  return (
    <div
      id="mickey_amis_root_id"
      style={{ position: 'relative' }}
    >
      {render(
        schema,
        {
          theme: 'antd',
          ...props,
          data: {
            ...locals
          }
        },
        { ...defaultEnv, ...env } as any
      )}
    </div>
  );
};
export { AmisRenderer };
export default AmisRenderer;
