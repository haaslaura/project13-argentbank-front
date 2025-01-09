// Pour la déconnection, penser à :

const handleLogout = () => {
    localStorage.removeItem('token'); // Supprime le token stocké
    dispatch(logout()); // Réinitialise l'état dans Redux
  };
  