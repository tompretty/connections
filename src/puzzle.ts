export type ConnectionsPuzzle = {
  yellow: ConnectionsGroup;
  green: ConnectionsGroup;
  blue: ConnectionsGroup;
  purple: ConnectionsGroup;
  initialLayout: string[];
};

export type ConnectionsGroup = [string, string, string, string];

export const CONNECTIONS_PUZZLE: ConnectionsPuzzle = {
  yellow: ["OLD", "ANTIQUE", "VINTAGE", "CLASSIC"],
  green: ["BLUE", "RARE", "MEDIUM", "WELL-DONE"],
  blue: ["MALVERN", "FINCHLEY", "OXFORD", "WALTHAMSTOW"],
  purple: ["NOTTINGHAM", "RAIN", "NEW", "BLACK"],
  initialLayout: [
    "OLD",
    "NEW",
    "BLACK",
    "BLUE",
    "MALVERN",
    "ANTIQUE",
    "RARE",
    "NOTTINGHAM",
    "VINTAGE",
    "WALTHAMSTOW",
    "RAIN",
    "CLASSIC",
    "MEDIUM",
    "OXFORD",
    "WELL-DONE",
    "FINCHLEY",
  ],
};
