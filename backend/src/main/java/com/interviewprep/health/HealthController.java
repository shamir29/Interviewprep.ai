package com.interviewprep.health;

import com.interviewprep.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/health")
@RequiredArgsConstructor
@Tag(name = "System Health", description = "Endpoints for verifying service health and subsystems")
public class HealthController {

    private final DataSource dataSource;

    @Value("${spring.application.name:interviewprep-backend}")
    private String applicationName;

    @Value("${spring.profiles.active:dev}")
    private String environment;

    @GetMapping
    @Operation(summary = "Check backend and database health status", description = "Verifies application status, database connectivity, and runtime metrics.")
    public ResponseEntity<ApiResponse<HealthStatusResponse>> checkHealth() {
        Map<String, Object> components = new HashMap<>();

        // Check Database connectivity
        boolean dbHealthy = false;
        try (Connection conn = dataSource.getConnection()) {
            dbHealthy = conn.isValid(2);
            components.put("database", Map.of(
                    "status", dbHealthy ? "UP" : "DOWN",
                    "databaseProductName", conn.getMetaData().getDatabaseProductName()
            ));
        } catch (Exception e) {
            log.warn("Health check database probe failed: {}", e.getMessage());
            components.put("database", Map.of(
                    "status", "DOWN",
                    "error", e.getMessage()
            ));
        }

        // JVM Memory status
        Runtime runtime = Runtime.getRuntime();
        long maxMemory = runtime.maxMemory() / (1024 * 1024);
        long totalMemory = runtime.totalMemory() / (1024 * 1024);
        long freeMemory = runtime.freeMemory() / (1024 * 1024);
        components.put("jvm", Map.of(
                "maxMemoryMb", maxMemory,
                "totalMemoryMb", totalMemory,
                "usedMemoryMb", (totalMemory - freeMemory)
        ));

        HealthStatusResponse health = HealthStatusResponse.builder()
                .status(dbHealthy ? "UP" : "DEGRADED")
                .applicationName(applicationName)
                .version("1.0.0")
                .environment(environment)
                .timestamp(Instant.now())
                .components(components)
                .build();

        return ResponseEntity.ok(ApiResponse.ok(health, "InterviewPrep AI service is operating normally."));
    }
}
