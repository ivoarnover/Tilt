const DECKS_VERSION = '2026-08-29.1';

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
 'Mission Impossible','Cast Away','Interstellar','Wizard of Oz','Rush Hour',
 'Speed','The Truman Show','Mad Max','Sound of Music','Indiana Jones','Rain Man','Free Willy','Deep Impact','The Shining','Bridget Jones','School of Rock','Ocean\u2019s Eleven','Slumdog Millionaire','Life of Pi','La La Land','The Revenant','Whiplash','Coco','Up','Wall-E','Kill Bill','Sixth Sense','Groundhog Day','Braveheart','Cast of thousands']},

{id:'music',n:'Music',e:'🎵',c:'#7B4BC9',lang:'en',k:[
 'Air guitar','Vinyl record','Karaoke|sing,microphone,song','Drum solo','Opera singer','Choir',
 'Eurovision','Bass drop','Ukulele','Headphones','Music festival','Earworm','National anthem',
 'Boy band','Beatles','Elvis','Mozart','Rap battle','Playlist','Bagpipes','Encore','Backing dancer',
 'Cover version','Lip sync','Busker','Guitar pick','Concert tickets','Sound check','One-hit wonder',
 'Whistling','Humming','Radio hit',
 'Guitar tuning','Metronome','Album cover','Vinyl scratch','Silent disco','Bass player','Conductor','Sheet music','Autotune','Wedding band','Street piano','Marching band','Voice crack','Beatboxing','Duet','Falsetto','Jam session','Sound system','Stage dive','Support act']},

{id:'tv',n:'TV shows',e:'📺',c:'#2E86DE',lang:'en',k:[
 'Friends','The Office','Game of Thrones','Stranger Things','Breaking Bad','The Simpsons','Sherlock',
 'Squid Game','Black Mirror','Bake Off','Big Brother','Soap opera','Sitcom','Reality show',
 'News anchor','Documentary','Cliffhanger','Binge watching','Spoiler','Season finale','Laugh track',
 'Talk show','Weather forecast','Cooking show','Quiz show','Nature documentary','Crime drama',
 'Streaming','Remote control','Next episode',
 'Season one','Crime scene','Live studio audience','Subtitles','Theme tune','Product placement','Bloopers','Guest star','Recap','Spin-off','Advert break','Series finale','Fan theory','Watch party','Costume drama','Sports highlights','Weather map','Voiceover']},

{id:'games',n:'Video games',e:'🎮',c:'#16A085',lang:'en',k:[
 'Tetris','Minecraft','Pac-Man','Mario','Fortnite','Among Us','Candy Crush','The Sims','Angry Birds',
 'Speedrun','Boss fight','Respawn','Loading screen','Joystick','Arcade','Pixel art','Lag',
 'Cheat code','Game over','Controller','High score','Multiplayer','Console','Save point','Power-up',
 'Final level','Rage quit','Tutorial','Leaderboard','Virtual reality',
 'Inventory','Skill tree','Open world','Local co-op','Split screen','Achievement','Sandbox','Fast travel','Character creator','Rubber banding','Ping','Patch notes','Loot box','Retro remake','Motion controls','Endless runner','Puzzle platformer','Random encounter']},

{id:'animals',n:'Animals',e:'🐼',c:'#E67E22',lang:'en',k:[
 'Elephant|grey,trunk,Africa','Penguin','Octopus','Sloth','Hedgehog','Giraffe','Bat','Crocodile',
 'Squirrel','Owl','Jellyfish','Kangaroo','Chameleon','Woodpecker','Hamster','Seagull','Moose','Lynx',
 'Wolf','Bumblebee','Snail','Flamingo','Otter','Peacock','Camel','Rhino','Panda','Raccoon','Donkey',
 'Goat','Parrot','Tortoise','Mole','Swan',
 'Badger','Ostrich','Weasel','Pelican','Stork','Toad','Beetle','Dragonfly','Hyena','Zebra','Meerkat','Alpaca','Ferret','Newt','Skunk','Lemur','Puffin','Porcupine','Antelope','Chipmunk','Boar','Bison']},

{id:'sealife',n:'Under the sea',e:'🐙',c:'#0A7EA4',lang:'en',k:[
 'Shark','Dolphin','Coral reef','Seahorse','Starfish','Whale','Crab','Lobster','Pearl','Shipwreck',
 'Scuba diving','Snorkel','Tide pool','Seaweed','Anchor','Lighthouse','Fishing net','Message in a bottle',
 'Sea turtle','Wave','Submarine','Pirate treasure','Sandcastle','Buoy',
 'Manta ray','Barnacle','Plankton','Deep sea vent','Sea urchin','Clownfish','Kelp forest','Trawler','Rowing boat','Life jacket','Tidal wave','Message buoy','Ferry crossing','Harbour seal','Fish market','Sea salt','Pearl diver','Mooring rope']},

{id:'food',n:'Food',e:'🍕',c:'#D63447',lang:'en',k:[
 'Pizza|cheese,Italy,slice','Sushi','Pancake','Garlic','Popcorn','Spaghetti','Pickle','Chilli pepper',
 'Croissant','Kebab','Porridge','Mustard','Olive','Burnt toast','Soup','Chewing gum','Sandwich',
 'Blue cheese','Leftovers','Bacon','Omelette','Rice','Noodles','Burger','Salad','Meatballs','Sausage',
 'Butter','Bread crust','Ketchup','Curry','Taco','Dumpling','Peanut butter',
 'Fried egg','Melted cheese','Instant noodles','Salad dressing','Sour cream','Fish and chips','Roast potatoes','Meat pie','Pastry','Salt and pepper','Overcooked rice','Falafel','Hummus','Pesto','Nachos','Gravy','Anchovy','Cabbage roll','Cold pizza','Hot dog','Cereal','Marmite','Feta','Ramen']},

{id:'drinks',n:'Drinks',e:'🥤',c:'#0E7C7B',lang:'en',k:[
 'Coffee|drink,morning,caffeine','Green tea','Lemonade','Milkshake','Hot chocolate','Smoothie',
 'Sparkling water','Orange juice','Beer','Champagne','Cocktail','Mulled wine','Iced coffee',
 'Energy drink','Tap water','Straw','Ice cubes','Coconut water','Kefir','Cider','Espresso shot',
 'Bubble tea','Toast to the bride','Last call','Refill','Thermos',
 'Cappuccino','Herbal tea','Fizzy drink','Lemon slice','Wine tasting','Barrel','Cork','Milk carton','Instant coffee','Ginger shot','Punch bowl','Frozen margarita','Sparkling wine','Coffee grinder','Empty glass','Tea bag','Beer garden','Water fountain']},

{id:'desserts',n:'Sweets',e:'🍰',c:'#E84393',lang:'en',k:[
 'Ice cream','Doughnut','Cheesecake','Marshmallow','Candy floss','Chocolate bar','Waffle','Brownie',
 'Apple pie','Jelly','Liquorice','Cupcake','Whipped cream','Sprinkles','Toffee','Macaron','Honey',
 'Sugar rush','Melting ice cream','Birthday candles','Chocolate fountain','Gingerbread man',
 'Sticky fingers','Ice cream truck',
 'Custard','Meringue','Trifle','Tiramisu','Fudge','Caramel','Sorbet','Cookie dough','Chocolate chip','Icing sugar','Jam tart','Pancake stack','Cinnamon bun','Sweet tooth','Popsicle','Cream puff']},

