/* ===============================================================
   TILT — deck content
   Card format:  "Answer"   or   "Answer|banned,banned,banned"
   lang: 'en' shown by default, 'et' hidden unless Estonian is on.
   Edit freely — the game reads this file at load.
=============================================================== */
const DECKS = [

{id:'movies',n:'Movies',e:'🎬',c:'#E23E57',lang:'en',k:[
 'Titanic|ship,iceberg,Jack','Jurassic Park','Frozen','Jaws','Rocky','Shrek','Avatar','The Matrix',
 'Home Alone','Forrest Gump','Toy Story','The Godfather','Star Wars','Terminator','Mamma Mia',
 'Gladiator','Finding Nemo','Ghostbusters','Pulp Fiction','Inception','Barbie','Dune','Fight Club',
 'Notting Hill','Jumanji','The Lion King','Back to the Future','Grease','Alien','The Hangover',
 'Mission Impossible','Cast Away','Interstellar','Wizard of Oz','Rush Hour']},

{id:'music',n:'Music',e:'🎵',c:'#7B4BC9',lang:'en',k:[
 'Air guitar','Vinyl record','Karaoke|sing,microphone,song','Drum solo','Opera singer','Choir',
 'Eurovision','Bass drop','Ukulele','Headphones','Music festival','Earworm','National anthem',
 'Boy band','Beatles','Elvis','Mozart','Rap battle','Playlist','Bagpipes','Encore','Backing dancer',
 'Cover version','Lip sync','Busker','Guitar pick','Concert tickets','Sound check','One-hit wonder',
 'Whistling','Humming','Radio hit']},

{id:'tv',n:'TV shows',e:'📺',c:'#2E86DE',lang:'en',k:[
 'Friends','The Office','Game of Thrones','Stranger Things','Breaking Bad','The Simpsons','Sherlock',
 'Squid Game','Black Mirror','Bake Off','Big Brother','Soap opera','Sitcom','Reality show',
 'News anchor','Documentary','Cliffhanger','Binge watching','Spoiler','Season finale','Laugh track',
 'Talk show','Weather forecast','Cooking show','Quiz show','Nature documentary','Crime drama',
 'Streaming','Remote control','Next episode']},

{id:'games',n:'Video games',e:'🎮',c:'#16A085',lang:'en',k:[
 'Tetris','Minecraft','Pac-Man','Mario','Fortnite','Among Us','Candy Crush','The Sims','Angry Birds',
 'Speedrun','Boss fight','Respawn','Loading screen','Joystick','Arcade','Pixel art','Lag',
 'Cheat code','Game over','Controller','High score','Multiplayer','Console','Save point','Power-up',
 'Final level','Rage quit','Tutorial','Leaderboard','Virtual reality']},

{id:'animals',n:'Animals',e:'🐼',c:'#E67E22',lang:'en',k:[
 'Elephant|grey,trunk,Africa','Penguin','Octopus','Sloth','Hedgehog','Giraffe','Bat','Crocodile',
 'Squirrel','Owl','Jellyfish','Kangaroo','Chameleon','Woodpecker','Hamster','Seagull','Moose','Lynx',
 'Wolf','Bumblebee','Snail','Flamingo','Otter','Peacock','Camel','Rhino','Panda','Raccoon','Donkey',
 'Goat','Parrot','Tortoise','Mole','Swan']},

{id:'sealife',n:'Under the sea',e:'🐙',c:'#0A7EA4',lang:'en',k:[
 'Shark','Dolphin','Coral reef','Seahorse','Starfish','Whale','Crab','Lobster','Pearl','Shipwreck',
 'Scuba diving','Snorkel','Tide pool','Seaweed','Anchor','Lighthouse','Fishing net','Message in a bottle',
 'Sea turtle','Wave','Submarine','Pirate treasure','Sandcastle','Buoy']},

{id:'food',n:'Food',e:'🍕',c:'#D63447',lang:'en',k:[
 'Pizza|cheese,Italy,slice','Sushi','Pancake','Garlic','Popcorn','Spaghetti','Pickle','Chilli pepper',
 'Croissant','Kebab','Porridge','Mustard','Olive','Burnt toast','Soup','Chewing gum','Sandwich',
 'Blue cheese','Leftovers','Bacon','Omelette','Rice','Noodles','Burger','Salad','Meatballs','Sausage',
 'Butter','Bread crust','Ketchup','Curry','Taco','Dumpling','Peanut butter']},

{id:'drinks',n:'Drinks',e:'🥤',c:'#0E7C7B',lang:'en',k:[
 'Coffee|drink,morning,caffeine','Green tea','Lemonade','Milkshake','Hot chocolate','Smoothie',
 'Sparkling water','Orange juice','Beer','Champagne','Cocktail','Mulled wine','Iced coffee',
 'Energy drink','Tap water','Straw','Ice cubes','Coconut water','Kefir','Cider','Espresso shot',
 'Bubble tea','Toast to the bride','Last call','Refill','Thermos']},

{id:'desserts',n:'Sweets',e:'🍰',c:'#E84393',lang:'en',k:[
 'Ice cream','Doughnut','Cheesecake','Marshmallow','Candy floss','Chocolate bar','Waffle','Brownie',
 'Apple pie','Jelly','Liquorice','Cupcake','Whipped cream','Sprinkles','Toffee','Macaron','Honey',
 'Sugar rush','Melting ice cream','Birthday candles','Chocolate fountain','Gingerbread man',
 'Sticky fingers','Ice cream truck']},

{id:'fruitveg',n:'Fruit & veg',e:'🥕',c:'#4E9F3D',lang:'en',k:[
 'Watermelon','Pineapple','Avocado','Broccoli','Mushroom','Cucumber','Banana','Onion|cry,layers,smell',
 'Corn on the cob','Beetroot','Cabbage','Pumpkin','Strawberry','Kiwi','Lemon','Potato','Carrot',
 'Tomato','Grapes','Cherry','Aubergine','Pea pod','Radish','Coconut','Fig','Rhubarb','Sauerkraut']},

{id:'cooking',n:'In the kitchen',e:'👨‍🍳',c:'#B85C38',lang:'en',k:[
 'Whisk','Colander','Garlic press','Corkscrew','Cling film','Chopping board','Kettle','Microwave',
 'Bread knife','Rolling pin','Frying pan','Oven mitt','Grater','Peeler','Measuring jug','Blender',
 'Recipe','Boiling over','Burnt dinner','Smoke alarm','Washing up','Tupperware','Apron','Timer',
 'Taste test','Leftover fridge']},

{id:'house',n:'Around the house',e:'🏠',c:'#0FA3B1',lang:'en',k:[
 'Vacuum cleaner','Doormat','Radiator','Fridge magnet','Ironing board','Shower curtain','Light switch',
 'Laundry basket','Bookshelf','Doorbell','Mousetrap','Broom','Candle','Mirror','Keyhole','Ladder',
 'Toolbox','Duct tape','Extension cord','Curtain rail','Draught','Squeaky floorboard','Sofa',
 'Wardrobe','Bathtub','Balcony','Attic','Spare room','Blocked drain','Doorbell camera']},

{id:'tools',n:'Tools & DIY',e:'🔧',c:'#7F6A00',lang:'en',k:[
 'Hammer','Screwdriver','Spirit level','Power drill','Sandpaper','Paint roller','Tape measure',
 'Wrench','Nail','Saw','Wallpaper','Cement','Wheelbarrow','Stepladder','Safety goggles','Workbench',
 'Splinter','Instruction manual','Missing screw','Flat-pack furniture','Hardware shop','Plunger',
 'Toolbelt','Chisel']},

{id:'jobs',n:'Jobs',e:'💼',c:'#5D8233',lang:'en',k:[
 'Plumber|pipe,water,toilet','Air traffic controller','Sommelier','Bouncer','Roadie','Undertaker',
 'Beekeeper|bee,honey,sting','Chimney sweep','Referee','Lighthouse keeper','Crash test dummy',
 'Dog groomer','Auctioneer','Tattoo artist','Window cleaner','Postman','Firefighter','Barista',
 'Bus driver','Nurse','Farmer','Translator','Lifeguard','Architect','Vet','Butcher','Electrician',
 'Flight attendant','Detective','Hairdresser','Ski instructor','Night watchman']},

{id:'office',n:'Office life',e:'🖇️',c:'#3D5A80',lang:'en',k:[
 'Monday morning','Coffee machine','Printer jam','Meeting that could be an email','Spreadsheet',
 'Deadline','Whiteboard','Office chair','Sticky note','Team building','Performance review',
 'Out of office','Open plan','Stapler','Lift small talk','Fire drill','Desk plant','Video call',
 'Mute button','Someone eating fish','Overtime','Payday','Two weeks notice','Lunch break']},

{id:'money',n:'Money',e:'💰',c:'#B7791F',lang:'en',k:[
 'Piggy bank','Loose change','Bank card','Cash machine','Receipt','Tip jar','Bargain','Black Friday',
 'Rent day','Refund','Insurance','Mortgage','Splitting the bill','Contactless','Wallet','Coupon',
 'Second-hand','Auction','Savings','Overdraft','Price tag','Lottery ticket','Piggy bank raid','Budget']},

{id:'companies',n:'Companies & services',e:'🏢',c:'#2C3E7A',lang:'en',k:[
 'Google','Amazon','Netflix','Spotify','YouTube','Uber','Airbnb','Instagram','TikTok','WhatsApp',
 'PayPal','Wikipedia','LinkedIn','Zoom','Wolt','Bolt','Revolut','Dropbox','eBay','Etsy','Reddit',
 'Duolingo','Pinterest','Booking site','Food delivery','Ride share','Streaming service',
 'Cloud storage','Dating app','Online bank']},

{id:'brands',n:'Brands',e:'🏷️',c:'#F0932B',lang:'en',k:[
 'Ikea','Lego','Nike','Tesla','Apple','Adidas','Sony','Toyota','Ferrari','Nokia','Samsung','Lidl',
 'Coca-Cola','Pepsi','Nutella','Heinz','Rolex','Gucci','Dyson','Bosch','Volvo','Harley-Davidson',
 'Converse','Gore-Tex','Duracell','Post-it','Velcro','Thermos','Swiss Army knife','Lego brick']},

{id:'tech',n:'Technology',e:'💻',c:'#4834D4',lang:'en',k:[
 'Wi-Fi','Password','Firewall','Bluetooth','Screenshot','The cloud','Software bug','Robot','Drone',
 'Emoji','Spam','Blue screen','Charger','Algorithm','Selfie','QR code','Software update',
 'Airplane mode','Autocorrect','Two-factor code','Group chat','Dark mode','Low battery','Dead pixel',
 'Voice assistant','Smart watch','Cookies banner','Buffering','Terms and conditions','Restart it']},

{id:'sports',n:'Sports',e:'⚽',c:'#2D9E5F',lang:'en',k:[
 'Marathon','Ski jump','Curling','Boxing','Yoga','Surfing','Darts','Fencing','Bowling','Ice hockey',
 'Basketball','Tennis','Rowing','Climbing','Penalty kick','Slam dunk','Own goal','Hat-trick',
 'Photo finish','Sumo','Half-time','Podium','Warm-up','Sudden death','Cycling','Golf','Volleyball',
 'Gymnastics','Relay race','Cross-country skiing','Referee whistle','Team huddle']},

{id:'countries',n:'Countries',e:'🌍',c:'#8E44AD',lang:'en',k:[
 'Japan','Brazil','Egypt','Estonia','Finland','Italy','Iceland','Mexico','India','Australia','Canada',
 'Greece','Norway','Kenya','Peru','Netherlands','Switzerland','Turkey','Spain','Portugal','Ireland',
 'Vietnam','Morocco','Argentina','Sweden','Poland','Thailand','South Korea']},

{id:'cities',n:'Cities',e:'🏙️',c:'#1E5F9E',lang:'en',k:[
 'Paris','Tokyo','New York','Venice','Berlin','Rome','Istanbul','Rio de Janeiro','Amsterdam','Cairo',
 'Barcelona','Moscow','Sydney','Dubai','Helsinki','Tallinn','Riga','Prague','Vienna','Las Vegas',
 'Hong Kong','Reykjavik','Lisbon','San Francisco','Bangkok','Marrakesh']},

{id:'landmarks',n:'World landmarks',e:'🗼',c:'#3867D6',lang:'en',k:[
 'Eiffel Tower','Big Ben','Pyramids','Colosseum','Great Wall','Taj Mahal','Statue of Liberty',
 'Stonehenge','Niagara Falls','Grand Canyon','Sydney Opera House','Mount Everest','Leaning Tower',
 'Machu Picchu','Times Square','Northern lights','Sahara','Amazon river','Venice canals',
 'Golden Gate Bridge','Mount Fuji','Dead Sea','Angkor Wat','Christ the Redeemer']},

{id:'travel',n:'Travel',e:'✈️',c:'#EB3B5A',lang:'en',k:[
 'Passport','Suitcase','Boarding pass','Jet lag','Hostel','Souvenir','Sunburn','Airport security',
 'Duty free','Delayed flight','Currency exchange','Backpacking','Cruise ship','Road trip','Camping',
 'Hotel breakfast','Lost luggage','Tourist trap','Postcard','Middle seat','Overhead locker',
 'Sightseeing bus','Guidebook','Border queue','Airport taxi','Travel pillow','Turbulence','Check-in']},

{id:'cars',n:'Cars & driving',e:'🚗',c:'#C0392B',lang:'en',k:[
 'Steering wheel','Traffic jam','Parking ticket','Roundabout','Windscreen','Petrol station',
 'Rear-view mirror','Speed camera','Tow truck','Hitchhiking','Convertible','Flat tyre','Seatbelt',
 'Car wash','Test drive','Winter tyres','Motorway','Reverse parking','Number plate','Electric car',
 'Road rage','Sat nav','Driving lesson','Toll booth','Jump start','Rally driver','School run',
 'Handbrake']},

{id:'space',n:'Space',e:'🚀',c:'#5F27CD',lang:'en',k:[
 'Astronaut','Black hole','Saturn','Moon landing','Rocket','Meteor','Space station','Alien',
 'Telescope','Solar eclipse','Mars rover','Comet','Milky Way','Satellite','Spacesuit','Zero gravity',
 'Constellation','Launch pad','Countdown','Space junk','Shooting star','Orbit','Mission control',
 'Asteroid belt']},

{id:'science',n:'Science',e:'🔬',c:'#1ABC9C',lang:'en',k:[
 'Magnet','Volcano','Photosynthesis','DNA','Microscope','Lightning','Evaporation','Periodic table',
 'Laboratory','Vaccine','Electricity','Fossil','Radioactive','Battery','Prism','Bacteria',
 'Experiment','Formula','Gravity|down,falling,Newton','Test tube','Hypothesis','Static electricity',
 'Magnifying glass','Solar panel','Chain reaction','Boiling point','X-ray','Compass needle']},

{id:'nature',n:'Nature',e:'🌲',c:'#218C74',lang:'en',k:[
 'Waterfall','Thunderstorm','Mushroom picking','Moss','Glacier','Swamp','Desert','Forest fire','Tide',
 'Cave','Fog','Avalanche','Bog','Sunrise','Pine cone','Anthill','Beaver dam','Frost','Berry picking',
 'Dew','Quicksand','Tree stump','Bird migration','Autumn leaves','Spider web','Rock pool','Wildflower',
 'Echo']},

{id:'weather',n:'Weather',e:'☔',c:'#2980B9',lang:'en',k:[
 'Hailstorm','Heatwave','Drizzle','Blizzard','Rainbow','Puddle','Umbrella turned inside out',
 'Black ice','Humidity','Wind chill','Thunder','Slush','First snow','Sunburn weather','Fog horn',
 'Sandstorm','Tornado','Drought','Weather app lying','Frozen windscreen','Melting snow','Windy hair',
 'Sudden downpour','Perfect beach day']},

{id:'fashion',n:'Fashion',e:'👗',c:'#D6336C',lang:'en',k:[
 'High heels','Bow tie','Denim jacket','Scarf','Sunglasses','Knitted jumper','Raincoat','Flip-flops',
 'Backpack','Wristwatch','Beanie','Overalls','Tuxedo','Wedding dress','Socks with sandals','Hoodie',
 'Belt','Earrings','Shoelaces','Fur coat','Mullet','Matching outfits','Wrong size','Fitting room',
 'Runway show','Ripped jeans','Handbag','Tie knot']},

{id:'essentials',n:'Everyday essentials',e:'🪥',c:'#9B59B6',lang:'en',k:[
 'Toothbrush|teeth,brush,mouth','Umbrella','House keys','Wallet','Alarm clock','Soap','Towel','Pillow',
 'Shopping list','Bin bag','Glasses','Toilet paper','Hairbrush','Deodorant','Plaster','Scissors',
 'Notebook','Water bottle','Loose change','Phone charger','Nail clippers','Tissues','Shoe horn',
 'Reading lamp','Spare batteries','Sunscreen','Lip balm','Safety pin']},

{id:'body',n:'Body & health',e:'🦶',c:'#54402E',lang:'en',k:[
 'Goosebumps|cold,skin,hair','Freckles','Braces','Ticklish feet','Snoring','Bedhead','Blister','Yawn',
 'Growth spurt','Loose tooth','Hiccups','Sunburn peeling','Cold hands','Sore throat','Stretching',
 'Bruise','Sneezing fit','Pulled muscle','Eye twitch','Cracking knuckles','Bad haircut','Dry skin',
 'Deep breath','Pins and needles']},

{id:'school',n:'Back to school',e:'✏️',c:'#6AB04C',lang:'en',k:[
 'Homework','Detention','School bus','Chalkboard','Pencil case','Exam','Lunchbox','Class photo',
 'Field trip','Report card','Gym class','Substitute teacher','Locker','Group project','School play',
 'Graduation','Timetable','Ruler','Last day of term','Nervous presentation','Cheat sheet',
 'Hand raised','Playground fight','Parents evening','Textbook','Detention slip']},

{id:'kids',n:'Kids zone',e:'🧸',c:'#00B894',lang:'en',k:[
 'Teddy bear','Swing','Soap bubble','Balloon','Sandpit','Slide','Puppy','Rainbow','Snowman','Kite',
 'Crayon','Lullaby','Playground','Hopscotch','Puddle jumping','Sticker','Colouring book',
 'Hide and seek','Tooth fairy','Tricycle','Bedtime story','Piggyback','Face paint','Bouncy castle',
 'Rubber duck','Skipping rope','Cartoon','Nap time']},

{id:'toys',n:'Games & toys',e:'🧩',c:'#E58E26',lang:'en',k:[
 'Jigsaw puzzle','Chess','Monopoly','Rubiks cube','Yo-yo','Dominoes','Card castle','Jenga','Darts',
 'Marbles','Kite flying','Water pistol','Board game rules','Dice roll','Playing cards','Scrabble',
 'Hula hoop','Frisbee','Slinky','Snakes and ladders','Tug of war','Rock paper scissors','Bingo',
 'Musical chairs']},

{id:'hobbies',n:'Hobbies',e:'🎨',c:'#8854D0',lang:'en',k:[
 'Knitting','Gardening','Birdwatching','Pottery','Fishing','Photography','Baking','Jogging',
 'Woodworking','Painting','Stamp collecting','Yoga class','Karaoke night','Book club','Hiking',
 'Metal detecting','Model trains','Origami','Geocaching','Sourdough starter','Puzzles','Home brewing',
 'Motorbiking','Stargazing','Cross-stitch','Beekeeping']},

{id:'instruments',n:'Instruments',e:'🎻',c:'#B33771',lang:'en',k:[
 'Violin','Drums','Piano','Trumpet','Accordion','Harmonica','Cello','Flute','Saxophone','Banjo',
 'Triangle','Tambourine','Harp','Xylophone','Double bass','Church organ','Kazoo','Cowbell',
 'Electric guitar','Bagpipes','Recorder','Gong','Maracas','Panpipes']},

{id:'dance',n:'Dance & moves',e:'💃',c:'#EE5A24',lang:'en',k:[
 'Tango','Moonwalk','Breakdance','Waltz','Conga line','Salsa','Ballet','Line dancing','Headbanging',
 'Slow dance','Robot dance','Twerking','Tap dance','Wedding first dance','Dad dancing','Limbo',
 'Cheerleading','Flash mob','Disco','Ballroom','Zumba','Air drumming']},

{id:'party',n:'Party moments',e:'🎉',c:'#F0426B',lang:'en',k:[
 'Wrong-person text','Fake wave','Parallel parking','Happy birthday singing','Group photo blink',
 'Reply-all disaster','Splitting the bill','Projector not connecting','Awkward hug',
 'Holding a door too early','Talking over each other','Leaving without saying bye',
 'Unmuted by accident','Wrong lift button','Last one dancing','Second-hand embarrassment',
 'Forgetting a name','Small talk in a lift','Waiting for the bathroom','Someone finds the guitar',
 'Neighbours knocking','One more song','Taxi queue','Morning after']},

{id:'badideas',n:'Bad ideas',e:'💥',c:'#B3123A',lang:'en',k:[
 'Texting while cycling','Cutting your own fringe','Cheap tattoo','Ikea furniture at 11pm',
 'Trampoline','Hottest curry on the menu','Barbecue without instructions','Cutting cake with a card',
 'Replying at 3am','Skipping the manual','One more coffee','Shortcut through the woods',
 'Free hotel wifi','Group holiday','Karaoke at a work party','Adopting two puppies',
 'Painting a wall in white clothes','Ice bath dare','Reading the comments','Buying it because it was on sale']},

{id:'noise',n:'Noises',e:'🔊',c:'#6C5CE7',lang:'en',k:[
 'Ambulance','Dial-up modem','Kettle','Popcorn popping','Zipper','Purring cat','Chainsaw',
 'Windscreen wipers','Vuvuzela','Dentist drill','Baby on a plane','Champagne cork','Slot machine',
 'Ice cream van','Nokia ringtone','Squeaky door','Fire alarm','Bubble wrap','Sneeze','Snoring',
 'Church bells','Train announcement','Balloon deflating','Rumbling stomach']},

{id:'verbs',n:'Verbs',e:'🏃',c:'#1E7A63',lang:'en',k:[
 'Squint','Gargle','Tiptoe','Flinch','Slouch','Wince','Rummage','Shuffle','Loiter','Grovel','Skid',
 'Fidget','Wade','Squirm','Nibble','Sprint|run,fast,race','Juggle','Stumble','Balance','Yawn',
 'Shiver','Wobble','Sniff','Nudge','Duck','Sway','Scribble','Doze']},

{id:'idioms',n:'Sayings',e:'💬',c:'#7D5A50',lang:'en',k:[
 'Piece of cake','Cold feet','Break the ice','Spill the beans','Bite the bullet','Under the weather',
 'Once in a blue moon','Elephant in the room','Cost an arm and a leg','Hit the sack',
 'Let the cat out of the bag','Barking up the wrong tree','Burning the midnight oil','Cutting corners',
 'Beat around the bush','Back to square one','Ball is in your court','Blessing in disguise',
 'Best of both worlds','Storm in a teacup','Walking on eggshells','Tip of the iceberg',
 'Kill two birds with one stone','Third wheel']},

{id:'undef',n:'Undefinable',e:'🌀',c:'#34638A',lang:'en',k:[
 'Irony','Hiccup','Deja vu','Small talk','Jazz','Yeast','Cringe','Luck','Sarcasm','Tickle',
 'Awkward silence','Nostalgia','Vibe','Momentum','Etiquette','Placebo','Common sense','Chemistry',
 'Timing','Charisma','Coincidence','Instinct','Taste','Karma']},

{id:'hard',n:'Hard to say',e:'😬',c:'#A0522D',lang:'en',k:[
 'Bidet','Fanny pack','Crocs','Ferret','Segway','Mime','Yodelling','Sock puppet','Tanning bed',
 'Neck pillow','Colonoscopy','Novelty tie','Speedo','Leaf blower','Cheese grater','Foot spa',
 'Snuggie','Nose hair trimmer','Mankini','Fake tan','Comb-over','Denture glue','Ear wax','Nose whistle']},

{id:'feel',n:'Feelings',e:'😌',c:'#8E44AD',lang:'en',k:[
 'Brain freeze','Static shock','Song stuck in your head','Falling-asleep lurch','Phantom phone buzz',
 'Contagious yawn','Sunday dread','Post-haircut regret','Hangry','Second wind','Food coma',
 'Butterflies','Itchy label','Sudden dread about nothing','Relief','Stage fright','Homesick',
 'Bored in a queue','Waiting for results','Nearly falling asleep','Peaceful morning','Jealousy',
 'Restless legs','Overthinking']},

{id:'impressions',n:'Impressions',e:'🗣️',c:'#9B59B6',lang:'en',k:[
 'Robot voice','Whisper','Opera voice','Baby talk','News reader','Sports commentator','Pirate',
 'Cowboy','Angry boss','Tour guide','GPS voice','Drill sergeant','Ghost voice','Slow motion talk',
 'Radio DJ','Fake laugh','Sarcastic tone','Stadium announcer','Nervous speech','Nature narrator',
 'Airport announcement','Grumpy neighbour','Excited child','Telemarketer']},

{id:'characters',n:'Fictional characters',e:'🧙',c:'#D35400',lang:'en',k:[
 'Sherlock Holmes','Robin Hood','Dracula','Cinderella','Pinocchio','Tarzan','Peter Pan',
 'Frankenstein','Alice in Wonderland','Mowgli','Snow White','Don Quixote','Hercules','King Arthur',
 'Little Mermaid','Rapunzel','Aladdin','Gulliver','Scrooge','Sleeping Beauty','Three Musketeers',
 'Moby Dick','Pied Piper','Ugly Duckling','Humpty Dumpty','Tin Man']},

{id:'heroes',n:'Heroes & villains',e:'🦸',c:'#0984E3',lang:'en',k:[
 'Superhero cape','Secret identity','Sidekick','Villain lair','Superpower','Invisibility',
 'Time travel','Mind reading','Force field','Mask','Origin story','Evil laugh','World domination',
 'Daring rescue','Super strength','Utility belt','Comic book','Plot twist','Arch-enemy','Henchman',
 'Secret base','Distress signal','Shape shifting','Sworn revenge']},

{id:'myth',n:'Myths & legends',e:'🐉',c:'#5F27CD',lang:'en',k:[
 'Zeus','Thor','Medusa','Minotaur','Dragon','Unicorn','Mermaid','Phoenix','Troll','Sphinx','Fairy',
 'Giant','Kraken','Yeti','Ghost ship','Cyclops','Elf','Werewolf','Genie','Curse','Wishing well',
 'Sea monster','Magic wand','Crystal ball']},

{id:'history',n:'History',e:'📜',c:'#8B6914',lang:'en',k:[
 'Vikings','Knight','Castle siege','Cave painting','Steam engine','Berlin Wall','Pirate ship',
 'Samurai','Silk Road','Gold rush','Ancient Rome','Trench','Telegraph','Explorer','Archaeology',
 'Time capsule','Coronation','Shipwreck','Treaty','Pharaoh','Crusade','Printing press',
 'Industrial revolution','Moon race','Plague doctor','Guillotine','Chariot','Cold War']},

{id:'famous',n:'Famous people',e:'👤',c:'#C0392B',lang:'en',k:[
 'Albert Einstein','Cleopatra','Leonardo da Vinci','Marie Curie','Napoleon','Shakespeare','Gandhi',
 'Mozart','Frida Kahlo','Charlie Chaplin','Amelia Earhart','Nikola Tesla','Julius Caesar','Beethoven',
 'Vincent van Gogh','Isaac Newton','Joan of Arc','Christopher Columbus','Florence Nightingale',
 'Galileo','Alexander the Great','Anne Frank','Neil Armstrong','Pablo Picasso','Charles Darwin',
 'Mother Teresa','Genghis Khan','Wright brothers']},

{id:'crime',n:'Crime & mystery',e:'🕵️',c:'#2C3A47',lang:'en',k:[
 'Fingerprint','Alibi','Getaway car','Magnifying glass','Witness','Handcuffs','Stakeout','Disguise',
 'Secret code','Hidden safe','Police siren','Interrogation','Cold case','Red herring','Detective board',
 'Locked room','Smuggling','Undercover','Prison break','Ransom note','Lie detector','Crime scene tape',
 'Bank heist','Whodunnit']},

{id:'retro',n:'90s & 00s',e:'📼',c:'#F79F1F',lang:'en',k:[
 'VHS tape','Cassette','Floppy disk','Tamagotchi','MSN Messenger','Walkman','Polaroid','Nokia 3310',
 'CD player','Rollerblades','Video rental','Landline phone','Chat room','Screensaver',
 'Disposable camera','Burning a CD','Dial-up internet','Winamp','Text message','Ringtone',
 'Fax machine','Overhead projector','Encyclopedia set','Pager','Film roll','Answering machine']},

{id:'christmas',n:'Christmas',e:'🎄',c:'#C0392B',lang:'en',k:[
 'Advent calendar','Mistletoe','Gingerbread','Santa','Reindeer','Christmas tree','Wrapping paper',
 'Carol singing','Snowball fight','Mulled wine','Tinsel','Secret Santa','Sledging','Christmas jumper',
 'Roast dinner','Fireplace','Winter boots','Fireworks','Advent candle','Nativity play',
 'Christmas market','Last-minute present','Family argument','Leftover turkey','Fairy lights','Chimney']},

{id:'halloween',n:'Halloween',e:'🎃',c:'#E58E26',lang:'en',k:[
 'Pumpkin','Ghost','Vampire','Witch','Skeleton','Haunted house','Trick or treat','Spider web',
 'Zombie','Black cat','Costume','Full moon','Scarecrow','Graveyard','Mummy','Cauldron','Jump scare',
 'Fake blood','Creaky stairs','Candle in a window','Broomstick','Fangs','Howling','Sweet bucket']},

{id:'summer',n:'Summer',e:'🏖️',c:'#F6B93B',lang:'en',k:[
 'Sandcastle','Ice lolly','Sunglasses tan line','Barbecue','Hammock','Flip-flops','Mosquito bite',
 'Beach ball','Sunscreen','Lake swim','Festival wristband','Camping tent','Watermelon slice',
 'Garden hose','Midnight sun','Bonfire','Picnic blanket','Wasp at lunch','Sunset walk','Cold shower',
 'Paddling pool','Sunburnt shoulders']},

{id:'winter',n:'Winter',e:'⛄',c:'#4A69BD',lang:'en',k:[
 'Snowman','Ice skating','Scraping the windscreen','Sledge','Icicle','Woolly hat','Hot drink outside',
 'Frozen fingers','Snow shovel','Slippery pavement','Skiing','Fireplace evening','Static hair',
 'Thermal socks','Steamy windows','Snow angel','Dark afternoon','Salted roads','Snow boots',
 'Frost on the window','Sauna after skiing','Blanket on the sofa']},

/* ---- Estonian decks: hidden unless the Estonian toggle is on ---- */

{id:'eesti',n:'Eesti asjad',e:'🇪🇪',c:'#1E5F9E',lang:'et',k:[
 'Kohuke','Kama','Verivorst','Kiluvõileib','Sauna viht|saun,kask,vihtlema','Jaanituli','Laulupidu',
 'Sügisene pori','Vana Tallinn','Kadaka mööblipood','Rannaliiv Pärnus','Metsas marjul','Kartulipanek',
 'Talvine pimedus','Naabri murutraktor','Suvine kärbes toas','Rukkilill','Kilukarp','Leivajärjekord',
 'Kuuse alt kingitus','Mulgikapsad','Hapukurk','Kuklid kohvikus','Rukkileib','Sõnajalaõis',
 'Kiiking','Kalevipoeg','Vanalinna müür']},

{id:'eestitunded',n:'Eesti tunded',e:'❄️',c:'#34495E',lang:'et',k:[
 'Esimene soe päev aprillis','Buss läks nina alt ära','Sooja vee puudumine','Jää all pori',
 'Naabri remont pühapäeval','Bussiga Tartusse','Lumelabidas hommikul','Kolm kihti riideid',
 'Päike pärast kuud pilvi','Ühistranspordi valideerimine','Suvine sääsk telgis','Pime kell kolm',
 'Kojujõudmine pärast tööd','Kevadine lumesulamine','Kuum saun ja külm järv','Pikk pühade laud']}

];
