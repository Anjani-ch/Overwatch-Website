import Weapon from './WeaponInterface'
import Ability from './AbilityInterface'

interface HeroStory {
    biography: {
        real_name: string,
        age: number,
        occupation: string,
        base_of_operations: string,
        affiliation: string
    },
    catch_phrase: string,
    back_story: string
}

interface HeroMedia {
    title: string,
    type: string,
    thumbnail: URL,
    link: URL
}

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
}

export default Hero