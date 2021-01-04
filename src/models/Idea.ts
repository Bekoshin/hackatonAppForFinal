import {Category} from './Category';
import {IdeaCost} from './IdeaCost';
import {IdeaStage} from './IdeaStage';
import {User} from './User';
import {File} from './File';
import {Comment} from './Comment';
import {StatusChange} from './StatusChange';
import {Expert} from "./Expert";

export interface Idea {
  id: number;
  status: string;
  createdAt: Date;
  name: string;
  info: string;
  countOfLikes: number;
  countOfComments: number;
  countOfFiles: number;
  likeAvailable: boolean;
  problemDesc: string;
  solutionDesc: string;
  positiveEffect: string;
  category: Category;
  authors: User[];
  user: User;
  files: File[];
  comments: Comment[];
  costs: IdeaCost[];
  stages: IdeaStage[];
  statusChanges: StatusChange[];
  experts: Expert[];
}
