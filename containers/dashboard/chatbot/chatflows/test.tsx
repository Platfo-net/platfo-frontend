import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Canvas } from "reaflow";
import actionTypes from "stores/actionTypes";

type TestProps = {};

const Test: React.FC<TestProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: actionTypes.ACCOUNT_LIST,
      layout: "sfsf",
    });
  }, []);

  return (
    <div>
      {/*      <Canvas
        direction="LEFT"
        nodes={[
          {
            id: "1",
            text: "1",
          },
          {
            id: "2",
            text: "2",
          },
        ]}
        edges={[
          {
            id: "1-2",
            from: "1",
            to: "2",
          },
        ]}
      /> */}
    </div>
  );
};

export default Test;
