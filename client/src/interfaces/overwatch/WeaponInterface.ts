interface AttackType {
    name: string,
    description: string
};

interface Weapon {
    icon: URL,
    primary_fire: AttackType,
    secondary_type: AttackType | null
};

export default Weapon