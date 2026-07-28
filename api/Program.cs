using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

var app = builder.Build();
app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

var projectList = new List<MyProject>();

if(File.Exists("projectList.json"))
{
    var fileContents = File.ReadAllText("projectList.json");
    projectList = JsonSerializer.Deserialize<List<MyProject>>(fileContents);
}

app.MapGet("/projects", () =>
 {
     return projectList;
 });

app.MapPost("/project", (MyProject newProject) => {
    projectList.Add(newProject);
    Console.WriteLine("Added project to list");

    File.WriteAllText("projectlist.json", JsonSerializer.Serialize(projectList));
});

app.Run();

public record MyProject(bool Done, string Title, long Created);