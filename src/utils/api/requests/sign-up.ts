import type {SignUpFormValuesType, UserType} from "../../../types/user.ts";

export async function signUp(data: SignUpFormValuesType): Promise<UserType | Error> {
	const {email} = data;
	if (email.includes('user')) {
		return {
			id: 1,
			name: 'My User Name',
			email: email,
			role: 'user',
			avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
		}
	}
	if (email.includes('admin')) {
		return {
			id: 1,
			name: 'My Admin Name',
			email: email,
			role: 'admin',
			avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
		}
	}
	return new Error('this email already exists')
}
