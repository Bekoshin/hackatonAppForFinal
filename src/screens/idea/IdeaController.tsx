import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {IdeaView} from './IdeaView';
import {RouteProp} from '@react-navigation/native';
import {IdeaStackParamList} from '../../stacks/IdeaStack';
import {StackNavigationProp} from '@react-navigation/stack';
import {IdeaService} from '../../services/IdeaService';
import {Category} from '../../models/Category';
import {User} from '../../models/User';
import {UserService} from '../../services/UserService';
import {PAGE_SIZE} from '../../constants/constants';
import {HeaderRight} from '../../components/headerRight/HeaderRight';
import {styles} from './styles';
import {IdeaCost} from '../../models/IdeaCost';
import {IdeaStage} from '../../models/IdeaStage';
import {CostAttribute} from '../../models/CostAttribute';
import {Idea} from '../../models/Idea';
import {StageAttribute} from '../../models/StageAttribute';
import {Alert, TouchableOpacity} from 'react-native';
import {LoadingView} from '../../components/loadingView/LoadingView';
import {File} from '../../models/File';
import {addFile} from '../../utils/FileUtils';
import {hasPermissionToEdit} from '../../utils/PermsissionUtils';
import {Comment} from '../../models/Comment';
import {COLORS} from '../../constants/colors';
import {LineAwesomeIcon} from '../../constants/LineAwesomeIconSet';

type IdeaControllerProps = {
  route: RouteProp<IdeaStackParamList, 'Idea'>;
  navigation: StackNavigationProp<IdeaStackParamList, 'Idea'>;
};

