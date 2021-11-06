import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import reducer from "./store";
import { getLiveEvents } from "./store/liveEventsSlice";

function LiveEvents(props) {
  const dispatch = useDispatch();
  const pageLayout = useRef(null);
  const routeParams = useParams();

  useEffect(() => {
    dispatch(getLiveEvents(routeParams));
  }, [dispatch, routeParams]);

  return (
    <FusePageCarded
      classes={{
        root: "w-full",
        content: "flex flex-col",
        header: "items-center min-h-72 h-72 sm:h-136 sm:min-h-136",
      }}
      header={<div>Header</div>}
      contentToolbar={<div>Content toolbar</div>}
      content={<div>Content</div>}
      leftSidebarHeader={<div>Side bar header</div>}
      leftSidebarContent={<div>Side bar content</div>}
      ref={pageLayout}
      innerScroll
    />
  );
}

export default withReducer("LiveEvents", reducer)(LiveEvents);
