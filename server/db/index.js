const conn = require('./conn');
const models = require('./models');
const { Card, Player, Remote } = models;

Card.belongsTo(Player);
Player.hasMany(Card);
Remote.belongsTo(Player);
Player.belongsTo(Player);

// const shields = [];
//
// let i = 1;
// while (i < 16) {
//     shields.push(
//         Card.create({
//             type: 'treasure',
//             status: 'inactive',
//             name: 'Shield',
//             category: 'shields',
//             icon: `shield_${i}`,
//         })
//     );
//     i++;
// }

const syncAndSeed = () => {
    console.log('database syncing and seeding');
    return conn.sync({ force: true }).then(() => {
        const promises = [
            Player.create({
                name: 'Buckets',
                level: 1,
                speed: 2,
                hand: [],
            }),
            Player.create({
                name: 'Pockets',
                level: 1,
                speed: 2,
                hand: [],
            }),
            Player.create({
                name: 'Tonics',
                level: 1,
                speed: 2,
                hand: [],
            }),

            // races
            Card.create({
                type: 'door',
                name: 'Elf',
                category: 'race',
            }),
            Card.create({
                type: 'door',
                name: 'Dwarf',
                category: 'race',
            }),
            Card.create({
                type: 'door',
                name: 'Halfling',
                category: 'race',
            }),
            Card.create({
                type: 'door',
                name: 'Orc',
                category: 'race',
            }),

            // classes
            Card.create({
                type: 'door',
                name: 'Thief',
                category: 'class',
            }),
            Card.create({
                type: 'door',
                name: 'Wizard',
                category: 'class',
            }),
            Card.create({
                type: 'door',
                name: 'Warrior',
                category: 'class',
            }),
            Card.create({
                type: 'door',
                name: 'Cleric',
                category: 'class',
            }),

            // shields
            Card.create({ type: 'treasure', name: 'Shield', category: 'shields', bonus: 1, icon: 'shield_1' }),
            Card.create({ type: 'treasure', name: 'Shield', category: 'shields', bonus: 1, icon: 'shield_2' }),
            Card.create({ type: 'treasure', name: 'Shield', category: 'shields', bonus: 1, icon: 'shield_3' }),
            Card.create({ type: 'treasure', name: 'Shield', category: 'shields', bonus: 1, icon: 'shield_4' }),
            Card.create({ type: 'treasure', name: 'Shield', category: 'shields', bonus: 2, icon: 'shield_5' }),
            Card.create({ type: 'treasure', name: 'Shield', category: 'shields', bonus: 2, icon: 'shield_6' }),
            Card.create({ type: 'treasure', name: 'Shield', category: 'shields', bonus: 2, icon: 'shield_7' }),
            Card.create({ type: 'treasure', name: 'Shield', category: 'shields', bonus: 2, icon: 'shield_8' }),
            Card.create({ type: 'treasure', name: 'Shield', category: 'shields', bonus: 3, icon: 'shield_9' }),
            Card.create({ type: 'treasure', name: 'Shield', category: 'shields', bonus: 3, icon: 'shield_10' }),
            Card.create({ type: 'treasure', name: 'Shield', category: 'shields', bonus: 3, icon: 'shield_11' }),
            Card.create({ type: 'treasure', name: 'Shield', category: 'shields', bonus: 3, icon: 'shield_12' }),

            // boots
            Card.create({ type: 'treasure', name: 'Boots', category: 'boots', bonus: 1, icon: 'boots_1' }),
            Card.create({ type: 'treasure', name: 'Boots', category: 'boots', bonus: 1, icon: 'boots_2' }),
            Card.create({ type: 'treasure', name: 'Boots', category: 'boots', bonus: 1, icon: 'boots_3' }),
            Card.create({ type: 'treasure', name: 'Boots', category: 'boots', bonus: 1, icon: 'boots_4' }),
            Card.create({ type: 'treasure', name: 'Boots', category: 'boots', bonus: 2, icon: 'boots_5' }),
            Card.create({ type: 'treasure', name: 'Boots', category: 'boots', bonus: 2, icon: 'boots_6' }),
            Card.create({ type: 'treasure', name: 'Boots', category: 'boots', bonus: 2, icon: 'boots_7' }),
            Card.create({ type: 'treasure', name: 'Boots', category: 'boots', bonus: 2, icon: 'boots_8' }),
            Card.create({ type: 'treasure', name: 'Boots', category: 'boots', bonus: 3, icon: 'boots_9' }),
            Card.create({ type: 'treasure', name: 'Boots', category: 'boots', bonus: 3, icon: 'boots_10' }),
            Card.create({ type: 'treasure', name: 'Boots', category: 'boots', bonus: 3, icon: 'boots_11' }),
            Card.create({ type: 'treasure', name: 'Boots', category: 'boots', bonus: 3, icon: 'boots_12' }),

            // armor
            Card.create({ type: 'treasure', name: 'Armor', category: 'armor', bonus: 1, icon: 'armor_1' }),
            Card.create({ type: 'treasure', name: 'Armor', category: 'armor', bonus: 1, icon: 'armor_2' }),
            Card.create({ type: 'treasure', name: 'Armor', category: 'armor', bonus: 1, icon: 'armor_3' }),
            Card.create({ type: 'treasure', name: 'Armor', category: 'armor', bonus: 1, icon: 'armor_4' }),
            Card.create({ type: 'treasure', name: 'Armor', category: 'armor', bonus: 2, icon: 'armor_5' }),
            Card.create({ type: 'treasure', name: 'Armor', category: 'armor', bonus: 2, icon: 'armor_6' }),
            Card.create({ type: 'treasure', name: 'Armor', category: 'armor', bonus: 2, icon: 'armor_7' }),
            Card.create({ type: 'treasure', name: 'Armor', category: 'armor', bonus: 2, icon: 'armor_8' }),
            Card.create({ type: 'treasure', name: 'Armor', category: 'armor', bonus: 3, icon: 'armor_9' }),
            Card.create({ type: 'treasure', name: 'Armor', category: 'armor', bonus: 3, icon: 'armor_10' }),
            Card.create({ type: 'treasure', name: 'Armor', category: 'armor', bonus: 3, icon: 'armor_11' }),
            Card.create({ type: 'treasure', name: 'Armor', category: 'armor', bonus: 3, icon: 'armor_12' }),

            // headgear
            Card.create({ type: 'treasure', name: 'Helmet', category: 'helmets', bonus: 1, icon: 'helmet_1' }),
            Card.create({ type: 'treasure', name: 'Helmet', category: 'helmets', bonus: 1, icon: 'helmet_2' }),
            Card.create({ type: 'treasure', name: 'Helmet', category: 'helmets', bonus: 1, icon: 'helmet_3' }),
            Card.create({ type: 'treasure', name: 'Helmet', category: 'helmets', bonus: 1, icon: 'helmet_4' }),
            Card.create({ type: 'treasure', name: 'Helmet', category: 'helmets', bonus: 2, icon: 'helmet_5' }),
            Card.create({ type: 'treasure', name: 'Helmet', category: 'helmets', bonus: 2, icon: 'helmet_6' }),
            Card.create({ type: 'treasure', name: 'Helmet', category: 'helmets', bonus: 2, icon: 'helmet_7' }),
            Card.create({ type: 'treasure', name: 'Helmet', category: 'helmets', bonus: 2, icon: 'helmet_8' }),
            Card.create({ type: 'treasure', name: 'Helmet', category: 'helmets', bonus: 3, icon: 'helmet_9' }),
            Card.create({ type: 'treasure', name: 'Helmet', category: 'helmets', bonus: 3, icon: 'helmet_10' }),
            Card.create({ type: 'treasure', name: 'Helmet', category: 'helmets', bonus: 3, icon: 'helmet_11' }),
            Card.create({ type: 'treasure', name: 'Helmet', category: 'helmets', bonus: 3, icon: 'helmet_12' }),

            // swords
            Card.create({ type: 'treasure', name: 'Sword', category: 'sword', bonus: 1, icon: 'sword_01' }),
            Card.create({ type: 'treasure', name: 'Sword', category: 'sword', bonus: 1, icon: 'sword_02' }),
            Card.create({ type: 'treasure', name: 'Sword', category: 'sword', bonus: 1, icon: 'sword_03' }),
            Card.create({ type: 'treasure', name: 'Sword', category: 'sword', bonus: 1, icon: 'sword_04' }),
            Card.create({ type: 'treasure', name: 'Sword', category: 'sword', bonus: 2, icon: 'sword_05' }),
            Card.create({ type: 'treasure', name: 'Sword', category: 'sword', bonus: 2, icon: 'sword_06' }),
            Card.create({ type: 'treasure', name: 'Sword', category: 'sword', bonus: 2, icon: 'sword_07' }),
            Card.create({ type: 'treasure', name: 'Sword', category: 'sword', bonus: 2, icon: 'sword_08' }),
            Card.create({ type: 'treasure', name: 'Sword', category: 'sword', bonus: 3, icon: 'sword_09' }),
            Card.create({ type: 'treasure', name: 'Sword', category: 'sword', bonus: 3, icon: 'sword_10' }),
            Card.create({ type: 'treasure', name: 'Sword', category: 'sword', bonus: 3, icon: 'sword_11' }),
            Card.create({ type: 'treasure', name: 'Sword', category: 'sword', bonus: 3, icon: 'sword_12' }),

            // axes
            Card.create({ type: 'treasure', name: 'Axe', category: 'axe', bonus: 1, icon: 'axe_01' }),
            Card.create({ type: 'treasure', name: 'Axe', category: 'axe', bonus: 1, icon: 'axe_02' }),
            Card.create({ type: 'treasure', name: 'Axe', category: 'axe', bonus: 1, icon: 'axe_03' }),
            Card.create({ type: 'treasure', name: 'Axe', category: 'axe', bonus: 1, icon: 'axe_04' }),
            Card.create({ type: 'treasure', name: 'Axe', category: 'axe', bonus: 2, icon: 'axe_05' }),
            Card.create({ type: 'treasure', name: 'Axe', category: 'axe', bonus: 2, icon: 'axe_06' }),
            Card.create({ type: 'treasure', name: 'Axe', category: 'axe', bonus: 2, icon: 'axe_07' }),
            Card.create({ type: 'treasure', name: 'Axe', category: 'axe', bonus: 2, icon: 'axe_08' }),
            Card.create({ type: 'treasure', name: 'Axe', category: 'axe', bonus: 3, icon: 'axe_09' }),
            Card.create({ type: 'treasure', name: 'Axe', category: 'axe', bonus: 3, icon: 'axe_10' }),
            Card.create({ type: 'treasure', name: 'Axe', category: 'axe', bonus: 3, icon: 'axe_11' }),
            Card.create({ type: 'treasure', name: 'Axe', category: 'axe', bonus: 3, icon: 'axe_12' }),

            // creatures
            // Card.create({
            //     type: 'door',
            //     name: 'Ape',
            //     category: 'creature',
            // }),
            // Card.create({
            //     type: 'door',
            //     name: 'Bear',
            //     category: 'creature',
            // }),
            // Card.create({
            //     type: 'door',
            //     name: 'Cobra',
            //     category: 'creature',
            // }),
            // Card.create({
            //     type: 'door',
            //     name: 'Dragon',
            //     category: 'creature',
            // }),
            // Card.create({
            //     type: 'door',
            //     name: 'Eagle',
            //     category: 'creature',
            // }),
        ];
        return Promise.all(promises);
    });
};

module.exports = {
    models,
    syncAndSeed,
    conn,
};
