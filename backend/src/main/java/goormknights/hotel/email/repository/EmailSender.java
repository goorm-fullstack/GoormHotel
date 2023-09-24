package goormknights.hotel.email.repository;

import goormknights.hotel.email.model.EmailMessage;

public interface EmailSender {
    String sendMemberMail(EmailMessage emailMessage, String type);
}
