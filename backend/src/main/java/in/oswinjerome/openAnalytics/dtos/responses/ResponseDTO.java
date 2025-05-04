package in.oswinjerome.openAnalytics.dtos.responses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseDTO<T> {
    private String message;
    private boolean success;
    private T data;

    public ResponseDTO(boolean success,String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
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

}
