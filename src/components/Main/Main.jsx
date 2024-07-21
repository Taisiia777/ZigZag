import Clan from "./Clan";
import Clicker from "./Clicker";
import Header from "./Header";
import NavButtons from './NavButtons';

const Main = ({ clan, setClan, colorsBefore }) => {
    return (
        <>
            <Header />
            <Clan clan={clan} setClan={setClan} />
            <Clicker colorsBefore={colorsBefore} />
            <NavButtons />
        </>
    )
};

export default Main;