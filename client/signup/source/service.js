const url = "http://localhost:5184";

export const createProfileOnApi = async ({
   givenName,
   familyName,
   email,
   password,
   country,
   termsAccept,
   isGuide,
}) => {
   const newProfile = {
      created: Date.now(),
      givenName,
      familyName,
      email,
      password,
      country,
      termsAccept,
      isGuide,
   };
   console.log("newProfile created:", newProfile);

   const response = await fetch(url + "/signup", {
      method: "POST",
      body: JSON.stringify(newProfile),
      headers: {
         "Content-Type": "application/json",
      },
   });

   console.log("createProfileOnApi fetch completed:", response.status, response.statusText);
   return response;
};
