using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

var app = builder.Build();
app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

var profileList = new List<singleProfile>();

if (File.Exists("UserConfig.txt"))
{
    // string[][] fileContents = singleProfile.dataReader();
    // projectList = JsonSerializer.Deserialize<List<MyProject>>(fileContents);
}

// app.MapGet("/projects", () =>
//  {
//      return projectList;
//  });

app.MapPost("/signup", (singleProfile newProfile) =>
{
    var profiles = new manageProfiles();
    bool added = profiles.addProfile(
        newProfile.createdDate,
        newProfile.givenName,
        newProfile.familyName,
        newProfile.email,
        newProfile.password,
        newProfile.countryCode,
        newProfile.termsAccept,
        (int)newProfile.isGuideRole
    );

    return added
           ? Results.Ok(new { success = true })
           : Results.StatusCode(500);
});

app.Run();
