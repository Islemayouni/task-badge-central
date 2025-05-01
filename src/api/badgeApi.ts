// import axios from 'axios';

// const API_URL = 'http://localhost:8081'; // Ton backend tourne sur ce port-là, si tu n'as pas changé

// // Créer un badge
// export const createBadge = (badgeData: any) => {
//   return axios.post(`${API_URL}/badges`, badgeData);
// };

// // Obtenir tous les badges
// export const getBadges = () => {
//   return axios.get(`${API_URL}/badges`);
// };

// // Obtenir un badge par ID
// export const getBadgeById = (badgeId: string) => {
//   return axios.get(`${API_URL}/badges/${badgeId}`);
// };

// // Mettre à jour un badge
// export const updateBadge = (badgeId: string, badgeData: any) => {
//   return axios.put(`${API_URL}/badges/${badgeId}`, badgeData);
// };

// // Supprimer un badge
// export const deleteBadge = (badgeId: string) => {
//   return axios.delete(`${API_URL}/badges/${badgeId}`);
// };

// // Assigner un badge à un utilisateur
// export const assignBadgeToUser = (assignmentData: { userId: string; badgeId: string }) => {
//   return axios.post(`${API_URL}/badges/assign`, assignmentData);
// };
