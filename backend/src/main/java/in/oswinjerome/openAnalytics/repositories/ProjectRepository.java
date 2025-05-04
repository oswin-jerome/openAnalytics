package in.oswinjerome.openAnalytics.repositories;

import in.oswinjerome.openAnalytics.models.Project;
import in.oswinjerome.openAnalytics.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, String> {

    List<Project> findAllByOwner(User owner);
    Optional<Project> findByApiKey(String apiKey);
}
