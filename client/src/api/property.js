
export const getAllProperties = async ()=>{
    try {
        const response = await fetch('http://localhost:3000/api/properties',{
            method: 'GET',
        });
        return response.json();
    } catch (error) {
        console.log('Error: ',error);
    }
}

export const postProperty = async (property,user)=>{
    try {
        const response = await fetch('http://localhost:3000/api/properties/create',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token}`
            },
            body: JSON.stringify(property)
        });
        return response.json();
    } catch (error) {
        console.log('Error: ',error);
    }
}

export const updateProperty = async (id,data,user)=>{
    try {
        const response = await fetch(`http://localhost:3000/api/properties/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token}`
            },
            body: JSON.stringify(data)
        });
        return response.json();
    } catch (error) {
        console.log('Error: ',error);
    }
}

export const uploadPropertyImage = async (id, formData, user) => {
    try {
        const response = await fetch(`http://localhost:3000/api/properties/uploadimage/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
            body: formData,
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
};

export const deleteProperty = async (id,user)=>{
    try {
        const response = await fetch(`http://localhost:3000/api/properties/${id}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user?.token}`
            },
        });
        return response.json();
    } catch (error) {
        console.log('Error: ',error);
    }
}

export const likeProperty = async(id,user)=>{
    try {
        const response = await fetch(`http://localhost:3000/api/properties/like/${id}`,{
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${user?.token}`
            }
        })
        return response.json();
    } catch (error) {
        console.log('Error: ',error);
    }
}

export const dislikeProperty = async(id,user)=>{
    try {
        const response = await fetch(`http://localhost:3000/api/properties/dislike/${id}`,{
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${user?.token}`
            }
        })
        return response.json();
    } catch (error) {
        console.log('Error: ',error);
    }
}