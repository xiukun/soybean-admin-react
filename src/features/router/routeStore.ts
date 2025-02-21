import type { PayloadAction } from '@reduxjs/toolkit';

import { initCacheRoutes } from '@/router';

import { createAppSlice } from '../../store/createAppSlice';

interface InitialStateType {
  cacheRoutes: string[];
  removeCacheKey: string | null;
  routeHomePath: string;
}

const initialState: InitialStateType = {
  /** - 需要进行缓存的页面 */
  cacheRoutes: initCacheRoutes,
  /** - 需要删除的缓存页面 */
  removeCacheKey: null,
  /** - 首页路由 */
  routeHomePath: import.meta.env.VITE_ROUTE_HOME
};

export const routeSlice = createAppSlice({
  initialState,
  name: 'route',
  reducers: create => ({
    addCacheRoutes: create.reducer((state, { payload }: PayloadAction<string>) => {
      state.cacheRoutes.push(payload);
    }),
    resetRouteStore: create.reducer(() => initialState),
    setCacheRoutes: create.reducer((state, { payload }: PayloadAction<string[]>) => {
      state.cacheRoutes = payload;
    }),
    setRemoveCacheKey: create.reducer((state, { payload }: PayloadAction<string | null>) => {
      state.removeCacheKey = payload;
    })
  }),
  selectors: {
    selectCacheRoutes: route => route.cacheRoutes,
    selectRemoveCacheKey: route => route.removeCacheKey,
    selectRouteHomePath: route => route.routeHomePath
  }
});

export const { addCacheRoutes, resetRouteStore, setCacheRoutes, setRemoveCacheKey } = routeSlice.actions;

export const { selectCacheRoutes, selectRemoveCacheKey, selectRouteHomePath } = routeSlice.selectors;
