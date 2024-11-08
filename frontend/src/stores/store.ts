import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import beach_authoritiesSlice from './beach_authorities/beach_authoritiesSlice';
import beachesSlice from './beaches/beachesSlice';
import notificationsSlice from './notifications/notificationsSlice';
import reviewsSlice from './reviews/reviewsSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';
import beach_authoritySlice from './beach_authority/beach_authoritySlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    beach_authorities: beach_authoritiesSlice,
    beaches: beachesSlice,
    notifications: notificationsSlice,
    reviews: reviewsSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
    beach_authority: beach_authoritySlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
