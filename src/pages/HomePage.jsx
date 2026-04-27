import { HomeHeroSection } from '../components/sections/home/HomeHeroSection'
import { HomeIntroSection } from '../components/sections/home/HomeIntroSection'
import { HomeKeywordSection } from '../components/sections/home/HomeKeywordSection'
import { HomeWorksSection } from '../components/sections/home/HomeWorksSection'
import { HomeProjectsSection } from '../components/sections/home/HomeProjectsSection'
import { HomeStrengthSection } from '../components/sections/home/HomeStrengthSection'

function HomePage() {
    return (
        <div>
            <HomeHeroSection />
            <HomeIntroSection />
            <HomeKeywordSection />
            <HomeWorksSection />
            <div className="mt-[216px]">
                <HomeProjectsSection />
            </div>
            <HomeStrengthSection />
        </div>
    );
}

export default HomePage;
