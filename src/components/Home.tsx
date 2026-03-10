import Hero from "./Hero";
import ProjectSummary from "./ProjectSummary";
import FitrahDefinition from "./FitrahDefinition";
import Vision from "./Vision";
import MissionVision from "./MissionVision";
import Goals from "./Goals";
import Lifestyle from "./Lifestyle";
import Education from "./Education";
import Family from "./Family";
import AmbassadorIntro from "./AmbassadorIntro";
import Ambassadors from "./Ambassadors";
import AmbassadorTasks from "./AmbassadorTasks";
import ProgramComponents from "./ProgramComponents";

const Home = () => {
    return (
        <>
            <Hero />
            <ProjectSummary />
            <FitrahDefinition />
            <Vision />
            <MissionVision />
            <Education />
            <Family />
            <Lifestyle />
            <Goals />
            <ProgramComponents />
            <AmbassadorIntro />
            <AmbassadorTasks />
            <Ambassadors />
        </>
    );
};

export default Home;
