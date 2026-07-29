public class singleProfile
{
    private int _createdDate;
    public int createdDate
    {
        get => _createdDate;
        set => _createdDate = value;
    }

    private string _givenName;
    public string givenName
    {
        get => _givenName;
        set => _givenName = value;
    }

    private string _familyName;
    public string familyName
    {
        get => _familyName;
        set => _familyName = value;
    }

    private string _email;
    public string email
    {
        get => _email;
        set => _email = value;
    }

    private string _password;
    public string password
    {
        get => _password;
        set => _password = value;
    }

    private int _countryCode;
    public int countryCode
    {
        get => _countryCode;
        set => _countryCode = value;
    }

    private bool _termsAccept;
    public bool termsAccept
    {
        get => _termsAccept;
        set => _termsAccept = value;
    }

    private Role _isGuideRole;
    public Role isGuideRole
    {
        get => _isGuideRole;
        set => _isGuideRole = value;
    }

    public singleProfile(int createdDate, string givenName, string familyName, string email, string password, int countryCode, bool termsAccept, Role isGuideRole)
    {
        _createdDate = createdDate;
        _givenName = givenName;
        _familyName = familyName;
        _email = email;
        _password = password;
        _countryCode = countryCode;
        _termsAccept = termsAccept;
        _isGuideRole = isGuideRole;
    }

}
public enum Role
{
    Client = 0,
    Guide = 1
}