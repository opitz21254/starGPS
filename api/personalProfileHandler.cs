using System.Globalization;
using System.Security.Cryptography.X509Certificates;

public class personalProfileHandler
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

    public personalProfileHandler(int createdDate, string givenName, string familyName, string email, string password, int countryCode, bool termsAccept, Role isGuideRole)
    {
        _createdDate = createdDate;
        _givenName = givenName;
        _familyName = familyName;
        _email = email;
        _password = password;
        _countryCode = countryCode;
        _termsAccept = termsAccept;
        _isGuideRole = isGuideRole;

        int guideRoleInt = (int)isGuideRole;

        string[][] profileArrays = dataReader();
        string[] newProfileArray = [createdDate.ToString(), givenName, familyName, email, password, countryCode.ToString(), termsAccept.ToString(), guideRoleInt.ToString()];
        string[][] profileArraysAppended = new string[profileArrays.Length + 1][];
        for (int i = 0; i < profileArrays.Length; i++)
        {
            profileArraysAppended[i] = profileArrays[i];
        }
        profileArraysAppended[^1] = newProfileArray;
        bool profileAdded = dataWriter(profileArraysAppended);
        if(profileAdded == true)
            Console.WriteLine("Profile Successfully Stored In UserConfig");
    }

    string[][] dataReader()
    {
        string userDataText = File.ReadAllText("UserConfig.txt");
        string[] profileStrings = profileSplitter(userDataText);

        string[][] profiles = new string[profileStrings.Length][];
        for (int i = 0; i < profileStrings.Length; i++)
        {
            profiles[i] = fieldSplitter(profileStrings[i]);
        }
        return profiles;
    }

    bool dataWriter(string[][] profileArray)
    {
        string textToStore = dataProcessor(profileArray);
        File.WriteAllText("UserConfig.txt", textToStore);
        // File.WriteAllText("c:/Users/opitz/Projects/starGPS/api/UserConfig.txt", userData);
        return true;
    }
    string[] profileSplitter(string userDataText)
    {
        List<string> profiles = new List<string>();
        int index = 0;

        while (index < userDataText.Length)
        {
            if (userDataText[index] != '[') //Does not start with '['
            {
                break;
            }
            index++;

            int lengthEnd = userDataText.IndexOf(']', index);
            int charCount = int.Parse(userDataText.AsSpan(index, lengthEnd - index));
            index = lengthEnd + 1;

            if (index < userDataText.Length && userDataText[index] == ' ')
            {
                index++;
            }
            if (index < userDataText.Length && userDataText[index] == '[')
            {
                index++;
            }

            string profileString = userDataText.Substring(index, charCount);
            profiles.Add(profileString);
            index += charCount;

            if (index < userDataText.Length && userDataText[index] == ']')
            {
                index++;
            }
            if (index < userDataText.Length && userDataText[index] == '\n')
            {
                index++;
            }
        }

        return profiles.ToArray();
    }

    string[] fieldSplitter(string profileString)
    {
        List<string> fields = new List<string>();
        int index = 0;

        while (index < profileString.Length)
        {
            int comma = profileString.IndexOf(',', index);
            if (comma < 0)
            {
                break;
            }

            int charCount = int.Parse(profileString.AsSpan(index, comma - index));
            index = comma + 1;

            // skip space after comma
            if (index < profileString.Length && profileString[index] == ' ')
            {
                index++;
            }

            string value = profileString.Substring(index, charCount);
            fields.Add(value);
            index += charCount;

            // skip trailing ", "
            if (index < profileString.Length && profileString[index] == ',')
            {
                index++;
            }
            if (index < profileString.Length && profileString[index] == ' ')
            {
                index++;
            }
        }

        return fields.ToArray();
    }
    string dataProcessor(string[][] profileArray)
    {
        string combined = "";

        foreach (string[] profile in profileArray)
        {
            string profileString = profileCombiner(profile);
            int charCountString = profileString.Count();

            combined = $"{combined}[{charCountString}] [{profileString}]\n";
        }
        return combined;
    }
    string profileCombiner(string[] configArray)
    {
        string combined = "";
        foreach (string config in configArray)
        {
            int charCountString = config.Count();

            combined = $"{combined}{charCountString}, {config}, ";
        }
        return combined;
    }
}

public enum Role
{
    Client = 0,
    Guide = 1
}