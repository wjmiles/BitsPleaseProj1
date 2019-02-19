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
            catch (Exception e) {
            }
            sqlConnection.Close();

            return email;
        }

        List<Account> account = new List<Account>();

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
            if (sqlDt.Rows.Count > 0)
            {
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
                
                //Session["UserID"] = sqlDt.Rows[0]["UserID"];
                //Session["Admin"] = sqlDt.Rows[0]["Admin"];
                success = true;
            }

            //string id = Session["UserID"].ToString();
            //string admin = Session["Admin"].ToString();

            return account.ToArray();
        }

        /*
        [WebMethod(EnableSession = true)]
        public Account[] GetAccount()
        {
            if (Session["id"] != null)
            {
                DataTable sqlDt = new DataTable("account");

                string sqlConnectString = System.Configuration.ConfigurationManager.ConnectionStrings["myDB"].ConnectionString;
                string sqlSelect = "select * from users where UserID=@Session['UserID']";
            }
        }
        */

        //sign out
        [WebMethod(EnableSession = true)]
        public bool SignOut()
        {
            Session.Abandon();
            return true;
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
    }
}
