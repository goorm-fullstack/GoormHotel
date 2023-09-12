package goormknights.hotel.email.repository;

import goormknights.hotel.email.model.EmailMessage;

public interface EmailSender {
    String sendMail(EmailMessage emailMessage, String type);
}
