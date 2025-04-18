package com.email_writer.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.email_writer.model.EmailRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service

public class EmailGeneratorService {
    private final WebClient webClient;

    public EmailGeneratorService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    @Value("${gemini.api.url}")
    private String geminiApiUrl;
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public String generateEmailReply(EmailRequest emailRequest) {
        // Placeholder logic for generating an email
        // building prompt.
        String prompt = buildPrompt(emailRequest);

        // building Craft req.
        Map<String, Object> craftReq = Map.of(
                "contents", new Object[] {
                        Map.of("parts", new Object[] {
                                Map.of("text", prompt),
                        })
                });
        // Serialize craftReq to JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String requestBody;
        try {
            requestBody = objectMapper.writeValueAsString(craftReq);
        } catch (Exception e) {
            throw new RuntimeException("Failed to serialize request body", e);
        }

        // Do the req and get the response.
        String response = webClient.post()
                .uri(geminiApiUrl + geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        // extract & return the response.
        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response);
            return jsonNode.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        // building prompt.
        StringBuilder prompt = new StringBuilder();
    
        prompt.append(
                "Generate a professional email reply for the following content. Please don't generate a subject line. Please don't generate multiple suggetions or option, only one reply\n");
        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append("Tone: ").append(emailRequest.getTone()).append("\n");
        }
        prompt.append("Email Content: ").append(emailRequest.getEmailContent()).append("\n\n");
    
        // // Adding example email reply
        // prompt.append("Example Reply:\n");
        // prompt.append("Dear [Sender Name],\n\n");
        // prompt.append("Thank you for your email.\n\n");
        // prompt.append("I've received it and will review it shortly. I'll be in touch as soon as I have an update or more information for you.\n\n");
        // prompt.append("In the meantime, please don't hesitate to reach out if you have any urgent questions.\n\n");
        // prompt.append("Sincerely,\n\n");
        // prompt.append("[Your Name]\n");
        // prompt.append("[Your Title]\n");
        // prompt.append("[Your Contact Information (optional)]\n");
    
        return prompt.toString();
    }

}