package in.oswinjerome.openAnalytics.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class KeyVal<K,V> {
    private K key;
    private V value;
}