{id:'fruitveg',n:'Fruit & veg',e:'🥕',c:'#4E9F3D',lang:'en',k:[
 'Watermelon','Pineapple','Avocado','Broccoli','Mushroom','Cucumber','Banana','Onion|cry,layers,smell',
 'Corn on the cob','Beetroot','Cabbage','Pumpkin','Strawberry','Kiwi','Lemon','Potato','Carrot',
 'Tomato','Grapes','Cherry','Aubergine','Pea pod','Radish','Coconut','Fig','Rhubarb','Sauerkraut',
 'Melon','Mango','Peach','Plum','Raspberry','Blueberry','Lime','Spinach','Lettuce','Pepper','Courgette','Turnip','Leek','Celery','Asparagus','Sweetcorn','Apple core','Fruit bowl']},

{id:'cooking',n:'In the kitchen',e:'👨‍🍳',c:'#B85C38',lang:'en',k:[
 'Whisk','Colander','Garlic press','Corkscrew','Cling film','Chopping board','Kettle','Microwave',
 'Bread knife','Rolling pin','Frying pan','Oven mitt','Grater','Peeler','Measuring jug','Blender',
 'Recipe','Boiling over','Burnt dinner','Smoke alarm','Washing up','Tupperware','Apron','Timer',
 'Taste test','Leftover fridge',
 'Slow cooker','Wooden spoon','Baking tray','Sieve','Ice tray','Salt shaker','Bottle opener','Bread bin','Dish cloth','Steam','Preheat','Marinade','Simmer','Whisking eggs','Chopping onions','Recipe from a friend']},

{id:'house',n:'Around the house',e:'🏠',c:'#0FA3B1',lang:'en',k:[
 'Vacuum cleaner','Doormat','Radiator','Fridge magnet','Ironing board','Shower curtain','Light switch',
 'Laundry basket','Bookshelf','Doorbell','Mousetrap','Broom','Candle','Mirror','Keyhole','Ladder',
 'Toolbox','Duct tape','Extension cord','Curtain rail','Draught','Squeaky floorboard','Sofa',
 'Wardrobe','Bathtub','Balcony','Attic','Spare room','Blocked drain','Doorbell camera',
 'Skirting board','Coat hook','Junk drawer','Spare key','Loft hatch','Rug','Fuse box','Bin day','Window sill','Airing cupboard','Doorstop','Ceiling fan','Front porch','Garden shed','Letterbox','Stair creak','Wall clock','Picture frame']},

{id:'tools',n:'Tools & DIY',e:'🔧',c:'#7F6A00',lang:'en',k:[
 'Hammer','Screwdriver','Spirit level','Power drill','Sandpaper','Paint roller','Tape measure',
 'Wrench','Nail','Saw','Wallpaper','Cement','Wheelbarrow','Stepladder','Safety goggles','Workbench',
 'Splinter','Instruction manual','Missing screw','Flat-pack furniture','Hardware shop','Plunger',
 'Toolbelt','Chisel',
 'Allen key','Duct tape fix','Pliers','Vice','Blowtorch','Extension ladder','Spirit level bubble','Drill bit','Paint tin','Masking tape','Skirting cut','Sawdust','Workshop radio','Trip to the hardware shop','Missing instructions','Left-over screws']},

{id:'jobs',n:'Jobs',e:'💼',c:'#5D8233',lang:'en',k:[
 'Plumber|pipe,water,toilet','Air traffic controller','Sommelier','Bouncer','Roadie','Undertaker',
 'Beekeeper|bee,honey,sting','Chimney sweep','Referee','Lighthouse keeper','Crash test dummy',
 'Dog groomer','Auctioneer','Tattoo artist','Window cleaner','Postman','Firefighter','Barista',
 'Bus driver','Nurse','Farmer','Translator','Lifeguard','Architect','Vet','Butcher','Electrician',
 'Flight attendant','Detective','Hairdresser','Ski instructor','Night watchman',
 'Librarian','Chef','Pilot','Journalist','Carpenter','Miner','Sailor','Surgeon','Coach','Cleaner','Security guard','Radio host','Courier','Tailor','Diver','Park ranger','Baker','Mechanic','Zookeeper','Weather presenter']},

{id:'office',n:'Office life',e:'🖇️',c:'#3D5A80',lang:'en',k:[
 'Monday morning','Coffee machine','Printer jam','Pointless meeting','Spreadsheet',
 'Deadline','Whiteboard','Office chair','Sticky note','Team building','Performance review',
 'Out of office','Open plan','Stapler','Lift small talk','Fire drill','Desk plant','Video call',
 'Mute button','Someone eating fish','Overtime','Payday','Two weeks notice','Lunch break',
 'Standing desk','Chair wheel','Broken printer','Shared calendar','Screen share','Badge','Water cooler','Kitchen fridge note','Recruiter message','Onboarding','Slack ping','Inbox zero','All-hands','Whiteboard marker dry','Someone late again','Lunch at the desk']},

{id:'money',n:'Money',e:'💰',c:'#B7791F',lang:'en',k:[
 'Piggy bank','Loose change','Bank card','Cash machine','Receipt','Tip jar','Bargain','Black Friday',
 'Rent day','Refund','Insurance','Mortgage','Splitting the bill','Contactless','Wallet','Coupon',
 'Second-hand','Auction','Savings','Overdraft','Price tag','Lottery ticket','Piggy bank raid','Budget',
 'Small print','Interest rate','Payday lunch','Group gift','Round of drinks','Broken ATM','Foreign coins','Shopping spree','Return policy','Warranty','Subscription','Free trial','Bulk buy','Bank queue']},

{id:'companies',n:'Companies & services',e:'🏢',c:'#2C3E7A',lang:'en',k:[
 'Google','Amazon','Netflix','Spotify','YouTube','Uber','Airbnb','Instagram','TikTok','WhatsApp',
 'PayPal','Wikipedia','LinkedIn','Zoom','Wolt','Bolt','Revolut','Dropbox','eBay','Etsy','Reddit',
 'Duolingo','Pinterest','Booking site','Food delivery','Ride share','Streaming service',
 'Cloud storage','Dating app','Online bank',
 'Steam','Twitch','Discord','Telegram','Signal','Slack','Notion','Figma','Shopify','Stripe','Visa','Ryanair','IKEA delivery','DHL','Omniva','Swedbank','Coop','Selver','Elisa','Telia']},

{id:'brands',n:'Brands',e:'🏷️',c:'#F0932B',lang:'en',k:[
 'Ikea','Lego','Nike','Tesla','Apple','Adidas','Sony','Toyota','Ferrari','Nokia','Samsung','Lidl',
 'Coca-Cola','Pepsi','Nutella','Heinz','Rolex','Gucci','Dyson','Bosch','Volvo','Harley-Davidson',
 'Converse','Gore-Tex','Duracell','Post-it','Velcro','Thermos','Swiss Army knife','Lego brick',
 'Playmobil','Hasbro','Fender','Marshall','Canon','Nikon','GoPro','Fitbit','Garmin','Lego set','Michelin','Shell','Zara','H&M','Uniqlo','Timberland','Ray-Ban','Casio']},

