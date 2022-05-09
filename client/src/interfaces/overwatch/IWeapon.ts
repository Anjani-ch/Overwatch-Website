interface IAttackType {
    name: string,
    description: string
};

interface IWeapon {
    icon: URL,
    primary_fire: IAttackType,
    secondary_type: IAttackType | null
};

export default IWeapon