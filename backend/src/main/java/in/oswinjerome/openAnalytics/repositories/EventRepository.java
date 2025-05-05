package in.oswinjerome.openAnalytics.repositories;

import in.oswinjerome.openAnalytics.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, String> {
}
