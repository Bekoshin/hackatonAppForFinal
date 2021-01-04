import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {styles} from './styles';
import {Category} from '../../models/Category';
import {User} from '../../models/User';
import {IdeaCost} from '../../models/IdeaCost';
import {IdeaStage} from '../../models/IdeaStage';
import {Idea} from '../../models/Idea';
import {Tabs} from '../../components/tabs/Tabs';
import {PickerItem} from '../../models/PickerItem';
import {GeneralView} from './GeneralView';
import {FilesView} from './FilesView';
import {File} from '../../models/File';
import {CommentView} from './CommentsView';
import {Comment} from '../../models/Comment';

type IdeaViewProps = {
  editable: boolean;
  files: File[];
  onDeleteFile: (file: File) => Promise<void>;
  onAddFile: () => Promise<void>;

  comments: Comment[];
  onDeleteComment: (comment: Comment) => Promise<void>;
  onAddComment: (message: string) => Promise<void>;

  oldIdea: Idea | undefined;
  authors: User[];
  changeAuthors: (author: User) => void;
  authorsError: boolean;
  hideAuthorsError: () => void;

  users: User[];
  updateUsers: () => Promise<void>;
  userLoading: boolean;

  name: string;
  changeName: (name: string) => void;
  nameError: boolean;
  hideNameError: () => void;

  category: Category | undefined;
  categoryError: boolean;
  categories: Category[];
  categoryLoading: boolean;
  hideCategoryError: () => void;
  onCategorySelect: (category: Category) => void;
  updateCategories: () => Promise<void>;

  problem: string;
  changeProblem: (text: string) => void;
  problemError: boolean;
  hideProblemError: () => void;

  solution: string;
  changeSolution: (text: string) => void;
  solutionError: boolean;
  hideSolutionError: () => void;

  positiveEffect: string;
  changePositiveEffect: (text: string) => void;
  positiveEffectError: boolean;
  hidePositiveEffectError: () => void;

  info: string;
  changeInfo: (text: string) => void;
  infoError: boolean;
  hideInfoError: () => void;

  costs: IdeaCost[];
  changeCost: (cost: IdeaCost, index?: number) => void;
  deleteCost: (cost: IdeaCost, index: number) => void;

  stages: IdeaStage[];
  changeStage: (stage: IdeaStage, index?: number) => void;
  deleteStage: (stage: IdeaStage, index: number) => void;

  onSaveButtonPress: () => Promise<void>;
  onExpertiseButtonPress: () => Promise<void>;
};

export const IdeaView = (props: IdeaViewProps) => {
  const [tabs] = useState<PickerItem[]>([
    {id: 1, name: 'Общее'},
    {id: 2, name: 'Файлы'},
    {id: 3, name: 'Комментарии'},
  ]);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const renderScene = () => {
    switch (selectedTab.id) {
      case 1:
        return <GeneralView {...props} />;
      case 2:
        return (
          <FilesView
            editable={props.editable}
            ideaId={props.oldIdea?.id}
            files={props.files}
            onDeletePress={props.onDeleteFile}
            onAddFile={props.onAddFile}
          />
        );
      case 3:
        return (
          <CommentView
            comments={props.comments}
            onAddComment={props.onAddComment}
            onDeleteComment={props.onDeleteComment}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <Tabs
            tabs={tabs}
            selectedTab={selectedTab}
            onTabPress={setSelectedTab}
          />
          {renderScene()}
        </View>
      </SafeAreaView>
    </View>
  );
};