{id:'tech',n:'Technology',e:'💻',c:'#4834D4',lang:'en',k:[
 'Wi-Fi','Password','Firewall','Bluetooth','Screenshot','The cloud','Software bug','Robot','Drone',
 'Emoji','Spam','Blue screen','Charger','Algorithm','Selfie','QR code','Software update',
 'Airplane mode','Autocorrect','Two-factor code','Group chat','Dark mode','Low battery','Dead pixel',
 'Voice assistant','Smart watch','Cookies banner','Buffering','Terms and conditions','Restart it',
 'Touchscreen','Fingerprint unlock','Face unlock','Notification','Storage full','Wireless charging','Smart bulb','Router restart','Printer driver','Cable tangle','Backup','Data roaming','Screen crack','Zoom fatigue','Password reset','Battery saver','Widget','App store']},

{id:'sports',n:'Sports',e:'⚽',c:'#2D9E5F',lang:'en',k:[
 'Marathon','Ski jump','Curling','Boxing','Yoga','Surfing','Darts','Fencing','Bowling','Ice hockey',
 'Basketball','Tennis','Rowing','Climbing','Penalty kick','Slam dunk','Own goal','Hat-trick',
 'Photo finish','Sumo','Half-time','Podium','Warm-up','Sudden death','Cycling','Golf','Volleyball',
 'Gymnastics','Relay race','Cross-country skiing','Referee whistle','Team huddle',
 'Ping pong','Badminton','Handball','Triathlon','Javelin','High jump','Long jump','Weightlifting','Rugby','Cricket','Snooker','Formula One','Motocross','Skateboarding','Snowboarding','Wrestling','Archery','Horse riding','Diving','Sprint finish']},

{id:'countries',n:'Countries',e:'🌍',c:'#8E44AD',lang:'en',k:[
 'Japan','Brazil','Egypt','Estonia','Finland','Italy','Iceland','Mexico','India','Australia','Canada',
 'Greece','Norway','Kenya','Peru','Netherlands','Switzerland','Turkey','Spain','Portugal','Ireland',
 'Vietnam','Morocco','Argentina','Sweden','Poland','Thailand','South Korea',
 'Germany','France','China','Chile','Nepal','Latvia','Lithuania','Denmark','Croatia','Hungary','Georgia','Ukraine','Israel','Cuba','Jamaica','New Zealand','Singapore']},

{id:'cities',n:'Cities',e:'🏙️',c:'#1E5F9E',lang:'en',k:[
 'Paris','Tokyo','New York','Venice','Berlin','Rome','Istanbul','Rio de Janeiro','Amsterdam','Cairo',
 'Barcelona','Moscow','Sydney','Dubai','Helsinki','Tallinn','Riga','Prague','Vienna','Las Vegas',
 'Hong Kong','Reykjavik','Lisbon','San Francisco','Bangkok','Marrakesh',
 'London','Madrid','Milan','Oslo','Copenhagen','Stockholm','Warsaw','Budapest','Athens','Munich','Naples','Seoul','Shanghai','Mumbai','Cape Town','Buenos Aires','Toronto','Chicago','Miami','Zurich']},

{id:'landmarks',n:'World landmarks',e:'🗼',c:'#3867D6',lang:'en',k:[
 'Eiffel Tower','Big Ben','Pyramids','Colosseum','Great Wall','Taj Mahal','Statue of Liberty',
 'Stonehenge','Niagara Falls','Grand Canyon','Sydney Opera House','Mount Everest','Leaning Tower',
 'Machu Picchu','Times Square','Northern lights','Sahara','Amazon river','Venice canals',
 'Golden Gate Bridge','Mount Fuji','Dead Sea','Angkor Wat','Christ the Redeemer',
 'Acropolis','Petra','Hagia Sophia','Alhambra','Neuschwanstein','Buckingham Palace','Red Square','Brandenburg Gate','Louvre','Uluru','Victoria Falls','Great Barrier Reef','Table Mountain','Trevi Fountain','Little Mermaid statue','Tower Bridge']},

{id:'travel',n:'Travel',e:'✈️',c:'#EB3B5A',lang:'en',k:[
 'Passport','Suitcase','Boarding pass','Jet lag','Hostel','Souvenir','Sunburn','Airport security',
 'Duty free','Delayed flight','Currency exchange','Backpacking','Cruise ship','Road trip','Camping',
 'Hotel breakfast','Lost luggage','Tourist trap','Postcard','Middle seat','Overhead locker',
 'Sightseeing bus','Guidebook','Border queue','Airport taxi','Travel pillow','Turbulence','Check-in',
 'Window seat','Roaming charges','Travel adapter','Airport lounge','Long layover','Night train','Ferry deck','Hire car','Border stamp','Sunrise flight','Hand luggage','Departure board','Gate change','Hotel key card','Guided tour','Local market','Getting lost','Language barrier']},

{id:'cars',n:'Cars & driving',e:'🚗',c:'#C0392B',lang:'en',k:[
 'Steering wheel','Traffic jam','Parking ticket','Roundabout','Windscreen','Petrol station',
 'Rear-view mirror','Speed camera','Tow truck','Hitchhiking','Convertible','Flat tyre','Seatbelt',
 'Car wash','Test drive','Winter tyres','Motorway','Reverse parking','Number plate','Electric car',
 'Road rage','Sat nav','Driving lesson','Toll booth','Jump start','Rally driver','School run',
 'Handbrake',
 'Ignition key','Wing mirror','Dashboard light','Hazard lights','Parking sensor','Boot space','Roof box','Trailer','Petrol smell','Bumper sticker','Learner plate','Traffic light','Zebra crossing','Speed bump','Cruise control','Car keys lost','Backseat driver','Full tank']},

{id:'space',n:'Space',e:'🚀',c:'#5F27CD',lang:'en',k:[
 'Astronaut','Black hole','Saturn','Moon landing','Rocket','Meteor','Space station','Alien',
 'Telescope','Solar eclipse','Mars rover','Comet','Milky Way','Satellite','Spacesuit','Zero gravity',
 'Constellation','Launch pad','Countdown','Space junk','Shooting star','Orbit','Mission control',
 'Asteroid belt',
 'Northern lights','Galaxy','Space debris','Lunar rover','Solar wind','Gravity assist','Docking','Star map','Radio telescope','Cosmic ray','Red planet','Supernova','Space race','Escape velocity','Weightless food','Solar system']},

{id:'science',n:'Science',e:'🔬',c:'#1ABC9C',lang:'en',k:[
 'Magnet','Volcano','Photosynthesis','DNA','Microscope','Lightning','Evaporation','Periodic table',
 'Laboratory','Vaccine','Electricity','Fossil','Radioactive','Battery','Prism','Bacteria',
 'Experiment','Formula','Gravity|down,falling,Newton','Test tube','Hypothesis','Static electricity',
 'Magnifying glass','Solar panel','Chain reaction','Boiling point','X-ray','Compass needle',
 'Centrifuge','Petri dish','Catalyst','Molecule','Atom','Circuit board','Pulley','Lever','Friction','Density','Vacuum','Laser','Thermometer','Barometer','Condensation','Genome','Enzyme','Neuron']},

