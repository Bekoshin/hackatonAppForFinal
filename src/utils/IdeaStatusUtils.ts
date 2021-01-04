export const getStatus = (status: string) => {
  switch (status) {
    case 'new': {
      return 'Новая';
    }
    case 'expertise': {
      return 'На экспертизе';
    }
    case 'accepted': {
      return 'Принята';
    }
    case 'revision': {
      return 'Доработка';
    }
    case 'rejected': {
      return 'Отклонена';
    }
    case 'pilot': {
      return 'В тесте';
    }
    case 'pilot_success': {
      return 'Успешный тест';
    }
    case 'pilot_failure': {
      return 'Неудачный тест';
    }
    default: {
      return '';
    }
  }
};
