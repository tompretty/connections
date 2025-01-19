export type ConnectionsPuzzle = {
  yellow: ConnectionsGroup;
  green: ConnectionsGroup;
  blue: ConnectionsGroup;
  purple: ConnectionsGroup;
};

export type ConnectionsGroup = [string, string, string, string];

export const CONNECTIONS_PUZZLE: ConnectionsPuzzle = {
  yellow: ["OLD", "ANTIQUE", "VINTAGE", "CLASSIC"],
  green: ["BLUE", "RARE", "MEDIUM", "WELL-DONE"],
  blue: ["NOTTINGHAM", "RAIN", "NEW", "BLACK"],
  purple: ["MALVERN", "FINCHLEY", "OXFORD", "WALTHAMSTOW"],
};
