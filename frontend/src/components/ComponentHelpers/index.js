import { actionGenerator, searchReducer } from "./search-helpers";
import { serialize, deserialize } from "./html-serializers";

export const helpers = { searchReducer, actionGenerator, serialize, deserialize }
