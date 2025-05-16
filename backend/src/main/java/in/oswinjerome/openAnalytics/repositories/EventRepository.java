package in.oswinjerome.openAnalytics.repositories;

import in.oswinjerome.openAnalytics.dtos.KeyVal;
import in.oswinjerome.openAnalytics.models.Event;
import in.oswinjerome.openAnalytics.models.Project;
import in.oswinjerome.openAnalytics.models.Session;
import org.springframework.data.domain.Limit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, String>, JpaSpecificationExecutor<Event> {

    List<Event> findByProjectOrderByCreatedAtDesc(Project project, Pageable pageable);

    Page<Event> findByProject(Project project, Pageable pageable);

    List<Event> findBySession(Session session);


    int countByProjectAndCreatedAtBetween(Project project, LocalDateTime from, LocalDateTime to);

    @Query("SELECT e.page, COUNT(e) FROM Event e WHERE e.project = :project AND e.createdAt BETWEEN :from AND :to GROUP BY e.page ORDER BY COUNT(e) DESC LIMIT 5")
    List<Object[]> findTopPages(@Param("project") Project project,LocalDateTime from, LocalDateTime to);

    @Query("SELECT e.referrer, COUNT(e) FROM Event e WHERE e.project = :project AND e.createdAt BETWEEN :from AND :to GROUP BY e.referrer ORDER BY COUNT(e) DESC LIMIT 5")
    List<Object[]> findTopReferrers(@Param("project") Project project,LocalDateTime from, LocalDateTime to);

    @Query("SELECT new in.oswinjerome.openAnalytics.dtos.KeyVal(e.name, COUNT(e)) FROM Event e WHERE e.project = :project AND e.createdAt BETWEEN :from AND :to GROUP BY e.name ORDER BY COUNT(e)")
    List<KeyVal<String,Long>> findDistinctEventNames(@Param("project") Project project, LocalDateTime from, LocalDateTime to);


}
