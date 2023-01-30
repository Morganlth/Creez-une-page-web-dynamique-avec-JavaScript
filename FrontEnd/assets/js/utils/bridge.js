//EXPORT

export const bridge = {
    /*
    ? BRIDGE = pont vers le serveur
    */
    getCategories: async () =>
    {
        return await fetch('http://localhost:5678/api/categories', { method: 'GET' }).then(res => res.json())
    }
,
    getWorks: async () =>
    {
        return await fetch('http://localhost:5678/api/works', { method: 'GET' }).then(res => res.json())
    }
,
    postLogin: async (email, password) =>
    {
        return await fetch('http://localhost:5678/api/users/login',
        {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password })
        }).then(res => res.ok ? res.json() : false)
    }
,
    deleteWork: async (id) =>
    {
        return await fetch(`http://localhost:5678/api/works/${id}`,
        {
            method: 'DELETE',
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            body: JSON.stringify({ userId: parseInt(sessionStorage.getItem('userId')) })
        })
    }
,
    postWork: async (data) =>
    {
        return await fetch('http://localhost:5678/api/works',
        {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json',
                // 'Content-Type': 'multipart/form-data; boundary="---------515465556443223526566547"', //erreur 500 voir https://muffinman.io/blog/uploading-files-using-fetch-multipart-form-data/
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            body: getFormData({ userId: sessionStorage.getItem('userId'), image: data.image, title: data.title, category: data.category })
        })
    }
}

function getFormData(data) // FORM DATA POUR ENVOYER DES FICHIERS
{
    const formData = new FormData()

    for (const d in data) formData.append(d, data[d])

    return formData
}