{id:'nature',n:'Nature',e:'🌲',c:'#218C74',lang:'en',k:[
 'Waterfall','Thunderstorm','Mushroom picking','Moss','Glacier','Swamp','Desert','Forest fire','Tide',
 'Cave','Fog','Avalanche','Bog','Sunrise','Pine cone','Anthill','Beaver dam','Frost','Berry picking',
 'Dew','Quicksand','Tree stump','Bird migration','Autumn leaves','Spider web','Rock pool','Wildflower',
 'Echo',
 'Meadow','Riverbank','Marsh','Sand dune','Cliff edge','Pebble beach','Willow tree','Birch forest','Wild boar tracks','Owl at night','Bird nest','Fallen tree','Puddle ice','Northern forest','Beach stones','Sunset over water']},

{id:'weather',n:'Weather',e:'☔',c:'#2980B9',lang:'en',k:[
 'Hailstorm','Heatwave','Drizzle','Blizzard','Rainbow','Puddle','Umbrella turned inside out',
 'Black ice','Humidity','Wind chill','Thunder','Slush','First snow','Sunburn weather','Fog horn',
 'Sandstorm','Tornado','Drought','Weather app lying','Frozen windscreen','Melting snow','Windy hair',
 'Sudden downpour','Perfect beach day',
 'Cloud cover','Barometric drop','Clear sky','Frostbite','Sunny spell','Overcast','Storm warning','Flood','Muggy evening','Crisp morning','Rain on the roof','Wind turbine','Snowdrift','Warm front']},

{id:'fashion',n:'Fashion',e:'👗',c:'#D6336C',lang:'en',k:[
 'High heels','Bow tie','Denim jacket','Scarf','Sunglasses','Knitted jumper','Raincoat','Flip-flops',
 'Backpack','Wristwatch','Beanie','Overalls','Tuxedo','Wedding dress','Socks with sandals','Hoodie',
 'Belt','Earrings','Shoelaces','Fur coat','Mullet','Matching outfits','Wrong size','Fitting room',
 'Runway show','Ripped jeans','Handbag','Tie knot',
 'Turtleneck','Trench coat','Trainers','Cardigan','Leather jacket','Baseball cap','Bucket hat','Blazer','Skirt','Dungarees','Mittens','Slippers','Cufflinks','Statement necklace','Nail polish','Handbag strap','Vintage shop','Ironed shirt']},

{id:'essentials',n:'Everyday essentials',e:'🪥',c:'#9B59B6',lang:'en',k:[
 'Toothbrush|teeth,brush,mouth','Umbrella','House keys','Wallet','Alarm clock','Soap','Towel','Pillow',
 'Shopping list','Bin bag','Glasses','Toilet paper','Hairbrush','Deodorant','Plaster','Scissors',
 'Notebook','Water bottle','Loose change','Phone charger','Nail clippers','Tissues','Shoe horn',
 'Reading lamp','Spare batteries','Sunscreen','Lip balm','Safety pin',
 'Shoe polish','Sewing kit','Torch','Batteries','Pen that works','Sticky tape','Ice scraper','Reusable bag','Face mask','Hand sanitiser','Bottle opener','Comb','Mouthwash','Cotton buds','Shopping trolley coin','Spare socks']},

{id:'body',n:'Body & health',e:'🦶',c:'#54402E',lang:'en',k:[
 'Goosebumps|cold,skin,hair','Freckles','Braces','Ticklish feet','Snoring','Bedhead','Blister','Yawn',
 'Growth spurt','Loose tooth','Hiccups','Sunburn peeling','Cold hands','Sore throat','Stretching',
 'Bruise','Sneezing fit','Pulled muscle','Eye twitch','Cracking knuckles','Bad haircut','Dry skin',
 'Deep breath','Pins and needles',
 'Sore feet','Stiff neck','Cold shivers','Dry throat','Runny nose','Sweaty palms','Heavy eyelids','Growling stomach','Tickly cough','Muscle ache','Stretching in the morning','Deep sleep','Power nap','Sunburn line']},

{id:'school',n:'Back to school',e:'✏️',c:'#6AB04C',lang:'en',k:[
 'Homework','Detention','School bus','Chalkboard','Pencil case','Exam','Lunchbox','Class photo',
 'Field trip','Report card','Gym class','Substitute teacher','Locker','Group project','School play',
 'Graduation','Timetable','Ruler','Last day of term','Nervous presentation','Cheat sheet',
 'Hand raised','Playground fight','Parents evening','Textbook','Detention slip',
 'Assembly','Head teacher','School dinner','Whiteboard marker','Class clown','Sports day','Homework excuse','Spelling test','Show and tell','Library card','Bell ringing','Uniform','Pen pal','Science fair','School photo','Study group']},

{id:'kids',n:'Kids zone',e:'🧸',c:'#00B894',lang:'en',k:[
 'Teddy bear','Swing','Soap bubble','Balloon','Sandpit','Slide','Puppy','Rainbow','Snowman','Kite',
 'Crayon','Lullaby','Playground','Hopscotch','Puddle jumping','Sticker','Colouring book',
 'Hide and seek','Tooth fairy','Tricycle','Bedtime story','Piggyback','Face paint','Bouncy castle',
 'Rubber duck','Skipping rope','Cartoon','Nap time',
 'Building blocks','Story time','Balloon animal','Playdough','Toy car','Doll house','Water balloon','Sandcastle bucket','Piggyback ride','Cartoon marathon','Sleepover','Lost tooth','Birthday party','Bubble bath','Bike stabilisers','Ice cream cone']},

{id:'toys',n:'Games & toys',e:'🧩',c:'#E58E26',lang:'en',k:[
 'Jigsaw puzzle','Chess','Monopoly','Rubiks cube','Yo-yo','Dominoes','Card castle','Jenga','Darts',
 'Marbles','Kite flying','Water pistol','Board game rules','Dice roll','Playing cards','Scrabble',
 'Hula hoop','Frisbee','Slinky','Snakes and ladders','Tug of war','Rock paper scissors','Bingo',
 'Musical chairs',
 'Lego brick','Spinning top','Kaleidoscope','Toy soldier','Puppet','Water gun','Skipping rope','Card trick','Rubber band ball','Paper aeroplane','Treasure hunt','Charades','Twister','Pictionary','Cluedo','Darts board']},

{id:'hobbies',n:'Hobbies',e:'🎨',c:'#8854D0',lang:'en',k:[
 'Knitting','Gardening','Birdwatching','Pottery','Fishing','Photography','Baking','Jogging',
 'Woodworking','Painting','Stamp collecting','Yoga class','Karaoke night','Book club','Hiking',
 'Metal detecting','Model trains','Origami','Geocaching','Sourdough starter','Puzzles','Home brewing',
 'Motorbiking','Stargazing','Cross-stitch','Beekeeping',
 'Jogging route','Bird feeder','Chess club','Guitar practice','Language app','Journaling','Rock climbing','Camping trip','Cycling','Swimming','Collecting','Blogging','Podcasting','Cooking class','Dance class','Volunteering']},

