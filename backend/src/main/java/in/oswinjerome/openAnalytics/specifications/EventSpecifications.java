package in.oswinjerome.openAnalytics.specifications;

import in.oswinjerome.openAnalytics.models.Event;
import in.oswinjerome.openAnalytics.models.Project;
import org.springframework.data.jpa.domain.Specification;

public class EventSpecifications {
    public static Specification<Event> withProject(Project project) {
        return (root,query,cb)-> cb.equal(root.get("project"), project);
    }

    public static Specification<Event> withName(String name) {
        return (root,query,cb)-> name==null?null: cb.like(cb.lower(root.get("name")), "%"+name.toLowerCase()+"%");
    }

}
