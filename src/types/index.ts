export enum Subject {
  English = "English",
  MotherTongue = "Mother Tongue Language",
  Mathematics = "Mathematics",
  Science = "Science",
  Art = "Art",
  Music = "Music",
  PhysicalEducation = "Physical Education",
  SocialStudies = "Social Studies",
  CharacterAndCitizenshipEducation = "Character and Citizenship Education",
}

export enum ClassLevel {
  Primary1 = "Primary 1",
  Primary2 = "Primary 2",
  Primary3 = "Primary 3",
  Primary4 = "Primary 4",
  Primary5 = "Primary 5",
  Primary6 = "Primary 6",
}

export interface Teacher {
  id: string;
  name: string;
  subject: Subject;
  email: string;
  contactNumber: string;
}

export interface Class {
  id: string;
  level: ClassLevel;
  name: string;
  formTeacherId: string;
  formTeacherName: string;
}
