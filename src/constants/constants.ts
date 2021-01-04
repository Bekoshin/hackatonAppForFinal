import RNFetchBlob from 'rn-fetch-blob';

export const PAGE_SIZE = 25;
export const FILE_DIR = RNFetchBlob.fs.dirs.DocumentDir + '/rosseti';

export const VIDEO_TYPES = ['avi', 'mpeg', 'mov', 'mp4', 'mpg', 'wmv'];
export const WORD_TYPES = ['doc', 'docx'];
export const EXCEL_TYPES = ['xls', 'xlsx'];
export const PDF_TYPES = ['pdf'];
export const IMAGE_TYPES = ['png', 'jpg', 'jpeg'];

export const IDEA_STATUSES = {
  NEW: 'new',
  EXPERTISE: 'expertise',
  ACCEPTED: 'accepted',
  REVISION: 'revision',
  REJECTED: 'rejected',
  PILOT: 'pilot',
  PILOT_SUCCESS: 'pilot_success',
  PILOT_FAILURE: 'pilot_failure',
};