{id:'instruments',n:'Instruments',e:'🎻',c:'#B33771',lang:'en',k:[
 'Violin','Drums','Piano','Trumpet','Accordion','Harmonica','Cello','Flute','Saxophone','Banjo',
 'Triangle','Tambourine','Harp','Xylophone','Double bass','Church organ','Kazoo','Cowbell',
 'Electric guitar','Bagpipes','Recorder','Gong','Maracas','Panpipes',
 'Clarinet','Trombone','Tuba','Bass guitar','Keyboard','Bongos','Synthesiser','French horn','Mandolin','Zither','Church bells','Drum kit','Sound board','Tuning fork']},

{id:'dance',n:'Dance & moves',e:'💃',c:'#EE5A24',lang:'en',k:[
 'Tango','Moonwalk','Breakdance','Waltz','Conga line','Salsa','Ballet','Line dancing','Headbanging',
 'Slow dance','Robot dance','Twerking','Tap dance','Wedding first dance','Dad dancing','Limbo',
 'Cheerleading','Flash mob','Disco','Ballroom','Zumba','Air drumming',
 'Slow motion dance','Wedding conga','Head nod','Shuffle dance','Folk dance','Sword dance','Ballroom spin','Hip hop','Jive','Charleston','Two-step','Dance battle']},

{id:'party',n:'Party moments',e:'🎉',c:'#F0426B',lang:'en',k:[
 'Wrong-person text','Fake wave','Parallel parking','Happy birthday singing','Group photo blink',
 'Reply-all disaster','Splitting the bill','Projector not connecting','Awkward hug',
 'Holding a door too early','Talking over each other','Leaving without saying bye',
 'Unmuted by accident','Wrong lift button','Last one dancing','Second-hand embarrassment',
 'Forgetting a name','Small talk in a lift','Waiting for the bathroom','Someone finds the guitar',
 'Neighbours knocking','One more song','Taxi queue','Morning after',
 'Cake cutting','Balloon arch','Playlist argument','Photo booth','Party hat','Pinata','Toast speech','Games night','New neighbour','Sleeping guest','Empty snack bowl','Last bus home']},

{id:'badideas',n:'Bad ideas',e:'💥',c:'#B3123A',lang:'en',k:[
 'Texting while cycling','Cutting your own fringe','Cheap tattoo','Ikea furniture at 11pm',
 'Trampoline','Hottest curry on the menu','Barbecue without instructions','Cutting cake with a card',
 'Replying at 3am','Skipping the manual','One more coffee','Shortcut through the woods',
 'Free hotel wifi','Group holiday','Karaoke at a work party','Adopting two puppies',
 'Painting in white clothes','Ice bath dare','Reading the comments','Buying it just for the sale',
 'Winging the presentation','Ignoring the engine light','Snoozing nine times','Talking politics at dinner','DIY haircut for a friend','Chasing a bus','Eating before swimming','Two desserts','Answering unknown numbers']},

{id:'noise',n:'Noises',e:'🔊',c:'#6C5CE7',lang:'en',k:[
 'Ambulance','Dial-up modem','Kettle','Popcorn popping','Zipper','Purring cat','Chainsaw',
 'Windscreen wipers','Vuvuzela','Dentist drill','Baby on a plane','Champagne cork','Slot machine',
 'Ice cream van','Nokia ringtone','Squeaky door','Fire alarm','Bubble wrap','Sneeze','Snoring',
 'Church bells','Train announcement','Balloon deflating','Rumbling stomach',
 'Doorbell','Alarm clock','Coffee machine','Air conditioner','Ticking clock','Foghorn','Woodpecker','Thunder clap','Balloon pop','Camera shutter','Keyboard typing','Rain on a tent']},

{id:'verbs',n:'Verbs',e:'🏃',c:'#1E7A63',lang:'en',k:[
 'Squint','Gargle','Tiptoe','Flinch','Slouch','Wince','Rummage','Shuffle','Loiter','Grovel','Skid',
 'Fidget','Wade','Squirm','Nibble','Sprint|run,fast,race','Juggle','Stumble','Balance','Yawn',
 'Shiver','Wobble','Sniff','Nudge','Duck','Sway','Scribble','Doze',
 'Sneak','Wave','Point','Clap','Stretch','Lean','Kneel','Crawl','Leap','Twirl','Grip','Push','Pull','Scratch','Blink']},

{id:'idioms',n:'Sayings',e:'💬',c:'#7D5A50',lang:'en',k:[
 'Piece of cake','Cold feet','Break the ice','Spill the beans','Bite the bullet','Under the weather',
 'Once in a blue moon','Elephant in the room','Cost an arm and a leg','Hit the sack',
 'Let the cat out of the bag','Barking up the wrong tree','Burning the midnight oil','Cutting corners',
 'Beat around the bush','Back to square one','Ball is in your court','Blessing in disguise',
 'Best of both worlds','Storm in a teacup','Walking on eggshells','Tip of the iceberg',
 'Kill two birds with one stone','Third wheel',
 'Silver lining','Rain check','Break a leg','Hit the nail on the head','Steal your thunder','On thin ice','Out of the blue','Face the music','Bite off too much','Jump on the bandwagon','Miss the boat','Sit on the fence']},

{id:'undef',n:'Undefinable',e:'🌀',c:'#34638A',lang:'en',k:[
 'Irony','Hiccup','Deja vu','Small talk','Jazz','Yeast','Cringe','Luck','Sarcasm','Tickle',
 'Awkward silence','Nostalgia','Vibe','Momentum','Etiquette','Placebo','Common sense','Chemistry',
 'Timing','Charisma','Coincidence','Instinct','Taste','Karma',
 'Boredom','Patience','Trust','Habit','Routine','Silence','Curiosity','Regret','Hope','Doubt','Pride','Gut feeling']},

{id:'hard',n:'Hard to say',e:'😬',c:'#A0522D',lang:'en',k:[
 'Bidet','Fanny pack','Crocs','Ferret','Segway','Mime','Yodelling','Sock puppet','Tanning bed',
 'Neck pillow','Colonoscopy','Novelty tie','Speedo','Leaf blower','Cheese grater','Foot spa',
 'Snuggie','Nose hair trimmer','Mankini','Fake tan','Comb-over','Denture glue','Ear wax','Nose whistle',
 'Toe fungus','Ear plugs','Nose spray','Compression socks','Back scratcher','Hair net','Shower cap','Pill organiser','Belly button','Armpit','Double chin','Loud chewing']},

{id:'feel',n:'Feelings',e:'😌',c:'#8E44AD',lang:'en',k:[
 'Brain freeze','Static shock','Song stuck in your head','Falling-asleep lurch','Phantom phone buzz',
 'Contagious yawn','Sunday dread','Post-haircut regret','Hangry','Second wind','Food coma',
 'Butterflies','Itchy label','Sudden dread about nothing','Relief','Stage fright','Homesick',
 'Bored in a queue','Waiting for results','Nearly falling asleep','Peaceful morning','Jealousy',
 'Restless legs','Overthinking',
 'Deja vu','Cold sweat','Nervous laugh','Sudden calm','Guilt','Excitement','Impatience','Relief after a test','Missing someone','First day nerves','Being watched','Falling in love']},

