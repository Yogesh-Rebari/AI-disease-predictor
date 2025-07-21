
import React from 'react';
import type { Symptom } from './types';

export const SYMPTOMS_LIST: Symptom[] = [
  { id: 'fever', label: 'Fever', icon: <i className="fa-solid fa-temperature-full"></i> },
  { id: 'cough', label: 'Cough', icon: <i className="fa-solid fa-head-side-cough"></i> },
  { id: 'fatigue', label: 'Fatigue', icon: <i className="fa-solid fa-battery-quarter"></i> },
  { id: 'sore_throat', label: 'Sore Throat', icon: <i className="fa-solid fa-head-side-virus"></i> },
  { id: 'headache', label: 'Headache', icon: <i className="fa-solid fa-head-side-mask"></i> },
  { id: 'shortness_of_breath', label: 'Shortness of Breath', icon: <i className="fa-solid fa-lungs"></i> },
  { id: 'muscle_ache', label: 'Muscle Ache', icon: <i className="fa-solid fa-person-praying"></i> },
  { id: 'chills', label: 'Chills', icon: <i className="fa-solid fa-snowflake"></i> },
  { id: 'nausea_vomiting', label: 'Nausea/Vomiting', icon: <i className="fa-solid fa-stomach"></i> },
  { id: 'diarrhea', label: 'Diarrhea', icon: <i className="fa-solid fa-poop"></i> },
  { id: 'loss_of_taste_smell', label: 'Loss of Taste/Smell', icon: <i className="fa-solid fa-utensils"></i> },
  { id: 'chest_pain', label: 'Chest Pain', icon: <i className="fa-solid fa-heart-pulse"></i> },
  { id: 'abdominal_pain', label: 'Abdominal Pain', icon: <i className="fa-solid fa-briefcase-medical"></i> },
  { id: 'joint_pain', label: 'Joint Pain', icon: <i className="fa-solid fa-bone"></i> },
  { id: 'rash', label: 'Rash', icon: <i className="fa-solid fa-disease"></i> },
];
