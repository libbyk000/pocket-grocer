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

    }
}