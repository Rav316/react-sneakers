package ru.alex.reactsneakersapi.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import ru.alex.reactsneakersapi.dto.user.UserReadDto;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Async
    public void sendActivationMail(UserReadDto userAuthDto, String link) {
        Context context = new Context();
        context.setVariables(
                Map.of(
                        "name", userAuthDto.name(),
                        "link", link
                )
        );
        String htmlContent = templateEngine.process("account-activation-template", context);


        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setTo(userAuthDto.email());
            helper.setSubject("Активация аккаунта react sneakers");
            helper.setText(htmlContent, true);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    @Async
    public void sendPaymentEmail(Integer orderId, String name, String email, String link) {
        Context context = new Context();
        context.setVariables(
                Map.of(
                        "name", name,
                        "orderId", orderId,
                        "link", link
                )
        );
        String htmlContent = templateEngine.process("order-payment-template", context);

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setTo(email);
            helper.setSubject("Оплата заказа");
            helper.setText(htmlContent, true);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
