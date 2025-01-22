import "./App.css";
import Grid from "./grid/grid";

function App() {
    return (
        <div className="w-screen h-screen bg-[#1f1f1f] flex justify-center items-center">
            <Grid rows={15} cols={20} defaultColor="#000" />
        </div>
    );
}

export default App;
