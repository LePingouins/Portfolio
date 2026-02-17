package com.olivier.portfolio;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Map;

@RestController
@RequestMapping("/api/gemini")
public class GeminiProxyController {
    private static final Logger logger = LoggerFactory.getLogger(GeminiProxyController.class);

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.model.endpoint.flash}")
    private String geminiModelEndpointFlash;

    @Value("${gemini.model.endpoint.pro}")
    private String geminiModelEndpointPro;

    @PostMapping("/suggest-skills")
    public ResponseEntity<?> suggestSkills(@RequestBody Map<String, String> body) {
        String query = body.get("query");
        String model = body.getOrDefault("model", "flash"); // default to flash
        if (query == null || query.isEmpty()) {
            logger.error("Missing query in request body");
            return ResponseEntity.badRequest().body("Missing query");
        }
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-goog-api-key", geminiApiKey);
        String payload = String.format("{\"contents\":[{\"parts\":[{\"text\":\"Suggest 5 relevant skills for: %s\"}]}]}", query);
        HttpEntity<String> request = new HttpEntity<>(payload, headers);
        String url;
        if (model.equalsIgnoreCase("pro")) {
            url = geminiModelEndpointPro;
        } else {
            url = geminiModelEndpointFlash;
        }
        int maxRetries = 3;
        int attempt = 0;
        while (attempt < maxRetries) {
            try {
                ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
                if (response.getStatusCode().value() == 503) {
                    logger.warn("Gemini API 503 Service Unavailable, attempt {}", attempt + 1);
                    attempt++;
                    Thread.sleep(1000 * attempt); // Exponential backoff
                    continue;
                }
                if (!response.getStatusCode().is2xxSuccessful()) {
                    logger.error("Gemini API error: status {} body {}", response.getStatusCode(), response.getBody());
                }
                return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
            } catch (Exception e) {
                logger.error("Exception calling Gemini API", e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Gemini API error: " + e.getMessage());
            }
        }
        logger.error("Gemini API failed after {} retries", maxRetries);
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body("Gemini API is overloaded. Please try again later.");
    }
}
