package in.oswinjerome.openAnalytics.repositories;

import in.oswinjerome.openAnalytics.dtos.SessionListDTO;
import in.oswinjerome.openAnalytics.models.Project;
import in.oswinjerome.openAnalytics.models.Session;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SessionRepository extends JpaRepository<Session, String> {

    @Query("SELECT new in.oswinjerome.openAnalytics.dtos.SessionListDTO(s,COUNT(e)) FROM Session s JOIN Event e ON e.session = s WHERE s.project = :project GROUP BY s")
    Page<SessionListDTO> findByProjectOrderByUpdatedAtDesc(Project project, Pageable pageable);

    Optional<Session> findBySessionId(String sessionId);
    Optional<Session> findByProjectAndSessionId(Project project, String sessionId);

    int countByProject(Project project);
    int countByProjectAndCreatedAtBetween(Project project, LocalDateTime from, LocalDateTime to);

    int countDistinctByProject(Project project);

    @Query("SELECT s.userAgent, COUNT(s) FROM Session s WHERE s.project = :project AND s.createdAt BETWEEN :from AND :to GROUP BY s.userAgent ORDER BY COUNT(s) DESC")
    List<Object[]> findUserAgentCounts(@Param("project") Project project,LocalDateTime from, LocalDateTime to);

    @Query("SELECT function('jsonb_extract_path_text', s.metaData, 'os'), COUNT(s) FROM Session s WHERE s.project = :project AND s.createdAt BETWEEN :from AND :to GROUP BY function('jsonb_extract_path_text', s.metaData, 'os') ORDER BY COUNT(s) DESC")
    List<Object[]> findOsCounts(@Param("project") Project project,LocalDateTime from, LocalDateTime to);

    @Query("SELECT function('jsonb_extract_path_text', s.metaData, 'device'), COUNT(s) FROM Session s WHERE s.project = :project AND s.createdAt BETWEEN :from AND :to GROUP BY function('jsonb_extract_path_text', s.metaData, 'device') ORDER BY COUNT(s) DESC")
    List<Object[]> findDeviceCounts(@Param("project") Project project,LocalDateTime from, LocalDateTime to);

}
