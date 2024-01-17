import KanbanBoard from "./components/KanbanBoard";
import Nav from "./components/Nav";
import { NavBarSup } from "@/app/components/NavBarSup";

export default function Home() {
  return (
    <div className="flex">
      <NavBarSup />
      {/* <Nav /> */}
    </div>
  );
}