{id:'impressions',n:'Impressions',e:'🗣️',c:'#9B59B6',lang:'en',k:[
 'Robot voice','Whisper','Opera voice','Baby talk','News reader','Sports commentator','Pirate',
 'Cowboy','Angry boss','Tour guide','GPS voice','Drill sergeant','Ghost voice','Slow motion talk',
 'Radio DJ','Fake laugh','Sarcastic tone','Stadium announcer','Nervous speech','Nature narrator',
 'Airport announcement','Grumpy neighbour','Excited child','Telemarketer',
 'Robot','Old man','Toddler','Politician','Movie villain','Football fan','Yoga teacher','Air steward','Waiter','Sat nav rerouting','Bad singer','Weather presenter']},

{id:'characters',n:'Fictional characters',e:'🧙',c:'#D35400',lang:'en',k:[
 'Sherlock Holmes','Robin Hood','Dracula','Cinderella','Pinocchio','Tarzan','Peter Pan',
 'Frankenstein','Alice in Wonderland','Mowgli','Snow White','Don Quixote','Hercules','King Arthur',
 'Little Mermaid','Rapunzel','Aladdin','Gulliver','Scrooge','Sleeping Beauty','Three Musketeers',
 'Moby Dick','Pied Piper','Ugly Duckling','Humpty Dumpty','Tin Man',
 'Robinson Crusoe','Oliver Twist','Long John Silver','Wizard of Oz','Ebenezer Scrooge','Baba Yaga','Thumbelina','Puss in Boots','Jack and the Beanstalk','Goldilocks','Three Little Pigs','Red Riding Hood']},

{id:'heroes',n:'Heroes & villains',e:'🦸',c:'#0984E3',lang:'en',k:[
 'Superhero cape','Secret identity','Sidekick','Villain lair','Superpower','Invisibility',
 'Time travel','Mind reading','Force field','Mask','Origin story','Evil laugh','World domination',
 'Daring rescue','Super strength','Utility belt','Comic book','Plot twist','Arch-enemy','Henchman',
 'Secret base','Distress signal','Shape shifting','Sworn revenge',
 'Secret hideout','Sworn oath','Chosen one','Nemesis','Superhero landing','Alter ego','Sacrifice','Rescue mission','Villain monologue','Cursed object','Hidden weakness','Team of heroes']},

{id:'myth',n:'Myths & legends',e:'🐉',c:'#5F27CD',lang:'en',k:[
 'Zeus','Thor','Medusa','Minotaur','Dragon','Unicorn','Mermaid','Phoenix','Troll','Sphinx','Fairy',
 'Giant','Kraken','Yeti','Ghost ship','Cyclops','Elf','Werewolf','Genie','Curse','Wishing well',
 'Sea monster','Magic wand','Crystal ball',
 'Griffin','Centaur','Chimera','Poseidon','Hades','Valkyrie','Golden fleece','Trojan horse','Excalibur','Ambrosia','Fountain of youth','Loch Ness monster']},

{id:'history',n:'History',e:'📜',c:'#8B6914',lang:'en',k:[
 'Vikings','Knight','Castle siege','Cave painting','Steam engine','Berlin Wall','Pirate ship',
 'Samurai','Silk Road','Gold rush','Ancient Rome','Trench','Telegraph','Explorer','Archaeology',
 'Time capsule','Coronation','Shipwreck','Treaty','Pharaoh','Crusade','Printing press',
 'Industrial revolution','Moon race','Plague doctor','Guillotine','Chariot','Cold War',
 'Stone age','Bronze age','Middle ages','Renaissance art','Great fire','Wooden ship','Horse and cart','Oil lamp','Handwritten letter','Town crier','Blacksmith','Windmill','Fortress','Sailing map','Old coin','Family tree']},

{id:'famous',n:'Famous people',e:'👤',c:'#C0392B',lang:'en',k:[
 'Albert Einstein','Cleopatra','Leonardo da Vinci','Marie Curie','Napoleon','Shakespeare','Gandhi',
 'Mozart','Frida Kahlo','Charlie Chaplin','Amelia Earhart','Nikola Tesla','Julius Caesar','Beethoven',
 'Vincent van Gogh','Isaac Newton','Joan of Arc','Christopher Columbus','Florence Nightingale',
 'Galileo','Alexander the Great','Anne Frank','Neil Armstrong','Pablo Picasso','Charles Darwin',
 'Mother Teresa','Genghis Khan','Wright brothers',
 'Marco Polo','Rosa Parks','Alfred Nobel','Ada Lovelace','Winston Churchill','Martin Luther King','Leonhard Euler','Marie Antoinette','Charlie Parker','Ernest Hemingway','Jane Austen','Salvador Dali','Andy Warhol','Stephen Hawking','Wolfgang Amadeus','Louis Armstrong']},

{id:'crime',n:'Crime & mystery',e:'🕵️',c:'#2C3A47',lang:'en',k:[
 'Fingerprint','Alibi','Getaway car','Magnifying glass','Witness','Handcuffs','Stakeout','Disguise',
 'Secret code','Hidden safe','Police siren','Interrogation','Cold case','Red herring','Detective board',
 'Locked room','Smuggling','Undercover','Prison break','Ransom note','Lie detector','Crime scene tape',
 'Bank heist','Whodunnit',
 'Security camera','Suspicious neighbour','Missing person','Mysterious letter','Locked drawer','Secret passage','Break-in','Getaway driver','Bounty','Undercover badge','Trail of clues','Twist ending']},

{id:'retro',n:'90s & 00s',e:'📼',c:'#C97A12',lang:'en',k:[
 'VHS tape','Cassette','Floppy disk','Tamagotchi','MSN Messenger','Walkman','Polaroid','Nokia 3310',
 'CD player','Rollerblades','Video rental','Landline phone','Chat room','Screensaver',
 'Disposable camera','Burning a CD','Dial-up internet','Winamp','Text message','Ringtone',
 'Fax machine','Overhead projector','Encyclopedia set','Pager','Film roll','Answering machine',
 'Bubblegum card','Portable CD','Chunky monitor','Modem screech','Poster on the wall','Mixtape','Video store late fee','Instant messenger away message','Snake game','Camcorder','Pocket calculator','Scrunchie']},

{id:'christmas',n:'Christmas',e:'🎄',c:'#C0392B',lang:'en',k:[
 'Advent calendar','Mistletoe','Gingerbread','Santa','Reindeer','Christmas tree','Wrapping paper',
 'Carol singing','Snowball fight','Mulled wine','Tinsel','Secret Santa','Sledging','Christmas jumper',
 'Roast dinner','Fireplace','Winter boots','Fireworks','Advent candle','Nativity play',
 'Christmas market','Last-minute present','Family argument','Leftover turkey','Fairy lights','Chimney',
 'Snow globe','Christmas card','Log fire','Candy cane','Bauble','Angel on top','Turkey dinner','Present queue','Christmas film','Sledge ride','Reindeer bells','Frosty window']},

