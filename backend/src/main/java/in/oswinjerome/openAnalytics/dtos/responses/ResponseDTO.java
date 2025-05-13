package in.oswinjerome.openAnalytics.dtos.responses;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class ResponseDTO<T> {
    private String message;
    private boolean success;
    private T data;
    private List<Map<String, Object>> errors;

    public ResponseDTO(boolean success,String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public ResponseDTO(boolean success,String message, List<Map<String, Object>> errors) {
        this.success = success;
        this.message = message;
        this.errors = errors;
    }

    public static <T> ResponseDTO<T> success(T data) {
        return new ResponseDTO<>(true,"",data);
    }

    public static <T> ResponseDTO<T> success() {
        return success(null);
    }
    public static <T> ResponseDTO<T> fail(String message) {
        return new ResponseDTO<>(false,message,null);
    }

    public static <T> ResponseDTO<T> fail(List<Map<String, Object>> sanitizedErrors,String message) {
        return new ResponseDTO<>(false,message,sanitizedErrors);
    }

}
