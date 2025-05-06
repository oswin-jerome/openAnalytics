package in.oswinjerome.openAnalytics.repositories;

import in.oswinjerome.openAnalytics.models.Project;
import in.oswinjerome.openAnalytics.models.Session;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SessionRepository extends JpaRepository<Session, String> {

    List<Session> findByProjectOrderByUpdatedAtDesc(Project project);

    Optional<Session> findBySessionId(String sessionId);
    Optional<Session> findByProjectAndSessionId(Project project, String sessionId);

    int countByProject(Project project);

    int countDistinctByProject(Project project);

}
