export const mockAuthService = {
  login: async ({ username, password }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (username === "admin" && password === "demo123") {
      return {
        user: {
          name: "María López",
          role: "Analista de operaciones",
          lastAction: "Se cargó un escenario base para la demo",
        },
      };
    }

    throw new Error("Credenciales inválidas. Intenta con admin / demo123.");
  },
};
