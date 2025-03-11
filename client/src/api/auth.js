
export const loginFunc = async (data) => {
    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

// export const logoutFunc = (setUser,setUserProperties)=>{
//     localStorage.removeItem('currUser');
//     setUser(null);
//     setUserProperties([]);
// }

export const signupFunc = async (data) => {
    try {
        const response = await fetch('http://localhost:3000/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

export const uploadFunc = async (formData,user) => {
    try {
        const response = await fetch('http://localhost:3000/api/users/upload', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
            body: formData,
        })
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}