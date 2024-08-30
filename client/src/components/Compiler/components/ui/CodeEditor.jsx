import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useSelector, useDispatch } from "react-redux";
import { updateCodeValue } from "../../../../services/redux/compilerSlice";

function CodeEditor() {
  const currentLanguage = useSelector(
    (state) => state.compilerSlice.currentLanguage
  );
  const fullCode = useSelector(
    (state) => state.compilerSlice.fullCode
  );

  const dispatch = useDispatch();

  const onChange = React.useCallback((value) => {
    dispatch(updateCodeValue(value));
  }, [dispatch]);

  return (
    <CodeMirror
      theme={dracula}
      value={fullCode[currentLanguage]}
      height="calc(100vh - 60px - 50px)"
      extensions={[loadLanguage(currentLanguage)]}
      onChange={onChange}
    />
  );
}

export default CodeEditor;
