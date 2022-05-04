import Weapon from './WeaponInterface';
import Ability from './AbilityInterface';
import HeroStory from './HeroStoryInterface';
import HeroMedia from './HeroMediaInterface';

interface Hero {
    name: string,
    role: string,
    difficulty: number,
    description?: string,
    portrait?: URL,
    key?: string,
    weapons?: Weapon[],
    abilities?: Ability[],
    story?: HeroStory,
    medias?: HeroMedia[]
};

export default Hero;