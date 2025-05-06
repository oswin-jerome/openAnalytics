package in.oswinjerome.openAnalytics.repositories;

import in.oswinjerome.openAnalytics.models.Project;
import in.oswinjerome.openAnalytics.models.Session;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SessionRepository extends JpaRepository<Session, String> {

    Page<Session> findByProjectOrderByUpdatedAtDesc(Project project, Pageable pageable);

    Optional<Session> findBySessionId(String sessionId);
    Optional<Session> findByProjectAndSessionId(Project project, String sessionId);

    int countByProject(Project project);

    int countDistinctByProject(Project project);

    @Query("SELECT s.userAgent, COUNT(s) FROM Session s WHERE s.project = :project GROUP BY s.userAgent ORDER BY COUNT(s) DESC")
    List<Object[]> findUserAgentCounts(@Param("project") Project project);

}
