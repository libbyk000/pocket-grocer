package pocketgrocer;

import java.io.*;
import java.sql.*;
import java.util.*;
import java.util.logging.Logger;
import java.security.*;
import java.security.spec.*;
import javax.crypto.*;
import javax.crypto.spec.*;

public class Query {
    // DB Connection
    private Connection conn;

    private static final Logger log;

    //canned queries 
    private static final String INSERT_USER = "INSERT INTO USERS VALUES (?,?,?,?)";
    private PreparedStatement insertUser;

    static {
        System.setProperty("java.util.logging.SimpleFormatter.format", "[%4$-7s] %5$s %n");
        log = Logger.getLogger(Query.class.getName());
    }

    /*
   * prepare all the SQL statements in this method.
   */
  public void prepareStatements() throws SQLException {

  }

    public static void main(String[] args) throws Exception {
        log.info("Loading application properties");
        Properties properties = new Properties();
        properties.load(new FileInputStream("backend/src/main/java/pocketgrocer/application.properties"));

        log.info("Connecting to the database");
        Connection connection = DriverManager.getConnection(properties.getProperty("url"), properties);
        log.info("Database connection test: " + connection.getCatalog());

        log.info("Create database schema");
        Scanner scanner = new Scanner(Query.class.getClassLoader().getResourceAsStream("schema.sql"));
        Statement statement = connection.createStatement();
        while (scanner.hasNextLine()) {
            statement.execute(scanner.nextLine());
        }

        log.info("Closing database connection");
        connection.close();
    }

    // function to close the connection to a SQL database
    public void closeConnection() throws SQLException {
        conn.close();
    }



}
