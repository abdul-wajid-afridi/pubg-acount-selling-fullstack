import { configureStore } from "@reduxjs/toolkit";
import CommentsSlice from "./Features/CommentsSlice";
import IdeDetailsSlice from "./Features/IdeDetailsSlice";
import LikesHeartsSlice from "./Features/LikesHeartsSlice";
import UserSlice from "./Features/UserSlice";

const Store = configureStore({
  reducer: {
    IdDetails: IdeDetailsSlice,
    UserSlice: UserSlice,
    CommentsSlice: CommentsSlice,
    LikesHearts: LikesHeartsSlice,
  },
});

export default Store;
