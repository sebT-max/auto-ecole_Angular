import {StageDetailsModel} from '../../stage/models/stage-details-model';

export interface InscriptionFormModel {
  userId: number | null;
  stageId: number | null;
  dateOfInscription: string;
  stageType: string | null;
  inscriptionStatut: string;
  stage?: StageDetailsModel; // 🔥 Ajout de `stage`
}
