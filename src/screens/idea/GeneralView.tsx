import React, {useState} from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {MssInput} from '../../components/mssInput/MssInput';
import {COLORS} from '../../constants/colors';
import {ModalList} from '../../components/modalList/ModalList';
import {Category} from '../../models/Category';
import {CategoryListItem} from '../../components/categoryListItem/CategoryListItem';
import {User} from '../../models/User';
import {UserListItem} from '../../components/userListItem/UserListItem';
import {MssButton} from '../../components/mssButton/MssButton';
import {IdeaCost} from '../../models/IdeaCost';
import {IdeaStage} from '../../models/IdeaStage';
import {CostCard} from '../../components/costCard/CostCard';
import {LineAwesomeIcon} from '../../constants/LineAwesomeIconSet';
import {CostModal} from '../../components/costModal/CostModal';
import {StageCard} from '../../components/stageCard/StageCard';
import {StageModal} from '../../components/stageModal/StageModal';
import {Idea} from '../../models/Idea';
import moment from 'moment';
import {getStatus} from '../../utils/IdeaStatusUtils';
import {IDEA_STATUSES} from '../../constants/constants';
import {endpoints} from '../../constants/endpoints';

const AVATAR_WIDTH = 100;

type GeneralViewProps = {
  editable: boolean;
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

export const GeneralView = (props: GeneralViewProps) => {
  const {
    editable,
    oldIdea,
    authors,
    changeAuthors,
    authorsError,
    hideAuthorsError,
    users,
    updateUsers,
    userLoading,
    name,
    changeName,
    nameError,
    hideNameError,
    category,
    categoryError,
    categories,
    categoryLoading,
    onCategorySelect,
    hideCategoryError,
    updateCategories,
    changePositiveEffect,
    changeProblem,
    changeSolution,
    positiveEffect,
    problem,
    solution,
    info,
    changeInfo,
    costs,
    changeCost,
    deleteCost,
    stages,
    changeStage,
    deleteStage,
    onSaveButtonPress,
    hideInfoError,
    hidePositiveEffectError,
    hideProblemError,
    hideSolutionError,
    infoError,
    positiveEffectError,
    problemError,
    solutionError,
    onExpertiseButtonPress,
  } = props;

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [authorModalVisible, setAuthorModalVisible] = useState(false);
  const [costModalVisible, setCostModalVisible] = useState(false);
  const [stageModalVisible, setStageModalVisible] = useState(false);
  const [selectedCost, setSelectedCost] = useState<IdeaCost | undefined>();
  const [costIndex, setCostIndex] = useState<number | undefined>();
  const [stageIndex, setStageIndex] = useState<number | undefined>();
  const [selectedStage, setSelectedStage] = useState<IdeaStage | undefined>();

  const showCostModal = () => {
    setCostModalVisible(true);
  };
  const hideCostModal = () => {
    setCostModalVisible(false);
    setSelectedCost(undefined);
    setCostIndex(undefined);
  };

  const showStageModal = () => {
    setStageModalVisible(true);
  };
  const hideStageModal = () => {
    setStageModalVisible(false);
    setSelectedStage(undefined);
    setStageIndex(undefined);
  };

  const showAuthorModal = () => {
    setAuthorModalVisible(true);
  };
  const hideAuthorModal = () => {
    setAuthorModalVisible(false);
  };

  const showCategoryModal = () => {
    setCategoryModalVisible(true);
  };
  const hideCategoryModal = () => {
    setCategoryModalVisible(false);
  };

  const createAuthorsString = (): string => {
    let str = '';
    for (let i = 0; i < authors.length; i++) {
      const author = authors[i];
      str += author.name;
      if (i !== authors.length - 1) {
        str += ', ';
      }
    }
    return str;
  };

  const handleAuthorsPress = () => {
    showAuthorModal();
    hideAuthorsError();
  };

  const onSelectUser = (user: User) => {
    changeAuthors(user);
  };

  const handleCategoryPress = () => {
    showCategoryModal();
  };

  const handleCategorySelect = (value: Category) => {
    onCategorySelect(value);
    hideCategoryModal();
    hideCategoryError();
  };

  const handleCostPress = (cost: IdeaCost, index: number) => {
    setSelectedCost(cost);
    setCostIndex(index);
    showCostModal();
  };

  const handleAddCostButton = () => {
    showCostModal();
  };

  const hanldeStagePress = (stage: IdeaStage, index: number) => {
    setSelectedStage(stage);
    setStageIndex(index);
    showStageModal();
  };

  const handleAddStageButton = () => {
    showStageModal();
  };

  const renderCosts = () => {
    const costCards: any[] = [];
    for (let i = 0; i < costs.length; i++) {
      const cost = costs[i];
      costCards.push(
        <CostCard
          index={i}
          cost={cost}
          onDeletePress={deleteCost}
          onPress={handleCostPress}
        />,
      );
    }
    return costCards;
  };

  const renderStages = () => {
    const stageCards: any[] = [];
    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i];
      stageCards.push(
        <StageCard
          index={i}
          stage={stage}
          onDeletePress={deleteStage}
          onPress={hanldeStagePress}
        />,
      );
    }
    return stageCards;
  };

  return (
    <View style={styles.mainContainer}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContentContainer}
        bounces={false}
        extraScrollHeight={100}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {oldIdea ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <Text style={styles.number}>{`№ ${oldIdea.id}`}</Text>
            <Text style={styles.date}>
              {moment(oldIdea.createdAt).format('LLL')}
            </Text>
          </View>
        ) : null}
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.date}>
            {getStatus(oldIdea ? oldIdea.status : IDEA_STATUSES.NEW)}
          </Text>
        </View>
        {oldIdea ? (
          <View style={{flexDirection: 'row', marginBottom: 14}}>
            <Image
              resizeMode={'cover'}
              style={[
                {
                  borderRadius: AVATAR_WIDTH / 2,
                  width: AVATAR_WIDTH,
                  height: AVATAR_WIDTH,
                },
              ]}
              width={AVATAR_WIDTH}
              height={AVATAR_WIDTH}
              source={{uri: endpoints.baseForPhoto + oldIdea.user.avatar}}
            />
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.userName}>{oldIdea.user.name}</Text>
            </View>
          </View>
        ) : null}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Авторы</Text>
          <TouchableHighlight
            style={styles.touchableContainer}
            onPress={handleAuthorsPress}
            activeOpacity={0.9}
            underlayColor={
              categoryError ? COLORS.OUTLINE : COLORS.PRIMARY_DARK
            }>
            <MssInput
              icon="angle-down"
              multiline={true}
              placeholder="Выберите авторов"
              value={createAuthorsString()}
              onChangeText={() => {}}
              editable={false}
              pointerEvents="none"
              error={authorsError}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Наименование</Text>
          <MssInput
            value={name}
            placeholder="Введите наименование"
            onChangeText={changeName}
            onClearButtonPress={() => changeName('')}
            error={nameError}
            onFocus={hideNameError}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Категория</Text>
          <TouchableHighlight
            style={styles.touchableContainer}
            onPress={handleCategoryPress}
            activeOpacity={0.9}
            underlayColor={
              categoryError ? COLORS.OUTLINE : COLORS.PRIMARY_DARK
            }>
            <MssInput
              icon="angle-down"
              placeholder="Выберите категорию"
              value={category ? category.name : ''}
              onChangeText={() => {}}
              editable={false}
              pointerEvents="none"
              error={categoryError}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Проблема</Text>
          <MssInput
            value={problem}
            placeholder="Укажите проблему"
            onChangeText={changeProblem}
            onClearButtonPress={() => changeProblem('')}
            multiline={true}
            error={problemError}
            onFocus={hideProblemError}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Решение</Text>
          <MssInput
            value={solution}
            placeholder="Укажите решение"
            onChangeText={changeSolution}
            onClearButtonPress={() => changeSolution('')}
            multiline={true}
            error={solutionError}
            onFocus={hideSolutionError}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Позитивный эффект</Text>
          <MssInput
            value={positiveEffect}
            placeholder="Укажите позитивный эффект"
            onChangeText={changePositiveEffect}
            onClearButtonPress={() => changePositiveEffect('')}
            multiline={true}
            error={positiveEffectError}
            onFocus={hidePositiveEffectError}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.label}>Затраты</Text>
            <TouchableOpacity onPress={handleAddCostButton}>
              <LineAwesomeIcon
                name="plus"
                size={22}
                color={COLORS.SECONDARY_DARK_1}
              />
            </TouchableOpacity>
          </View>
          <View>
            {costs.length > 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 4,
                }}>
                <Text style={styles.sublabel}>Имя</Text>
                <Text style={styles.sublabel}>Сумма</Text>
              </View>
            ) : null}
            {renderCosts()}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.label}>Этапы</Text>
            <TouchableOpacity onPress={handleAddStageButton}>
              <LineAwesomeIcon
                name="plus"
                size={22}
                color={COLORS.SECONDARY_DARK_1}
              />
            </TouchableOpacity>
          </View>
          <View>
            {stages.length > 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 4,
                }}>
                <Text style={styles.sublabel}>Имя</Text>
                <Text style={styles.sublabel}>Срок</Text>
              </View>
            ) : null}
            {renderStages()}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Дополнительная информация</Text>
          <MssInput
            value={info}
            placeholder="Введите информацию"
            onChangeText={changeInfo}
            onClearButtonPress={() => changeInfo('')}
            multiline={true}
            error={infoError}
            onFocus={hideInfoError}
          />
        </View>
      </KeyboardAwareScrollView>
      {editable ? (
        <View style={styles.button}>
          <MssButton label="Сохранить" onPress={onSaveButtonPress} />
          {oldIdea && editable ? (
            <MssButton
              style={{marginTop: 6}}
              label="Отправить на экспертизу"
              onPress={onExpertiseButtonPress}
            />
          ) : null}
        </View>
      ) : null}
      <ModalList<Category>
        data={categories}
        selectedItem={category}
        visible={categoryModalVisible}
        onSwipeComplete={hideCategoryModal}
        loading={categoryLoading}
        onBackdropPress={hideCategoryModal}
        onSelectItem={handleCategorySelect}
        updateDataBySearchQuery={updateCategories}
        renderItem={renderCategoryListItem}
      />
      <ModalList<User>
        loading={userLoading}
        visible={authorModalVisible}
        onSwipeComplete={hideAuthorModal}
        onBackdropPress={hideAuthorModal}
        data={users}
        selectedItem={undefined}
        selectedItems={authors}
        onSelectItem={onSelectUser}
        updateDataBySearchQuery={updateUsers}
        renderItem={renderUserListItem}
      />
      <CostModal
        index={costIndex}
        cost={selectedCost}
        visible={costModalVisible}
        onSwipeComplete={hideCostModal}
        onOkButtonPress={changeCost}
        onBackdropPress={hideCostModal}
      />
      <StageModal
        index={stageIndex}
        stage={selectedStage}
        visible={stageModalVisible}
        onSwipeComplete={hideStageModal}
        onOkButtonPress={changeStage}
        onBackdropPress={hideStageModal}
      />
    </View>
  );
};

const renderCategoryListItem = (
  item: Category,
  onPress: (item: Category) => void,
  isSelected: boolean,
) => {
  return (
    <CategoryListItem item={item} onPress={onPress} isSelected={isSelected} />
  );
};

const renderUserListItem = (
  item: User,
  onPress: (item: User) => void,
  isSelected: boolean,
) => {
  return <UserListItem item={item} onPress={onPress} isSelected={isSelected} />;
};
