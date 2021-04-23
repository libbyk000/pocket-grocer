import pocketgrocer.utils.CORSFilter;
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

        // Spark HTTP Endpoints
        spark.get("/users/add", (request, response) -> {
            String username = request.queryParams("Username");
            String firstName = request.queryParams("FirstName");
            String lastName = request.queryParams("LastName");
            String password = request.queryParams("Password");
            String groupID = request.queryParams("GroupID");
            try {
                // do sth here
                if () { // if user already exisst in db
                    response.status(400);
                    return ("User already exists");
                } else { // if user is successfully registered
                    response.status(200) // success
                    return gson.toJson(); // return sth?
                }
            } catch (Exception e) {
                response.status(400); // error
                return (e);
            }
        }
    }
}