{id:'halloween',n:'Halloween',e:'🎃',c:'#E58E26',lang:'en',k:[
 'Pumpkin','Ghost','Vampire','Witch','Skeleton','Haunted house','Trick or treat','Spider web',
 'Zombie','Black cat','Costume','Full moon','Scarecrow','Graveyard','Mummy','Cauldron','Jump scare',
 'Fake blood','Creaky stairs','Candle in a window','Broomstick','Fangs','Howling','Sweet bucket',
 'Cobweb','Bat wing','Cauldron bubble','Fake spider','Creepy laugh','Torch under chin','Costume shop','Trick','Bag of sweets','Scary story','Pumpkin carving','Midnight']},

{id:'summer',n:'Summer',e:'🏖️',c:'#C98A17',lang:'en',k:[
 'Sandcastle','Ice lolly','Sunglasses tan line','Barbecue','Hammock','Flip-flops','Mosquito bite',
 'Beach ball','Sunscreen','Lake swim','Festival wristband','Camping tent','Watermelon slice',
 'Garden hose','Midnight sun','Bonfire','Picnic blanket','Wasp at lunch','Sunset walk','Cold shower',
 'Paddling pool','Sunburnt shoulders',
 'Ice cold drink','Beach towel','Sun lounger','Flippers','Suncream stripe','Melting tarmac','Open window','Evening swim','Bike ride','Long day','Berry stains','Camping stove']},

{id:'winter',n:'Winter',e:'⛄',c:'#4A69BD',lang:'en',k:[
 'Snowman','Ice skating','Scraping the windscreen','Sledge','Icicle','Woolly hat','Hot drink outside',
 'Frozen fingers','Snow shovel','Slippery pavement','Skiing','Fireplace evening','Static hair',
 'Thermal socks','Steamy windows','Snow angel','Dark afternoon','Salted roads','Snow boots',
 'Frost on the window','Sauna after skiing','Blanket on the sofa',
 'Frozen lake','Snow chains','Warm socks','Steaming mug','Icy path','Snowplough','Christmas lights','Early sunset','Frosty breath','Ski lift','Winter coat','Hot soup']},

{id:'singers',n:'Singers',e:'🎤',c:'#B5179E',lang:'en',k:[
 'Freddie Mercury','Whitney Houston','Frank Sinatra','Bob Marley','Amy Winehouse','Johnny Cash',
 'Aretha Franklin','David Bowie','Michael Jackson','Tina Turner','Ray Charles','Bob Dylan',
 'Nina Simone','Luciano Pavarotti','Edith Piaf','Louis Armstrong','Janis Joplin','Prince',
 'Ella Fitzgerald','Stevie Wonder','Elton John','Freddie on stage','Backing singer','Voice coach',
 'Falsetto note','Long held note','Shower singer','Choir soloist']},

{id:'popstars',n:'Pop stars',e:'⭐',c:'#F72585',lang:'en',k:[
 'Beyonce','Taylor Swift','Ed Sheeran','Adele','Rihanna','Lady Gaga','Dua Lipa','Bruno Mars',
 'Justin Bieber','Ariana Grande','Harry Styles','Billie Eilish','Shakira','Coldplay','ABBA',
 'Spice Girls','Backstreet Boys','Britney Spears','Katy Perry','The Weeknd','Doja Cat',
 'Stadium tour','Number one single','Music video','Album drop','Fan army','Comeback single',
 'Award speech']},

{id:'eurovision',n:'Eurovision',e:'🇪🇺',c:'#3A0CA3',lang:'en',k:[
 'Twelve points','Semi-final','Green room','Wind machine','Key change','Costume reveal',
 'National jury','Televote','Interval act','Host country','Scoreboard','Postcard clip',
 'Backing dancers','Pyrotechnics','Novelty act','Power ballad','Language switch','Flag waving',
 'Grand final','Nul points','Winning reprise','Eurovision party','Bookmakers favourite',
 'Song about peace','Glitter cannon','Voting sequence','Neighbourly voting','Trophy microphone',
 'ABBA','Waterloo','Celine Dion','Lordi','Hard Rock Hallelujah','Conchita Wurst',
 'Rise Like a Phoenix','Loreen','Euphoria','Alexander Rybak','Fairytale','Lena','Satellite',
 'Mans Zelmerlow','Heroes','Netta','Toy','Maneskin','Duncan Laurence','Arcade','Kalush Orchestra',
 'Stefania','Kaarija','Cha Cha Cha','Nemo','The Code','Verka Serduchka','Dana International',
 'Bucks Fizz','Brotherhood of Man','Johnny Logan','Riverdance','Ireland seven wins',
 'Big Five','Sweden hosting again','Australia competing','Interval act steals the show',
 'Song in a made-up language','Hamster wheel staging','Milkshake prop','Giant dress reveal',
 'Douze points from the jury','Eesti Laul','Tanel Padar and Dave Benton','2002 Tallinn']},

{id:'internet',n:'Internet culture',e:'🌐',c:'#4361EE',lang:'en',k:[
 'Meme','Viral video','Cat video','Doomscrolling','Unboxing video','Comment section','Troll',
 'Clickbait','Influencer','Sponsored post','Live stream','Follower count','Hashtag','Filter',
 'Story reply','Group admin','Spam folder','Fake news','Autoplay','Infinite scroll','Reaction video',
 'Tutorial skips the hard part','Recipe blog life story','Unread notifications','Screen time report',
 'Blocked account','Deleted post','Typo in a text','Read receipt','Left on read']},

{id:'smells',n:'Smells & tastes',e:'👃',c:'#9C6644',lang:'en',k:[
 'Fresh bread','Cut grass','Petrol','Rain on hot tarmac','Wet dog','New book','Old library',
 'Bonfire smoke','Coffee grounds','Chlorine','Vinegar','Cinnamon','Sea air','Hospital corridor',
 'New car','Sunscreen','Mothballs','Burnt hair','Fresh laundry','Bitter','Sour','Salty','Spicy',
 'Umami','Metallic taste','Menthol','Stale air','Damp basement','Pine forest','Nail polish remover']},

{id:'wedding',n:'Weddings',e:'💍',c:'#D81159',lang:'en',k:[
 'Bouquet toss','First dance','Best man speech','Ring bearer','Wedding cake','Vows','Confetti',
 'Something borrowed','Seating plan','Open bar','Wedding photographer','Church bells','Honeymoon',
 'Bridal party','Cold feet','Reception dinner','Wedding crasher','Slow song','Family photo',
 'Late RSVP','Dress fitting','Grandma dancing','Toast gone long','Sparkler exit','Rain on the day',
 'Two left feet']},

{id:'shop',n:'Supermarket',e:'🛒',c:'#0B7A75',lang:'en',k:[
 'Shopping trolley','Self checkout','Trolley with a bad wheel','Loyalty card','Reduced sticker',
 'Sample stand','Freezer aisle','Queue at the till','Forgotten item','Bag for life','Barcode scan',
 'Price check','Trolley coin','Basket overflow','Buying while hungry','Fruit weighing','Bakery smell',
 'Closing time announcement','Deposit bottles','Trolley return','Wrong aisle','Impulse buy',
 'Checkout chocolate','Out of stock']},

