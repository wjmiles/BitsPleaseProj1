using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

using MySql.Data;
using MySql.Data.MySqlClient;

using System.Data;

namespace accountManager
{
    /// <summary>
    /// Summary description for AccountServices
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class AccountServices : System.Web.Services.WebService
    {
        //creates new user
        [WebMethod(EnableSession = true)]
        public string NewUserAccount(string screenName, string email, string firstName, string lastName, string password)
        {
            string sqlConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["myDB"].ConnectionString;

            string sqlSelect = "INSERT INTO `users` (`ScreenName`, `Email`, `FirstName`, `LastName`, `Password`) " +
                               "VALUES(@sNameValue, @emailValue, @fNameValue, @lNameValue, @passwordValue);";

            MySqlConnection sqlConnection = new MySqlConnection(sqlConnectionString);
            MySqlCommand sqlCommand = new MySqlCommand(sqlSelect, sqlConnection);

            sqlCommand.Parameters.AddWithValue("@sNameValue", HttpUtility.UrlDecode(screenName));
            sqlCommand.Parameters.AddWithValue("@emailValue", HttpUtility.UrlDecode(email));
            sqlCommand.Parameters.AddWithValue("@fNameValue", HttpUtility.UrlDecode(firstName));
            sqlCommand.Parameters.AddWithValue("@lNameValue", HttpUtility.UrlDecode(lastName));
            sqlCommand.Parameters.AddWithValue("@passwordValue", HttpUtility.UrlDecode(password));

            sqlConnection.Open();
            try
            {
                int id = Convert.ToInt32(sqlCommand.ExecuteScalar());
            }
            catch (Exception e)
            {
            }
            sqlConnection.Close();

            return email;
        }

        //sign in
        [WebMethod(EnableSession = true)]
        public Account[] SignIn(string email, string password)
        {
            bool success = false;

            string sqlConnectionSring = System.Configuration.ConfigurationManager.ConnectionStrings["myDB"].ConnectionString;

            string sqlSelect = "SELECT * FROM users WHERE email=@emailValue and password=@passwordValue";

            MySqlConnection sqlConnection = new MySqlConnection(sqlConnectionSring);
            MySqlCommand sqlCommand = new MySqlCommand(sqlSelect, sqlConnection);

            sqlCommand.Parameters.AddWithValue("@emailValue", HttpUtility.UrlDecode(email));
            sqlCommand.Parameters.AddWithValue("@passwordValue", HttpUtility.UrlDecode(password));

            MySqlDataAdapter sqlDa = new MySqlDataAdapter(sqlCommand);
            DataTable sqlDt = new DataTable();
            sqlDa.Fill(sqlDt);
            List<Account> accountTemp = new List<Account>();
            if (sqlDt.Rows.Count > 0)
            {
                for (int i = 0; i < sqlDt.Rows.Count; i++)
                {
                    accountTemp.Add(new Account
                    {
                        userId = Convert.ToInt32(sqlDt.Rows[i]["UserID"]),
                        screenName = sqlDt.Rows[i]["ScreenName"].ToString(),
                        email = sqlDt.Rows[i]["Email"].ToString(),
                        firstName = sqlDt.Rows[i]["FirstName"].ToString(),
                        lastName = sqlDt.Rows[i]["LastName"].ToString(),
                        password = sqlDt.Rows[i]["Password"].ToString(),
                        admin = Convert.ToBoolean(sqlDt.Rows[i]["Admin"])
                    });
                }
                success = true;
            }
            return accountTemp.ToArray();
        }


        [WebMethod(EnableSession = true)]
        public Account[] GetAccount(string userId)
        {
            //string id = Session["UserID"].ToString();

            //if (Session["UserID"] == null)
            //{
            //    return new Account[0];
            //}
            //else
            //{
                DataTable sqlDt = new DataTable("account");

                string sqlConnectString = System.Configuration.ConfigurationManager.ConnectionStrings["myDB"].ConnectionString;
                string sqlSelect = "select * from users where UserID=@userIdValue";

                MySqlConnection sqlConnection = new MySqlConnection(sqlConnectString);
                MySqlCommand sqlCommand = new MySqlCommand(sqlSelect, sqlConnection);

                sqlCommand.Parameters.AddWithValue("@userIdValue", HttpUtility.UrlDecode(userId));

                MySqlDataAdapter sqlDa = new MySqlDataAdapter(sqlCommand);
                sqlDa.Fill(sqlDt);

                List<Account> account = new List<Account>();
                for (int i = 0; i < sqlDt.Rows.Count; i++)
                {
                    account.Add(new Account
                    {
                        userId = Convert.ToInt32(sqlDt.Rows[i]["UserID"]),
                        screenName = sqlDt.Rows[i]["ScreenName"].ToString(),
                        email = sqlDt.Rows[i]["Email"].ToString(),
                        firstName = sqlDt.Rows[i]["FirstName"].ToString(),
                        lastName = sqlDt.Rows[i]["LastName"].ToString(),
                        password = sqlDt.Rows[i]["Password"].ToString(),
                        admin = Convert.ToBoolean(sqlDt.Rows[i]["Admin"])
                    });
                }
                return account.ToArray();
            //}
        }


        //sign out
        [WebMethod(EnableSession = true)]
        public bool SignOut()
        {
            Session.Abandon();
            return true;
        }

        //creates new event
        [WebMethod(EnableSession = true)]
        public string NewEvent(string userId, string eName, string eType, string eCity, string eState, string eZip, string eAddress, string eDate, string eTime, string eAccessibility, string eDescription, string eCapacity, string eHost)
        {
            string sqlConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["myDB"].ConnectionString;

            string sqlSelect = "INSERT INTO `events` (`UserID`,`eventName`, `eventType`, `City`, `State`, `Zip`, `Address`, `Date`, `Time`, `Accessibility`, `Description`, `eventCapacity`, `eventHost`) " +
                               "VALUES (@userIdValue, @eNameValue, @eTypeValue, @eCityValue, @eStateValue, @eZipValue, @eAddressValue, @eDateValue, @eTimeValue, @eAccessibilityValue, @eDescriptionValue, @eCapacityValue, @eHostValue);";

            MySqlConnection sqlConnection = new MySqlConnection(sqlConnectionString);
            MySqlCommand sqlCommand = new MySqlCommand(sqlSelect, sqlConnection);

            sqlCommand.Parameters.AddWithValue("@userIdValue", HttpUtility.UrlDecode(userId));
            sqlCommand.Parameters.AddWithValue("@eNameValue", HttpUtility.UrlDecode(eName));
            sqlCommand.Parameters.AddWithValue("@eTypeValue", HttpUtility.UrlDecode(eType));
            sqlCommand.Parameters.AddWithValue("@eCityValue", HttpUtility.UrlDecode(eCity));
            sqlCommand.Parameters.AddWithValue("@eStateValue", HttpUtility.UrlDecode(eState));
            sqlCommand.Parameters.AddWithValue("@eZipValue", HttpUtility.UrlDecode(eZip));
            sqlCommand.Parameters.AddWithValue("@eAddressValue", HttpUtility.UrlDecode(eAddress));
            sqlCommand.Parameters.AddWithValue("@eDateValue", HttpUtility.UrlDecode(eDate));
            sqlCommand.Parameters.AddWithValue("@eTimeValue", HttpUtility.UrlDecode(eTime));
            sqlCommand.Parameters.AddWithValue("@eAccessibilityValue", HttpUtility.UrlDecode(eAccessibility));
            sqlCommand.Parameters.AddWithValue("@eDescriptionValue", HttpUtility.UrlDecode(eDescription));
            sqlCommand.Parameters.AddWithValue("@eCapacityValue", HttpUtility.UrlDecode(eCapacity));
            sqlCommand.Parameters.AddWithValue("@eHostValue", HttpUtility.UrlDecode(eHost));

            sqlConnection.Open();
            try
            {
                int eventId = Convert.ToInt32(sqlCommand.ExecuteScalar());
            }
            catch (Exception e)
            {
            }
            sqlConnection.Close();

            string str = eName + ", " + eType + ", " + eCity + ", " + eState + ", " + eZip + ", " + eAddress + ", " + eDate + ", " + eTime + ", " + eAccessibility + ", " + eDescription + ", " + eCapacity + ", " + eHost;
            return str;
        }

        //user count
        //testing purposes
        [WebMethod]
        public int NumberOfUsers()
        {
            string sqlConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["myDB"].ConnectionString;
            string sqlSelect = "SELECT * from users";

            MySqlConnection sqlConnection = new MySqlConnection(sqlConnectionString);
            MySqlCommand sqlCommand = new MySqlCommand(sqlSelect, sqlConnection);

            MySqlDataAdapter sqlDa = new MySqlDataAdapter(sqlCommand);
            DataTable sqlDt = new DataTable();
            sqlDa.Fill(sqlDt);
            return sqlDt.Rows.Count;
        }

        //event count
        //more testing
        [WebMethod]
        public int NumberOfEvents()
        {
            string sqlConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["myDB"].ConnectionString;
            string sqlSelect = "SELECT * from events";

            MySqlConnection sqlConnection = new MySqlConnection(sqlConnectionString);
            MySqlCommand sqlCommand = new MySqlCommand(sqlSelect, sqlConnection);

            MySqlDataAdapter sqlDa = new MySqlDataAdapter(sqlCommand);
            DataTable sqlDt = new DataTable();
            sqlDa.Fill(sqlDt);
            return sqlDt.Rows.Count;
        }
    }
}
