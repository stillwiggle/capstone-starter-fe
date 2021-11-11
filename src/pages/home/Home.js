import Header from "../../components/header/Header";
import Slideshow from "../../components/slideshow/Slideshow";
import GridCards from "../../components/gridcards/GridCards";

function Home(props) {
  return (
    <div className="Home">
        <Header/>
        <Slideshow/>
        <GridCards/>
    </div>
  );
}

export default Home;
