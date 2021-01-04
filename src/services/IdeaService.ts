import {Idea} from '../models/Idea';
import {endpoints} from '../constants/endpoints';
import {getTokenFromKeychain} from '../utils/JwtTokenUtils';
import {safeFetch} from '../utils/FetchUtils';
import {parseIdea} from './parsers/IdeaParser';
import {Comment} from '../models/Comment';
import {parseComment} from './parsers/CommentParser';
import {File} from '../models/File';
import {parseFile} from './parsers/FileParser';
import {Category} from '../models/Category';
import {parseCategory} from './parsers/CategoryParser';
import {CostAttribute} from '../models/CostAttribute';
import {StageAttribute} from '../models/StageAttribute';

export class IdeaService {
  constructor() {}

  getIdeas = async (page: number, pageSize: number): Promise<Idea[]> => {
    try {
      const endpoint =
        endpoints.base +
        endpoints.ideas +
        `?page=${page}&page_size=${pageSize}`;
      const jwtToken = await getTokenFromKeychain();
      if (!jwtToken) {
        throw {name: 'Error', message: 'Jwt token not found on device'};
      }

      const init = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      const ideas: Idea[] = [];
      const json = await safeFetch(endpoint, init);
      if (json && json.page.number <= json.page.pages_count) {
        for (let jsonIdea of json.items) {
          ideas.push(parseIdea(jsonIdea));
        }
      }
      return ideas;
    } catch (error) {
      console.log('GET IDEAS ERROR: ', error);
      throw error;
    }
  };

