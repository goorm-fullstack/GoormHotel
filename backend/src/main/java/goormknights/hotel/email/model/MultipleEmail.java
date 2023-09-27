package goormknights.hotel.email.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MultipleEmail {
    private String[] to;
    private String message;
    private String subject;
}
