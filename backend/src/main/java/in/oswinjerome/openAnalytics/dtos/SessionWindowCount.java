package in.oswinjerome.openAnalytics.dtos;

import java.time.LocalDateTime;

public record SessionWindowCount(LocalDateTime windowStart,
                                 Long sessionCount) {
}
