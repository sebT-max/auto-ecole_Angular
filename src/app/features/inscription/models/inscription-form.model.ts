import {StageDetailsModel} from '../../stage/models/stage-details-model';
import {UserFormModel} from '../../auth/models/user-form.model';

export interface InscriptionFormModel {
  userId: number | null;
  stageId: number | null;
  dateOfInscription: string;
  stageType: string | null;
  inscriptionStatut: string;
  stage?: StageDetailsModel;
  user?: UserFormModel;
}
