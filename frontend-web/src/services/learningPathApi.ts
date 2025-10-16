// frontend-web/src/services/learningPathApi.ts
import { apiService } from '../services/api';
import { Tier, Level, Vocabulary, Exercise } from '../types';

export const learningPathApi = {
  // Tier APIs
  getTiers: async (): Promise<Tier[]> => {
    const response = await apiService.get('/api/learning-path/tiers');
    return response.data;
  },

  createTier: async (data: Partial<Tier>): Promise<Tier> => {
    const response = await apiService.post('/api/learning-path/tiers', data);
    return response.data;
  },

  updateTier: async (id: string, data: Partial<Tier>): Promise<Tier> => {
    const response = await apiService.put(`/api/learning-path/tiers/${id}`, data);
    return response.data;
  },

  deleteTier: async (id: string): Promise<void> => {
    await apiService.delete(`/api/learning-path/tiers/${id}`);
  },

  // Level APIs
  getLevelsByTier: async (tierId: string): Promise<Level[]> => {
    const response = await apiService.get(`/api/learning-path/tiers/${tierId}/levels`);
    return response.data;
  },
  getTierByCode: async (tierCode: string): Promise<Tier> => {
  const response = await apiService.get(`/api/learning-path/tiers/${tierCode}`);
  return response.data;
  },
  getLevelDetail: async (levelId: string): Promise<Level> => {
    const response = await apiService.get(`/api/learning-path/levels/${levelId}`);
    return response.data;
  },

  createLevel: async (data: Partial<Level>): Promise<Level> => {
    const response = await apiService.post('/api/learning-path/levels', data);
    return response.data;
  },

  updateLevel: async (id: string, data: Partial<Level>): Promise<Level> => {
    const response = await apiService.put(`/api/learning-path/levels/${id}`, data);
    return response.data;
  },

  deleteLevel: async (id: string): Promise<void> => {
    await apiService.delete(`/api/learning-path/levels/${id}`);
  },

  // Vocabulary APIs
  getVocabularyByLevel: async (levelId: string): Promise<Vocabulary[]> => {
    const response = await apiService.get(`/api/learning-path/levels/${levelId}/vocabulary`);
    // DEBUG
    return response.data;
  },

  createVocabulary: async (data: Partial<Vocabulary>): Promise<Vocabulary> => {
    const response = await apiService.post('/api/learning-path/vocabulary', data);
    return response.data;
  },

  updateVocabulary: async (id: string, data: Partial<Vocabulary>): Promise<Vocabulary> => {
    const response = await apiService.put(`/api/learning-path/vocabulary/${id}`, data);
    return response.data;
  },

  deleteVocabulary: async (id: string): Promise<void> => {
    await apiService.delete(`/api/learning-path/vocabulary/${id}`);
  },

  // Exercise APIs
  getExercisesByLevel: async (levelId: string): Promise<Exercise[]> => {
    const response = await apiService.get(`/api/learning-path/levels/${levelId}/exercises`);
    return response.data;
  },
    getExerciseTypes: async (): Promise<Array<{ id: string; name: string; display_name: string }>> => {
    const response = await apiService.get('/api/learning-path/exercise-types');
    return response.data;
  },
  createExercise: async (data: Partial<Exercise>): Promise<Exercise> => {
    const response = await apiService.post('/api/learning-path/exercises', data);
    return response.data;
  },

  updateExercise: async (id: string, data: Partial<Exercise>): Promise<Exercise> => {
    const response = await apiService.put(`/api/learning-path/exercises/${id}`, data);
    return response.data;
  },

  deleteExercise: async (id: string): Promise<void> => {
    await apiService.delete(`/api/learning-path/exercises/${id}`);
  },
};
