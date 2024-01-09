"use client"
import Trash from "../icons/Trash";
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'

const ColumnaContainer = (props) => {
  const { column,deleteColumn } = props;
  const {setNodeRef,attributes,listeners,transform,transition,isDragging}=useSortable({
    id:column.id,
    data:{
        type:"Column",
        column,
    }
  })

  const style={
    transition,
    transform:CSS.Transform.toString(transform)
  }

  if(isDragging){
      return <div ref={setNodeRef} style={style} className="w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col bg-slate-700 opacity-40 border-rose-500 border-4"> </div>
}





  return (
    <div ref={setNodeRef} style={style} className="w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col bg-slate-700 ">
      <div className="flex   ">
        <div className="text-md  w-full flex h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-4 bg-slate-200">
          <div>
            <p>0</p>
          </div>
          <div {...attributes} {...listeners} className="flex justify-center w-full">
            <h2 className="text-center ">{column.title}</h2>
          </div>

          <div>
            <button onClick={() => deleteColumn(column.id)}>
              <Trash />
            </button>
          </div>
        </div>
      </div>

      <div className="flex text-white flex-grow">Content</div>

      <div className="text-white">Footer</div>
    </div>
  );
};

export default ColumnaContainer;
