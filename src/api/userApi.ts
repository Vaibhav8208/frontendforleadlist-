import axios from 'axios';

// The User interface should be defined here so it can be shared
// between the API layer and the components that use it.
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: string;
  joinDate: string;
  leadsAssigned: number;
  leadsConverted: number;
}

// This defines the data payload for creating a new user.
// It omits fields that the backend will generate (like id, joinDate, etc.)
export type NewUserPayload = Omit<User, 'id' | 'joinDate' | 'leadsAssigned' | 'leadsConverted'>;

// Use your actual backend URL
const API_BASE_URL = 'http://localhost:5000';

// Create a configured instance of axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetches all users from your backend.
 * @returns A promise that resolves to an array of User objects.
 */
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get<User[]>('/users');
    // Assuming your backend returns data that directly matches the User interface
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    // Re-throw the error to be handled by the component
    throw new Error('Failed to fetch users from the server.');
  }
};

/**
 * Sends a new user's data to be created in the backend.
 * @param userData The data for the new user.
 * @returns A promise that resolves to the newly created User object from the backend.
 */
export const addUser = async (userData: NewUserPayload): Promise<User> => {
  try {
    // We send the payload to the /users endpoint via POST
    const response = await apiClient.post<User>('/users', userData);
    // The backend should respond with the complete user object, including the new ID
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw new Error('Failed to add the user on the server.');
  }
};

// You can add more functions here later, for example:
// export const updateUser = async (userId: number, userData: Partial<User>) => { ... };
// export const deleteUser = async (userId: number) => { ... };