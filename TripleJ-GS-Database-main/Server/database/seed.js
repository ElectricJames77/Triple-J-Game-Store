const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const games = [
    {
      imageUrl: "https://images.igdb.com/igdb/image/upload/t_thumb/co7dqq.jpg",
      genres: "Shooter",
      title: "Blood Strike",
      price: 60.0,
      totalRating: 100.0,
      ratingsCount: 6,
      description:
        "Charge into fast paced combat in modes such as Battle Royale, Squad Fight or Hot Zone alone or with friends. Blood Strike offers a id range of playable Strikers, each with a unique active and passive ability letting you deploy drones, shield walls and everything in between. Customize your weapons to your liking and get ready to prove that you have what it takes to come out on top!",
    },
    {
      imageUrl: "https://images.igdb.com/igdb/image/upload/t_thumb/co83vd.jpg",
      genres: "RPG",
      title: "Paper Mario: The Thousand-Year Door",
      price: 40.0,
      totalRating: 99.89746505875442,
      ratingsCount: 7,
      description:
        "A remake of the second game in the Paper Mario series, originally released for the Nintendo GameCube.\n\nTurn the page and join Mario and friends in an RPG adventure to disimageUrl the legendary treasure behind the ancient Thousand-Year Door. Will Mario complete his papery quest, or will he crumple under the pressure?",
    },
    {
      imageUrl: "https://images.igdb.com/igdb/image/upload/t_thumb/co3yjh.jpg",
      genres: "Adventure",
      title: "Outer Wilds: Archaeologist Edition",
      price: 60.0,
      totalRating: 99.8273394234156,
      ratingsCount: 8,
      description:
        "Outer Wilds: Archaeologist Edition contains Outer Wilds base game and Echoes of the Eye expansion.",
    },
    {
      imageUrl: "https://images.igdb.com/igdb/image/upload/t_thumb/co2ata.jpg",
      genres: "visual_novel",
      title: "Adastra",
      price: 10.0,
      totalRating: 99.77044823003504,
      ratingsCount: 5,
      description:
        "After being kidnapped by a wolf-like alien, a man from Earth finds himself caught up in the messy political affairs of a race that has recently lost its emperor.",
    },
    {
      imageUrl: "https://images.igdb.com/igdb/image/upload/t_thumb/co7dw9.jpg",
      genres: "Adventure",
      title: "The Last of Us Part II: Remastered",
      price: 80.0,
      totalRating: 99.73033886498544,
      ratingsCount: 18,
      description:
        "Experience the winner of over 300 Game of the Year awards now with an array of technical enhancements that make The Last of Us Part Il Remastered the definitive way to play Ellie and Abby's critically acclaimed story.",
    },
    {
      imageUrl: "https://images.igdb.com/igdb/image/upload/t_thumb/co2b8f.jpg",
      genres: "RPG",
      title: "Golden Axe Warrior",
      price: 40.0,
      totalRating: 99.66478433230063,
      ratingsCount: 7,
      description:
        "World peace is at stake! Death Adder, a wicked giant, has stolen the nine crystals from the kingdom of Firewood and has iden them in nine labyrinths that he has created. These nine magic crystals protected the people from evil especially from Death Adder's grasp. But now that the crystals are lost, the world is defenseless!\n\nSomeone must put an end to the fiend's realm of darkness, death and destruction! Do you have what it takes to bring back peace and happiness? Trek through deep, dark forests and sail across vast, stormy seas. Chop down trees with your Battle Axe and move rocks with your magic spells to find secret caves. When you take on Death Adder's gruesome monsters, think only of winning – or else you won't find the nine crystals. And when you do, you'll find the Golden Axe – the only weapon that can crush Death Adder!",
    },
    {
      imageUrl: "https://images.igdb.com/igdb/image/upload/t_thumb/co4hkv.jpg",
      genres: "Sport",
      title: "MLB Power Pros 2008",
      price: 40.0,
      totalRating: 99.64064436183395,
      ratingsCount: 9,
      description:
        "MLB Power Pros is a different take on the MLB license. While the player has the ability to play as authentic players on actual MLB teams, the players are represented by anime characters, with large heads, feet and hands with no arms and legs. The game has been a mainstay in Japan for the last 15 years.\n\nPower Pros does feature options from other real-time games such as Season, Multiplayer and Exhibition modes, it also has a story based mode where the player can create their own character and play up to 20 years, doing activities such as earning the right to move from the minors to the majors, landing big contracts, as well as buying houses and cars, make friends on and off the field, as well as start hobbies and make donations to charities to draw attention to the player.\n\nIt also features a Dynasty mode where the player can run a MLB team, trading and releasing with a roster of 40 men and change formations on defense and offense as well as change a pitchers ball speed.",
    },
    {
      imageUrl: "https://images.igdb.com/igdb/image/upload/t_thumb/co8fui.jpg",
      genres: "RPG",
      title: "Polity",
      price: 10.0,
      totalRating: 99.62019730701101,
      ratingsCount: 9,
      description:
        "Polity is a casual cross-platform MMORPG set in a dynamic, player-driven world. Players have the opportunity to govern colonies, join other colonies, explore the world, uimageUrlthe lore or master diverse skills such as farming, forestry, fishing etc. With a id variety of features such as quests, achievements, puzzles, mini-games, and crafting, along with extensive customization options, Polity encourages players to forge their own path and create their own unique journey within its expansive virtual realm.",
    },
    {
      imageUrl: "https://images.igdb.com/igdb/image/upload/t_thumb/co1zdd.jpg",
      genres: "Platform",
      title: "Goblin Sword",
      price: 20.0,
      totalRating: 99.55708592307728,
      ratingsCount: 10,
      description:
        "Goblin Sword is a retro-inspired action platformer with light rpg elements.\n\nAn army of monsters led by an evil wizard have invaded your hometown. Slay as many monsters as you can, collect loot, aviddangerous traps and defeat menacing bosses, before facing the evil wizard himself.\n\nReviews:\n“It's such a crazy value and has such good production quality it kind of speaks for itself.” 5/5 TouchArcade\n\"Fun visuals, good music, engaging level design, and lots of content make Goblin Sword an excellent little game.\" Editor's Choice -148 Apps\n“A deeply compelling and staggeringly impressive tribute to retro games.” 10/10 ArcadeLife\n\nFeatures:\n-89 levels\n-13 bosses\n-30 weapons with unique special attacks\n-30 relics that grant you abilities\n-14 costumes\n-8 guardians that follow you around and assist you\n-5 secret very hard levels\n-Decorate your home with souvenirs\n-Customizable touch controls\n-Universal app. Works on iPad, iPhone and iPod touch.\n-iCloud and MFi support\n-Game Center achievements and leaderboards\n-Premium game. No IAP or ads ever.",
    },
    {
      imageUrl: "https://images.igdb.com/igdb/image/upload/t_thumb/co45jf.jpg",
      genres: "Adventure",
      title: "Metal Gear Solid The Legacy Collection",
      price: 70.0,
      totalRating: 99.54698841155705,
      ratingsCount: 38,
      description:
        "Metal Gear Solid The Legacy Collection is a ido game compilation released exclusively for the PlayStation 3. It includes all the mainline Metal Gear games directed and designed by ido Kojima (including the VR Missions standalone expansion) that were released from 1987 through 2012. Bonus content include motion comic adaptations of the Metal Gear Soidgraphic novels by Kris Oprisko and Ashley Wood and a 100-page booklet that catalogs numerous promotional posters, brochures and advertisement related to the games in the compilation.",
    },
    {
      imageUrl: "https://images.igdb.com/igdb/image/upload/t_thumb/co23df.jpg",
      genres: "Fighting",
      title: "Elysian Odyssey",
      price: 49.99,
      totalRating: 87.23145,
      ratingsCount: 1248,
      description:
        "Elysian Odyssey is a sprawling action RPG set in a vibrant fantasy world. Explore forgotten ruins, battle fearsome foes, and uncover the secrets of a lost civilization. With a deep character customization system and a branching storyline, Elysian Odyssey offers a unique adventure for every player.",
    },
  ];
  for (const game of games) {
    const existingGame = await prisma.game.findFirst({
      where: {
        title: game.title,
      },
    });
    if (!existingGame) {
      await prisma.game.create({
        data: {
          title: game.title,
          price: game.price,
          description: game.description,
          imageUrl: game.imageUrl,
          genre: game.genres,
          totalRating: game.totalRating,
          ratingsCount: game.ratingsCount,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
