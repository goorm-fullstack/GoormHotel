package goormknights.hotel.email.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
public class MultipleEmail {
    private List<String> to;
    private String message;
    private String subject;

    public MultipleEmail(List<String> to, String message, String subject) {
        this.to = to;
        this.message = message;
        this.subject = subject;
    }
}
