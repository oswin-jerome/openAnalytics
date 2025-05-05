package in.oswinjerome.openAnalytics.repositories;

import in.oswinjerome.openAnalytics.dtos.KeyVal;
import in.oswinjerome.openAnalytics.models.Event;
import in.oswinjerome.openAnalytics.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, String> {
    int countByProject(Project project);

    @Query("SELECT e.page, COUNT(e) FROM Event e WHERE e.project = :project GROUP BY e.page ORDER BY COUNT(e) DESC LIMIT 5")
    List<Object[]> findTopPages(@Param("project") Project project);

    @Query("SELECT e.referrer, COUNT(e) FROM Event e WHERE e.project = :project GROUP BY e.referrer ORDER BY COUNT(e) DESC LIMIT 5")
    List<Object[]> findTopReferrers(@Param("project") Project project);

    @Query("SELECT new in.oswinjerome.openAnalytics.dtos.KeyVal(e.name, COUNT(e)) FROM Event e WHERE e.project = :project GROUP BY e.name ORDER BY COUNT(e)")
    List<KeyVal<String,Long>> findDistinctEventNames(@Param("project") Project project);

}
