import React from "react";
import { Button } from "./ui/button";
import { Save, Share2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCurrentLanguage,
} from "../../../services/redux/compilerSlice";

function CodeHelperEditor() {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state) => state.compilerSlice.currentLanguage
  );

  return (
    <div className="__helper_header h-[50px] bg-black text-white p-2 flex items-center justify-between ">
      <div className="flex gap-2 __btn_container">
        <Button
          className="flex items-center justify-center gap-2"
          variant="success"
        >
          <Save size={20} />
          Save
        </Button>
        <Button
          className="flex items-center justify-center gap-2"
          variant="secondary"
        >
          <Share2 size={20} />
          Share
        </Button>
      </div>
      <div className="__tab_switcher">
        <Select
          defaultValue={currentLanguage}
          onValueChange={(value) =>
            dispatch(updateCurrentLanguage(value))
          }
        >
          <SelectTrigger className="w-[180px] bg-black outline-none ">
            <SelectValue defaultValue="html" placeholder="HTML" />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default CodeHelperEditor;
