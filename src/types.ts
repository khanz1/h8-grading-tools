export enum Phase {
  P0 = "Phase-0",
  P1 = "Phase-1",
  P2 = "Phase-2",
  P3 = "Phase-3",
}

export enum Assignment {
  GC01 = "gc01",
  GC02 = "gc02",
  LC01 = "lc01",
  LC02 = "lc02",
  LC03 = "lc03",
  IP = "ip",
  GP = "gp",
}

export enum AssignmentRepeat {
  GC01 = "gc01-repeat",
  GC02 = "gc02-repeat",
  LC01 = "lc01-repeat",
  LC02 = "lc02-repeat",
  IP = "ip-repeat",
  GP = "gp-repeat",
}

export enum SetCollection {
  P2S5 = "H8-FSJS-P2S5",
  P2S6 = "H8-FSJS-P2S6",
}

interface Answers {
  phaseName: Phase;
}

export interface Phase2Answers {
  collectionOfSet: SetCollection;
  assignments: Assignment[];
  includeRepeat: boolean;
}

export interface CloneRepository {
  organization: SetCollection;
  name: string;
}