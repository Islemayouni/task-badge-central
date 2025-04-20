
export interface Project {
  id: string;
  nom: string;
  cleProjet: string;
  description: string;
  categorie: string;
  typeProjet: string;
  iconeUrl: string;
  etat: 'actif' | 'en_pause' | 'terminé' | 'annulé';
  chefDeProjet: User;
  personneAssigneeParDefaut: User | null;
  roles: Role[];
  utilisateursAssocies: User[];
  dateCreation: string;
  dateDerniereModif: string;
  versionLogiciel: string;
  tags: string[];
  configWorkflow: WorkflowConfig;
  droitAcces: DroitAcces[];
  archive: boolean;
  urlProjet: string;
}

export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Role {
  id: string;
  nom: string;
  description: string;
  permissions: string[];
}

export interface DroitAcces {
  userId: string;
  niveau: 'lecture' | 'modification' | 'administration';
}

export interface WorkflowConfig {
  etapes: WorkflowEtape[];
  transitions: WorkflowTransition[];
}

export interface WorkflowEtape {
  id: string;
  nom: string;
  couleur: string;
  ordre: number;
}

export interface WorkflowTransition {
  de: string;
  vers: string;
  roles: string[];
}
