export type Job = {
  id: string;
  title: string;
  requiredSkills: string[];
  minExperience: number;
  location?: string;
};

export type Candidate = {
  id: string;
  name: string;
  skills: string[];
  yearsExperience: number;
  location?: string;
};

export type MatchResult = {
  candidate: Candidate;
  totalScore: number;
  breakdown: {
    skill: number;
    experience: number;
    location: number;
  };
};

export type CandidateInput = {
  name: string;
  skills: string[];
  yearsExperience: number;
  location?: string;
};