  createIdea = async (
    name: string,
    info: string,
    problemDesc: string,
    solutionDesc: string,
    positiveEffect: string,
    categoryId: number,
    userIds: number[],
    costAttributes: CostAttribute[],
    stageAttributes: StageAttribute[],
  ): Promise<Idea> => {
    try {
      const endpoint = endpoints.base + endpoints.ideas;
      const jwtToken = await getTokenFromKeychain();
      if (!jwtToken) {
        throw {name: 'Error', message: 'Jwt token not found on device'};
      }

      const bodyCostAttributes = [];
      for (let costAttribute of costAttributes) {
        bodyCostAttributes.push({
          id: costAttribute.id,
          name: costAttribute.name,
          amount: costAttribute.amount,
          _destroy: costAttribute.destroy,
        });
      }

      const bodyStageAttributes = [];
      for (let stageAttribute of stageAttributes) {
        bodyStageAttributes.push({
          id: stageAttribute.id,
          name: stageAttribute.name,
          count_days: stageAttribute.countDays,
          _destroy: stageAttribute.destroy,
        });
      }

      const body = {
        name: name,
        info: info,
        problem_desc: problemDesc,
        solution_desc: solutionDesc,
        positive_effect: positiveEffect,
        idea_category_id: categoryId,
        user_ids: userIds,
        idea_costs_attributes: bodyCostAttributes,
        idea_stages_attributes: bodyStageAttributes,
      };

      console.log('body: ', body);
      const init = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(body),
      };

      const json = await safeFetch(endpoint, init);
      if (json) {
        return parseIdea(json);
      } else {
        throw {name: 'Error', message: 'Not found idea json'};
      }
    } catch (error) {
      console.log('CREATE IDEA ERROR: ', error);
      throw error;
    }
  };

  getIdea = async (id: number): Promise<Idea | null> => {
    try {
      const endpoint = endpoints.base + endpoints.ideas + `/${id}`;
      const jwtToken = await getTokenFromKeychain();
      if (!jwtToken) {
        throw {name: 'Error', message: 'Jwt token not found on device'};
      }

      const init = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      const json = await safeFetch(endpoint, init);
      if (json) {
        console.log('json: ', json);
        return parseIdea(json);
      } else {
        return null;
      }
    } catch (error) {
      console.log('GET IDEA ERROR: ', error);
      throw error;
    }
  };

  updateIdea = async (
    id: number,
    name: string,
    info: string,
    problemDesc: string,
    solutionDesc: string,
    positiveEffect: string,
    categoryId: number,
    userIds: number[],
    costAttributes: CostAttribute[],
    stageAttributes: StageAttribute[],
  ): Promise<Idea | null> => {
    try {
      const endpoint = endpoints.base + endpoints.ideas + `/${id}`;
      const jwtToken = await getTokenFromKeychain();
      if (!jwtToken) {
        throw {name: 'Error', message: 'Jwt token not found on device'};
      }

      const bodyCostAttributes = [];
      for (let costAttribute of costAttributes) {
        bodyCostAttributes.push({
          id: costAttribute.id,
          name: costAttribute.name,
          amount: costAttribute.amount,
          _destroy: costAttribute.destroy,
        });
      }

      const bodyStageAttributes = [];
      for (let stageAttribute of stageAttributes) {
        bodyStageAttributes.push({
          id: stageAttribute.id,
          name: stageAttribute.name,
          count_days: stageAttribute.countDays,
          _destroy: stageAttribute.destroy,
        });
      }

      const body = {
        name: name,
        info: info,
        problem_desc: problemDesc,
        solution_desc: solutionDesc,
        positive_effect: positiveEffect,
        idea_category_id: categoryId,
        user_ids: userIds,
        idea_costs_attributes: bodyCostAttributes,
        idea_stages_attributes: bodyStageAttributes,
      };

      const init = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(body),
      };

      const json = await safeFetch(endpoint, init);
      if (json) {
        return parseIdea(json);
      } else {
        return null;
      }
    } catch (error) {
      console.log('UPDATE IDEA ERROR: ', error);
      throw error;
    }
  };

  likeIdea = async (id: number): Promise<Idea> => {
    try {
      const endpoint = endpoints.base + endpoints.ideas + `/${id}/like`;
      const jwtToken = await getTokenFromKeychain();
      if (!jwtToken) {
        throw {name: 'Error', message: 'Jwt token not found on device'};
      }

      const init = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      const json = await safeFetch(endpoint, init);
      if (json) {
        return parseIdea(json);
      } else {
        throw {name: 'Error', message: 'Not found idea json'};
      }
    } catch (error) {
      console.log('LIKE IDEA ERROR: ', error);
      throw error;
    }
  };

  dislikeIdea = async (id: number): Promise<Idea> => {
    try {
      const endpoint = endpoints.base + endpoints.ideas + `/${id}/unlike`;
      const jwtToken = await getTokenFromKeychain();
      if (!jwtToken) {
        throw {name: 'Error', message: 'Jwt token not found on device'};
      }

      const init = {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      const json = await safeFetch(endpoint, init);
      if (json) {
        return parseIdea(json);
      } else {
        throw {name: 'Error', message: 'Not found idea json'};
      }
    } catch (error) {
      console.log('DISLIKE IDEA ERROR: ', error);
      throw error;
    }
  };

  deleteIdea = async (id: number) => {
    try {
      const endpoint = endpoints.base + endpoints.ideas + `/${id}`;
      const jwtToken = await getTokenFromKeychain();
      if (!jwtToken) {
        throw {name: 'Error', message: 'Jwt token not found on device'};
      }

      const init = {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      await safeFetch(endpoint, init);
    } catch (error) {
      console.log('DELETE IDEA ERROR: ', error);
      throw error;
    }
  };

  addComment = async (
    ideaId: number,
    message: string,
    commentId?: number,
  ): Promise<Comment> => {
    try {
      const endpointUrl = endpoints.base + endpoints.comments;
      const jwtToken = await getTokenFromKeychain();
      if (!jwtToken) {
        throw {name: 'Error', message: 'Jwt token not found on device'};
      }

      const body = {
        message: message,
        idea_id: ideaId,
        comment_id: commentId || null,
      };

      const init = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(body),
      };

      const json = await safeFetch(endpointUrl, init);
      if (json) {
        return parseComment(json);
      } else {
        throw {name: 'Error', message: "Can't create comment"};
      }
    } catch (error) {
      console.log('ADD COMMENT ERROR: ', error);
      throw error;
    }
  };

  deleteComment = async (id: number) => {
    try {
      const endpoint = endpoints.base + endpoints.comments + `/${id}`;
      const jwtToken = await getTokenFromKeychain();
      if (!jwtToken) {
        throw {name: 'Error', message: 'Jwt token not found on device'};
      }

      const init = {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      await safeFetch(endpoint, init);
    } catch (error) {
      console.log('DELETE COMMENT ERROR: ', error);
      throw error;
    }
  };

  addIdeaFile = async (
    ideaId: number,
    uri: string,
    fileName: string,
    type: string,
  ): Promise<File> => {
    try {
      const endpoint = endpoints.base + endpoints.ideaFiles;
      const jwtToken = await getTokenFromKeychain();
      if (!jwtToken) {
        throw {name: 'Error', message: 'Jwt token not found on device'};
      }

      let formData = new FormData();
      formData.append('idea_id', ideaId);
      formData.append('file', {uri: uri, name: fileName, type: type});

      const init = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: formData,
      };

      const json = await safeFetch(endpoint, init);
      if (json) {
        return parseFile(json);
      } else {
        throw {name: 'Error', message: "Can't add file"};
      }
    } catch (error) {
      console.log('ADD IDEA FILE ERROR: ', error);
      throw error;
    }
  };

  deleteIdeaFile = async (id: number) => {
    try {
      const endpoint = endpoints.base + endpoints.ideaFiles + `/${id}`;
      const jwtToken = await getTokenFromKeychain();
      if (!jwtToken) {
        throw {name: 'Error', message: 'Jwt token not found on device'};
      }

      const init = {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      await safeFetch(endpoint, init);
    } catch (error) {
      console.log('DELETE IDEA FILE ERROR: ', error);
      throw error;
    }
  };

  getCategories = async (
    page: number,
    pageSize: number,
  ): Promise<Category[]> => {
    try {
      const endpoint =
        endpoints.base +
        endpoints.ideaCategories +
        `?page=${page}&page_size=${pageSize}`;
      const jwtToken = await getTokenFromKeychain();
      if (!jwtToken) {
        throw {name: 'Error', message: 'Jwt token not found on device'};
      }

      const init = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      const categories: Category[] = [];
      const json = await safeFetch(endpoint, init);
      if (json && json.page.number <= json.page.pages_count) {
        for (let jsonCategory of json.items) {
          categories.push(parseCategory(jsonCategory));
        }
      }
      return categories;
    } catch (error) {
      console.log('GET CATEGORIES ERROR: ', error);
      throw error;
    }
  };

  sendIdeaToExpertise = async (id: number): Promise<Idea | null> => {
    try {
      const endpoint = endpoints.base + endpoints.ideas + `/${id}/expertise`;
      const jwtToken = await getTokenFromKeychain();
      if (!jwtToken) {
        throw {name: 'Error', message: 'Jwt token not found on device'};
      }

      const init = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      const json = await safeFetch(endpoint, init);
      if (json) {
        return parseIdea(json);
      } else {
        return null;
      }
    } catch (error) {
      console.log('SEND IDEA TO EXPERTISE ERROR: ', error);
      throw error;
    }
  };
}