export const IdeaController = (props: IdeaControllerProps) => {
  const {route, navigation} = props;
  const {ideaId} = route.params;

  const [oldIdea, setOldIdea] = useState<Idea | undefined>();

  useLayoutEffect(() => {
    const handleExpertsButtonPress = () => {
      if (oldIdea) {
        navigation.navigate('Experts', {experts: oldIdea.experts});
      }
    };
    const handleInfoButtonPress = () => {
      if (oldIdea) {
        navigation.navigate('Logs', {statusChanges: oldIdea.statusChanges});
      }
    };
    navigation.setOptions({
      headerRightContainerStyle: styles.headerRightContainer,
      headerRight: () => (
        <HeaderRight title="Идея" onBackButtonPress={navigation.goBack}>
          {oldIdea ? (
            <>
              <TouchableOpacity
                style={{marginRight: 6}}
                onPress={handleExpertsButtonPress}>
                <LineAwesomeIcon
                  name="users"
                  size={22}
                  color={COLORS.SECONDARY_DARK_1}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleInfoButtonPress}>
                <LineAwesomeIcon
                  name="info"
                  size={22}
                  color={COLORS.SECONDARY_DARK_1}
                />
              </TouchableOpacity>
            </>
          ) : null}
        </HeaderRight>
      ),
    });
  }, [navigation, oldIdea, ideaId]);

  const [loading, setLoading] = useState(true);

  const [authors, setAuthors] = useState<User[]>([]);
  const [authorsError, setAuthorsError] = useState(false);

  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);

  const [category, setCategory] = useState<Category | undefined>();
  const [categoryError, setCategoryError] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  const [problem, setProblem] = useState('');
  const [problemError, setProblemError] = useState(false);

  const [solution, setSolution] = useState('');
  const [solutionError, setSolutionError] = useState(false);

  const [positiveEffect, setPositiveEffect] = useState('');
  const [positiveEffectError, setPositiveEffectError] = useState(false);

  const [info, setInfo] = useState('');
  const [infoError, setInfoError] = useState(false);

  const [costs, setCosts] = useState<IdeaCost[]>([]);
  const [stages, setStages] = useState<IdeaStage[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const loadIdea = async () => {
      if (ideaId) {
        const ideaService = new IdeaService();
        const idea = await ideaService.getIdea(ideaId);
        console.log('idea: ', idea);
        if (idea) {
          setOldIdea(idea);
          setAuthors(idea.authors);
          setName(idea.name);
          setCategory(idea.category);
          setProblem(idea.problemDesc);
          setSolution(idea.solutionDesc);
          setPositiveEffect(idea.positiveEffect);
          setInfo(idea.info);
          setCosts(idea.costs);
          setStages(idea.stages);
          setFiles(idea.files);
          setComments(idea.comments);
        }
      }
    };
    loadIdea()
      .catch((error) => console.log('LOAD IDEA ERROR: ', error))
      .finally(() => setLoading(false));
  }, [ideaId]);

  const updateUsers = useCallback(async () => {
    try {
      setUsersLoading(true);
      const userService = new UserService();
      setUsers(await userService.getUsers(1, PAGE_SIZE));
    } finally {
      setUsersLoading(false);
    }
  }, []);

  const updateCategories = useCallback(async () => {
    try {
      setCategoriesLoading(true);
      const ideaService = new IdeaService();
      setCategories(await ideaService.getCategories(1, PAGE_SIZE));
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  const changeAuthors = (user: User) => {
    console.log('change authors');
    const index = authors.findIndex((item) => item.id === user.id);
    if (index === -1) {
      setAuthors((prevState) => [...prevState, user]);
    } else {
      const newAuthors = [...authors];
      newAuthors.splice(index, 1);
      setAuthors(newAuthors);
    }
  };

  const changeCost = (newCost: IdeaCost, index?: number) => {
    if (index !== undefined) {
      const newCosts = [...costs];
      newCosts[index] = newCost;
      setCosts(newCosts);
    } else {
      setCosts((prevState) => [...prevState, newCost]);
    }
  };

  const deleteCost = (cost: IdeaCost, index: number) => {
    const newCosts = [...costs];
    newCosts.splice(index, 1);
    setCosts(newCosts);
  };

  const changeStage = (newStage: IdeaStage, index?: number) => {
    if (index !== undefined) {
      const newStages = [...stages];
      newStages[index] = newStage;
      setStages(newStages);
    } else {
      setStages((prevState) => [...prevState, newStage]);
    }
  };

  const deleteStage = (stage: IdeaStage, index: number) => {
    const newStages = [...stages];
    newStages.splice(index, 1);
    setStages(newStages);
  };

  const checkFields = () => {
    let allFieldsFilled = true;
    if (authors.length === 0) {
      setAuthorsError(true);
      allFieldsFilled = false;
    }
    if (!name) {
      setNameError(true);
      allFieldsFilled = false;
    }
    if (!category) {
      setCategoryError(true);
      allFieldsFilled = false;
    }
    if (!problem) {
      setProblemError(true);
      allFieldsFilled = false;
    }
    if (!solution) {
      setSolutionError(true);
      allFieldsFilled = false;
    }
    if (!positiveEffect) {
      setPositiveEffectError(true);
      allFieldsFilled = false;
    }
    if (!info) {
      setInfoError(true);
      allFieldsFilled = false;
    }
    return allFieldsFilled;
  };

  const handleSaveButtonPress = async () => {
    try {
      if (!checkFields()) {
        return;
      }

      const costAttributes: CostAttribute[] = [];
      if (oldIdea) {
        for (let oldCost of oldIdea.costs) {
          if (!costs.find((item) => item.id === oldCost.id)) {
            costAttributes.push({
              ...oldCost,
              destroy: true,
            });
          }
        }
      }
      for (let cost of costs) {
        costAttributes.push({
          ...cost,
          destroy: false,
        });
      }

      const stageAttributes: StageAttribute[] = [];
      if (oldIdea) {
        for (let oldStage of oldIdea.stages) {
          if (!stages.find((item) => item.id === oldStage.id)) {
            stageAttributes.push({
              ...oldStage,
              destroy: true,
            });
          }
        }
      }
      for (let stage of stages) {
        stageAttributes.push({
          ...stage,
          destroy: false,
        });
      }

      const ideaService = new IdeaService();

      if (oldIdea) {
        await ideaService.updateIdea(
          oldIdea.id,
          name,
          info,
          problem,
          solution,
          positiveEffect,
          category?.id!,
          authors.map((item) => item.id),
          costAttributes,
          stageAttributes,
        );
      } else {
        const newIdea = await ideaService.createIdea(
          name,
          info,
          problem,
          solution,
          positiveEffect,
          category?.id!,
          authors.map((item) => item.id),
          costAttributes,
          stageAttributes,
        );
        setOldIdea(newIdea);
      }
      Alert.alert('Идея успешно сохранена');
    } catch (error) {
      console.log('HANDLE SAVE BUTTON PRESS ERROR: ', error);
      Alert.alert('Не удалось сохранить идею');
    }
  };

  const handleSendToExpertisePress = async () => {
    if (!oldIdea) {
      return;
    }
    const ideaService = new IdeaService();
    const newIdea = await ideaService.sendIdeaToExpertise(oldIdea.id);
    if (newIdea) {
      setOldIdea(newIdea);
      navigation.goBack();
    }
  };

  const handleDeleteFile = async (file: File) => {
    const index = files.findIndex((item) => item.id === file.id);
    if (index === -1) {
      return;
    }

    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    const ideaService = new IdeaService();
    await ideaService.deleteIdeaFile(file.id);
  };

  const handleAddFile = async () => {
    if (!oldIdea) {
      return;
    }
    const file = await addFile(oldIdea.id);
    if (file) {
      setFiles((prevState) => [...prevState, file]);
    }
  };

  const handleDeleteComment = async (comment: Comment) => {
    const index = comments.findIndex((item) => item.id === comment.id);
    if (index === -1) {
      return;
    }

    const newComments = [...comments];
    newComments.splice(index, 1);
    setComments(newComments);

    const ideaService = new IdeaService();
    await ideaService.deleteComment(comment.id);
  };

  const handleAddComment = async (message: string) => {
    if (!oldIdea) {
      return;
    }
    const ideaService = new IdeaService();
    const comment = await ideaService.addComment(oldIdea.id, message);
    setComments((prevState) => [...prevState, comment]);
  };

  if (loading) {
    return <LoadingView />;
  } else {
    return (
      <IdeaView
        editable={!oldIdea || hasPermissionToEdit(oldIdea)}
        comments={comments}
        onDeleteComment={handleDeleteComment}
        onAddComment={handleAddComment}
        files={files}
        onDeleteFile={handleDeleteFile}
        onAddFile={handleAddFile}
        oldIdea={oldIdea}
        authors={authors}
        changeAuthors={changeAuthors}
        authorsError={authorsError}
        hideAuthorsError={() => setAuthorsError(false)}
        users={users}
        updateUsers={updateUsers}
        userLoading={usersLoading}
        name={name}
        changeName={setName}
        nameError={nameError}
        hideNameError={() => setNameError(false)}
        category={category}
        categoryError={categoryError}
        categories={categories}
        categoryLoading={categoriesLoading}
        hideCategoryError={() => {}}
        onCategorySelect={setCategory}
        updateCategories={updateCategories}
        problem={problem}
        changeProblem={setProblem}
        problemError={problemError}
        hideProblemError={() => setProblemError(false)}
        solution={solution}
        changeSolution={setSolution}
        solutionError={solutionError}
        hideSolutionError={() => setSolutionError(false)}
        positiveEffect={positiveEffect}
        changePositiveEffect={setPositiveEffect}
        positiveEffectError={positiveEffectError}
        hidePositiveEffectError={() => setPositiveEffectError(false)}
        info={info}
        changeInfo={setInfo}
        infoError={infoError}
        hideInfoError={() => setInfoError(false)}
        costs={costs}
        changeCost={changeCost}
        deleteCost={deleteCost}
        stages={stages}
        changeStage={changeStage}
        deleteStage={deleteStage}
        onSaveButtonPress={handleSaveButtonPress}
        onExpertiseButtonPress={handleSendToExpertisePress}
      />
    );
  }
};
