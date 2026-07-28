public class mvpPersonProfHandler
{
    private string _givenName;
    public string givenName
    {
        get => _givenName;
        set => _givenName = value;
    }

    private string _password;
    public string password
    {
        get => _password;
        set => _password = value;
    }


    public mvpPersonProfHandler(string givenName, string password)
    {
        _givenName = givenName;
        _password = password;
    }
}