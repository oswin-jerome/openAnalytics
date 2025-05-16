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


    @Query(value = """
            WITH windows AS (
                SELECT generate_series(
                        date_trunc('minute', NOW()) - INTERVAL '55 minutes',
                        date_trunc('minute', NOW()),
                        INTERVAL '5 minutes'
                    ) AS window_start
                ),
                session_counts AS (
                    SELECT date_trunc('minute', created_at) AS ts,
                        COUNT(*) AS session_count FROM public.sessions
                        WHERE project_id = :projectId AND created_at >= NOW() - INTERVAL '1 hour'
                        GROUP BY ts
                )
                SELECT w.window_start,  COALESCE(SUM(sc.session_count), 0) AS session_count
                FROM windows w
                LEFT JOIN session_counts sc ON sc.ts >= w.window_start AND sc.ts < w.window_start + INTERVAL '5 minutes'
                GROUP BY w.window_start ORDER BY w.window_start
    """, nativeQuery = true)
    List<Object[]> findSessionCountByPeriodAndWindow(String projectId, int period, int window);

}
