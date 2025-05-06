package in.oswinjerome.openAnalytics.dtos.responses;

import in.oswinjerome.openAnalytics.dtos.KeyVal;
import lombok.Data;

import java.util.List;

@Data
public class ProjectMetricsDTO {
    private Integer totalEvents;
    private Integer totalSessions;
    private Integer totalVisitors;
    private List<String> topPages;
    private List<KeyVal<String,Long>> topReferrers;
    private List<KeyVal<String,Long>> eventCounts;
    private List<KeyVal<String,Long>> userAgentCounts;
    private List<KeyVal<String,Long>> osCounts;
    private List<KeyVal<String,Long>> deviceCounts;
}
