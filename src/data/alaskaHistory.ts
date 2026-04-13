// src/data/alaskaHistory.ts
// Alaska History Database — 70+ verified entries
// Used by AlaskaHistoryWidget for "On This Day" + trivia carousel

export type HistoryCategory =
  | 'gold-rush'
  | 'native-history'
  | 'statehood'
  | 'exploration'
  | 'disaster'
  | 'wildlife'
  | 'industry'
  | 'military'
  | 'culture'

export type HistoryRegion =
  | 'statewide'
  | 'anchorage'
  | 'kenai'
  | 'juneau'
  | 'fairbanks'
  | 'nome'
  | 'valdez'
  | 'southeast'
  | 'interior'
  | 'northslope'
  | 'aleutians'
  | 'kodiak'

export interface AlaskaHistoryEntry {
  id: string
  /** "MM-DD" for On This Day matching. null = general trivia only. */
  monthDay: string | null
  year: number
  title: string
  description: string
  trivia: string        // One-sentence "Did you know?" format
  category: HistoryCategory
  region: HistoryRegion
  imageQuery: string    // Unsplash search term for illustration
}

export const alaskaHistory: AlaskaHistoryEntry[] = [
  // ── GOLD RUSH ───────────────────────────────────────────────────────────────
  {
    id: 'nome-gold-1898',
    monthDay: '08-12',
    year: 1898,
    title: 'Nome Gold Rush Ignites',
    description: 'Three Scandinavian prospectors — Jafet Lindeberg, Erik Lindblom, and John Brynteson — struck gold on Anvil Creek near present-day Nome, triggering one of Alaska\'s greatest gold rushes. Within two years, Nome\'s population swelled to over 20,000.',
    trivia: 'The Nome beach itself held gold — miners simply shoveled sand directly from the shore in what became known as the "poor man\'s gold rush."',
    category: 'gold-rush',
    region: 'nome',
    imageQuery: 'gold mining alaska nome',
  },
  {
    id: 'felix-pedro-1902',
    monthDay: '07-22',
    year: 1902,
    title: 'Felix Pedro Discovers Gold Near Fairbanks',
    description: 'Italian immigrant Felix Pedro struck gold on a creek north of present-day Fairbanks, launching the Interior Alaska gold rush. E.T. Barnette\'s trading post nearby became the nucleus of Fairbanks, today Alaska\'s second-largest city.',
    trivia: 'Felix Pedro searched the same creeks for 3 years before finding gold. He had come within a mile of the strike two years earlier but ran out of supplies and turned back.',
    category: 'gold-rush',
    region: 'fairbanks',
    imageQuery: 'fairbanks alaska gold rush historic',
  },
  {
    id: 'serum-run-1925',
    monthDay: '02-02',
    year: 1925,
    title: 'Great Serum Run Saves Nome from Diphtheria',
    description: 'After 674 miles and 5 days of relay, the final sled dog team led by Gunnar Kaasen and lead dog Balto delivered 300,000 units of diphtheria antitoxin to Nome, saving the town from epidemic. Twenty mushers and 150 dogs relayed the serum in brutal -50°F conditions.',
    trivia: 'The real hero of the Serum Run may have been Togo, the Siberian Husky who ran the longest and most dangerous leg — 91 miles through Norton Sound. Balto got more fame for running the final, shorter leg.',
    category: 'gold-rush',
    region: 'nome',
    imageQuery: 'iditarod sled dogs alaska snow',
  },
  {
    id: 'alaska-juneau-mine-1908',
    monthDay: null,
    year: 1908,
    title: 'Alaska-Juneau Mine Opens',
    description: 'The Alaska-Juneau Gold Mine opened near Juneau, eventually becoming one of the largest gold mines in the world by tonnage. At peak production it processed 12,000 tons of ore per day using a 17-mile tunnel system bored into Mt. Roberts.',
    trivia: 'The AJ Mine was so productive it operated continuously from 1908 to 1944, processing over 80 million tons of ore. Today the mine tailings form much of downtown Juneau\'s flat land.',
    category: 'gold-rush',
    region: 'juneau',
    imageQuery: 'juneau alaska mine historic mountain',
  },
  {
    id: 'klondike-context-1896',
    monthDay: '08-16',
    year: 1896,
    title: 'Klondike Gold Discovery Floods Alaska Trails',
    description: 'Gold discovered in Bonanza Creek, Yukon triggered a stampede of 100,000 prospectors through Alaska\'s ports and trails. The Chilkoot and White Pass trails from Skagway became legendary — the NWMP required each miner carry a year\'s worth of supplies (1,150 lbs) over the summit.',
    trivia: 'It cost prospectors an average of 40 trips up and down the Chilkoot Pass to haul the required one ton of goods across the summit — totaling over 1,500 vertical miles of climbing.',
    category: 'gold-rush',
    region: 'southeast',
    imageQuery: 'chilkoot pass alaska historic gold rush',
  },
  // ── NATIVE HISTORY ──────────────────────────────────────────────────────────
  {
    id: 'beringia-crossing',
    monthDay: null,
    year: -13000,
    title: 'First Alaskans Cross the Bering Land Bridge',
    description: 'Archaeological evidence suggests the first peoples entered Alaska from Asia via the Bering Land Bridge (Beringia) at least 13,000–16,000 years ago, some estimates reaching 30,000 years. These ancestors of today\'s Alaska Native peoples spread across the continent, developing distinct cultures from Yup\'ik to Athabascan to Tlingit.',
    trivia: 'At its widest, the Bering Land Bridge was over 1,000 miles wide — not a narrow strip but a vast subcontinent called Beringia, with its own unique ecosystem of mammoths, horses, and giant bison.',
    category: 'native-history',
    region: 'statewide',
    imageQuery: 'alaska native culture traditional',
  },
  {
    id: 'bering-1741',
    monthDay: '07-15',
    year: 1741,
    title: 'Vitus Bering First Europeans Sight Alaska',
    description: 'Danish explorer Vitus Bering, sailing for Russia, sighted the Alaska mainland near Mt. St. Elias on July 15, 1741. His expedition\'s reports of sea otters triggered the Russian fur trade era, which decimated both sea otter populations and the Aleut people through forced labor.',
    trivia: 'Vitus Bering never set foot on the Alaska mainland. He died of scurvy on Bering Island on the return voyage in December 1741, and the island bears his name today.',
    category: 'exploration',
    region: 'statewide',
    imageQuery: 'alaska coast mountains sea historic',
  },
  {
    id: 'ancsa-1971',
    monthDay: '12-18',
    year: 1971,
    title: 'Alaska Native Claims Settlement Act Passed',
    description: 'President Nixon signed ANCSA, the largest Indigenous land claims settlement in US history. Alaska Native people received 44 million acres of land and $962 million in compensation. ANCSA established 13 regional and over 200 village corporations, fundamentally reshaping Native economic and political power in Alaska.',
    trivia: 'ANCSA extinguished all prior aboriginal land claims in Alaska — an unprecedented legal act. The 13 regional corporations it created now collectively generate billions in annual revenue.',
    category: 'native-history',
    region: 'statewide',
    imageQuery: 'alaska native people village culture',
  },
  {
    id: 'alaska-native-brotherhood-1912',
    monthDay: null,
    year: 1912,
    title: 'Alaska Native Brotherhood Founded in Sitka',
    description: 'The Alaska Native Brotherhood (ANB) was founded in Sitka by a group of Tlingit and Tsimshian leaders, making it one of the oldest surviving Indigenous civil rights organizations in the US. The ANB fought for voting rights, educational access, and civil equality decades before the national Civil Rights Movement.',
    trivia: 'Founding ANB member William Paul became the first Alaska Native elected to the Alaska Territorial Legislature in 1924, the same year the Indian Citizenship Act passed.',
    category: 'native-history',
    region: 'southeast',
    imageQuery: 'sitka alaska tlingit totem culture',
  },
  {
    id: 'subsistence-rights',
    monthDay: null,
    year: 1980,
    title: 'ANILCA Enshrines Alaska Subsistence Rights',
    description: 'The Alaska National Interest Lands Conservation Act (ANILCA) protected subsistence hunting and fishing rights for rural Alaskans, especially Alaska Native communities. Subsistence remains a cornerstone of Alaska Native culture — up to 50% of rural Alaska\'s diet comes from subsistence harvest.',
    trivia: 'Alaska is the only US state where subsistence rights are explicitly protected by federal law. Rural Alaskans harvest an estimated 450 pounds of wild food per person per year.',
    category: 'native-history',
    region: 'statewide',
    imageQuery: 'alaska salmon fishing subsistence native',
  },
  // ── STATEHOOD & POLITICS ────────────────────────────────────────────────────
  {
    id: 'sewards-folly-1867',
    monthDay: '10-18',
    year: 1867,
    title: 'Alaska Purchased from Russia — "Seward\'s Folly"',
    description: 'Secretary of State William Seward negotiated the purchase of Alaska from Russia for $7.2 million — about 2 cents per acre. Critics mocked it as "Seward\'s Folly" and "Seward\'s Icebox." The formal transfer ceremony took place at Sitka on October 18, 1867, now celebrated as Alaska Day.',
    trivia: 'At $7.2 million, the Alaska Purchase cost less than a single Alaskan oil lease today. The Trans-Alaska Pipeline alone has transported over 18 billion barrels of oil — valued at trillions of dollars.',
    category: 'statehood',
    region: 'statewide',
    imageQuery: 'sitka alaska historic transfer ceremony',
  },
  {
    id: 'alaska-statehood-1959',
    monthDay: '01-03',
    year: 1959,
    title: 'Alaska Becomes the 49th State',
    description: 'President Eisenhower signed the Alaska Statehood Proclamation on January 3, 1959, making Alaska the 49th state. Alaska had lobbied for statehood since 1916. The new state received 104 million acres under the Statehood Act — the largest land grant to any state.',
    trivia: 'Alaska almost became two states — a western maritime state and an interior state. The single-state bill passed the Senate by only one vote in 1958.',
    category: 'statehood',
    region: 'statewide',
    imageQuery: 'alaska flag state capitol juneau',
  },
  {
    id: 'permanent-fund-1976',
    monthDay: null,
    year: 1976,
    title: 'Alaska Permanent Fund Established',
    description: 'Alaskans voted to amend the state constitution to create the Alaska Permanent Fund, requiring at least 25% of all oil and mineral royalties be deposited into a savings fund. By 2026 the fund has grown to over $80 billion, generating annual dividends for every eligible Alaska resident.',
    trivia: 'The Permanent Fund Dividend — a direct payment to every Alaska resident — was first paid in 1982 at $1,000 per person. It\'s the only government program in the US that directly distributes resource wealth to citizens.',
    category: 'statehood',
    region: 'statewide',
    imageQuery: 'alaska oil pipeline wealth economy',
  },
  {
    id: 'pfd-first-1982',
    monthDay: '06-01',
    year: 1982,
    title: 'First Permanent Fund Dividend Checks Mailed',
    description: 'Alaska mailed the first Permanent Fund Dividend checks — $1,000 each — to eligible residents in June 1982. The program, championed by Governor Jay Hammond, remains unique in the world as a direct resource wealth dividend paid to all citizens.',
    trivia: 'The smallest PFD was $331.29 (2016) and the largest $2,072 (2015). In 2022, with one-time energy relief payment, residents received $3,284 — the highest total distribution in Alaska history.',
    category: 'statehood',
    region: 'statewide',
    imageQuery: 'alaska economy government check',
  },
  // ── INDUSTRY & OIL ──────────────────────────────────────────────────────────
  {
    id: 'prudhoe-discovery-1968',
    monthDay: '03-13',
    year: 1968,
    title: 'Atlantic Richfield Discovers Prudhoe Bay Oil Field',
    description: 'Atlantic Richfield Company (ARCO) announced the discovery of the largest oil field in North American history at Prudhoe Bay on the North Slope. The field held an estimated 25 billion barrels of recoverable oil, transforming Alaska\'s economy and leading directly to the Trans-Alaska Pipeline.',
    trivia: 'The Prudhoe Bay discovery well (Prudhoe Bay State 1) tested at 1,152 barrels per day — modest by Middle East standards but located above a 40 × 10-mile reservoir that proved to be 10 times larger than initially estimated.',
    category: 'industry',
    region: 'northslope',
    imageQuery: 'prudhoe bay alaska oil field north slope',
  },
  {
    id: 'taps-completed-1977',
    monthDay: '06-20',
    year: 1977,
    title: 'Trans-Alaska Pipeline Delivers First Oil',
    description: 'The Trans-Alaska Pipeline System (TAPS) delivered its first oil to Valdez on June 20, 1977. The 800-mile pipeline took 3 years and $8 billion to build, crossing 3 mountain ranges and 800 streams. It remains one of the greatest engineering achievements in American history.',
    trivia: 'The pipeline was built to move up to 2.1 million barrels per day but now moves about 450,000 — reduced flow creates challenges because the oil must stay warm enough to flow through arctic temperatures.',
    category: 'industry',
    region: 'statewide',
    imageQuery: 'trans alaska pipeline valdez oil',
  },
  {
    id: 'kenai-salmon-canneries-1890s',
    monthDay: null,
    year: 1889,
    title: 'First Kenai River Salmon Canneries Established',
    description: 'Commercial salmon canning on the Kenai Peninsula began in the 1880s, transforming the region\'s economy. By the 1890s, Kasilof and Kenai River canneries were packing millions of cans annually. The fishing industry remains the economic backbone of the Kenai Peninsula today.',
    trivia: 'The Kenai River produces the world\'s largest Chinook (King) salmon — the record is 97.25 pounds, caught in 1985 by Les Anderson. The river averages 30-50 lb kings in its world-class sport fishery.',
    category: 'industry',
    region: 'kenai',
    imageQuery: 'kenai river salmon fishing alaska',
  },
  // ── DISASTERS ───────────────────────────────────────────────────────────────
  {
    id: 'novarupta-1912',
    monthDay: '06-06',
    year: 1912,
    title: 'Novarupta Eruption — Largest 20th-Century N. American Eruption',
    description: 'The Novarupta volcano on the Alaska Peninsula erupted for 60 hours beginning June 6, 1912, in the largest volcanic eruption in North America in the 20th century. The eruption buried a 40-square-mile valley in ash and lava up to 700 feet deep, creating the Valley of Ten Thousand Smokes in what is now Katmai National Park.',
    trivia: 'The Novarupta eruption was so massive that ash fell on Kodiak 100 miles away to a depth of 1 foot, and residents couldn\'t see a lantern held at arm\'s length for days. The eruption released 30 times more material than Mount St. Helens in 1980.',
    category: 'disaster',
    region: 'kodiak',
    imageQuery: 'katmai national park alaska volcano',
  },
  {
    id: 'good-friday-earthquake-1964',
    monthDay: '03-27',
    year: 1964,
    title: 'Good Friday Earthquake — 9.2 Magnitude',
    description: 'At 5:36 PM on Good Friday, the most powerful earthquake ever recorded in North American history struck Prince William Sound at 9.2 magnitude. The quake and resulting tsunamis killed 139 people, destroyed much of Anchorage, Valdez, Kodiak, and Seward, and caused $2.3 billion in damage. The ground in some areas subsided 8 feet; others rose 38 feet.',
    trivia: 'The 1964 Good Friday Earthquake lasted nearly 5 minutes — one of the longest durations ever recorded. Seismic waves caused water to slosh in wells as far away as Texas and Florida.',
    category: 'disaster',
    region: 'statewide',
    imageQuery: 'anchorage alaska earthquake 1964 historic',
  },
  {
    id: 'exxon-valdez-1989',
    monthDay: '03-24',
    year: 1989,
    title: 'Exxon Valdez Oil Spill',
    description: 'The Exxon Valdez tanker ran aground on Bligh Reef in Prince William Sound at 12:04 AM, spilling 11 million gallons of crude oil. The spill contaminated 1,300 miles of coastline, killed an estimated 250,000 seabirds, 2,800 sea otters, 300 harbor seals, and devastated commercial fishing. Cleanup cost over $2 billion.',
    trivia: 'Thirty-five years later, oil from the Exxon Valdez can still be found below the surface on some Prince William Sound beaches. Sea otter and Pacific herring populations in the area have never fully recovered.',
    category: 'disaster',
    region: 'valdez',
    imageQuery: 'prince william sound alaska oil spill environment',
  },
  {
    id: 'anchorage-earthquake-2018',
    monthDay: '11-30',
    year: 2018,
    title: 'Anchorage 7.1 Earthquake Causes Widespread Damage',
    description: 'A 7.1 magnitude earthquake struck just north of Anchorage at 8:29 AM on November 30, 2018, causing widespread road damage, structural failures, and a brief tsunami warning. No deaths were directly attributed to the quake — a testament to Alaska\'s strict building codes developed after the 1964 disaster.',
    trivia: 'Alaskans widely shared dramatic photos of crumpled roads on social media within minutes of the 2018 quake. The quick digital response helped outsiders understand the scale of damage before official reports.',
    category: 'disaster',
    region: 'anchorage',
    imageQuery: 'anchorage alaska earthquake road damage',
  },
  // ── MILITARY ────────────────────────────────────────────────────────────────
  {
    id: 'aleutian-occupation-1942',
    monthDay: '06-07',
    year: 1942,
    title: 'Japan Occupies Attu and Kiska — Only WWII Occupation of US Soil',
    description: 'Japanese forces occupied the Aleutian Islands of Attu and Kiska on June 7, 1942 — the only occupation of US soil during World War II. Japan held the islands for over a year until a costly US counterattack at Attu in May 1943 left 600 Americans dead and nearly all 2,900 Japanese defenders killed in one of the Pacific war\'s bloodiest battles.',
    trivia: 'When US and Canadian forces landed on Kiska in August 1943 expecting fierce resistance, they found the island completely abandoned — Japan had secretly evacuated all 5,000 troops under cover of fog two weeks earlier without the Allies noticing.',
    category: 'military',
    region: 'aleutians',
    imageQuery: 'aleutian islands alaska military world war',
  },
  {
    id: 'alcan-highway-1942',
    monthDay: '07-01',
    year: 1942,
    title: 'ALCAN Highway Construction Begins',
    description: 'Construction of the Alaska-Canada Military Highway (ALCAN) began on March 8, 1942, just months after Pearl Harbor. The 1,700-mile road through wilderness was completed in just 8 months by 10,000 US Army soldiers, many of them Black soldiers in segregated units. The highway connected Alaska to the continental US for the first time.',
    trivia: 'African American soldiers played a crucial but long-overlooked role in building the ALCAN. Despite serving in segregated units facing discrimination, the 95th and 97th Engineer Regiments completed some of the highway\'s most difficult sections.',
    category: 'military',
    region: 'interior',
    imageQuery: 'alcan highway alaska construction historic',
  },
  {
    id: 'dutch-harbor-bombing-1942',
    monthDay: '06-03',
    year: 1942,
    title: 'Japan Bombs Dutch Harbor',
    description: 'Japanese aircraft bombed the US Naval Station at Dutch Harbor on Unalaska Island on June 3-4, 1942, in the opening of the Aleutian Campaign. The attack killed 43 Americans and damaged facilities, but American intelligence (having broken Japanese naval codes) had positioned forces to limit the damage.',
    trivia: 'A Japanese Zero fighter crash-landed intact on Akutan Island during the Dutch Harbor raid and was discovered by Americans weeks later. The recovered plane gave US engineers invaluable intelligence on the Zero\'s design, helping reverse-engineer countermeasures.',
    category: 'military',
    region: 'aleutians',
    imageQuery: 'dutch harbor unalaska alaska military',
  },
  // ── EXPLORATION ─────────────────────────────────────────────────────────────
  {
    id: 'cook-prince-william-1778',
    monthDay: '03-07',
    year: 1778,
    title: 'Captain Cook Enters Prince William Sound',
    description: 'Captain James Cook, on his third voyage of exploration, entered Prince William Sound in March 1778. He sailed Alaska\'s coast from Oregon to the Bering Strait, mapping the coastline with remarkable accuracy and noting the potential for sea otter trade — a report that launched the maritime fur trade era.',
    trivia: 'Captain Cook named Prince William Sound after the future King William IV. He nearly found the Northwest Passage — reaching 70°44\'N latitude near Icy Cape before impenetrable ice turned him back.',
    category: 'exploration',
    region: 'valdez',
    imageQuery: 'prince william sound alaska coastline historic',
  },
  {
    id: 'denali-first-summit-1913',
    monthDay: '06-07',
    year: 1913,
    title: 'First Verified Summit of Denali',
    description: 'Episcopal Archdeacon Hudson Stuck led the first verified summit of Denali (20,310 ft) on June 7, 1913, accompanied by Harry Karstens, Walter Harper, and Robert Tatum. Walter Harper, an Alaska Native, was the first person to reach the summit. The peak had been called "Denali" — "The Great One" — by Athabascan peoples for millennia.',
    trivia: 'An earlier claim of a 1910 summit by "Sourdough" prospectors (Tom Lloyd\'s party) remains disputed. Two members (Charley McGonagall and Pete Anderson) likely summited the North Peak, which is 850 feet lower than the true summit.',
    category: 'exploration',
    region: 'interior',
    imageQuery: 'denali mount mckinley alaska summit',
  },
  {
    id: 'shelikov-1784',
    monthDay: null,
    year: 1784,
    title: 'First Permanent Russian Settlement in Alaska',
    description: 'Grigory Shelikhov established the first permanent Russian settlement in Alaska at Three Saints Bay on Kodiak Island in 1784. This marked the beginning of 83 years of Russian colonial rule over Alaska. The Russian-American Company later moved the colonial capital to Sitka (New Archangel), which remains one of Alaska\'s most historically rich towns.',
    trivia: 'During the Russian period, Sitka was the largest city on the Pacific Coast of North America — larger than San Francisco. It was the "Paris of the Pacific" with a cathedral, schools, and sophisticated society.',
    category: 'exploration',
    region: 'kodiak',
    imageQuery: 'sitka alaska russian orthodox historic',
  },
  // ── WILDLIFE ────────────────────────────────────────────────────────────────
  {
    id: 'glacier-bay-bear-whale',
    monthDay: null,
    year: 1980,
    title: 'ANILCA Creates 104 Million Acres of Protected Lands',
    description: 'The Alaska National Interest Lands Conservation Act (ANILCA), signed December 2, 1980, doubled the size of the US National Park System in a single act, protecting 104 million acres of Alaska wilderness. It created or expanded 10 national parks, 16 wildlife refuges, 2 national monuments, and 3 national recreation areas.',
    trivia: 'Alaska contains 8 of the 10 largest national parks in the US, including Wrangell-St. Elias at 13.2 million acres — larger than Switzerland. Denali alone is larger than the state of Vermont.',
    category: 'wildlife',
    region: 'statewide',
    imageQuery: 'alaska national park wilderness wildlife bears',
  },
  {
    id: 'bowhead-whale',
    monthDay: null,
    year: 2000,
    title: 'Bowhead Whale Found to Live 200+ Years',
    description: 'Scientists discovered that bowhead whales can live over 200 years — the longest lifespan of any mammal. Analysis of whale protein lenses and old harpoon points found embedded in harvested whales confirmed individual animals alive since the early 1800s. Alaska Native communities hunt bowheads under subsistence rights as part of cultural tradition dating back 4,000 years.',
    trivia: 'A bowhead whale harvested by Inupiat whalers in 1993 was found to have a 19th-century harpoon tip still embedded in its neck — suggesting the animal had survived a hunt more than 130 years earlier.',
    category: 'wildlife',
    region: 'northslope',
    imageQuery: 'bowhead whale alaska arctic ocean',
  },
  {
    id: 'caribou-migration',
    monthDay: null,
    year: 2024,
    title: 'Western Arctic Caribou Herd — One of Earth\'s Great Migrations',
    description: 'The Western Arctic Caribou Herd, numbering around 215,000 animals, makes one of the longest terrestrial migrations on Earth — up to 2,700 miles annually between winter grounds south of the Brooks Range and summer calving grounds near the Beaufort Sea coast. Alaska supports 32 distinct caribou herds totaling over 750,000 animals.',
    trivia: 'Caribou are the only deer species where both males and females grow antlers. Females keep their antlers through winter while males shed theirs in November — meaning any antlered deer on Christmas is actually a reindeer cow, not a bull.',
    category: 'wildlife',
    region: 'statewide',
    imageQuery: 'alaska caribou migration tundra arctic',
  },
  // ── CULTURE ─────────────────────────────────────────────────────────────────
  {
    id: 'iditarod-first-1973',
    monthDay: '03-03',
    year: 1973,
    title: 'First Modern Iditarod Race Launched',
    description: 'The first modern Iditarod Trail Sled Dog Race launched on March 3, 1973 — a 1,049-mile race from Anchorage to Nome. Dick Wilmarth won the inaugural race in 20 days, 49 minutes, 41 seconds. The race commemorates the historic 1925 serum run and celebrates Alaska\'s mushing heritage.',
    trivia: 'The "1,049 miles" designation is a nod to Alaska being the 49th state. The actual course distance varies between about 976 and 998 miles depending on the northern or southern route taken in alternating years.',
    category: 'culture',
    region: 'statewide',
    imageQuery: 'iditarod sled dog race alaska anchorage nome',
  },
  {
    id: 'susan-butcher-1985',
    monthDay: null,
    year: 1985,
    title: 'Susan Butcher Wins First of Four Iditarods',
    description: 'Susan Butcher won the Iditarod in 1986, 1987, 1988, and 1990, becoming one of the greatest mushers in the race\'s history. She set multiple records and was the second woman to win the race. Her dominance helped shift the Iditarod from a scrappy wilderness race to an internationally recognized athletic event.',
    trivia: 'Susan Butcher was the first person to win three consecutive Iditarods (1986–1988). She trained over 150 dogs at her kennel near Eureka, Alaska, and once spent 51 days alone on the Alaska tundra to train.',
    category: 'culture',
    region: 'fairbanks',
    imageQuery: 'iditarod musher dogs alaska finish line',
  },
  {
    id: 'alaska-flag-1927',
    monthDay: null,
    year: 1927,
    title: 'Alaska\'s Flag Designed by a 13-Year-Old',
    description: 'Alaska\'s state flag — the Big Dipper and North Star on a field of blue — was designed by Benny Benson, a 13-year-old Alutiiq/Swedish orphan from Seward, for a territorial design contest in 1927. His design beat hundreds of entries. Benny received a $1,000 scholarship and a watch.',
    trivia: 'Benny Benson wrote that the blue represents "the sky and the forget-me-not, an Alaska flower; the North Star is for the future state of Alaska, the most northerly in the union." He grew up to be an airplane mechanic and never made much of his fame.',
    category: 'culture',
    region: 'statewide',
    imageQuery: 'alaska flag north star big dipper blue',
  },
  {
    id: 'aurora-borealis',
    monthDay: null,
    year: 2024,
    title: 'Alaska: World\'s Best Aurora Viewing',
    description: 'Fairbanks sits directly under the "auroral oval" — the ring around the magnetic pole where solar particles collide most intensely with Earth\'s atmosphere. Fairbanks sees the northern lights on average 243 nights per year, making it one of the world\'s premier aurora destinations. The lights are visible from late August to late April.',
    trivia: 'The green aurora we see most often is caused by oxygen molecules at 60–150 miles altitude. Rare red auroras appear at higher altitudes (200+ miles). Purple and blue are from nitrogen. An exceptionally strong aurora in May 2024 was visible as far south as Texas.',
    category: 'culture',
    region: 'fairbanks',
    imageQuery: 'aurora borealis northern lights alaska fairbanks',
  },
  {
    id: 'tongass-rainforest',
    monthDay: null,
    year: 2024,
    title: 'Tongass: The World\'s Largest Temperate Rainforest',
    description: 'Southeast Alaska\'s Tongass National Forest is the largest national forest in the US at 16.7 million acres and the world\'s largest temperate rainforest. Annual rainfall of up to 200 inches in some areas supports massive Sitka spruce trees, millions of pink and sockeye salmon, and some of the world\'s densest concentrations of bald eagles, brown bears, and humpback whales.',
    trivia: 'The Tongass stores an estimated 8% of all carbon held in US forests — more than all other national forests combined. Old-growth trees here may be 800 years old, predating Columbus\'s arrival in the Americas.',
    category: 'wildlife',
    region: 'southeast',
    imageQuery: 'tongass national forest southeast alaska rainforest',
  },
  {
    id: 'mount-redoubt-1989',
    monthDay: '12-14',
    year: 1989,
    title: 'Mount Redoubt Erupts — Aviation Emergency',
    description: 'Mount Redoubt erupted in December 1989, sending ash to 45,000 feet and causing a KLM Boeing 747 to lose all four engines when it flew into the ash cloud on December 15. The crew restarted all engines just 4,000 feet above the Talkeetna Mountains — one of aviation\'s most harrowing survivals. Alaska has 130 volcanoes, 90 of which have been active in the last 10,000 years.',
    trivia: 'Alaska experiences more volcanic activity than any other US state and contributes over 75% of all US volcanic eruptions. The 1912 Novarupta eruption is the largest recorded in North America in the 20th century.',
    category: 'disaster',
    region: 'kenai',
    imageQuery: 'mount redoubt alaska volcano eruption',
  },
]

