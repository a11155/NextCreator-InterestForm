
const baseUrl = 'http://localhost:3001/api/v1';

export const coachRoutes = {
    coaches: `${baseUrl}/coaches`,
    coach: (id: string) => `${baseUrl}/coaches/${id}`
}

export const creativeRoutes = {
    creatives: `${baseUrl}/creatives`,
    creative: (id: string) => `${baseUrl}/creatives/${id}`
}

export const userRoutes = {
    users: `${baseUrl}/users`,
    syncClerkUsers: `${baseUrl}/users/syncClerkUsers`,
    user: (id: string) => `${baseUrl}/users/getUserById/${id}`,
    currentUser: `${baseUrl}/users/currentUser`,
    uploadImage: `${baseUrl}/users/uploadImage`,
}