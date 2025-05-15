package in.oswinjerome.openAnalytics.filters;

import com.sun.net.httpserver.HttpExchange;
import io.github.bucket4j.*;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    private final Map<String, Bucket> cache = new ConcurrentHashMap<>();

    private Bucket createNewBucket() {
        return Bucket.builder().addLimit(Bandwidth.classic(60,Refill.greedy(60,Duration.ofMinutes(1)))).build();
    }

    /**
     * @param request
     * @param response
     * @param filterChain
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String ip = ((HttpServletRequest) request).getRemoteAddr();
        Bucket bucket = cache.computeIfAbsent(ip, k -> createNewBucket());
        System.out.printf("IP: %s, Available tokens: %d%n", ip, bucket.getAvailableTokens());
        if (bucket.tryConsume(1)) {
            filterChain.doFilter(request, response);
        } else {
            ((HttpServletResponse) response).setStatus(429);
            response.getWriter().write("Too Many Requests");
        }
    }
}