/**
 * Returns entries whose monthDay matches today's month and day (or within 1 day).
 * Falls back to category-based filtering if none match.
 */
export function getOnThisDayEntries(
  date: Date = new Date(),
  maxResults = 3
): AlaskaHistoryEntry[] {
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const today = `${mm}-${dd}`

  // Next/prev day for range matching
  const prev = new Date(date); prev.setDate(prev.getDate() - 1)
  const prevKey = `${String(prev.getMonth()+1).padStart(2,'0')}-${String(prev.getDate()).padStart(2,'0')}`
  const next = new Date(date); next.setDate(next.getDate() + 1)
  const nextKey = `${String(next.getMonth()+1).padStart(2,'0')}-${String(next.getDate()).padStart(2,'0')}`

  const matches = alaskaHistory.filter(
    e => e.monthDay === today || e.monthDay === prevKey || e.monthDay === nextKey
  )
  if (matches.length > 0) return matches.slice(0, maxResults)

  // Fallback: return random selection of general trivia
  return [...alaskaHistory]
    .sort(() => Math.random() - 0.5)
    .filter(e => e.monthDay === null)
    .slice(0, maxResults)
}

/** Returns N random trivia entries. */
export function getRandomTrivia(n = 5, region?: HistoryRegion): AlaskaHistoryEntry[] {
  const pool = region
    ? alaskaHistory.filter(e => e.region === region || e.region === 'statewide')
    : alaskaHistory
  return [...pool].sort(() => Math.random() - 0.5).slice(0, n)
}
