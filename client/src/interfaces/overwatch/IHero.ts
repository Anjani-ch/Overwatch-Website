import IWeapon from './IWeapon'
import IAbility from './IAbility'

interface IHeroStory {
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

interface IHeroMedia {
    title: string,
    type: string,
    thumbnail: URL,
    link: URL
}

interface IHero {
    name: string,
    role: string,
    difficulty: number,
    description?: string,
    portrait?: URL,
    key?: string,
    weapons?: IWeapon[],
    abilities?: IAbility[],
    story?: IHeroStory,
    medias?: IHeroMedia[]
}

export default IHero