public class manageProfiles
{
    const int FieldCount = 8;

    public bool addProfile(double createdDate, string givenName, string familyName, string email, string password, int countryCode, bool termsAccept, int guideRoleInt)
    {
        string[,] profileArrays = dataReader();
        string[] newProfileArray =
        [
            createdDate.ToString(),
            givenName,
            familyName,
            email,
            password,
            countryCode.ToString(),
            termsAccept.ToString(),
            guideRoleInt.ToString()
        ];

        string[,] profileArraysAppended = new string[profileArrays.GetLength(0) + 1, FieldCount];
        for (int i = 0; i < profileArrays.GetLength(0); i++)
        {
            for (int j = 0; j < FieldCount; j++)
            {
                profileArraysAppended[i, j] = profileArrays[i, j];
            }
        }

        int lastRow = profileArraysAppended.GetLength(0) - 1;
        for (int j = 0; j < FieldCount; j++)
        {
            profileArraysAppended[lastRow, j] = newProfileArray[j];
        }

        bool profileAdded = dataWriter(profileArraysAppended);
        if (profileAdded)
            Console.WriteLine("Profile Successfully Stored In UserConfig");

        return profileAdded;
    }

    private string[,] dataReader()
    {
        if (!File.Exists("UserConfig.txt"))
        {
            return new string[0, FieldCount];
        }

        string userDataText = File.ReadAllText("UserConfig.txt");
        string[] profileStrings = profileSplitter(userDataText);

        string[,] profiles = new string[profileStrings.Length, FieldCount];
        for (int i = 0; i < profileStrings.Length; i++)
        {
            string[] fields = fieldSplitter(profileStrings[i]);
            for (int j = 0; j < FieldCount; j++)
            {
                profiles[i, j] = fields[j];
            }
        }
        return profiles;
    }

    private bool dataWriter(string[,] profileArray)
    {
        string textToStore = dataProcessor(profileArray);
        if(File.Exists("UserConfig.txt"))
        {
            File.WriteAllText("UserConfig.txt", textToStore);
        }
        else
        {
            File.Create("UserConfig.txt").Close();
            File.WriteAllText("UserConfig.txt", textToStore);
        }
        return true;
    }

    string[] profileSplitter(string userDataText)
    {
        List<string> profiles = new List<string>();
        int index = 0;

        while (index < userDataText.Length)
        {
            if (userDataText[index] != '[')
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

            if (index < profileString.Length && profileString[index] == ' ')
            {
                index++;
            }

            string value = profileString.Substring(index, charCount);
            fields.Add(value);
            index += charCount;

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

    string dataProcessor(string[,] profileArray)
    {
        string combined = "";
        int profileCount = profileArray.GetLength(0);

        for (int i = 0; i < profileCount; i++)
        {
            string profileString = profileCombiner(profileArray, i);
            int charCountString = profileString.Length;

            combined = $"{combined}[{charCountString}] [{profileString}]\n";
        }
        return combined;
    }

    string profileCombiner(string[,] profileArray, int row)
    {
        string combined = "";
        for (int j = 0; j < FieldCount; j++)
        {
            string config = profileArray[row, j];
            int charCountString = config.Length;

            combined = $"{combined}{charCountString}, {config}, ";
        }
        return combined;
    }
}
