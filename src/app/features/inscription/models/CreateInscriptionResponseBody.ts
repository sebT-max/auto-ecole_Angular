import {StageDetailsModel} from '../../stage/models/stage-details-model';
import {UserFormModel} from '../../auth/models/user-form.model';

export interface CreateInscriptionResponseBody {
  message: string;
  id: number;
  userId: number;
  stageId: number;
  stageType: string;
  inscriptionStatut: string;
  lettrePdf?: string;
  stage?: StageDetailsModel;
  user?: UserFormModel;
}
