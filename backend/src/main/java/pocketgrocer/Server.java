package main.java.pocketgrocer;

import main.java.pocketgrocer.utils.CORSFilter;
import com.google.gson.Gson;
import spark.Spark;

public class Server {
    public static void main(String[] args) {
        // allows other applications to make requests to the Spark server
        // https://stackoverflow.com/questions/45295530/spark-cors-access-control-allow-origin-error
        CORSFilter corsFilter = new CORSFilter();
        corsFilter.apply();

        // Java serialization/deserialization library to convert Java Objects into JSON and back
        // https://github.com/google/gson
        Gson gson = new Gson();

        // Spark HTTP Endpoints¸
        spark.get("/users/add", (request, response) -> {
            String username = request.queryParams("Username");
            String firstName = request.queryParams("FirstName");
            String lastName = request.queryParams("LastName");
            String password = request.queryParams("Password");

            try {
                // do sth here
                if (true) { // if user already exisst in db
                    // private static final String CHECK_FLIGHT_CAPACITY = "SELECT capacity FROM Flights WHERE fid = ?";
                    response.status(400);
                    return ("User already exists");
                } else { // if user is successfully registered
                    // call sth to put data into db
                    response.status(200); // success
                    return ("Success"); // return sth?
                }
            } catch (Exception e) {
                response.status(400); // error
                return (e);
            }
        });
    }
}