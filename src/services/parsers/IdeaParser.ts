import {Idea} from '../../models/Idea';
import {IdeaCost} from '../../models/IdeaCost';
import {IdeaStage} from '../../models/IdeaStage';
import {User} from '../../models/User';
import {parseUser} from './UserParser';
import {Comment} from '../../models/Comment';
import {parseComment} from './CommentParser';
import {StatusChange} from '../../models/StatusChange';
import {parseStatusChange} from './StatusChangeParser';
import {Expert} from '../../models/Expert';

export const parseIdea = (json: any): Idea => {
  const idea: Idea = {
    id: json.id,
    status: json.status,
    createdAt: new Date(json.created_at),
    name: json.name,
    info: json.info,
    likeAvailable: json.like_available,
    countOfLikes: json.like_count,
    countOfComments: json.comments_count,
    countOfFiles: json.files_count,
    problemDesc: json.problem_desc,
    solutionDesc: json.solution_desc,
    positiveEffect: json.positive_effect,
    user: parseUser(json.user),
    category: json.idea_category,
    files: json.idea_files || [],
    comments: [],
    costs: [],
    stages: [],
    authors: [],
    statusChanges: [],
    experts: [],
  };

  if (json.idea_experts) {
    const experts: Expert[] = [];
    for (let expertJson of json.idea_experts) {
      experts.push({
        user: parseUser(expertJson.user),
        approve: expertJson.approve,
      });
    }
    idea.experts = experts;
  }

  if (json.idea_status_changes) {
    const statusChanges: StatusChange[] = [];
    for (let statusChangeJson of json.idea_status_changes) {
      statusChanges.push(parseStatusChange(statusChangeJson));
    }
    idea.statusChanges = statusChanges;
  }

  if (json.comments) {
    const comments: Comment[] = [];
    for (let jsonComment of json.comments) {
      comments.push(parseComment(jsonComment));
    }
    idea.comments = comments;
  }

  if (json.authors) {
    const authors: User[] = [];
    for (let jsonAuthor of json.authors) {
      authors.push(parseUser(jsonAuthor));
    }
    idea.authors = authors;
  }

  if (json.idea_costs) {
    const costs: IdeaCost[] = [];
    for (let jsonCost of json.idea_costs) {
      costs.push(jsonCost);
    }
    idea.costs = costs;
  }

  if (json.idea_stages) {
    const stages: IdeaStage[] = [];
    for (let jsonStage of json.idea_stages) {
      stages.push({
        id: jsonStage.id,
        name: jsonStage.name,
        countDays: jsonStage.count_days,
      });
    }
    idea.stages = stages;
  }

  return idea;
};
