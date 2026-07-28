const url = "http://localhost:5184";

export const loadProjectsFromApi = async ()=> {
    const response = await fetch(url + "/projects");
    const body = await response.json();
    return body;
}

export const createProjectOnApi = async (title) => {
   const newProject = {
    done: false,
    title: title,
    created: Date.now()
   }
   console.log(newProject);

   await fetch(url + "/project", {
     method: "POST",
     body: JSON.stringify(newProject),
     headers: {
        'Content-Type': 'application/json'
     }
   })
}
// project: sting title, datetime created, bool done