{id:'doctor',n:'At the doctor',e:'🩺',c:'#2A9D8F',lang:'en',k:[
 'Waiting room','Stethoscope','Blood pressure cuff','Say aaah','Prescription','Plaster',
 'Bandage','Thermometer','Reflex hammer','Eye chart','Crutches','Wheelchair','X-ray',
 'Hospital gown','Appointment card','Second opinion','Flu shot','Dentist chair','Dental floss',
 'Sitting very still','Nurse call button','Waiting for results','White coat','Cotton wool']},

{id:'restaurant',n:'Restaurant',e:'🍽️',c:'#BC4749',lang:'en',k:[
 'Menu','Specials board','Waiter','Table for two','Reservation','Tip','Bill','Wine list',
 'Bread basket','Napkin','Candle on the table','Open kitchen','Takeaway box','Delivery driver',
 'Kids menu','Dessert trolley','Wrong order','Long wait','Loud table nearby','Table by the window',
 'Sharing plates','Chef recommendation','Cutlery drop','Splitting the starter']},

{id:'camping',n:'Camping',e:'🏕️',c:'#386641',lang:'en',k:[
 'Tent pegs','Sleeping bag','Camp fire','Marshmallow on a stick','Head torch','Backpack','Compass',
 'Trail map','Mosquito net','Camping stove','Cool box','Air mattress','Wet socks','Firewood',
 'Bear-proof box','River crossing','Hiking boots','Blister','Sunrise from a hill','Rain on the tent',
 'Lost trail marker','Bird waking you up','Instant coffee outdoors','Packing up wet']},

{id:'pets',n:'Pets',e:'🐕',c:'#E76F51',lang:'en',k:[
 'Dog lead','Cat scratching post','Litter tray','Fetch','Wagging tail','Vet visit','Dog park',
 'Purring','Chewed shoe','Hamster wheel','Aquarium','Parrot talking','Bird cage','Puppy training',
 'Cat on the keyboard','Muddy paws','Dog begging at the table','Fur on clothes','Pet name',
 'Feeding time','Walkies','Cat in a box','Vet bill','Rescue shelter']},

{id:'dinos',n:'Dinosaurs',e:'🦕',c:'#606C38',lang:'en',k:[
 'Tyrannosaurus','Triceratops','Velociraptor','Stegosaurus','Brachiosaurus','Pterodactyl',
 'Fossil dig','Amber','Meteor impact','Extinction','Dinosaur egg','Footprint in stone',
 'Palaeontologist','Museum skeleton','Tar pit','Ice age','Mammoth','Sabre-tooth cat',
 'Giant fern','Prehistoric swamp','Bone brush','Excavation site']},

{id:'luck',n:'Superstitions',e:'🍀',c:'#588157',lang:'en',k:[
 'Four-leaf clover','Black cat crossing','Broken mirror','Walking under a ladder','Knock on wood',
 'Lucky number','Horseshoe','Wishbone','Crossed fingers','Friday the thirteenth','Wishing well',
 'Birthday wish','Shooting star wish','Salt over the shoulder','Rabbit foot','Fortune cookie',
 'Palm reading','Tarot cards','Lucky socks','Beginner\u2019s luck','Bad omen','Spilled salt']},

{id:'pocket',n:'In your pocket',e:'👖',c:'#7F5539',lang:'en',k:[
 'Crumpled receipt','Loose coins','Old bus ticket','Chewing gum wrapper','Lint','House key',
 'Lip balm','Broken headphone','Phone','Hair tie','Bottle cap','Paper clip','Folded note',
 'Cinema ticket','Sweet wrapper','Sunglasses case','Tissue','Pen without a lid','Rubber band',
 'Coat check tag','Note in an old coat']},

{id:'gym',n:'Gym',e:'🏋️',c:'#3D348B',lang:'en',k:[
 'Treadmill','Dumbbell','Yoga mat','Skipping rope','Rowing machine','Personal trainer','Locker key',
 'Water bottle','Sweat towel','Protein shake','Warm-up','Cool down','Sore muscles','Step counter',
 'Spin class','Gym membership in January','Mirror selfie','Someone hogging the bench',
 'Wrong technique','Rest day','New year resolution','Stretching','Kettlebell','Running playlist']},

{id:'chores',n:'Chores',e:'🧹',c:'#5A5A72',lang:'en',k:[
 'Washing up','Hoovering','Taking out the bin','Folding laundry','Making the bed','Mopping',
 'Dusting','Cleaning the oven','Changing bed sheets','Watering plants','Mowing the lawn',
 'Raking leaves','Shovelling snow','Washing windows','Sorting recycling','Defrosting the freezer',
 'Scrubbing the bath','Ironing','Putting things back','Nobody else did it']},

{id:'madonna',n:'Madonna',e:'🎙️',c:'#8E1B4C',lang:'en',k:[
 'Like a Virgin','Material Girl','Vogue','Papa Dont Preach','La Isla Bonita','Holiday',
 'Into the Groove','Express Yourself','Ray of Light','Frozen','Hung Up','Four Minutes',
 'Borderline','Crazy for You','Lucky Star','Cherish','Take a Bow','Beautiful Stranger',
 'Die Another Day','Living for Love','Music','Justify My Love','Like a Prayer','Bad Girl',
 'Cone bra','Blond Ambition tour','Queen of Pop','Evita','Desperately Seeking Susan',
 'Fingerless gloves','Lace gloves','Truth or Dare','Celebration tour','Super Bowl halftime',
 'Vogue hand dance','Eighties MTV','Reinvention','Michigan girl','Bleached eyebrows',
 'Cowboy hat era','Wedding dress on stage','Backing dancers in suits']},

{id:'memes',n:'Famous memes',e:'😹',c:'#6D28D9',lang:'en',k:[
 'Distracted Boyfriend','Doge','Grumpy Cat','Rickroll','Nyan Cat','This Is Fine',
 'Woman Yelling at a Cat','Success Kid','Bad Luck Brian','Philosoraptor','Keyboard Cat',
 'Trollface','Hide the Pain Harold','Confused Math Lady','Roll Safe','Two Buttons',
 'Expanding Brain','Change My Mind','Is This a Pigeon','Stonks','Facepalm','Screaming Goat',
 'Dancing Baby','Double Rainbow','Numa Numa','Leeroy Jenkins','Dramatic Chipmunk',
 'Harlem Shake','Gangnam Style','Planking','Ice Bucket Challenge','Left Shark','Salt Bae',
 'Ok Boomer','Rage Comic','Slow Clap','Deal With It Sunglasses','One Does Not Simply',
 'Awkward Penguin','Overly Attached','First World Problems','Mocking Text Case']},

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
 'Kojujõudmine pärast tööd','Kevadine lumesulamine','Kuum saun ja külm järv','Pikk pühade laud',
 'Esimene lumi','Rannahooaeg kaks nädalat','Tuul Pirita rannas','Kohvipaus tööl',
 'Pikk järjekord Ülemistes','Kevadine allergiahooaeg','Sügisene pimedus kell viis',
 'Naabri koer haugub','Jaanipäeva vihm','Bussipeatuses ootamine','Talveriiete väljavõtmine',
 'Suvine valge öö']}

];
