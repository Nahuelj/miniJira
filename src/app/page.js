import KanbanBoard from "./components/KanbanBoard";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <>
      <div className="flex">
        <Nav />
        <KanbanBoard />
      </div>
    </>
  );
}
