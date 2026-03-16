export interface Organizer {
  name: string;
  role: string;
  country: string;
  flag: string;
  face: string;
  type: "community" | "aws";
}

export const ORGANIZERS: Organizer[] = [
  { name: "Jerome", role: "AWS User Group Belgium", country: "Belgium", flag: "🇧🇪", face: "AWSCommunityGameDayEurope/faces/jerome.jpg", type: "community" },
  { name: "Anda", role: "AWS User Group Geneva", country: "Switzerland", flag: "🇨🇭", face: "AWSCommunityGameDayEurope/faces/anda.jpg", type: "community" },
  { name: "Marcel", role: "AWS User Group Münsterland", country: "Germany", flag: "🇩🇪", face: "AWSCommunityGameDayEurope/faces/marcel.jpg", type: "community" },
  { name: "Linda", role: "AWS User Group Vienna", country: "Austria", flag: "🇦🇹", face: "AWSCommunityGameDayEurope/faces/linda.jpg", type: "community" },
  { name: "Manuel", role: "AWS User Group Frankfurt", country: "Germany", flag: "🇩🇪", face: "AWSCommunityGameDayEurope/faces/manuel.jpg", type: "community" },
  { name: "Andreas", role: "AWS User Group Bonn", country: "Germany", flag: "🇩🇪", face: "AWSCommunityGameDayEurope/faces/andreas.jpg", type: "community" },
  { name: "Lucian", role: "AWS User Group Timisoara", country: "Romania", flag: "🇷🇴", face: "AWSCommunityGameDayEurope/faces/lucian.jpg", type: "community" },
  { name: "Mihaly", role: "AWS User Group Budapest", country: "Hungary", flag: "🇭🇺", face: "AWSCommunityGameDayEurope/faces/mihaly.jpg", type: "community" },
];

export const AWS_SUPPORTERS: Organizer[] = [
  { name: "Arnaud", role: "Sr. Developer Advocate, AWS", country: "Gamemaster", flag: "🎮", face: "AWSCommunityGameDayEurope/faces/arnaud.jpg", type: "aws" },
  { name: "Loïc", role: "Sr. Technical Account Manager, AWS", country: "Gamemaster", flag: "🎮", face: "AWSCommunityGameDayEurope/faces/loic.jpg", type: "aws" },
  { name: "Uliana", role: "Community Manager, AWS", country: "DACH, CEE, CEAR & MENAT", flag: "🌍", face: "AWSCommunityGameDayEurope/faces/uliana.jpg", type: "aws" },
  { name: "Natalia", role: "DevEx Community Manager, AWS", country: "EMEA / Europe South", flag: "🌍", face: "AWSCommunityGameDayEurope/faces/natalia.jpg", type: "aws" },
];
