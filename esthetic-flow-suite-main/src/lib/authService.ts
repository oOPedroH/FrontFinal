
// Mock user data
const mockUsers = [
  {
    id: '1',
    email: 'teste@realle.com.br',
    password: 'admin123',
    profile: {
      id: '1',
      nome: 'Administrador',
      email: 'admin@realle.com.br',
      cargo: 'administrador',
      imagem_perfil: null
    }
  }
];

// Type definitions
export type User = {
  id: string;
  email: string;
};

export type UserProfile = {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  imagem_perfil?: string | null;
};

export type AuthResponse = {
  user: User;
  profile: UserProfile;
};

// Simple authentication service
export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find user
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Credenciais inválidas. Verifique seu e-mail e senha.');
    }
    
    // Store in localStorage
    const userData = {
      id: user.id,
      email: user.email
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('profile', JSON.stringify(user.profile));
    
    return {
      user: userData,
      profile: user.profile
    };
  },
  
  logout: async (): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    
    return true;
  },
  
  getCurrentSession: async (): Promise<AuthResponse | null> => {
    // Get from localStorage
    const userJson = localStorage.getItem('user');
    const profileJson = localStorage.getItem('profile');
    
    if (!userJson || !profileJson) {
      return null;
    }
    
    try {
      const user = JSON.parse(userJson) as User;
      const profile = JSON.parse(profileJson) as UserProfile;
      
      return { user, profile };
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
  }
};
